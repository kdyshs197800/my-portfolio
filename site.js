/* 티커 사이트 공통 스크립트 — data/videos.js 다음에 불러옵니다 */
function fmtDate(d){ return d.replace(/-/g,'.'); }
function fmtLen(sec){ return Math.floor(sec/60) + ':' + String(sec%60).padStart(2,'0'); }
function thumbUrl(id){ return 'https://i.ytimg.com/vi/' + id + '/mqdefault.jpg'; }
function watchUrl(id, t){ return 'https://www.youtube.com/watch?v=' + id + (t ? '&t=' + t + 's' : ''); }

/* 유튜브 구독 안내 — 모든 콘텐츠 상세 페이지에 공통으로 붙습니다. 문구를 바꾸려면 여기만 고치면 됩니다 */
const CHANNEL_URL = 'https://www.youtube.com/@리빙팡팡';
const SUBSCRIBE_TEXT = "금값·세금·대출처럼 내 통장에 바로 닿는 숫자, 티커가 매주 직접 계산해 드립니다. 다음 계산도 놓치지 않으려면 유튜브에서 '리빙팡팡, 티커의 경제학'을 구독하고 알림을 켜 두세요.";
function subscribeBox(){
  const box = el('section','subscribe');
  const text = el('div');
  text.append(el('div','eyebrow','SUBSCRIBE'), el('p',null,SUBSCRIBE_TEXT));
  const btn = el('a','btn btn-line','유튜브 구독하기 ↗');
  btn.href = CHANNEL_URL + '?sub_confirmation=1'; btn.target = '_blank'; btn.rel = 'noopener';
  box.append(text, btn);
  return box;
}

function el(tag, cls, text){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(text != null) e.textContent = text;
  return e;
}

/* 콘텐츠 카드 한 장 */
function postCard(v){
  const a = el('a','post');
  a.href = 'detail.html?v=' + encodeURIComponent(v.id);

  const thumb = el('div','thumb');
  const img = el('img');
  img.src = thumbUrl(v.id); img.alt = ''; img.loading = 'lazy';
  thumb.append(img);

  const body = el('div','body');
  const meta = el('div','meta');
  const time = el('time',null,fmtDate(v.date));
  time.dateTime = v.date;
  meta.append(el('span','cat',CATS[v.cat].label), time);
  body.append(meta, el('h3',null,v.title), el('span','more','자세히 보기 →'));

  a.append(thumb, body);
  return a;
}

/* 유튜브 플레이어 — 썸네일을 누르면 재생. 파일을 직접 연 경우(file://)엔 유튜브가 재생을 막아 새 탭으로 엽니다 */
function videoPlayer(v){
  const player = el('button','player');
  player.type = 'button';
  player.setAttribute('aria-label','영상 재생');
  const img = el('img');
  img.src = 'https://i.ytimg.com/vi/' + v.id + '/maxresdefault.jpg'; img.alt = '';
  img.onerror = ()=>{ img.onerror = null; img.src = thumbUrl(v.id); };
  player.append(img, el('span','play','▶'));
  player.addEventListener('click', ()=>{
    if(!location.protocol.startsWith('http')){ window.open(watchUrl(v.id),'_blank','noopener'); return; }
    const f = el('iframe');
    f.src = 'https://www.youtube.com/embed/' + v.id + '?autoplay=1';
    f.title = v.title;
    f.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    f.allowFullscreen = true;
    const box = el('div','player');
    box.style.cursor = 'default';
    box.append(f);
    player.replaceWith(box);
  });
  return player;
}

/* 네이비 ↔ 흰 바탕 토글 — 헤더의 #theme-toggle 버튼. 고른 모드는 localStorage에 저장해 모든 페이지에 이어집니다 */
(function(){
  const btn = document.getElementById('theme-toggle');
  if(!btn) return;
  function setTheme(light){
    if(light) document.documentElement.dataset.theme = 'light';
    else delete document.documentElement.dataset.theme;
    btn.setAttribute('aria-checked', light);
    try{ localStorage.setItem('theme', light ? 'light' : 'navy'); }catch(e){}
  }
  setTheme(document.documentElement.dataset.theme === 'light');
  btn.addEventListener('click', ()=> setTheme(document.documentElement.dataset.theme !== 'light'));
})();
