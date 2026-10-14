
document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // Menu mobile
  // =========================
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

  // =========================
  // Footer year
  // =========================
  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // =========================
  // Active navigation link
  // =========================
  const current = location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");

    if (href === current) {
      a.classList.add("active");
    }
  });

  // =========================
  // Reveal animations
  // =========================
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    document.querySelectorAll(".reveal").forEach(el => {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(el => {
      el.classList.add("visible");
    });
  }

  // =========================
  // Hadith data
  // =========================
  const HADITH = [
    {
      category: "الإيمان",
      items: [
        {
          text: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى.",
          source: "صحيح البخاري، وصحيح مسلم",
          book: "كتاب بدء الوحي",
          number: "يُرجى التحقق من رقم الحديث في الطبعة المعتمدة."
        },
        {
          text: "بُنِيَ الإِسْلَامُ عَلَى خَمْسٍ.",
          source: "صحيح البخاري، وصحيح مسلم",
          book: "كتاب الإيمان",
          number: "يُرجى التحقق من رقم الحديث في الطبعة المعتمدة."
        }
      ]
    },
    {
      category: "الأخلاق والآداب",
      items: [
        {
          text: "مَنْ لَا يَرْحَمْ لَا يُرْحَمْ.",
          source: "صحيح البخاري، وصحيح مسلم",
          book: "—",
          number: "يُرجى التحقق من رقم الحديث في الطبعة المعتمدة."
        },
        {
          text: "مَنْ كَانَ يُؤْمِنُ بِاللَّهِ وَالْيَوْمِ الآخِرِ فَلْيَقُلْ خَيْرًا أَوْ لِيَصْمُتْ.",
          source: "صحيح البخاري، وصحيح مسلم",
          book: "—",
          number: "يُرجى التحقق من رقم الحديث في الطبعة المعتمدة."
        }
      ]
    },
    {
      category: "الذكر والدعاء",
      items: [
        {
          text: "سَبَقَ الْمُفَرِّدُونَ.",
          source: "صحيح مسلم",
          book: "—",
          number: "يُرجى التحقق من رقم الحديث في الطبعة المعتمدة."
        }
      ]
    },
    {
      category: "العبادة",
      items: [
        {
          text: "الطُّهُورُ شَطْرُ الإِيمَانِ.",
          source: "صحيح مسلم",
          book: "كتاب الطهارة",
          number: "يُرجى التحقق من رقم الحديث في الطبعة المعتمدة."
        }
      ]
    },
    {
      category: "التعامل مع الناس",
      items: [
        {
          text: "لَا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبَّ لِأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ.",
          source: "صحيح البخاري، وصحيح مسلم",
          book: "—",
          number: "يُرجى التحقق من رقم الحديث في الطبعة المعتمدة."
        }
      ]
    }
  ];

  // =========================
  // Render hadith list
  // =========================
  function renderHadith() {
    const search = document.querySelector("#hadith-search");
    const root = document.querySelector("#hadith-list");

    if (!root) return;

    const q = (search?.value || "").trim().toLowerCase();
    root.innerHTML = "";

    HADITH.forEach((group, i) => {
      const matches = group.items.filter(h => {
        const content =
          group.category + " " +
          h.text + " " +
          h.source + " " +
          h.book;

        return content.toLowerCase().includes(q);
      });

      if (!matches.length) return;

      const section = document.createElement("section");
      section.className = "accordion";

      const button = document.createElement("button");
      button.className = "acc-btn";
      button.type = "button";
      button.setAttribute("aria-expanded", "false");

      const title = document.createElement("span");
      title.textContent = group.category;

      const icon = document.createElement("span");
      icon.textContent = "+";

      button.append(title, icon);

      const panel = document.createElement("div");
      panel.className = "acc-panel";

      matches.forEach(h => {
        const row = document.createElement("article");
        row.className = "entry";

        const text = document.createElement("div");
        text.className = "entry-text";
        text.textContent = h.text;

        const meta = document.createElement("div");
        meta.className = "meta";
        meta.textContent =
          h.source + " · " + h.book + " · " + h.number;

        const actions = document.createElement("div");
        actions.className = "entry-actions";

        const copy = document.createElement("button");
        copy.className = "copy-btn";
        copy.type = "button";
        copy.textContent = "نسخ";

        copy.addEventListener("click", async () => {
          try {
            await navigator.clipboard.writeText(h.text);
            copy.textContent = "تم النسخ ✓";
          } catch {
            const area = document.createElement("textarea");
            area.value = h.text;
            document.body.appendChild(area);
            area.select();

            try {
              document.execCommand("copy");
              copy.textContent = "تم النسخ ✓";
            } catch {
              copy.textContent = "تعذر النسخ";
            }

            area.remove();
          }

          setTimeout(() => {
            copy.textContent = "نسخ";
          }, 1500);
        });

        actions.appendChild(copy);
        row.append(text, meta, actions);
        panel.appendChild(row);
      });

      button.addEventListener("click", () => {
        const open = panel.classList.toggle("open");
        button.setAttribute("aria-expanded", String(open));
        icon.textContent = open ? "−" : "+";
      });

      section.append(button, panel);
      root.appendChild(section);
    });

    if (!root.children.length) {
      const empty = document.createElement("p");
      empty.className = "notice";
      empty.textContent = "لا توجد نتائج مطابقة.";
      root.appendChild(empty);
    }
  }

  // =========================
  // Search
  // =========================
  const search = document.querySelector("#hadith-search");

  if (search) {
    search.addEventListener("input", renderHadith);
  }

  renderHadith();

  // =========================
  // Display PDF directly
  // =========================
  const pdfBox = document.querySelector("#hadith-pdf");

  if (pdfBox) {
    const frame = document.createElement("iframe");

    frame.className = "pdf-viewer";
    frame.title = "ملف الأحاديث النبوية";
    frame.src = "hadith.pdf#toolbar=1&navpanes=0&view=FitH";
    frame.style.width = "100%";
    frame.style.height = "700px";
    frame.style.border = "0";
    frame.style.display = "block";
    frame.setAttribute("loading", "lazy");

    pdfBox.replaceChildren(frame);
  }

});
