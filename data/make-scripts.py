# 대본 → data/scripts.js 변환기
# 사용법: python data/make-scripts.py   (영상을 videos.js에 추가한 뒤 다시 실행)
# _업로드완료 폴더의 롱폼/메타데이터/title.txt 를 videos.js 제목과 맞춰 찾고,
# 롱폼/대본/NN_장-문단.txt 파일을 장별로 묶어 저장합니다.
import json, os, re, sys

ROOT = r"C:\Users\kdy19\OneDrive\바탕 화면\경제\_업로드완료"
HERE = os.path.dirname(os.path.abspath(__file__))
sys.stdout.reconfigure(encoding="utf-8")

def norm(s):
    return re.sub(r"[^0-9가-힣A-Za-z]", "", s)

src = open(os.path.join(HERE, "videos.js"), encoding="utf-8").read()
videos = json.loads(src[src.index("[", src.index("VIDEOS")):src.rindex("]") + 1])

folders = {}
for d in os.listdir(ROOT):
    if d.startswith("_발행금지"):
        continue
    t = os.path.join(ROOT, d, "롱폼", "메타데이터", "title.txt")
    if os.path.isdir(os.path.join(ROOT, d, "롱폼", "대본")) and os.path.exists(t):
        folders[norm(open(t, encoding="utf-8").read())] = os.path.join(ROOT, d, "롱폼", "대본")

out, missing = {}, []
for v in videos:
    path = folders.get(norm(v["title"]))
    if not path:
        missing.append(v["title"])
        continue
    chapters = {}
    for f in sorted(os.listdir(path)):
        m = re.match(r"\d+_(\d+)-\d+\.txt$", f)
        if not m:
            continue
        text = open(os.path.join(path, f), encoding="utf-8").read().strip()
        if text:
            chapters.setdefault(int(m.group(1)), []).append(text)
    out[v["id"]] = [[n, chapters[n]] for n in sorted(chapters)]

with open(os.path.join(HERE, "scripts.js"), "w", encoding="utf-8", newline="\n") as f:
    f.write("/* 영상 대본 — data/make-scripts.py 로 만든 파일입니다 (직접 고치지 말고 다시 실행)\n")
    f.write("   SCRIPTS[영상 id] = [[장 번호, [문단, ...]], ...]  · 0장은 인트로 */\n")
    f.write("const SCRIPTS = " + json.dumps(out, ensure_ascii=False, indent=1) + ";\n")

print(f"대본 {len(out)}개 저장, 못 찾음 {len(missing)}개")
for t in missing:
    print(" -", t)
