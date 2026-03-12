// ══════════════════════════════════════════════════════════════════
//  🤖 TELEGRAM BOT SETUP — Bay Vitealay
//
//  HOW TO SET UP IN 3 STEPS:
//
//  STEP 1 — Create your bot:
//    • Open Telegram → search "@BotFather"
//    • Send: /newbot
//    • Follow prompts → name it e.g. "Bay Vitealay Orders"
//    • BotFather will give you a token like: 7123456789:AAFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//    • Paste that token as TG_TOKEN below
//
//  STEP 2 — Get your Chat ID (where orders will be sent):
//    • Option A — Personal chat:
//        Search "@userinfobot" on Telegram → send /start
//        It replies with your numeric ID (e.g. 123456789)
//    • Option B — Group chat (recommended for shop staff):
//        Create a group → add your bot → send any message
//        Then open: https://api.telegram.org/bot<YOUR_TOKEN>/getUpdates
//        Look for "chat":{"id": -100xxxxxxxxxx}  (groups start with -100)
//    • Paste the numeric ID as TG_CHAT below
//
//  STEP 3 — Replace the placeholders below and save the file.
//
//  ✅ TEST: Place a test order → you should see a message in Telegram!
// ══════════════════════════════════════════════════════════════════
const TG_TOKEN = '8465802137:AAF1Dr2UxszUcAJwW8svSfxqC31zk_9v-As';   // e.g. '7123456789:AAFxxx...'
const TG_CHAT  = '885332511';     // e.g. '123456789' or '-1001234567890'
// ══════════════════════════════════════════════════════════════════

const MENU={
  rice:[
    {id:'r1',name:'Pork Rice',km:'បាយសាច់ជ្រូកអាំង​ + ពងទាខ',desc:'Jasmine rice with stir-fried pork, cucumber & soy sauce',price:3500,img:'images/special-bay.jpg',pop:true},
    {id:'r2',name:'Chicken Rice',km:'បាយមាន់ស្ងោរ',desc:'Steamed rice with poached chicken & ginger sauce',price:3500,img:'images/hainam.jpg',pop:true},
    // {id:'r3',name:'Beef Rice',km:'បាយសាច់គោ',desc:'Rice with braised beef & fresh herbs',price:4500,emoji:'🍚'},
    // {id:'r4',name:'Fried Egg Rice',km:'បាយពងទាចៀន',desc:'Rice with crispy fried duck egg & chilli sauce',price:3000,emoji:'🍳'},
    // {id:'r5',name:'Pork Belly Rice',km:'បាយសាច់ជ្រូកខ្លាញ់',desc:'Slow-cooked pork belly on jasmine rice',price:4000,emoji:'🍚'},
    // {id:'r6',name:'Mixed Pork Rice',km:'បាយសាច់ជ្រូកចម្រុះ',desc:'Combo of grilled, fried & boiled pork',price:5000,emoji:'🍚',pop:true},
    // {id:'r7',name:'Vegetable Rice',km:'បាយបន្លែ',desc:'Seasonal stir-fried vegetables over white rice',price:3000,emoji:'🥬'},
    // {id:'r8',name:'Spicy Pork Rice',km:'បាយសាច់ជ្រូកហឹរ',desc:'Pork stir-fried in Khmer spicy sauce with basil',price:4000,emoji:'🌶️'},
  ],
  noodle:[
    {id:'n1',name:'Pork Congee',km:'បបរសាច់ជ្រូក',desc:'Smooth rice porridge with pork, ginger & spring onion',price:3000,emoji:'🥣',pop:true},
    {id:'n2',name:'Chicken Congee',km:'បបរសាច់មាន់',desc:'Khmer congee with tender chicken & coriander',price:3000,emoji:'🥣'},
    {id:'n3',name:'Beef Noodle Soup',km:'គុយទាវសាច់គោ',desc:'Rice noodles in rich beef broth with beansprouts',price:4500,emoji:'🍜'},
    {id:'n4',name:'Pork Noodle Soup',km:'គុយទាវសាច់ជ្រូក',desc:'Clear broth noodle soup with pork meatballs',price:4000,emoji:'🍜'},
    {id:'n5',name:'Fried Noodles',km:'មីឆា',desc:'Wok-fried egg noodles with vegetables & pork',price:4000,emoji:'🍝'},
  ],
  drink:[
    {id:'d1',name:'Iced Coffee',km:'កាហ្វេទឹកកក',desc:'Strong Cambodian drip coffee over ice with condensed milk',price:2000,emoji:'☕',pop:true},
    {id:'d2',name:'Hot Coffee',km:'កាហ្វេក្ដៅ',desc:'Traditional Cambodian black coffee, freshly brewed',price:1500,emoji:'☕'},
    {id:'d3',name:'Iced Tea',km:'តែទឹកកក',desc:'Sweet iced tea with milk — Cambodian style',price:1500,emoji:'🍵'},
    {id:'d4',name:'Hot Tea',km:'តែក្ដៅ',desc:'Jasmine or green tea, served hot',price:1000,emoji:'🍵'},
    {id:'d5',name:'Fresh Lime Juice',km:'ទឹកក្រូចឆ្មារ',desc:'Freshly squeezed lime with sugar & salt',price:2000,emoji:'🍋'},
    {id:'d6',name:'Soy Milk',km:'ទឹកសណ្ដែក',desc:'Warm or cold house-made soy milk',price:1500,emoji:'🥛'},
  ],
  extra:[
    {id:'e1',name:'Fried Egg',km:'ពងទោចៀន',desc:'Sunny-side-up or scrambled',price:1000,emoji:'🍳'},
    {id:'e2',name:'Extra Rice',km:'បាយបន្ថែម',desc:'Extra scoop of steamed jasmine rice',price:500,emoji:'🍚'},
    {id:'e3',name:'Pickled Vegetables',km:'បន្លែទឹកខ្មេះ',desc:'Crunchy Cambodian pickles',price:1000,emoji:'🥒'},
    {id:'e4',name:'Fried Dough Stick',km:'នំខ្ញែ',desc:'Crispy dough sticks, great with congee',price:1000,emoji:'🥢'},
    {id:'e5',name:'Takeaway Bag',km:'ដាក់ថង់',desc:'Pack your order to take away',price:500,emoji:'🛍️'},
  ]
};
const SPICE=['Mild','Medium','Spicy 🌶️','Extra Spicy 🌶️🌶️'];
const ADDONS=['Extra Sauce','No MSG','Extra Herbs','Less Salt'];

