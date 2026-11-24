// Небольшие улучшения интерфейса без дополнительных библиотек.
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});

/* Persistent light/dark theme */
(() => {
 const KEY="learning-space-theme";
 const apply=theme=>{
  document.documentElement.dataset.theme=theme;document.documentElement.style.colorScheme=theme;
  const b=document.querySelector("[data-theme-toggle]");
  if(b){b.textContent=theme==="dark"?"☀ Светлая тема":"☾ Тёмная тема";b.setAttribute("aria-pressed",String(theme==="light"));}
 };
 let saved="dark";try{saved=localStorage.getItem(KEY)==="light"?"light":"dark"}catch(_){}
 const mount=()=>{
  const host=document.querySelector(".topbar");if(!host||document.querySelector("[data-theme-toggle]"))return;
  const b=document.createElement("button");b.type="button";b.className="theme-toggle";b.dataset.themeToggle="";
  b.addEventListener("click",()=>{const next=document.documentElement.dataset.theme==="dark"?"light":"dark";try{localStorage.setItem(KEY,next)}catch(_){}apply(next)});
  host.append(b);apply(saved);
 };
 apply(saved);if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);else mount();
})();