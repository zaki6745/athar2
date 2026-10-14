
document.addEventListener("DOMContentLoaded",()=>{
  const menu=document.querySelector("[data-menu]");
  const links=document.querySelector("[data-nav-links]");
  if(menu && links){
    menu.addEventListener("click",()=>{
      const open=links.classList.toggle("open");
      menu.setAttribute("aria-expanded",String(open));
    });
    links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>links.classList.remove("open")));
  }
  const year=document.querySelector("[data-year]");
  if(year) year.textContent=new Date().getFullYear();
  const current=location.pathname.split("/").pop()||"index.html";
  document.querySelectorAll(".nav-links a").forEach(a=>{
    const href=a.getAttribute("href");
    if(href===current || (current==="" && href==="index.html")) a.classList.add("active");
  });
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.08});
  document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
});
