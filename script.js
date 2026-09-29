// ---------- mobile nav (full-screen) ----------
const burger = document.querySelector('.burger');
const navlinks = document.querySelector('.navlinks');
if(burger && navlinks){
  burger.setAttribute('aria-expanded','false');
  const setMenu = (open)=>{
    burger.classList.toggle('open', open);
    navlinks.classList.toggle('open', open);
    document.body.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  };
  burger.addEventListener('click',()=>setMenu(!navlinks.classList.contains('open')));
  navlinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>setMenu(false)));
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') setMenu(false); });
  window.matchMedia('(min-width:901px)').addEventListener('change',(e)=>{ if(e.matches) setMenu(false); });
}

// ---------- scroll reveal ----------
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
},{threshold:0.15});
document.querySelectorAll('.reveal, .reveal-stagger, .progress').forEach(el=>io.observe(el));

// ---------- counters ----------
const counters = document.querySelectorAll('[data-count]');
const cio = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      const el = e.target;
      const target = parseInt(el.dataset.count,10);
      const suffix = el.dataset.suffix || '';
      let cur = 0;
      const step = Math.max(1, Math.ceil(target/60));
      const tick = ()=>{
        cur += step;
        if(cur >= target){ el.textContent = target.toLocaleString()+suffix; return; }
        el.textContent = cur.toLocaleString()+suffix;
        requestAnimationFrame(tick);
      };
      tick();
      cio.unobserve(el);
    }
  });
},{threshold:0.4});
counters.forEach(el=>cio.observe(el));

// ---------- faq accordion ----------
document.querySelectorAll('.faq-item').forEach(item=>{
  const q = item.querySelector('.faq-q');
  const a = item.querySelector('.faq-a');
  q.addEventListener('click',()=>{
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o=>{
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      a.style.maxHeight = a.scrollHeight + 'px';
    }
  });
});

// ---------- back to top ----------
const totop = document.querySelector('.totop');
window.addEventListener('scroll',()=>{
  if(totop) totop.classList.toggle('show', window.scrollY > 500);
});
if(totop) totop.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// ---------- cursor accent dot (desktop) ----------
const dot = document.querySelector('.accent-dot');
if(dot && window.matchMedia('(min-width:901px)').matches){
  window.addEventListener('mousemove',(e)=>{
    dot.style.opacity = 1;
    dot.style.left = e.clientX+'px';
    dot.style.top = e.clientY+'px';
  });
  document.querySelectorAll('a,button,.card').forEach(el=>{
    el.addEventListener('mouseenter',()=>dot.style.transform='translate(-50%,-50%) scale(2.4)');
    el.addEventListener('mouseleave',()=>dot.style.transform='translate(-50%,-50%) scale(1)');
  });
}

// ---------- scroll progress bar ----------
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);
window.addEventListener('scroll', ()=>{
  const h = document.documentElement;
  const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  progressBar.style.width = scrolled + '%';
}, {passive:true});

// ---------- image reveal wipe (auto-applied to hero-adjacent images) ----------
document.querySelectorAll('.float-frame img, .m-item img').forEach(img=>{
  const parent = img.parentElement;
  parent.classList.add('img-reveal');
});
const imgIo = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); imgIo.unobserve(e.target); }
  });
},{threshold:0.2});
document.querySelectorAll('.img-reveal').forEach(el=>imgIo.observe(el));

// ---------- button ripple ----------
document.querySelectorAll('.btn').forEach(btn=>{
  btn.style.position = btn.style.position || 'relative';
  btn.style.overflow = 'hidden';
  btn.addEventListener('click', function(e){
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
    ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
    this.appendChild(ripple);
    setTimeout(()=>ripple.remove(), 650);
  });
});

// ---------- card tilt on pointer (desktop only) ----------
if(window.matchMedia('(min-width:901px)').matches && window.matchMedia('(pointer:fine)').matches){
  document.querySelectorAll('.card').forEach(card=>{
    card.addEventListener('mousemove', (e)=>{
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left)/r.width - 0.5;
      const y = (e.clientY - r.top)/r.height - 0.5;
      card.style.transform = `translateY(-6px) rotateX(${(-y*5).toFixed(2)}deg) rotateY(${(x*5).toFixed(2)}deg)`;
    });
    card.addEventListener('mouseleave', ()=>{ card.style.transform = ''; });
  });
}

// ---------- sec-head reveal (for eyebrow underline draw) ----------
document.querySelectorAll('.sec-head').forEach(el=>el.classList.add('reveal'));
document.querySelectorAll('.sec-head.reveal').forEach(el=>io.observe(el));

// ---------- counter pop-on-finish class toggle ----------
document.querySelectorAll('[data-count]').forEach(el=>{
  const parentStat = el.closest('.stat');
  if(parentStat){
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{
        if(e.isIntersecting){
          setTimeout(()=>{ const h3 = parentStat.querySelector('h3'); if(h3) h3.classList.add('pop'); }, 900);
          obs.disconnect();
        }
      });
    },{threshold:0.4});
    obs.observe(el);
  }
});

// ---------- active nav link by page ----------
(function(){
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a').forEach(a=>{
    if(a.getAttribute('href') === path) a.classList.add('active');
  });
})();