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
  /* 썸네일만 보여줍니다 — 클릭해도 유튜브로 가지 않음 (영상은 아래 '유튜브에서 보기' 버튼으로) */
  const player = el('div','player');
  const img = el('img');
  img.src = 'https://i.ytimg.com/vi/' + v.id + '/maxresdefault.jpg'; img.alt = v.title + ' 썸네일';
  img.onerror = ()=>{ img.onerror = null; img.src = thumbUrl(v.id); };
  player.append(img);
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

/* 휴대폰 메뉴 버튼: 누르면 펼치고, 메뉴를 고르거나 Esc를 누르면 닫음 */
(function(){
  const head = document.querySelector('header.site'), btn = document.getElementById('menu-btn');
  if(!head || !btn) return;
  function setOpen(on){
    head.classList.toggle('open', on);
    btn.setAttribute('aria-expanded', on);
    btn.setAttribute('aria-label', on ? '메뉴 닫기' : '메뉴 열기');
  }
  btn.addEventListener('click', () => setOpen(!head.classList.contains('open')));
  document.querySelectorAll('nav.main a').forEach(a => a.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && head.classList.contains('open')) { setOpen(false); btn.focus(); } });
})();

/* 스크롤 등장 효과 — 섹션 제목·카드가 화면에 들어올 때 아래에서 살짝 떠오릅니다.
   '동작 줄이기'를 켠 기기에선 꺼지고, 페이지 스크립트가 카드를 다 그린 뒤(DOMContentLoaded) 대상을 찾습니다 */
document.addEventListener('DOMContentLoaded', function(){
  if(!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const groups = ['.sec .sec-head', '.about-art', '.about-grid > *', '.when', '.calc-pick', '.calc', '.post-grid > *', '.contact-box', '.subscribe'];
  const items = [];
  groups.forEach(sel => document.querySelectorAll(sel).forEach((n, i) => {
    if(n.getBoundingClientRect().top < innerHeight) return; // 처음부터 보이는 건 그대로 둠
    n.classList.add('rv');
    n.style.transitionDelay = (i % 3) * 80 + 'ms';           // 같은 줄 카드는 차례로
    items.push(n);
  }));
  const io = new IntersectionObserver(es => es.forEach(e => {
    if(!e.isIntersecting) return;
    const n = e.target;
    n.classList.add('in'); io.unobserve(n);
    // 다 떠오르면 효과용 클래스를 지워 카드 원래의 hover 전환(테두리·배경)으로 돌려놓음
    n.addEventListener('transitionend', function done(ev){
      if(ev.target !== n || ev.propertyName !== 'transform') return;
      n.classList.remove('rv', 'in'); n.style.transitionDelay = '';
      n.removeEventListener('transitionend', done);
    });
  }), { rootMargin:'0px 0px -10% 0px' });
  items.forEach(n => io.observe(n));
});

/* 메뉴 현재 위치 표시 — 메인 페이지에서 지금 보고 있는 구역의 메뉴를 밝게 (메뉴에 없는 구역이면 모두 끔) */
(function(){
  const links = [...document.querySelectorAll('nav.main a[href^="#"]')];
  if(!links.length) return;
  const secs = [...document.querySelectorAll('section[id]')];
  let ticking = false;
  function update(){
    ticking = false;
    const line = innerHeight * 0.4;                              // 화면 위에서 40% 지점을 지나는 구역
    let id = secs.length ? secs[0].id : '';
    secs.forEach(s => { if(s.getBoundingClientRect().top <= line) id = s.id; });
    if(innerHeight + scrollY >= document.documentElement.scrollHeight - 2) id = secs[secs.length - 1].id; // 맨 아래
    links.forEach(a => {
      const on = a.getAttribute('href') === '#' + id;
      a.classList.toggle('on', on);
      if(on) a.setAttribute('aria-current', 'location'); else a.removeAttribute('aria-current');
    });
  }
  addEventListener('scroll', () => { if(!ticking){ ticking = true; requestAnimationFrame(update); } }, { passive:true });
  addEventListener('resize', update);
  update();
})();

/* 업로드 요일 — 오늘 요일에 표시를 하고 '다음 새 영상' 안내를 붙입니다 (요일 칸의 .on을 그대로 읽음) */
(function(){
  const box = document.querySelector('.when .days');
  if(!box) return;
  const days = [...box.querySelectorAll('.day')];               // 월 ~ 일
  const today = (new Date().getDay() + 6) % 7;                   // 월=0 … 일=6
  if(!days[today]) return;
  days[today].classList.add('today');
  days[today].setAttribute('aria-label', days[today].textContent + ' (오늘)');
  let msg = '';
  if(days[today].classList.contains('on')) msg = '오늘은 새 영상이 올라오는 날이에요';
  else for(let k = 1; k < 7; k++){
    const d = days[(today + k) % 7];
    if(d.classList.contains('on')){ msg = '다음 새 영상: ' + d.textContent + '요일 · ' + (k === 1 ? '내일' : k + '일 뒤'); break; }
  }
  if(!msg) return;
  const p = el('p', 'next-up', msg);
  const where = box.parentElement.querySelector('div > p');
  (where ? where.parentElement : box.parentElement).append(p);
})();