let cart=[],curItem=null,dqn=1,dsel={};
let curStep=1,pickMode=null,payMode='cash',selTime='',selTimeLabel='',orderNum='';

/* ── MENU ── */
function renderMenu(){
  Object.entries(MENU).forEach(([cat,items])=>{
    document.getElementById('cat-'+cat).innerHTML=items.map(it=>`
      <div class="mcard" onclick="openDrawer('${it.id}','${cat}')">
        <div class="mcard-img ${cat}" style="position:relative">
            <img src="${it.img}" alt="${it.name}" >
            ${it.pop?'<div class="pop-tag">Popular</div>':''}
        </div>
        <div class="mcard-body">
          <h4>${it.name}</h4><div class="ckm">${it.km}</div>
          <p>${it.desc}</p>
          <div class="mcard-foot">
            <span class="mprice">${it.price.toLocaleString()}<span class="cur">៛</span></span>
            <button class="abtn" onclick="event.stopPropagation();openDrawer('${it.id}','${cat}')">+</button>
          </div>
        </div>
      </div>`).join('');
  });
}
function switchTab(cat){
  ['rice','noodle','drink','extra'].forEach((c,i)=>{
    document.querySelectorAll('.tab')[i].classList.toggle('active',c===cat);
    document.getElementById('cat-'+c).classList.toggle('active',c===cat);
  });
}

/* ── DRAWER ── */
function openDrawer(id,cat){
  const all=Object.values(MENU).flat();
  curItem=all.find(i=>i.id===id);
  dqn=1; dsel={spice:'Mild',addons:[]};
  document.getElementById('dkm').textContent=curItem.km;
  document.getElementById('dname').textContent=curItem.name;
  document.getElementById('dpr').textContent=curItem.price.toLocaleString()+' ៛';
  const noSpice=cat==='drink'||cat==='extra';
  document.getElementById('cgspice').style.display=noSpice?'none':'';
  if(!noSpice) renderPills('spicepills',SPICE,'spice',false);
  document.getElementById('cgadd').style.display=cat==='extra'?'none':'';
  if(cat!=='extra') renderPills('addpills',ADDONS,'addons',true);
  document.getElementById('dqn').textContent=dqn;
  updDTot();
  document.getElementById('dov').classList.add('open');
  document.body.style.overflow='hidden';
}
function renderPills(cid,opts,key,multi){
  document.getElementById(cid).innerHTML=opts.map(o=>{
    const sel=multi?dsel[key].includes(o):dsel[key]===o;
    return`<button class="pill${sel?' sel':''}" onclick="togPill(this,'${cid}','${key}',${multi},'${o.replace(/'/g,"\\'")}')">${o}</button>`;
  }).join('');
}
function togPill(btn,cid,key,multi,val){
  if(multi){btn.classList.toggle('sel');const a=dsel[key],i=a.indexOf(val);i>-1?a.splice(i,1):a.push(val);}
  else{document.querySelectorAll('#'+cid+' .pill').forEach(p=>p.classList.remove('sel'));btn.classList.add('sel');dsel[key]=val;}
  updDTot();
}
function dq(d){dqn=Math.max(1,dqn+d);document.getElementById('dqn').textContent=dqn;updDTot();}
function updDTot(){document.getElementById('dtot').textContent=(curItem.price*dqn).toLocaleString()+' ៛';}
function closeDrawer(){document.getElementById('dov').classList.remove('open');document.body.style.overflow='';}
function closeDOuter(e){if(e.target===document.getElementById('dov'))closeDrawer();}
function addToCart(){
  const opts=[];
  if(dsel.spice&&document.getElementById('cgspice').style.display!=='none')opts.push(dsel.spice);
  if(dsel.addons&&dsel.addons.length)opts.push(...dsel.addons);
  cart.push({id:curItem.id,name:curItem.name,km:curItem.km,img:curItem.img,price:curItem.price,qty:dqn,opts:opts.join(', ')});
  updCart();closeDrawer();toast(curItem.name+' Added!');
}

