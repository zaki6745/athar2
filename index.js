
document.addEventListener("DOMContentLoaded", () => {
  // Mobile navigation
  const menu = document.querySelector("[data-menu]");
  const links = document.querySelector("[data-nav-links]");

  if (menu && links) {
    menu.addEventListener("click", () => {
      const open = links.classList.toggle("open");
      menu.setAttribute("aria-expanded", String(open));
    });

    links.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        links.classList.remove("open");
        menu.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Current year
  const year = document.querySelector("[data-year]");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Active navigation link
  const current = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");
    if (href === current) {
      a.classList.add("active");
    }
  });

  // Reveal sections on scroll
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".reveal").forEach(el => io.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => {
      el.classList.add("visible");
    });
  }

  // Featured content settings
  const AUTO_ROTATE_FEATURED = true;
  const ROTATION_MS = 8000;

  const FEATURED_DHIKR = [
    {
      text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ",
      meta: "ذكر من أذكار السنة النبوية."
    },
    {
      text: "اللَّهُمَّ اغْفِرْ لِي",
      meta: "دعاء بالمغفرة."
    }
  ];

  const FEATURED_HADITH = [
    {
      text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ",
      meta: "صحيح البخاري، وصحيح مسلم."
    },
    {
      text: "مَنْ لَا يَرْحَمْ لَا يُرْحَمْ",
      meta: "صحيح البخاري، وصحيح مسلم."
    }
  ];

  let dIndex = 0;
  let hIndex = 0;

  function renderFeatured() {
    const dhikr = document.querySelector("#featured-dhikr");
    const dhikrMeta = document.querySelector("#featured-dhikr-meta");
    const hadith = document.querySelector("#featured-hadith");
    const hadithMeta = document.querySelector("#featured-hadith-meta");

    if (dhikr) dhikr.textContent = FEATURED_DHIKR[dIndex].text;
    if (dhikrMeta) dhikrMeta.textContent = FEATURED_DHIKR[dIndex].meta;
    if (hadith) hadith.textContent = FEATURED_HADITH[hIndex].text;
    if (hadithMeta) hadithMeta.textContent = FEATURED_HADITH[hIndex].meta;
  }

  renderFeatured();

  if (AUTO_ROTATE_FEATURED) {
    setInterval(() => {
      dIndex = (dIndex + 1) % FEATURED_DHIKR.length;
      hIndex = (hIndex + 1) % FEATURED_HADITH.length;
      renderFeatured();
    }, ROTATION_MS);
  }

  // Quran PDF embedded directly in the homepage
  const viewer = document.querySelector("#quran-viewer");

  if (viewer) {
    viewer.innerHTML = `
      <iframe
        class="pdf-viewer"
        src="./quran.pdf#view=FitH"
        title="القرآن الكريم"
        loading="lazy">
      </iframe>
    `;
  }
});
