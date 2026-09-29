const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
function toast(m){let t=$('.toast')||document.body.appendChild(Object.assign(document.createElement('div'),{className:'toast'}));t.textContent=m;t.classList.add('on');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('on'),2600)}
document.addEventListener('click',e=>{const b=e.target.closest('.btn');if(!b)return;const r=b.getBoundingClientRect(),s=Math.max(r.width,r.height),p=document.createElement('span');p.className='ripple';p.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-r.left-s/2}px;top:${e.clientY-r.top-s/2}px`;b.appendChild(p);setTimeout(()=>p.remove(),650)});
function count(el,to,pre='',suf=''){let c=0;const st=Math.max(1,Math.ceil(to/50));(function f(){c=Math.min(to,c+st);el.textContent=pre+c.toLocaleString('en-IN')+suf;if(c<to)requestAnimationFrame(f)})()}
function animate(v){$$('.view.on>*',document).forEach((el,i)=>el.style.setProperty('--i',i));
 $$('[data-c]',v).forEach(e=>count(e,+e.dataset.c,e.dataset.p||'',e.dataset.s||''));
 $$('.prog i',v).forEach(i=>{i.style.width='0';requestAnimationFrame(()=>setTimeout(()=>i.style.width=i.dataset.w+'%',60))});
 $$('.bars div',v).forEach((b,i)=>{b.style.height='0';setTimeout(()=>b.style.height=b.dataset.h+'%',100+i*80)})}
function go(id){$$('.view').forEach(v=>v.classList.toggle('on',v.id===id));$$('.nb').forEach(n=>n.classList.toggle('on',n.dataset.go===id));
 $('.top h2').textContent=$(`.nb[data-go=${id}]`).textContent.trim();$('.side').classList.remove('on');$('.scrim').classList.remove('on');scrollTo({top:0,behavior:'smooth'});animate($('#'+id))}
function ring(p){$('.ring .fg').style.strokeDashoffset=326*(1-p/100);$('.ringw b').textContent=Math.round(p)+'%'}
function download(name,txt){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type:'text/plain'}));a.download=name;a.click();toast('Downloaded '+name)}
const IC={ov:"M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z",don:"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z",cam:"M4 22V4M4 4h13l-2 4 2 4H4",rec:"M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6M8 13h8M8 17h5",pro:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z",sh:"M3 6h18v15H3zM16 2v4M8 2v4M3 10h18",tk:"M9 11l3 3 9-9M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9",hr:"M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 6v6l4 2",ce:"M12 15a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM8.2 13.9L7 23l5-3 5 3-1.2-9.1",imp:"M18 20V10M12 20V4M6 20v-6",sup:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",tm:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",trn:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5",bell:"M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0",q:"M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM21 21l-4.3-4.3"};
const svg=k=>`<svg viewBox="0 0 24 24"><path d="${IC[k]}"/></svg>`;
function polish(u){$$('.nb').forEach(n=>{n.innerHTML=svg(n.dataset.go)+'<span>'+n.textContent.replace(/^\S+\s/,'')+'</span>'});
 const ib=$('.ib'),em=$('em',ib);ib.innerHTML=svg('bell');if(em)ib.append(em);
 const sb=document.createElement('div');sb.className='sb';sb.innerHTML=svg('q')+'<input placeholder="Search…">';$('.top h2').after(sb);
 sb.querySelector('input').onkeydown=e=>{if(e.key==='Enter'){const t=e.target.value.toLowerCase(),m=$$('.nb').find(n=>n.textContent.toLowerCase().includes(t));m?go(m.dataset.go):toast('No section found')}};
 const av=document.createElement('div');av.className='av';av.textContent=u.name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();ib.after(av);
 $$('.drop p').forEach(p=>p.textContent=p.textContent.replace(/^\P{L}+/u,''));
 $$('.view>h1').forEach(h=>h.innerHTML=h.innerHTML.replace(/\s*\p{Extended_Pictographic}/gu,''));
 $$('.stat').forEach((s,i)=>{const t=(document.body.dataset.tr||'').split(',')[i%4];if(t){const e=document.createElement('em');e.className='tr';e.textContent='▲ '+t;s.append(e)}})}
function init(role){const u=JSON.parse(localStorage.getItem('stk_user')||'null');if(!u||u.role!==role){location.replace('login.html');return}
 polish(u);$$('[data-name]').forEach(e=>e.textContent=u.name);
 $$('.nb').forEach(n=>n.onclick=()=>go(n.dataset.go));$$('[data-go]:not(.nb)').forEach(n=>n.onclick=()=>go(n.dataset.go));
 $('.ham').onclick=()=>{$('.side').classList.add('on');$('.scrim').classList.add('on')};$('.scrim').onclick=()=>{$('.side').classList.remove('on');$('.scrim').classList.remove('on')};
 $('.ib').onclick=e=>{e.stopPropagation();$('.drop').classList.toggle('on');const em=$('.ib em');if(em)em.remove()};document.addEventListener('click',()=>$('.drop').classList.remove('on'));
 $$('[data-open]').forEach(b=>b.onclick=()=>$('#'+b.dataset.open).classList.add('on'));
 $$('.modal').forEach(m=>m.onclick=e=>{if(e.target===m||e.target.closest('[data-close]'))m.classList.remove('on')});
 $$('[data-logout]').forEach(b=>b.onclick=()=>{localStorage.removeItem('stk_user');location.href='login.html'});
 $$('[data-toast]').forEach(b=>b.onclick=()=>toast(b.dataset.toast));
 const f=document.createElement('div');f.className='foot';f.innerHTML='<span>© 2026 Stackly Community Development NGO · Reg. No. IN/NGO/2014/0192</span><span><a href="contact.html">Help</a><a href="index.html">Privacy</a><a href="contact.html">Contact</a></span>';$('.main').append(f);
 addEventListener('scroll',()=>$('.top').classList.toggle('sc',scrollY>8),{passive:true});
 $$('.fq button').forEach(b=>b.onclick=()=>{const q=b.parentElement,o=q.classList.toggle('on');b.nextElementSibling.style.maxHeight=o?b.nextElementSibling.scrollHeight+'px':null});
 go($('.nb').dataset.go)}