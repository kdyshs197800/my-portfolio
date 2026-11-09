# CLAUDE.md

## 프로젝트

바이브코딩 수업용 개인 포트폴리오 사이트. 스타일 4종(A~D) 중 하나를 골라 최종 사이트로 완성하는 단계입니다.

## 파일 구조

- `templates-index.html` — 스타일 4종 비교 허브 (여기서 먼저 골라볼 것)
- `style-a-minimal.html`, `style-b-colorful.html`, `style-c-grid.html`, `style-d-dark.html` — 스타일 4종 각각의 메인 화면
- `img/` — 4개 스타일이 공유하는 사진 폴더 (`visual.jpg`, `profile.jpg`, `project-1.jpg`, `project-2.jpg`, `project-3.jpg`)
- `style-a-minimal.md`, `style-b-colorful.md`, `style-c-grid.md`, `style-d-dark.md` — 스타일별 색상·폰트·레이아웃 규칙 문서 (수정 전 반드시 확인)
- `design-style.md` — 체크리스트, 수정해야 할 항목 정리, 스타일별 문서 링크

## 규칙

- 4개 스타일 파일은 전부 같은 `img/` 폴더를 상대경로(`img/파일명`)로 참조합니다. 사진을 바꿀 때는 이 폴더 안 파일을 같은 이름으로 덮어쓰면 4개 스타일에 동시 반영됩니다.
- 폰트는 Pretendard만 사용합니다.
- 한글 줄바꿈 시 단어 중간이 잘리지 않도록 `word-break: keep-all`을 유지합니다.
- 아직 반응형(모바일) 확인 전입니다 — `design-style.md`의 체크리스트 참고.

## 디자인 방향
- 최종 방향: **네이비 다크 + 골드 포인트** (2026-10-16 확정, 크림톤 배경은 쓰지 않음)
- 1순위 기준 문서: `my-style-guide.md` (색상·글꼴·글자 크기·모서리·간격·그림자 규칙) — 실제 값은 `site.css`
- 실제 기준 화면: `home.html` (+ `contents.html`, `detail.html`이 같은 `site.css`를 공유)
- 레이아웃 참고: style-c-grid.html / design-style.md (C. 그리드의 카드·벤토 배치) — 단, 색·모서리·그림자 값이 `my-style-guide.md`와 다르면 `my-style-guide.md`를 따름
- 이 스타일을 고른 이유: "네이비와 골드 포인트가 차분하면서도 고급스러운 인상을 줘서"

## 지켜야 할 것
- 모서리는 두 가지만: 카드·박스 18px(`--r-card`), 버튼·칩·태그 999px(`--r-pill`)
- 간격은 8단위, 글자 크기는 12·13·14·16·18·20·24·32px (0.5px 단위 금지)
- 그림자 없이 1px 테두리로 구분, 채운 골드 버튼은 한 화면에 1개
- 섹션 제목 위에는 항상 골드 영문 라벨(`.eyebrow`)을 붙임
- 그리드 카드 배치는 `grid-column: span N`만 사용 (시작 위치 고정 `1 / span N` 금지)

## 다음 작업

`design-style.md`의 "아직 체크 안 된 것"과 "내용 중 사용자가 직접 바꿔야 할 것" 항목부터 진행합니다.
