document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MOBILE MENU
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
      });
    });
  }

  // =========================
  // CURRENT YEAR
  // =========================
  const year = document.querySelector("[data-year]");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // =========================
  // ACTIVE NAV LINK
  // =========================
  const current =
    location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-links a").forEach(a => {
    const href = a.getAttribute("href");

    if (
      href === current ||
      (current === "" && href === "index.html")
    ) {
      a.classList.add("active");
    }
  });

  // =========================
  // SCROLL REVEAL
  // =========================
  const io = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.08
    }
  );

  document.querySelectorAll(".reveal").forEach(el => {
    io.observe(el);
  });

  // =========================
  // BOOK LIBRARY
  // =========================

  const BOOKS = [
    {
      id: "sirah-placeholder",
      title: "مدخل إلى السيرة النبوية",
      author: "بيانات تجريبية للتخطيط",
      category: "السيرة النبوية",
      description:
        "عنصر تخطيطي فقط؛ لا يمثل كتابًا متاحًا أو رابط تنزيل.",
      pdf: null
    },

    {
      id: "tafsir-placeholder",
      title: "قسم التفسير",
      author: "—",
      category: "التفسير",
      description:
        "قسم مخصص لإضافة كتاب موثوق بعد توفير ملفه الحقيقي ومراجعة بياناته.",
      pdf: null
    },

    {
      id: "aqidah-placeholder",
      title: "قسم العقيدة",
      author: "—",
      category: "العقيدة",
      description:
        "قسم تخطيطي يمكن ملؤه بكتب موثوقة مع بيانات دقيقة.",
      pdf: null
    },

    {
      id: "fiqh-placeholder",
      title: "قسم الفقه",
      author: "—",
      category: "الفقه",
      description:
        "قسم تخطيطي لإضافة المراجع الفقهية لاحقًا.",
      pdf: null
    },

  ];

  let activeCategory = "الكل";

  const categories = [
    "الكل",
    ...new Set(BOOKS.map(book => book.category))
  ];

  // =========================
  // RENDER FILTERS
  // =========================

  function renderFilters() {

    const box = document.querySelector("#category-filters");

    if (!box) return;

    // مهم: نحذف الأزرار القديمة
    // حتى لا تتكرر كل مرة
    box.innerHTML = "";

    categories.forEach(category => {

      const button = document.createElement("button");

      button.className =
        "filter" +
        (category === activeCategory ? " active" : "");

      button.textContent = category;
      button.type = "button";

      button.addEventListener("click", () => {

        activeCategory = category;

        renderFilters();
        renderBooks();

      });

      box.appendChild(button);

    });
  }

  // =========================
  // RENDER BOOKS
  // =========================

  function renderBooks() {

    const searchInput =
      document.querySelector("#book-search");

    const grid =
      document.querySelector("#book-grid");

    const empty =
      document.querySelector("#library-empty");

    if (!grid || !empty) return;

    const q = searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

    grid.innerHTML = "";

    const items = BOOKS.filter(book => {

      const categoryMatch =
        activeCategory === "الكل" ||
        book.category === activeCategory;

      const searchMatch =
        `${book.title} ${book.author}`
          .toLowerCase()
          .includes(q);

      return categoryMatch && searchMatch;

    });

    empty.hidden = items.length !== 0;

    items.forEach(book => {

      const article =
        document.createElement("article");

      article.className = "card book-card";

      article.innerHTML = `
        <h3>${book.title}</h3>

        <p>${book.author}</p>

        <p>${book.description}</p>

        <span class="availability">
          غير متاح حاليًا
        </span>

        <div class="card-actions">

          <button
            class="btn btn-outline"
            disabled
            title="أضف ملف PDF حقيقيًا أولًا"
          >
            القراءة لاحقًا
          </button>

        </div>
      `;

      grid.appendChild(article);

    });
  }

  // =========================
  // INITIALIZE
  // =========================

  renderFilters();
  renderBooks();

  // =========================
  // SEARCH
  // =========================

  const searchInput =
    document.querySelector("#book-search");

  if (searchInput) {

    searchInput.addEventListener("input", () => {
      renderBooks();
    });

  }

});