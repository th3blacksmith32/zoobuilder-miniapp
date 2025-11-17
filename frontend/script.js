
// Simple gamey UI logic for the demo
const TG = window.Telegram && window.Telegram.WebApp ? window.Telegram.WebApp : null;

const state = {
  coins:500, gems:10, visitors:12, level:3, rating:1.2, keepers:2, zooox:0,
  enclosures: []
};

function seedEnclosures(){
  const animals = ['🐰','🐧','🦁','🐼','🐒','🦓','🦍','🐯','🐸'];
  for(let i=0;i<9;i++){
    state.enclosures.push({
      id:i, animal: animals[i%animals.length], timeLeft: Math.floor(Math.random()*40)+5, incomePerMin: Math.floor(Math.random()*30)+5, locked: false, unlockCost: (i>5?1200:0)
    });
  }
}

function renderGrid(){
  const grid = document.getElementById('grid');
  grid.innerHTML='';
  state.enclosures.forEach(enc => {
    const el = document.createElement('div');
    el.className='enclosure';
    if(enc.locked && enc.unlockCost>0){
      el.innerHTML=`<div class="unlock">🔒 Unlock for ${enc.unlockCost}c</div>`;
    }
    el.innerHTML += `<div class="animal">${enc.animal}</div>
      <div class="meta"><div><b>${enc.animal} Enclosure</b><div class="small">Income/min: ${enc.incomePerMin}</div></div>
      <div class="timer" id="t_${enc.id}">${formatTime(enc.timeLeft)}</div></div>`;
    el.onclick = ()=> openEnclosure(enc.id);
    grid.appendChild(el);
  });
}

function formatTime(s){
  if(s<=0) return 'Ready';
  const m = Math.floor(s/60); const ss = s%60;
  if(m>0) return `${m}m ${ss}s`;
  return `${s}s`;
}

function tick(){
  state.enclosures.forEach(enc=>{
    if(enc.timeLeft>0) enc.timeLeft -= 1;
    const t = document.getElementById('t_'+enc.id);
    if(t) t.innerText = formatTime(enc.timeLeft);
  });
  // accrued auto add (simple)
  document.getElementById('coins').innerText = Math.floor(state.coins);
  document.getElementById('gems').innerText = state.gems;
  document.getElementById('visitors').innerText = state.visitors;
  document.getElementById('level').innerText = state.level;
  document.getElementById('rating').innerText = state.rating+'x';
  document.getElementById('keepers').innerText = state.keepers;
  document.getElementById('wallet').innerText = state.zooox + ' ZOOX';
}
setInterval(tick,1000);

function openEnclosure(id){
  const enc = state.enclosures.find(e=>e.id===id);
  if(!enc) return;
  const action = prompt(`Enclosure ${id} - options: collect / speed / upgrade / buy`,'collect');
  if(!action) return;
  if(action==='collect'){
    const earned = Math.floor(enc.incomePerMin * (Math.random()*2+0.5));
    state.coins += earned;
    alert(`Collected ${earned} coins from enclosure ${id}`);
  } else if(action==='speed'){
    if(state.gems>=2){ state.gems-=2; enc.timeLeft = Math.max(0, enc.timeLeft-30); alert('Speed used!'); } else alert('Need 2 gems');
  } else if(action==='upgrade'){
    if(state.coins>=200){ state.coins-=200; enc.incomePerMin = Math.round(enc.incomePerMin*1.6); alert('Upgraded!'); } else alert('Need 200 coins');
  } else if(action==='buy'){
    if(state.coins>=100 && !enc.locked){ state.coins-=100; alert('Bought animal'); } else alert('Cannot buy');
  }
  renderGrid();
}

function collectAll(){ // collect ready ones
  let total=0;
  state.enclosures.forEach(enc=>{
    if(enc.timeLeft<=0){ const e = Math.floor(enc.incomePerMin * (Math.random()*2+0.5)); total+=e; enc.timeLeft = Math.floor(Math.random()*50)+30; }
  });
  if(total>0){ state.coins += total; alert('Collected total '+total+' coins'); } else alert('Nothing ready to collect!');
  renderGrid();
}

function boost(){ if(state.gems>=5){ state.gems-=5; state.rating+=0.2; alert('Boost active!'); } else alert('Need 5 gems'); }
function openShop(){ alert('Open shop (mock)'); }
function openZoo(){ alert('Open zoo view (mock)'); }
function openAnimals(){ alert('Open animals manager (mock)'); }
function openUpgrades(){ alert('Open upgrades (mock)'); }
function openWallet(){ alert('Open wallet (mock)'); }
function claimDaily(){ alert('Daily claimed: 50 coins'); state.coins+=50; }
seedEnclosures();
renderGrid();

// Telegram integration (MainButton)
function initTelegram(){
  if(!TG){ document.getElementById('tg-info').innerText = 'Not inside Telegram - testing in browser'; return; }
  try{
    TG.expand();
    TG.MainButton.setText('Send summary to bot');
    TG.MainButton.show();
    TG.onEvent('mainButtonClicked', function(){
      const payload = {coins:state.coins,gems:state.gems,action:'summary'};
      TG.sendData(JSON.stringify(payload));
    });
  }catch(e){console.warn(e);}
}
window.addEventListener('load', initTelegram);