/* ── CART ── */
function openCart(){document.getElementById('cpanel').classList.add('open');document.body.style.overflow='hidden';}
function closeCart(){document.getElementById('cpanel').classList.remove('open');document.body.style.overflow='';}
function cartSub(){return cart.reduce((s,i)=>s+i.price*i.qty,0);}
function updCart(){
  const badge=document.getElementById('cbadge');
  badge.textContent=cart.reduce((s,i)=>s+i.qty,0);
  badge.classList.remove('pop');void badge.offsetWidth;badge.classList.add('pop');
  const body=document.getElementById('cbody');
  body.innerHTML=cart.length?cart.map((it,i)=>`
    <div class="citem">
      <div class="cico">
        <img src="${it.img}" alt="${it.name}">
    </div>
      <div>
        <div class="cname">${it.name}</div>
        <div class="copts">${it.km}${it.opts?' · '+it.opts:''}</div>
        <div class="cqrow">
          <button class="cqb" onclick="cq(${i},-1)">−</button>
          <span style="font-weight:800;font-size:.85rem">${it.qty}</span>
          <button class="cqb" onclick="cq(${i},1)">+</button>
          <button class="cdel" onclick="cdel(${i})">🗑</button>
        </div>
      </div>
      <div class="cprice">${(it.price*it.qty).toLocaleString()} ៛</div>
    </div>`).join(''):`<div class="cempty"><div class="ei">🍚</div><p style="font-weight:700">Empty</p><p style="font-size:.76rem;margin-top:.25rem;opacity:.65">Browse the menu!</p></div>`;
  const sub=cartSub();
  document.getElementById('ctotals').innerHTML=`
    <div class="cr"><span>Subtotal</span><span>${sub.toLocaleString()} ៛</span></div>
    <div class="cr total"><span>Total</span><span>${sub.toLocaleString()} ៛</span></div>`;
  document.getElementById('ckbtn').disabled=!cart.length;
}
function cq(i,d){cart[i].qty=Math.max(1,cart[i].qty+d);updCart();}
function cdel(i){cart.splice(i,1);updCart();}

/* ── TIME SLOTS ── */
function buildSlots(){
  const now=new Date();
  const nowMins=now.getHours()*60+now.getMinutes();
  const slots=[];
  for(let h=6;h<=11;h++)for(let m=0;m<60;m+=10){
    if(h===11&&m>30)break;
    const slotMins=h*60+m;
    const isPast=(nowMins>=6*60)&&(nowMins<12*60)&&(slotMins<nowMins+10);
    const label=(h>12?h-12:h)+':'+(m<10?'0'+m:m)+' '+(h<12?'AM':'PM');
    slots.push({label,na:isPast,key:`${h}:${m<10?'0'+m:m}`});
  }
  document.getElementById('tgrid').innerHTML=slots.map(s=>`
    <div class="tsl${s.na?' na':''}" data-key="${s.key}" data-label="${s.label}" onclick="selSlot(this)">${s.label}</div>`).join('');
}
function selSlot(el){
  selTime=el.dataset.key; selTimeLabel=el.dataset.label;
  document.querySelectorAll('.tsl').forEach(t=>t.classList.remove('sel'));
  el.classList.add('sel');
}

