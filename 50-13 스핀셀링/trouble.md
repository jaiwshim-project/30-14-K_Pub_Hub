# SPIN Selling AI 플랫폼 — 트러블슈팅 기록

프로젝트 개발 중 발생한 심각한 문제들과 원인, 해결책, 재발 방지 방법을 정리한 문서.

---

## 1. 모든 페이지가 백지로 표시되는 문제

**증상:** company.html 등 주요 페이지가 완전히 백지로 렌더링됨

**원인:** `let allMembersCache` 변수가 common.js와 company.html에서 **중복 선언**되어 JavaScript 에러 발생. JS 에러로 인해 `mainApp`의 `display:none`이 해제되지 않아 백지 상태 유지.

**해결:** company.html에서 중복 선언 제거

**재발 방지:**
- common.js에 이미 선언된 전역 변수를 개별 HTML에서 재선언하지 않기
- 변수명 충돌 체크: 새 변수 추가 전 `Grep`으로 기존 선언 확인
- 브라우저 콘솔(F12) 에러 확인을 습관화

---

## 2. 모든 메뉴가 랜딩 페이지(index.html)로 리다이렉트되는 문제

**증상:** 로그인 후 어떤 메뉴를 클릭해도 index.html로 되돌아감. 여러 차례 재발.

**원인:** 로고 `<a>` 태그에 `onclick="clearSessionId();clearUser();clearRole();"` 핸들러가 추가됨. 로고 클릭뿐 아니라 **페이지 로드 시에도 이벤트가 발생**하여 세션이 초기화됨.

**해결:** 모든 HTML 파일의 로고에서 onclick 세션 클리어 코드 제거. 세션 초기화는 **오직 "홈" 메뉴 클릭 시에만** 실행.

**재발 방지:**
- 세션/인증 초기화 코드는 명시적인 "로그아웃" 또는 "홈으로" 동작에서만 호출
- 로고, 헤더 등 자주 클릭되는 UI 요소에 세션 클리어 로직 절대 추가 금지
- 세션 관련 코드 수정 시 반드시 전체 플로우 테스트 (로그인→메뉴이동→새로고침)

---

## 3. file:// 프로토콜에서 localStorage가 페이지 간 공유 안 되는 문제

