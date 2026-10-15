const $=s=>document.querySelector(s),KEY='pbilab_v1';
const DEF={les:{},cas:{},quiz:{},att:0,bm:{},last:null,conf:{},iv:{},daily:{}};
let S;try{S={...DEF,...JSON.parse(localStorage.getItem(KEY))}}catch(e){S={...DEF}}
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const KW='CALCULATE|SUMX|SUM|DIVIDE|RELATED|DATEADD|VAR|RETURN|FILTER|REMOVEFILTERS|CALENDAR|DATE|DISTINCTCOUNT|COUNTROWS|IF|SWITCH|BLANK|SELECTEDVALUE|SAMEPERIODLASTYEAR|MONTH|let|in|each';
const hl=s=>esc(s).replace(new RegExp(`(//[^\\n]*)|("[^"]*")|\\b(${KW})\\b|(\\b\\d+\\.?\\d*\\b)`,'g'),(m,c,q,k,n)=>c?`<span class="c">${c}</span>`:q?`<span class="s">${q}</span>`:k?`<span class="k">${k}</span>`:`<span class="n">${n}</span>`);
const CP=[],code=s=>`<div class="sql"><button class="sec" data-cp="${CP.push(s)-1}">Copy</button><pre>${hl(s)}</pre></div>`;
const tab=t=>`<div class="tw"><table><thead><tr>${t.cols.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${t.rows.map(r=>`<tr>${r.map(x=>`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
document.addEventListener('click',e=>{const i=e.target.dataset.cp;if(i===undefined)return;const t=CP[i],b=e.target,o=b.textContent;const done=()=>{b.textContent='Copied!';setTimeout(()=>b.textContent=o,1200)};
 if(navigator.clipboard)navigator.clipboard.writeText(t).then(done,()=>b.textContent='Copy नहीं हुआ');else{const a=document.createElement('textarea');a.value=t;document.body.append(a);a.select();try{document.execCommand('copy');done()}catch(x){}a.remove()}});
const ld=()=>Object.keys(S.les).length,td=()=>new Date().toLocaleDateString('en-CA');
function view(h){const[,r,a]=h.split('/');CP.length=0;const m=$('#main');
 document.querySelectorAll('nav a').forEach(x=>x.classList.toggle('on',x.getAttribute('href')==='#/'+r));
 if(r==='les')return a&&L.find(x=>x.id==a)?lesson(L.find(x=>x.id==a),m):lessons(m);
 const f={case:casePage,daily,ref,iv,data,prog,about}[r];f?f(m):home(m)}
function home(m){const pc=Math.round(ld()/L.length*100),nx=L.find(l=>!S.les[l.id]),ls=S.last&&L.find(l=>l.id==S.last);
 m.innerHTML=`<h1>Power BI Daily Lab</h1><p class="mu">Real business problems से Business Intelligence सीखें। Hindi explanation Devanagari में, technical terms English में। असली practice Power BI Desktop में करनी है, यह site आपका guide है।</p>
 <div class="cards"><div class="card"><b>${pc}%</b>Course complete (${ld()}/${L.length} lessons)</div><div class="card"><b>${Object.keys(S.cas).length}/1</b>Cases complete</div><div class="card"><b>${Object.keys(S.bm).length}</b>Bookmarks</div><div class="card"><b>${Object.keys(S.daily).length}</b>Daily challenges solved</div></div>${bar(pc)}
 ${ls?`<p><a class="btn" href="#/les/${ls.id}">सीखना जारी रखें: ${ls.t}</a></p>`:nx?`<p><a class="btn" href="#/les/${nx.id}">शुरू करें: ${nx.t}</a></p>`:''}
 <h2>Learning Roadmap (17 stages)</h2>${ROAD.map((r,i)=>{const ls=r[3].map(id=>L.find(l=>l.id===id)),av=ls.length?'Lessons: '+ls.map(l=>`<a href="#/les/${l.id}">${l.t}</a>`).join(', '):(AV[i+1]||'इस build में उपलब्ध नहीं।');return `<div class="item"><b>${i+1}. ${r[0]}</b><br>${r[1]}${r[2]?` <span class="mu">| इसके बाद: ${r[2]}</span>`:''}<br><span class="mu">${av}</span></div>`}).join('')}`}
const bar=p=>`<div class="bar"><i style="width:${p}%"></i></div>`;
function lessons(m){m.innerHTML=`<h1>Concept Academy</h1><p class="mu">${L.length} lessons उपलब्ध हैं। एक lesson में एक ही concept।</p>`+L.map(l=>`<div class="item ${S.les[l.id]?'done':''}"><span class="tag">${l.lv}</span><br><b><a href="#/les/${l.id}">${l.id}. ${l.t}</a></b>${S.bm[l.id]?' ★':''}${S.les[l.id]?' <span class="ok">✓</span>':''}</div>`).join('')}
function lesson(l,m){S.last=l.id;save();const li=a=>`<ul>${a.map(x=>`<li>${x}</li>`).join('')}</ul>`;
 m.innerHTML=`<h1>${l.t}</h1><span class="tag">${l.lv}</span> <button class="sec" id="bm">${S.bm[l.id]?'★ Bookmarked':'☆ Bookmark'}</button>
 <h2>यह क्या है?</h2><p>${l.mean}</p><h2>Business में क्यों जरूरी है</h2><p>${l.why}</p><p><b>कब use करें:</b> ${l.when}<br><b>कब नहीं:</b> ${l.not}</p>
 <h2>Power BI Desktop में steps</h2><ol>${l.steps.map(x=>`<li>${x}</li>`).join('')}</ol>
 ${l.code?`<h2>${l.lang} code</h2>${code(l.code)}`:''}${l.out?`<h2>Expected output</h2>${tab(l.out)}`:''}
 <details><summary>Line by line explanation</summary>${li(l.lines)}</details><h2>Common mistakes</h2>${li(l.mist)}<h2>Troubleshooting</h2>${li(l.tr)}
 <h2>Knowledge check</h2><p>${l.q.q}</p>${l.q.o.map((o,i)=>`<label><input type="radio" name="qz" value="${i}"> ${o}</label><br>`).join('')}<p><button id="qb">Check</button> <span id="qr"></span></p>
 <h2>Independent practice</h2><p>${l.prac}</p><h2>सारांश</h2><p>${l.sum}</p>${l.case?`<p><a class="btn" href="#/case/1">Related business case</a></p>`:''}
 <h2>Confidence और completion</h2><p>आप कितने confident हैं? <select id="cf"><option value="">चुनें</option>${[1,2,3,4,5].map(i=>`<option ${S.conf[l.id]==i?'selected':''}>${i}</option>`)}</select> <button id="dn">${S.les[l.id]?'Completed (undo)':'Complete करें'}</button></p>`;
 $('#bm').onclick=()=>{S.bm[l.id]?delete S.bm[l.id]:S.bm[l.id]=1;save();lesson(l,m)};$('#cf').onchange=e=>{S.conf[l.id]=e.target.value;save()};
 $('#dn').onclick=()=>{S.les[l.id]?delete S.les[l.id]:S.les[l.id]=1;save();lesson(l,m)};
 $('#qb').onclick=()=>{const s=document.querySelector('input[name=qz]:checked');if(!s){$('#qr').innerHTML='<span class="no">पहले option चुनें</span>';return}const ok=+s.value===l.q.a;S.quiz[l.id]=ok;S.att++;save();$('#qr').innerHTML=ok?'<span class="ok">सही!</span>':'<span class="no">गलत, summary दोबारा पढ़ें।</span>'}}
function casePage(m){const c=CASE;
 m.innerHTML=`<h1>${c.t}</h1><p class="mu">यह 1 पूरा case है। बाकी cases इस build में नहीं हैं।</p>`+c.steps.map((s,i)=>`<details ${i<3?'open':''}><summary>Step ${i+1}: ${s[0]}</summary><p>${s[1]}</p>${i===5?code(`${M.ts}\n${M.tc}\n${M.pf}\n${M.mg}`)+'<p><b>Category के हिसाब से output:</b></p>'+tab(catT)+'<p><b>कुल:</b></p>'+tab(totT):''}${i===9?`<details><summary>Hint</summary>${c.hint}</details><details><summary>Solution दिखाएं</summary>${tab(c.sol)}</details>`:''}</details>`).join('')+`<p><button id="cd">${S.cas[1]?'Completed (undo)':'Case complete करें'}</button></p>`;
 $('#cd').onclick=()=>{S.cas[1]?delete S.cas[1]:S.cas[1]=1;save();casePage(m)}}
function daily(m){const n=Math.floor((new Date()-new Date(new Date().getFullYear(),0,0))/864e5)%4;
 const Q=[['फरवरी 2026 का Total Sales कितना है?',mon[1],.5],['सभी महीनों का कुल Profit कितना है?',TP,.5],['East region का Total Sales कितना है?',regRows[2][1],.5],['Electronics category की Margin % कितनी है? (1 decimal)',catRows[0][3],.06]][n];
 m.innerHTML=`<h1>Daily BI Challenge</h1><div class="card"><p>Sample Data page वाले data पर आधारित। Power BI Desktop (या Excel) में निकालकर यहां लिखें:</p><p><b>${Q[0]}</b></p><input id="da" aria-label="Answer"> <button id="db">Check</button> <span id="dr"></span>${S.daily[td()]?'<p class="ok">आज का challenge हो चुका है।</p>':''}<p><button class="sec" id="dh">Answer दिखाएं</button> <span id="ds"></span></p></div>`;
 $('#db').onclick=()=>{const v=parseFloat($('#da').value.replace(/[^0-9.\-]/g,''));if(isNaN(v)){$('#dr').innerHTML='<span class="no">Number लिखें</span>';return}const ok=Math.abs(v-Q[1])<=Q[2];$('#dr').innerHTML=ok?'<span class="ok">सही!</span>':'<span class="no">सही नहीं, फिर कोशिश करें</span>';if(ok){S.daily[td()]=1;save()}};
 $('#dh').onclick=()=>$('#ds').textContent='Answer: '+Q[1]}
function ref(m){m.innerHTML=`<h1>DAX Reference</h1><input id="rq" placeholder="Function खोजें" aria-label="Search"><div id="rl"></div><h2>Dashboard Design Library</h2>${DSG.map(d=>`<div class="item"><b>${d[0]}</b><br>कब: ${d[1]}<br><span class="mu">नियम: ${d[2]}</span></div>`).join('')}<h2>Glossary</h2>${GL.map(g=>`<div class="item"><b>${g[0]}</b>: ${g[1]}</div>`).join('')}`;
 const d=()=>{const q=$('#rq').value.toLowerCase();$('#rl').innerHTML=DAXR.filter(r=>r.join(' ').toLowerCase().includes(q)).map(r=>`<div class="card"><b>${r[0]}</b><br>Syntax:${code(r[1])}Example:${code(r[2])}<span class="mu">आम गलती: ${r[3]}</span></div>`).join('')||'<p>कुछ नहीं मिला।</p>'};d();$('#rq').oninput=d}
let I={i:0,show:false};
function iv(m){const q=IVQ[I.i],n=IVQ.length,res=S.iv;
 m.innerHTML=`<h1>Interview Prep</h1><p class="mu">${n} questions। पहले खुद जवाब सोचें, answer छुपा है।</p><div class="card"><span class="tag">${q.lv}</span><span class="tag">${q.sk}</span> <span class="mu">Question ${I.i+1}/${n}</span><p><b>${q.q}</b></p><button class="sec" id="sa">${I.show?'Answer छुपाएं':'Answer दिखाएं'}</button>${I.show?`<div class="panel"><b>सोचने का तरीका:</b> ${q.re}<br><b>Answer:</b> ${q.a}<br><b>आम गलती:</b> ${q.mi}<br><b>Follow-up:</b> ${q.fu}</div><p><button id="ok">सही था</button> <button class="sec" id="no">फिर से practice</button></p>`:''}</div>
 <p><button class="sec" id="pv">पिछला</button> <button class="sec" id="nx">अगला</button></p><p>सही ${Object.values(res).filter(x=>x==='ok').length}, practice बाकी ${Object.values(res).filter(x=>x==='again').length}, attempt नहीं ${n-Object.keys(res).length}</p>`;
 $('#sa').onclick=()=>{I.show=!I.show;iv(m)};if(I.show){$('#ok').onclick=()=>{res[I.i]='ok';save();iv(m)};$('#no').onclick=()=>{res[I.i]='again';save();iv(m)}}
 $('#pv').onclick=()=>{I.i=(I.i+n-1)%n;I.show=false;iv(m)};$('#nx').onclick=()=>{I.i=(I.i+1)%n;I.show=false;iv(m)}}
function data(m){m.innerHTML=`<h1>Sample Data</h1><p>Practice के लिए data यहीं से copy करें: <b>Copy</b> दबाएं, Excel में paste करें, फिर Power BI Desktop में Get Data → Excel से load करें। Date table आप खुद DAX से बनाएंगे (Lesson 8)।</p><div class="panel">Data fictional है।</div>`+Object.keys(CSV).map(k=>{const rows=CSV[k].split('\n').map(r=>r.split(','));return `<h2>${k} (${rows.length-1} rows)</h2>${code(CSV[k]).replace('<pre>','<pre style="max-height:200px">')}${tab({cols:rows[0],rows:rows.slice(1,6)})}<p class="mu">ऊपर पहली 5 rows। Copy में सारी rows हैं।</p>`}).join('')}
function prog(m){const cf=Object.keys(S.conf).filter(k=>S.conf[k]),nq=Object.values(S.quiz).filter(Boolean).length;
 m.innerHTML=`<h1>Progress</h1><div class="cards"><div class="card"><b>${ld()}/${L.length}</b>Lessons</div><div class="card"><b>${Object.keys(S.cas).length}/1</b>Cases</div><div class="card"><b>${nq}</b>Quizzes सही</div><div class="card"><b>${S.att}</b>Quiz attempts</div></div><h2>Confidence</h2>${cf.length?cf.map(k=>`<p>${L.find(l=>l.id==k).t}: ${S.conf[k]}/5</p>`).join(''):'<p class="mu">अभी कोई rating नहीं।</p>'}<h2>Bookmarks</h2>${Object.keys(S.bm).length?Object.keys(S.bm).map(k=>`<p><a href="#/les/${k}">${L.find(l=>l.id==k).t}</a></p>`).join(''):'<p class="mu">कोई bookmark नहीं।</p>'}
 <p class="mu">Progress सिर्फ इसी browser में save होता है (LocalStorage), दूसरे device पर sync नहीं होता।</p><button class="sec" id="rs">Progress reset करें</button>`;
 $('#rs').onclick=()=>{if(confirm('सारा progress delete करें?')){S={...DEF,les:{},cas:{},quiz:{},bm:{},conf:{},iv:{},daily:{}};save();prog(m)}}}
function about(m){m.innerHTML=`<h1>About</h1><p>यह site Power BI Desktop का replacement नहीं है। यहां सीखें, फिर Power BI Desktop में खुद बनाएं।</p><p>इस build की सीमाएं: 9 lessons, 1 पूरा case, 8 interview questions, कोई portfolio project नहीं। DAX और M code Power BI Desktop में चलाकर नहीं देखे गए, सिर्फ sample data के outputs अलग से calculate करके match किए गए हैं। Desktop features और licensing बदलते रहते हैं, इसलिए official Microsoft documentation भी देखें।</p>`}
addEventListener('hashchange',()=>{view(location.hash);$('#main').focus()});view(location.hash||'#/home');