/* ── CHECKOUT ── */
function openCheckout(){
  if(!cart.length){toast('🍚 Add items first!');return;}
  curStep=1;closeCart();buildSlots();updSidebar();renderSteps();
  document.getElementById('mdo').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeCheckout(){document.getElementById('mdo').classList.remove('open');document.body.style.overflow='';}
function closeMOuter(e){if(e.target===document.getElementById('mdo'))closeCheckout();}

function renderSteps(){
  [1,2,3].forEach(n=>{
    const p=document.getElementById('pill'+n);
    p.classList.toggle('active',n===curStep);
    p.classList.toggle('done',n<curStep);
  });
  document.querySelectorAll('.spanel').forEach((p,i)=>p.classList.toggle('active',i+1===curStep));
  const lbls=['Step 1 of 3 — Contact & Arrival Time','Step 2 of 3 — Payment','Step 3 of 3 — Review & Confirm'];
  document.getElementById('steplbl').textContent=lbls[curStep-1];
  document.getElementById('btnback').style.visibility=curStep===1?'hidden':'visible';
  document.getElementById('btnlbl').textContent=curStep===3?'Place Order 🎉':'Continue →';
  const sub=cartSub();
  document.getElementById('foottot').textContent=sub?sub.toLocaleString()+' ៛ total':'';
  if(curStep===2)buildQR();
  if(curStep===3)buildReview();
}
function stepNext(){
  if(curStep===1&&!validateS1())return;
  if(curStep===3){placeOrder();return;}
  curStep++;renderSteps();
}
function stepBack(){if(curStep>1){curStep--;renderSteps();}}

function selPickup(mode,el){
  pickMode=mode;
  document.querySelectorAll('.pkcard').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
}
function selPay(mode,el){
  payMode=mode;
  document.querySelectorAll('.paycard').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  document.getElementById('cashmsg').style.display=mode==='cash'?'':'none';
  const qw=document.getElementById('qrwrap');
  if(mode==='qr'){qw.classList.add('show');buildQR();}
  else qw.classList.remove('show');
}

/* ── QR CODE ── */
function buildQR(){
  const amt=cartSub();
  document.getElementById('qramt').textContent=amt.toLocaleString()+' ៛';
  document.getElementById('qramt2').textContent=amt.toLocaleString()+' ៛';
  const canvas=document.getElementById('qrc');
  drawQR(canvas,`KHQR:BayVitealay:AMT=${amt}:KHR:Pursat:${Date.now()}`,148);
}
function drawQR(canvas,data,size){
  const ctx=canvas.getContext('2d');
  ctx.clearRect(0,0,size,size);
  const N=29;
  const m=genMatrix(data,N);
  const cell=Math.floor(size/N);
  const off=Math.floor((size-N*cell)/2);
  ctx.fillStyle='#ffffff';ctx.fillRect(0,0,size,size);
  ctx.fillStyle='#3A1000';
  for(let r=0;r<N;r++)for(let c=0;c<N;c++){
    if(m[r][c]){
      ctx.beginPath();
      if(typeof ctx.roundRect==='function'){
        ctx.roundRect(off+c*cell+.4,off+r*cell+.4,cell-.4,cell-.4,Math.max(1,cell*.18));
      } else {
        ctx.rect(off+c*cell+.4,off+r*cell+.4,cell-.4,cell-.4);
      }
      ctx.fill();
    }
  }
}
function genMatrix(str,N){
  const m=Array.from({length:N},()=>new Array(N).fill(0));
  function finder(r,c){
    for(let i=0;i<7;i++)for(let j=0;j<7;j++){
      const ring=Math.max(Math.abs(i-3),Math.abs(j-3));
      if(r+i<N&&c+j<N)m[r+i][c+j]=(ring!==1)?1:0;
    }
  }
  finder(0,0);finder(0,N-7);finder(N-7,0);
  for(let i=0;i<8;i++){
    if(i<N){m[7][i]=0;m[i][7]=0;}
    if(N-1-i>=0){m[7][N-1-i]=0;m[i][N-8]=0;m[N-8][i]=0;m[N-1-i][7]=0;}
  }
  for(let i=8;i<N-8;i++){m[6][i]=(i%2===0)?1:0;m[i][6]=(i%2===0)?1:0;}
  function align(r,c){for(let i=-2;i<=2;i++)for(let j=-2;j<=2;j++){if(r+i>=0&&r+i<N&&c+j>=0&&c+j<N){const rg=Math.max(Math.abs(i),Math.abs(j));m[r+i][c+j]=(rg!==1)?1:0;}}}
  align(N-7,N-7);
  const fixed=new Set();
  for(let r=0;r<N;r++)for(let c=0;c<N;c++){
    if(r<8&&c<8)fixed.add(r*N+c);
    if(r<8&&c>N-9)fixed.add(r*N+c);
    if(r>N-9&&c<8)fixed.add(r*N+c);
    if(r===6||c===6)fixed.add(r*N+c);
  }
  let h=0;for(let i=0;i<str.length;i++)h=(h*31+str.charCodeAt(i))>>>0;
  for(let r=0;r<N;r++)for(let c=0;c<N;c++){
    if(!fixed.has(r*N+c)){h=((h*1664525)+1013904223)>>>0;m[r][c]=h&1;}
  }
  return m;
}

/* ── SIDEBAR ── */
function updSidebar(){
  const sub=cartSub();
  document.getElementById('sditems').innerHTML=cart.map(i=>`
    <div class="sdi">
      <span class="sdico">
        <img src="${i.img}" alt="${i.name}">
      </span>
      <div><div class="sdname">${i.qty}× ${i.name}</div><div class="sdopt">${i.opts||''}</div></div>
      <span class="sdprice">${(i.price*i.qty).toLocaleString()} ៛</span>
    </div>`).join('');
  document.getElementById('sdtotals').innerHTML=`
    <div class="sdrow"><span>Subtotal</span><span>${sub.toLocaleString()} ៛</span></div>
    <div class="sdrow total"><span>Total</span><span>${sub.toLocaleString()} ៛</span></div>`;
}

/* ── VALIDATION ── */
function validateS1(){
  let ok=true;
  ['name','phone'].forEach(k=>{
    const fg=document.getElementById('fg-'+k),f=document.getElementById('f-'+k);
    if(!f.value.trim()){fg.classList.add('err');ok=false;}else fg.classList.remove('err');
  });
  if(!pickMode){toast('Please choose Dine In or Pick Up 🏪');return false;}
  if(!selTime){toast('Please pick your arrival time ⏰');return false;}
  if(!ok)toast('Please enter your name and phone');
  return ok;
}

/* ── REVIEW ── */
function buildReview(){
  document.getElementById('rv-items').innerHTML=cart.map(i=>`
    <div class="rvitem">
      <div class="rviico"><img src="${i.img}" alt="${i.name}" class="rv-img"></div>
      <div style="flex:1"><div class="rviname">${i.qty}× ${i.name} <span style="color:var(--muted);font-size:.7rem;font-weight:600">${i.km}</span></div><div class="rviopt">${i.opts||'No notes'}</div></div>
      <div style="font-weight:900;color:var(--saffron);font-size:.84rem">${(i.price*i.qty).toLocaleString()} ៛</div>
    </div>`).join('');
  const pm = pickMode === 'dinein'
  ? '<img src="images/dine-in.png" alt="Dine In" class="pm-icon"> Dine In'
  : '<img src="images/takeaway.png" alt="Pick Up" class="pm-icon"> Pick Up';

  const pay=payMode==='cash'?'💵 Cash on arrival':'📱 ABA / KHQR (scanning QR)';
  const notes=document.getElementById('f-notes').value||'—';
  document.getElementById('rv-details').innerHTML=`
    <div class="rvrow"><span class="rl">Name</span><span style="font-weight:800">${document.getElementById('f-name').value}</span></div>
    <div class="rvrow"><span class="rl">Phone</span><span>${document.getElementById('f-phone').value}</span></div>
    <div class="rvrow"><span class="rl">Type</span><span>${pm}</span></div>
    <div class="rvrow"><span class="rl">Arrival Time</span><span style="font-weight:900;color:var(--saffron);font-size:.95rem">${selTimeLabel}</span></div>
    <div class="rvrow"><span class="rl">Payment</span><span>${pay}</span></div>
    <div class="rvrow"><span class="rl">Notes</span><span>${notes}</span></div>`;
  const sub=cartSub();
  document.getElementById('rv-totals').innerHTML=`
    <div class="rvtrow"><span>Subtotal</span><span>${sub.toLocaleString()} ៛</span></div>
    <div class="rvtrow grand"><span>Total to Pay</span><span>${sub.toLocaleString()} ៛</span></div>`;
}

/* ══════════════════════════════════════════════════════════════════
   TELEGRAM — Send order notification to seller
   Format is designed to be clear and actionable on mobile.
══════════════════════════════════════════════════════════════════ */
async function sendToTelegram(o){
  if(TG_TOKEN==='YOUR_BOT_TOKEN_HERE'||TG_CHAT==='YOUR_CHAT_ID_HERE'){
    console.warn('⚠️ Telegram not configured. Replace TG_TOKEN and TG_CHAT at the top of the script.');
    return {ok:false};
  }

  const riel = '\u17DB'; // ៛ symbol
  const KHR = n => n.toLocaleString() + ' ' + riel;

  // Payment section — different message for cash vs QR
  const paySection = o.payMode === 'qr'
    ? [
        `💳 *Payment: ABA / KHQR*`,
        `✅ *Customer scanned QR — CHECK your ABA app to confirm ${KHR(o.total)} was received before preparing!*`
      ].join('\n')
    : [
        `💵 *Payment: Cash on arrival*`,
        `⚠️ Collect *${KHR(o.total)}* when customer arrives`
      ].join('\n');

  // Item lines — each on its own line with emoji, quantity, name, Khmer, options, price
  const itemLines = o.items.map(i => {
    const opts = i.opts ? ` _(${i.opts})_` : '';
    return `  ${i.name} *${i.qty}×* ${i.name} / ${i.km}${opts}\n     → ${KHR(i.price * i.qty)}`;
  }).join('\n');

  // Special notes
  const notesLine = (o.notes && o.notes !== '—')
    ? `\n📝 *Notes:* _${o.notes}_`
    : '';

  // Type icon
  const typeIcon = o.pickMode === 'dinein' ? '🪑 Dine In' : '🎒 Pick Up / Take Away';

  const msg = [
    `🍚🔔 *NEW ORDER — ${o.num}*`,
    `━━━━━━━━━━━━━━━━━━━━`,
    ``,
    `👤 *Name:* ${o.name}`,
    `📞 *Phone/TG:* ${o.phone}`,
    `⏰ *Arrive at:* *${o.arrivalTime}*  ← START COOKING NOW`,
    `🏪 *Type:* ${typeIcon}`,
    ``,
    paySection + notesLine,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `🍽️ *ORDER ITEMS:*`,
    ``,
    itemLines,
    ``,
    `━━━━━━━━━━━━━━━━━━━━`,
    `💰 *TOTAL: ${KHR(o.total)}*`,
    `📅 Ordered: ${o.date}`,
    `🆔 Ref: ${o.num}`,
    `━━━━━━━━━━━━━━━━━━━━`,
    o.payMode === 'qr'
      ? `📲 *Open ABA app → check payments → confirm ${KHR(o.total)} received ✅*`
      : `🤝 *Ready at ${o.arrivalTime} — collect ${KHR(o.total)} cash*`
  ].join('\n');

  try {
    const r = await fetch(`https://api.telegram.org/bot${TG_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        chat_id: TG_CHAT,
        text: msg,
        parse_mode: 'Markdown'
      })
    });
    return await r.json();
  } catch(e) {
    console.error('Telegram send failed:', e);
    return {ok: false};
  }
}

/* ── PLACE ORDER ── */
async function placeOrder(){
  const btn=document.getElementById('btnnext');
  document.getElementById('btnlbl').innerHTML='<div class="spinner"></div>';
  btn.disabled=true;

  orderNum='BV-'+Math.random().toString(36).slice(2,6).toUpperCase();
  const now=new Date();
  const orderData={
    num: orderNum,
    name: document.getElementById('f-name').value,
    phone: document.getElementById('f-phone').value,
    pickMode, arrivalTime: selTimeLabel, payMode,
    notes: document.getElementById('f-notes').value||'—',
    items: cart,
    total: cartSub(),
    date: now.toLocaleDateString('en-US',{weekday:'short',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'})
  };

  const [tgRes] = await Promise.all([
    sendToTelegram(orderData),
    new Promise(r=>setTimeout(r,1600))
  ]);

  if(tgRes && tgRes.ok){
    console.log('✅ Telegram notification sent, message_id:', tgRes.result && tgRes.result.message_id);
  } else if(tgRes && !tgRes.ok){
    console.warn('⚠️ Telegram notification not sent. Check TG_TOKEN and TG_CHAT configuration.');
  }

  // Always show the success screen regardless of Telegram status
  showCard();
  btn.disabled=false;
}

/* ── SUCCESS CARD ── */
function showCard(){
  const sub=cartSub();
  const name=document.getElementById('f-name').value;
  const phone=document.getElementById('f-phone').value;
  const notes=document.getElementById('f-notes').value||'—';
  const pm = pickMode === 'dinein'
  ? '<img src="images/dine-in.png" alt="Dine In" class="pm-icon"> Dine In'
  : '<img src="images/takeaway.png" alt="Pick Up" class="pm-icon"> Pick Up';

  const pay=payMode==='cash'?'💵 Cash on arrival':'📱 ABA / KHQR';
  const now=new Date();
  const date=now.toLocaleDateString('en-US',{weekday:'short',day:'numeric',month:'short',year:'numeric'});

  document.getElementById('flow').style.display='none';
  document.getElementById('mdfoot').style.display='none';
  document.getElementById('md').style.height='min(96vh,820px)';

  const ss=document.getElementById('ss');
  ss.classList.add('show');
  ss.innerHTML=`
    <div class="oc" id="oc">
      <div class="oc-hd">
        <div><h2>🍚 Order Confirmed!</h2><p>បាយវិទ្យាល័យ · Bay Vitealay · Pursat City</p></div>
        <div class="oc-num"><span class="nl">Order #</span>${orderNum}</div>
      </div>
      <div class="oc-eta"><div class="etadot"></div>Preparing your food — ready at <strong style="margin-left:.35rem;font-size:.9rem">${selTimeLabel}</strong></div>
      <div class="oc-sec">
        <div class="oc-stitle">⏰ Arrival & Contact</div>
        <div class="ocrow"><span class="ol">Name</span><span class="or">${name}</span></div>
        <div class="ocrow"><span class="ol">Phone</span><span class="or">${phone}</span></div>
        <div class="ocrow"><span class="ol">Arrive at</span><span class="or" style="color:var(--saffron);font-size:1.05rem">${selTimeLabel}</span></div>
        <div class="ocrow"><span class="ol">Type</span><span class="or">${pm}</span></div>
        <div class="ocrow"><span class="ol">Payment</span><span class="or">${pay}</span></div>
        ${notes!=='—'?`<div class="ocrow"><span class="ol">Notes</span><span class="or">${notes}</span></div>`:''}
        <div class="ocrow"><span class="ol">Date</span><span class="or">${date}</span></div>
      </div>
      <div class="oc-sec">
        <div class="oc-stitle">🍚 Items Ordered</div>
        ${cart.map(i=>`
          <div class="ocitem">
            <span class="ocitem-ico">${i.name}</span>
            <div style="flex:1"><div class="ocitem-name">${i.qty}× ${i.name}</div><div class="ocitem-opt">${i.km}${i.opts?' · '+i.opts:''}</div></div>
            <span class="ocitem-price">${(i.price*i.qty).toLocaleString()} ៛</span>
          </div>`).join('')}
        <div class="ocrow grand" style="margin-top:.5rem">
          <span class="ol">Total to Pay</span>
          <span class="or" style="color:var(--saffron);font-size:1.1rem">${sub.toLocaleString()} ៛</span>
        </div>
      </div>
      <div class="oc-sec" style="background:rgba(224,123,26,.06)">
        <div class="oc-stitle">📌 What to Do Next</div>
        <div style="font-size:.8rem;color:var(--muted);line-height:1.9">
          ✅ Your order is confirmed and being prepared<br>
          ⏰ Arrive at <strong style="color:var(--deep)">${selTimeLabel}</strong> — food will be hot and ready<br>
          ${pickMode==='pickup'?'<img src="images/takeaway.png" alt="Pick Up" class="pm-icon">  Your packed order will be waiting at the counter':'🪑 Find a seat — we will bring it to you'}<br>
          ${payMode==='cash'?'💵 Please bring <strong style="color:var(--deep)">'+sub.toLocaleString()+' ៛</strong> in cash':'📱 Payment via ABA confirmed — show this screen if asked'}
        </div>
      </div>
    </div>

    <div class="ocactions">
      <button class="actbtn p" onclick="shareOrder()">📤 Share Order</button>
      <button class="actbtn s" onclick="saveOrder()">💾 Save / Print</button>
      <button class="actbtn o" onclick="newOrder()">+ New Order</button>
    </div>
    <div class="shint">💡 Share this order with a friend who is picking it up for you — they'll have all the details!</div>`;
}

/* ── SHARE ── */
function shareOrder(){
  const sub=cartSub();
  const name=document.getElementById('f-name').value;
  const pm=pickMode==='dinein'?'Dine In':'Pick Up';
  const pay=payMode==='cash'?'Cash':'ABA/KHQR';
  const items=cart.map(i=>`  • ${i.qty}× ${i.name} (${i.km}) — ${(i.price*i.qty).toLocaleString()} ៛`).join('\n');
  const txt=`🍚 Bay Vitealay Order — ${orderNum}
━━━━━━━━━━━━━━━━━━
👤 Name: ${name}
⏰ Arrive at: ${selTimeLabel}
🏪 Type: ${pm}
💳 Payment: ${pay}

📋 Items:
${items}

💰 Total: ${sub.toLocaleString()} ៛
━━━━━━━━━━━━━━━━━━
📍 Bay Vitealay, Pursat City
🕕 Open 6:00 AM – 12:00 PM`;
  if(navigator.share){
    navigator.share({title:'Bay Vitealay Order #'+orderNum,text:txt}).catch(()=>{});
  } else {
    navigator.clipboard.writeText(txt).then(()=>toast('📋 Copied to clipboard!'));
  }
}

/* ── SAVE / PRINT ── */
function saveOrder(){
  const sub = cartSub();
  const name = document.getElementById('f-name').value;
  const phone = document.getElementById('f-phone').value;
  const notes = document.getElementById('f-notes').value || '—';
  const pm = pickMode === 'dinein' ? '🪑 Dine In' : '🎒 Pick Up';
  const pay = payMode === 'cash' ? '💵 Cash on arrival' : '📱 ABA / KHQR';
  const now = new Date();
  const date = now.toLocaleDateString('en-US', {weekday:'short',day:'numeric',month:'short',year:'numeric',hour:'2-digit',minute:'2-digit'});

  const itemRows = cart.map(i => `
    <div class="ocitem">
      <span class="ocitem-ico">${i.name}</span>
      <div style="flex:1">
        <div class="ocitem-name">${i.qty}× ${i.name}</div>
        <div class="ocitem-opt">${i.km}${i.opts ? ' · ' + i.opts : ''}</div>
      </div>
      <span class="ocitem-price">${(i.price * i.qty).toLocaleString()} ៛</span>
    </div>`).join('');

  const printHTML = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order ${orderNum} — Bay Vitealay</title>
  <link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;700&family=Nunito:wght@400;600;700;800&display=swap" rel="stylesheet">
  <style>
    * { margin:0; padding:0; box-sizing:border-box; }
    body { font-family:'Nunito',sans-serif; background:#FDF5E6; padding:20px; max-width:540px; margin:0 auto; }
    .oc { background:#fff; border-radius:20px; overflow:hidden; border:1.5px solid #E8D0A8; box-shadow:0 4px 20px rgba(75,30,0,.12); }
    .oc-hd { background:linear-gradient(135deg,#6B2500,#E07B1A); color:#fff; padding:1.2rem 1.4rem; display:flex; justify-content:space-between; align-items:center; }
    .oc-hd h2 { font-family:'Lora',serif; font-size:1.15rem; margin-bottom:.18rem; }
    .oc-hd p { font-size:.72rem; opacity:.8; }
    .oc-num { background:rgba(255,255,255,.22); border:1px solid rgba(255,255,255,.3); padding:.38rem .85rem; border-radius:8px; font-size:.78rem; font-weight:800; text-align:center; }
    .nl { font-size:.58rem; opacity:.75; letter-spacing:.08em; text-transform:uppercase; display:block; }
    .oc-eta { display:flex; align-items:center; justify-content:center; gap:.6rem; background:#FAF0D7; padding:.65rem 1.3rem; font-size:.8rem; font-weight:800; color:#4A1800; }
    .etadot { width:8px; height:8px; border-radius:50%; background:#E07B1A; flex-shrink:0; }
    .oc-sec { padding:.85rem 1.3rem; border-bottom:1px solid #E8D0A8; }
    .oc-sec:last-child { border:none; }
    .oc-stitle { font-size:.62rem; font-weight:900; letter-spacing:.12em; text-transform:uppercase; color:#E07B1A; margin-bottom:.55rem; }
    .ocrow { display:flex; justify-content:space-between; font-size:.8rem; padding:.18rem 0; }
    .ocrow .ol { color:#8B6040; font-weight:600; }
    .ocrow .or { font-weight:800; color:#2A1000; }
    .ocrow.grand { font-size:.95rem; font-weight:900; border-top:1.5px solid #E8D0A8; padding-top:.45rem; margin-top:.28rem; }
    .ocrow.grand .or { color:#E07B1A; font-size:1.05rem; }
    .ocitem { display:flex; align-items:center; gap:.55rem; padding:.28rem 0; }
    .ocitem-ico { font-size:1.2rem; }
    .ocitem-name { font-weight:800; font-size:.8rem; color:#4A1800; }
    .ocitem-opt { font-size:.65rem; color:#aaa; }
    .ocitem-price { font-weight:900; color:#E07B1A; font-size:.8rem; margin-left:auto; white-space:nowrap; }
    .next-steps { font-size:.78rem; color:#8B6040; line-height:1.85; background:rgba(224,123,26,.06); padding:.85rem 1.3rem; border-top:1px solid #E8D0A8; }
    .footer-note { text-align:center; margin-top:14px; font-size:.72rem; color:#8B6040; opacity:.75; }
    @media print {
      body { background:#fff; padding:10px; }
      .oc { box-shadow:none; }
      .print-btn { display:none; }
    }
  </style>
</head>
<body>
  <div class="oc">
    <div class="oc-hd">
      <div>
        <h2>🍚 Order Confirmed!</h2>
        <p>បាយវិទ្យាល័យ · Bay Vitealay · Pursat City</p>
      </div>
      <div class="oc-num">
        <span class="nl">Order #</span>
        ${orderNum}
      </div>
    </div>
    <div class="oc-eta">
      <div class="etadot"></div>
      Food will be ready at <strong style="margin-left:.3rem">${selTimeLabel}</strong>
    </div>
    <div class="oc-sec">
      <div class="oc-stitle">⏰ Arrival & Contact</div>
      <div class="ocrow"><span class="ol">Name</span><span class="or">${name}</span></div>
      <div class="ocrow"><span class="ol">Phone</span><span class="or">${phone}</span></div>
      <div class="ocrow"><span class="ol">Arrive at</span><span class="or" style="color:#E07B1A;font-size:.9rem">${selTimeLabel}</span></div>
      <div class="ocrow"><span class="ol">Type</span><span class="or">${pm}</span></div>
      <div class="ocrow"><span class="ol">Payment</span><span class="or">${pay}</span></div>
      ${notes !== '—' ? `<div class="ocrow"><span class="ol">Notes</span><span class="or">${notes}</span></div>` : ''}
      <div class="ocrow"><span class="ol">Date</span><span class="or">${date}</span></div>
    </div>
    <div class="oc-sec">
      <div class="oc-stitle">🍚 Items Ordered</div>
      ${itemRows}
      <div class="ocrow grand" style="margin-top:.5rem">
        <span class="ol">Total to Pay</span>
        <span class="or">${sub.toLocaleString()} ៛</span>
      </div>
    </div>
    <div class="next-steps">
      <div class="oc-stitle" style="color:#E07B1A;font-size:.62rem;font-weight:900;letter-spacing:.12em;text-transform:uppercase;margin-bottom:.5rem">📌 What to Do Next</div>
      ✅ Order confirmed and being prepared<br>
      ⏰ Arrive at <strong style="color:#4A1800">${selTimeLabel}</strong> — food will be hot and ready<br>
      ${pickMode === 'pickup' ? '🎒 Packed order will be ready at the counter' : '🪑 Find a seat — food brought to your table'}<br>
      ${payMode === 'cash' ? '💵 Bring <strong>' + sub.toLocaleString() + ' ៛</strong> in cash' : '📱 ABA payment — show this screen if asked'}
    </div>
  </div>
  <p class="footer-note">📍 Bay Vitealay, Pursat City &nbsp;·&nbsp; Open 6:00 AM – 12:00 PM daily</p>
  <p style="text-align:center;margin-top:8px">
    <button class="print-btn" onclick="window.print()" style="background:#6B2500;color:#fff;border:none;padding:.6rem 1.4rem;border-radius:8px;font-family:'Nunito',sans-serif;font-size:.85rem;font-weight:800;cursor:pointer;">🖨️ Print / Save as PDF</button>
  </p>
  <script>
    // Auto-trigger print dialog after fonts load
    document.fonts.ready.then(() => {
      setTimeout(() => { window.print(); }, 400);
    });
  <\/script>
</body>
</html>`;

  const w = window.open('', '_blank');
  if(!w){
    toast('⚠️ Please allow popups to save/print!');
    return;
  }
  w.document.write(printHTML);
  w.document.close();
  toast('🖨️ Print window opened — Save as PDF!');
}

/* ── NEW ORDER ── */
function newOrder(){
  cart=[];pickMode=null;payMode='cash';selTime='';selTimeLabel='';orderNum='';curStep=1;
  document.getElementById('ss').innerHTML='';
  document.getElementById('ss').classList.remove('show');
  document.getElementById('flow').style.display='';
  document.getElementById('mdfoot').style.display='';
  document.getElementById('md').style.height='';
  document.querySelectorAll('.pkcard').forEach(c=>c.classList.remove('sel'));
  document.getElementById('f-name').value='';
  document.getElementById('f-phone').value='';
  document.getElementById('f-notes').value='';
  // Reset payment to cash
  payMode='cash';
  document.getElementById('pc-cash').classList.add('sel');
  document.getElementById('pc-qr').classList.remove('sel');
  document.getElementById('cashmsg').style.display='';
  document.getElementById('qrwrap').classList.remove('show');
  updCart();
  closeCheckout();
  toast('👋 Start a new order!');
}

/* ── TOAST & NAV ── */
function toast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'),2600);
}
window.addEventListener('scroll',()=>{
  document.getElementById('nav').classList.toggle('scrolled',window.scrollY>40);
});
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t)t.scrollIntoView({behavior:'smooth'});
  });
});

renderMenu();
updCart();