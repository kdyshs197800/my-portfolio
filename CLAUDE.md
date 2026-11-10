# CLAUDE.md

## 프로젝트

바이브코딩 수업용 개인 포트폴리오 사이트. 스타일 4종(A~D) 중 하나를 골라 최종 사이트로 완성하는 단계입니다.

## 파일 구조

- `index.html` — 최종 사이트 메인 (히어로 · 이자 계산기 · About · 최근 콘텐츠 · Contact)
- `contents.html`(콘텐츠 목록), `detail.html?v=영상ID`(글 상세), `login.html`(운영자 로그인) — 모두 `site.css` · `site.js` 공유
- `site.css` — 색·글자·간격 등 공통 스타일 (색 변수 `--gold` · `--gold-text` · `--gold-line`)
- `data/videos.js`(영상 목록), `data/scripts.js`(영상 대본) — 새 영상은 `videos.js` 맨 위에 추가
- `my-style-guide.md` — 디자인 규칙 1순위 문서
- `img/` — 사진·일러스트 (`ticker-hero.svg` 메인 캐릭터, `svg-candidates/` 아이콘)

수업 단계 자료 (참고용):

- `templates-index.html` — 스타일 4종 비교 허브 (여기서 먼저 골라볼 것)
- `style-a-minimal.html`, `style-b-colorful.html`, `style-c-grid.html`, `style-d-dark.html` — 스타일 4종 각각의 메인 화면
- `img/` — 4개 스타일이 공유하는 사진 폴더 (`visual.jpg`, `profile.jpg`, `project-1.jpg`, `project-2.jpg`, `project-3.jpg`)
- `style-a-minimal.md`, `style-b-colorful.md`, `style-c-grid.md`, `style-d-dark.md` — 스타일별 색상·폰트·레이아웃 규칙 문서 (수정 전 반드시 확인)
- `design-style.md` — 체크리스트, 수정해야 할 항목 정리, 스타일별 문서 링크

## 규칙

- 4개 스타일 파일은 전부 같은 `img/` 폴더를 상대경로(`img/파일명`)로 참조합니다. 사진을 바꿀 때는 이 폴더 안 파일을 같은 이름으로 덮어쓰면 4개 스타일에 동시 반영됩니다.
- 폰트는 Pretendard만 사용합니다.
- 한글 줄바꿈 시 단어 중간이 잘리지 않도록 `word-break: keep-all`을 유지합니다.
- 반응형(모바일) 확인 완료 (2026-11-10, 390·360px). 화면을 바꾸면 휴대폰 폭에서 다시 확인합니다.
- 글자·UI 명도 대비는 WCAG AA(본문 4.5 : 1, 큰 글자·테두리 3 : 1)를 지킵니다.

## 디자인 방향
- 최종 방향: **네이비 다크 + 노랑 포인트** (2026-10-16 네이비 다크 확정, 크림톤 배경은 쓰지 않음)
- 포인트 색: 네이비 모드 `#FCEF00` (유튜브 썸네일 "금 · 11만 원" 글자색, 2026-11-10 변경) / 화이트 모드는 채우기 `#FCEF00` 그대로, 글자 `#736800`, 테두리 `#8F8500` (노랑 그대로는 흰 바탕 1.2 : 1)
  - 변경 이력: `#F2A20C` 앰버 → `#D4AF37` 메탈릭 골드 → `#FCEF00` 노랑
- 1순위 기준 문서: `my-style-guide.md` (색상·글꼴·글자 크기·모서리·간격·그림자 규칙) — 실제 값은 `site.css`
- 실제 기준 화면: `index.html` (+ `contents.html`, `detail.html`, `login.html`이 같은 `site.css`를 공유). `home.html`은 2026-11-10 `index.html`로 통합되어 없음
- 레이아웃 참고: style-c-grid.html / design-style.md (C. 그리드의 카드·벤토 배치) — 단, 색·모서리·그림자 값이 `my-style-guide.md`와 다르면 `my-style-guide.md`를 따름
- 처음 이 스타일을 고른 이유: "네이비와 골드 포인트가 차분하면서도 고급스러운 인상을 줘서"
- 포인트를 노랑으로 바꾼 이유: 유튜브 채널 썸네일과 같은 색으로 맞춰 채널과 사이트를 한눈에 이어지게 하려고

## 지켜야 할 것
- 모서리는 두 가지만: 카드·박스 18px(`--r-card`), 버튼·칩·태그 999px(`--r-pill`)
- 간격은 8단위, 글자 크기는 12·13·14·16·18·20·24·32px (0.5px 단위 금지)
- 그림자 없이 1px 테두리로 구분, 채운 포인트색(노랑) 버튼은 한 화면에 1개
- 색은 `site.css`의 변수(`--gold` 채우기, `--gold-text` 글자, `--gold-line` 테두리)로만 지정 — HEX를 직접 쓰지 않음 (화이트 모드 자동 전환 때문)
- 섹션 제목 위에는 항상 포인트색 영문 라벨(`.eyebrow`)을 붙임
- 그리드 카드 배치는 `grid-column: span N`만 사용 (시작 위치 고정 `1 / span N` 금지)

## 다음 작업

- 사이트는 GitHub Pages로 공개 중: https://kdyshs197800.github.io/my-portfolio/ (`main`에 푸시하면 1~2분 뒤 반영)
- 정리 후보: 예전 시안 파일(`시안_숫자중심.html`, `홈페이지-1·2.html` 등)
- `design-style.md`에는 체크리스트가 없음(스타일 C 설명만 있음) — 남은 할 일은 이 목록에 적습니다.