**증상:** 로컬(file://)에서 테스트 시 세션 정보가 페이지 이동마다 초기화됨. 매번 랜딩 페이지로 리다이렉트.

**원인:** `file://` 프로토콜에서는 각 HTML 파일이 **서로 다른 origin**으로 취급되어 localStorage가 공유되지 않음. `file:///C:/path/index.html`과 `file:///C:/path/company.html`이 별도 저장소 사용.

**해결:** `window.name`을 폴백 저장소로 사용하는 `_getItem()/_setItem()/_removeItem()` 래퍼 함수 구현. `window.name`은 같은 탭에서 페이지 이동 시 유지됨.

**재발 방지:**
- localStorage 직접 사용 대신 항상 `_getItem()/_setItem()` 래퍼 사용
- 새로운 저장 기능 추가 시 file:// 호환성 고려
- 가능하면 http://localhost나 배포 환경에서 테스트

---

## 4. Vercel 배포 하루 100회 제한 초과

**증상:** `npx vercel --prod` 실행 시 "You have exceeded the maximum number of deployments" 에러

**원인:** 잦은 수정→배포 반복으로 하루 100회 무료 배포 한도 소진

**해결:** GitHub Pages를 백업 배포 수단으로 활용. 별도 리포(SPIN-Selling)에 push하여 GitHub Pages로 서비스.

**재발 방지:**
- 작은 수정 여러 번 배포하지 말고 변경사항을 모아서 배포
- 개발 중에는 로컬 또는 GitHub Pages로 확인
- Vercel 배포는 최종 확인/릴리스 시에만 사용
- 배포 횟수 추적: 하루 50회 이상이면 경고

---

## 5. Supabase Edge Function 배포 시 한글/특수문자 깨짐

**증상:** Edge Function 코드에 한글 문자열이 포함되면 배포 후 실행 시 에러. Supabase 대시보드 에디터에서 편집 시 따옴표가 변환됨.

**원인:** Supabase 대시보드의 코드 에디터가 스마트 따옴표(`''` → `''`)로 자동 변환. 한글이 포함된 문자열이 인코딩 문제로 깨짐.

**해결:** Edge Function 코드를 ASCII 문자로만 작성. 한글은 문자열 결합(concatenation)으로 구성하거나 변수로 분리.

**재발 방지:**
- Edge Function 코드는 로컬에서 작성 후 CLI로 배포 (`supabase functions deploy`)
- Supabase 대시보드 에디터 사용 자제
- 한글/특수문자가 필요한 경우 별도 설정 테이블이나 환경변수로 관리

---

## 6. Supabase RLS(Row Level Security)로 DELETE 차단

**증상:** 교육 세션 삭제 시 "permission denied" 에러. DELETE 쿼리가 RLS 정책에 의해 차단됨.

**원인:** Supabase 테이블에 RLS가 활성화되어 있고, anon 키로는 DELETE 권한이 없는 정책 설정.

**해결:** DELETE 대신 PATCH로 `company_name`을 빈 문자열로 설정하는 **소프트 삭제** 방식 채택.

**재발 방지:**
- Supabase anon 키 사용 시 DELETE/INSERT 권한 제한을 항상 고려
- 소프트 삭제 패턴 유지 (실제 레코드 삭제 대신 필드 값 초기화)
- RLS 정책 변경이 필요하면 Supabase 대시보드에서 명시적으로 설정

---

## 7. spin_members 슬롯 제한 (0~3) 초과 에러

**증상:** 팀당 7명 입력 시 4번째 이후 멤버 생성 실패. "new row violates check constraint" 에러.

**원인:** `spin_members` 테이블에 `slot` 컬럼의 CHECK 제약조건이 `0~3`으로 설정되어 있어 4번 이상 슬롯 사용 불가.

**해결:** Supabase SQL Editor에서 CHECK 제약조건을 `0~6`으로 변경하여 팀당 최대 7명 지원.

```sql
ALTER TABLE spin_members DROP CONSTRAINT spin_members_slot_check;
ALTER TABLE spin_members ADD CONSTRAINT spin_members_slot_check CHECK (slot >= 0 AND slot <= 6);
```

**재발 방지:**
- DB 스키마 변경 시 관련 제약조건 확인
- 팀 인원수 변경이 필요하면 DB 제약조건과 프론트엔드 코드 동시에 수정

---

## 8. Git 리포에 다른 프로젝트 파일이 섞여 올라가는 문제

**증상:** GitHub 리포에 SPIN Selling 파일뿐 아니라 다른 프로젝트(K-AI 출판허브 등) 파일이 함께 push됨.

**원인:** Git 루트 디렉토리가 `C:\01 클로드코드` (상위 폴더)이고, SPIN 파일은 `50-13 스핀셀링/` 하위 폴더에 있음. `git push` 시 Git 루트 기준으로 전체 파일이 업로드됨.

**해결:** 임시 디렉토리(`/tmp/spin-clean`)에 SPIN 파일만 복사하여 별도 Git 리포로 초기화 후 push. 클린 리포 유지.

**재발 방지:**
- SPIN 전용 리포에 push할 때는 항상 클린 디렉토리(`/tmp/spin-clean`) 경유
- 또는 SPIN 프로젝트를 독립 Git 리포로 분리 (서브디렉토리가 아닌 독립 루트)
- push 후 GitHub에서 파일 목록 확인하여 오염 여부 점검

---

## 9. 로고 파일 누락 (logo-kornferry.png)

**증상:** 모든 페이지에서 로고가 깨진 이미지로 표시됨.

**원인:** 파일명이 `로고-콘페리.png`(한글)로 변경되었으나, HTML에서는 `logo-kornferry.png`(영문)를 참조. 파일명 불일치.

**해결:** `로고-콘페리.png`를 `logo-kornferry.png`로 복사하여 두 파일 모두 유지.

**재발 방지:**
- 이미지/정적 파일명은 영문 소문자 + 하이픈 규칙 유지
- 파일명 변경 시 참조하는 모든 HTML/CSS/JS 파일 동시 수정
- `Grep`으로 파일명 참조 위치 확인 후 변경

---

## 10. admin.html 리프레시 시 비밀번호 재입력 요구

**증상:** admin.html에서 비밀번호 입력 후 진입했는데, 새로고침하면 다시 비밀번호를 물어봄.

**원인:** 페이지 로드 시 `prompt()`가 즉시 실행(IIFE)되는 구조. 인증 상태를 어디에도 저장하지 않음.

**해결:** `sessionStorage`에 인증 플래그(`admin_auth`)를 저장하여 같은 탭 세션 동안은 재인증 생략.

**재발 방지:**
- 비밀번호/인증 체크는 항상 세션 상태를 먼저 확인
- `sessionStorage`(탭 단위) 또는 `localStorage`(브라우저 단위)로 인증 상태 유지
- 매 로드마다 prompt 호출하는 패턴 지양

---

## 요약: 공통 재발 방지 원칙

| 원칙 | 설명 |
|------|------|
| **전역 변수 중복 금지** | common.js의 변수를 개별 HTML에서 재선언하지 않음 |
| **세션 초기화 최소화** | 세션 클리어는 명시적 로그아웃에서만 호출 |
| **래퍼 함수 사용** | localStorage 직접 호출 대신 `_getItem/_setItem` 사용 |
| **배포 횟수 관리** | 변경 모아서 배포, Vercel은 릴리스용 |
| **Edge Function은 ASCII** | 한글 포함 시 문자열 결합으로 우회 |
| **소프트 삭제 패턴** | DELETE 대신 PATCH로 필드 초기화 |
| **DB 제약조건 확인** | 스키마 변경 시 CHECK/UNIQUE 제약 동시 확인 |
| **클린 리포 push** | 서브디렉토리 프로젝트는 별도 클린 디렉토리 경유 |
| **파일명 영문 유지** | 정적 파일은 영문 소문자 + 하이픈 |
| **인증 상태 저장** | prompt 기반 인증 후 sessionStorage에 플래그 저장 |
