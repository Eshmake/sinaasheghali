
const PROJECTS = [
    {
      id: "lab-vr",
      title: "VR Lab Training Prototype (CivE)",
      year: 2025,
      featured: true,
      categories: ["XR", "Research", "Unity"],
      blurb: "Research prototype exploring VR implementation of a Materials Science lab.",
      description:
        "A Unity VR simulation that implements civil engineering lab ASTM-C-127 in virtual reality. Intended as a pre-lab trainining resource for Civil Engineering students.",
      bullets: [
        "Prototyped interactions with text and audio guided task flow",
        "Collaborated with stakeholders to translate needs into VR mechanics",
        "Includes 4 types of immersive interaction (i.e. controllers, hands, full-body, and hand-tracking)",
        "Designed environment assets in Blender/Fusion360, and coded logic in C# Unity Engine"
      ],
      tech: ["Unity", "C#", "VR UX"],
      links: [
        { label: "GitHub Repo", url: "https://github.com/Eshmake/VR-Lab-Project" },
        { label: "Demo Video", url: "https://www.youtube.com/watch?v=JTq7Nm2UYRM&list=PLnj6H6-TgFm2zNyiOsr-e94Is43jMmlDv&index=2" }
      ],
      media: [
        { type: "image", url: "media/vr_1.jpg", caption: "Prototype scene" },
        { type: "image", url: "media/vr_2.jpg", caption: "Prototype scene" },
        { type: "image", url: "media/vr_3.jpg", caption: "Prototype scene" },
        { type: "image", url: "media/vr_4.jpg", caption: "Prototype scene" },
        { type: "image", url: "media/vr_5.jpg", caption: "Prototype scene" },
        { type: "image", url: "media/vr_6.jpg", caption: "Prototype scene" }
      ],
      cardMediaIndex: 0
    },
    {
      id: "kivy-gravity",
      title: "Mobile Gravity Simulator",
      year: 2025,
      featured: false,
      categories: ["Mobile", "Python", "Physics"],
      blurb: "Touch-based gravity simulation with multitouch controls.",
      description:
        "A mobile-friendly physics simulation for visualizing planetary gravitational force built in Python/Kivy with multitouch support and real-time rendering.",
      bullets: [
        "Implemented multitouch controls for adding bodies and dragging objects",
        "Designed clean UI for mobile interaction"
      ],
      tech: ["Python", "Kivy"],
      links: [
        { label: "GitHub", url: "https://github.com/Eshmake/Gravity-Simulator-App" }
      ],
      media: [
        { type: "image", url: "media/gs_1.jpg", caption: "app scene" },
        { type: "image", url: "media/gs_2.jpg", caption: "app scene" },
        { type: "image", url: "media/gs_3.jpg", caption: "app scene" },
        { type: "image", url: "media/gs_4.gif", caption: "app scene" }
      ],
      cardMediaIndex: 0
    },
    {
      id: "world-calendars",
      title: "World Calendars App",
      year: 2023,
      featured: false,
      categories: ["Python", "GUI", "API"],
      blurb: "A GUI for accessing the current time, date, and special event dates of different calendar systems.",
      description:
        "A Tkinter app system that contains GUIs for multiple international calendar systems, providing access to the current time and date per calendar, and the dates of special holidays.",
      bullets: [
        "Built a streamlined GUI system in Tkinter",
        "Includes time and date in real-time",
        "Built with API integration"
      ],
      tech: ["Python", "Tkinter"],
      links: [
        { label: "GitHub", url: "https://github.com/Eshmake/World-Calendars-App" }
      ],
      media: [
        { type: "image", url: "media/wc_1.jpg", caption: "app scene" },
        { type: "image", url: "media/wc_2.jpg", caption: "app scene" },
        { type: "image", url: "media/wc_3.jpg", caption: "app scene" },
        { type: "image", url: "media/wc_4.jpg", caption: "app scene" },
        { type: "image", url: "media/wc_5.jpg", caption: "app scene" },
        { type: "image", url: "media/wc_6.jpg", caption: "app scene" },
        { type: "image", url: "media/wc_7.jpg", caption: "app scene" }
      ],
      cardMediaIndex: 0
    },
    {
      id: "currency-converter",
      title: "Currency Exchange App",
      year: 2024,
      featured: false,
      categories: ["Python", "GUI", "API"],
      blurb: "A GUI for viewing currency conversion rates for international currencies tracked by the ECB",
      description:
        "A Tkinter app system that allows the user to convert given amounts of money between different currencies tracked by the European Central Bank (ECB).",
      bullets: [
        "Built a streamlined GUI system in Tkinter",
        "Applies currency conversion rates in real-time",
        "Inlcudes light/dark mode optionality",
        "Built with API integration"
      ],
      tech: ["Python", "Tkinter"],
      links: [
        { label: "GitHub", url: "https://github.com/Eshmake/World-Calendars-App" }
      ],
      media: [
        { type: "image", url: "media/cc_1.jpg", caption: "app scene" },
        { type: "image", url: "media/cc_2.jpg", caption: "app scene" },
        { type: "image", url: "media/cc_3.jpg", caption: "app scene" },
      ],
      cardMediaIndex: 0
    },
  ];
  // ====== END PROJECT DATA ======

  const $ = (s) => document.querySelector(s);
  const grid = $("#grid");
  const chips = $("#chips");
  const search = $("#search");
  const sort = $("#sort");

  const modal = $("#modal");
  const closeBtn = $("#closeBtn");
  const prevBtn = $("#prevBtn");
  const nextBtn = $("#nextBtn");
  const gallery = $("#gallery");

  const mTitle = $("#mTitle");
  const mMeta  = $("#mMeta");
  const mDesc  = $("#mDesc");
  const mBullets = $("#mBullets");
  const mTags = $("#mTags");
  const mLinks = $("#mLinks");

  $("#year").textContent = new Date().getFullYear();

  const ALL_CATS = ["All", ...Array.from(new Set(PROJECTS.flatMap(p => p.categories)))].sort((a,b)=>{
    if (a==="All") return -1;
    if (b==="All") return 1;
    return a.localeCompare(b);
  });

  let activeCat = "All";
  let activeSearch = "";
  let activeSort = "featured";

  function renderChips(){
    chips.innerHTML = "";
    ALL_CATS.forEach(cat=>{
      const el = document.createElement("div");
      el.className = "chip" + (cat===activeCat ? " active":"");
      el.textContent = cat;
      el.addEventListener("click", ()=>{
        activeCat = cat;
        renderChips();
        renderProjects();
      });
      chips.appendChild(el);
    });
  }

  function projectMatches(p){
    const byCat = activeCat==="All" || p.categories.includes(activeCat);
    const q = activeSearch.trim().toLowerCase();
    const hay = (p.title+" "+p.blurb+" "+p.description+" "+p.categories.join(" ")+" "+p.tech.join(" ")).toLowerCase();
    const bySearch = !q || hay.includes(q);
    return byCat && bySearch;
  }

  function sortProjects(list){
    const copy = [...list];
    if (activeSort==="featured"){
      copy.sort((a,b)=> (b.featured - a.featured) || (b.year - a.year) || a.title.localeCompare(b.title));
    } else if (activeSort==="newest"){
      copy.sort((a,b)=> (b.year - a.year) || a.title.localeCompare(b.title));
    } else if (activeSort==="az"){
      copy.sort((a,b)=> a.title.localeCompare(b.title));
    }
    return copy;
  }

  function getCardMedia(p){
    const m = p.media?.[p.cardMediaIndex ?? 0] || p.media?.[0];
    return m || null;
  }

  function renderProjects(){
    const filtered = sortProjects(PROJECTS.filter(projectMatches));
    grid.innerHTML = "";
    filtered.forEach(p=>{
      const card = document.createElement("article");
      card.className = "proj";
      card.setAttribute("data-id", p.id);

      const m = getCardMedia(p);
      const thumb = document.createElement("div");
      thumb.className = "thumb";
      const badge = document.createElement("div");
      badge.className = "badge";
      badge.textContent = `${p.year} • ${p.categories[0] || "Project"}`;
      thumb.appendChild(badge);

      if (m && m.type==="image"){
        const img = document.createElement("img");
        img.src = m.url;
        img.alt = p.title;
        thumb.appendChild(img);
      } else if (m && m.type==="video"){
        const v = document.createElement("video");
        v.src = m.url;
        v.muted = true;
        v.playsInline = true;
        v.loop = true;
        v.autoplay = true;
        v.preload = "metadata";
        thumb.appendChild(v);

        const play = document.createElement("div");
        play.className = "play";
        play.textContent = "VIDEO";
        thumb.appendChild(play);
      } else {
        thumb.innerHTML += `<div class="muted">Add media/…</div>`;
      }

      const body = document.createElement("div");
      body.className = "pbody";
      body.innerHTML = `
        <p class="ptitle">${p.title}</p>
        <p class="pdesc">${p.blurb}</p>
        <div class="tags">
          ${p.tech.slice(0,4).map(t=>`<span class="tag">${t}</span>`).join("")}
        </div>
      `;

      card.appendChild(thumb);
      card.appendChild(body);

      card.addEventListener("click", ()=> openModal(p.id));
      grid.appendChild(card);
    });

    if (!grid.children.length){
      grid.innerHTML = `<div class="muted">No projects match your filters. Try “All” or clear search.</div>`;
    }
  }

  let currentProject = null;
  let currentIndex = 0;

  function setGalleryMedia(p, idx){
    const items = p.media || [];
    currentIndex = (idx + items.length) % items.length;

    // Clear existing media but keep nav
    const nav = gallery.querySelector(".gNav");
    gallery.innerHTML = "";
    if (items.length === 0){
      gallery.innerHTML = `<div class="muted">No media yet. Add images/videos to the project’s media array.</div>`;
      gallery.appendChild(nav);
      return;
    }

    const item = items[currentIndex];
    let node;

    if (item.type === "image"){
      node = document.createElement("img");
      node.src = item.url;
      node.alt = item.caption || p.title;
    } else {
      node = document.createElement("video");
      node.src = item.url;
      node.controls = true;
      node.playsInline = true;
      node.preload = "metadata";
    }

    gallery.appendChild(node);

    // Caption
    if (item.caption){
      const cap = document.createElement("div");
      cap.style.position = "absolute";
      cap.style.left = "12px";
      cap.style.bottom = "54px";
      cap.style.right = "12px";
      cap.style.color = "var(--muted)";
      cap.style.fontSize = "12px";
      cap.style.fontFamily = "var(--mono)";
      cap.style.textShadow = "0 2px 10px rgba(0,0,0,.7)";
      cap.textContent = item.caption;
      gallery.appendChild(cap);
    }

    gallery.appendChild(nav);
  }

  function openModal(id){
    const p = PROJECTS.find(x=>x.id===id);
    if (!p) return;
    currentProject = p;
    currentIndex = 0;

    mTitle.textContent = p.title;
    mMeta.textContent = `${p.categories.join(" • ")} • ${p.year} • ${p.tech.join(", ")}`;
    mDesc.textContent = p.description;

    mBullets.innerHTML = "";
    p.bullets.forEach(b=>{
      const li = document.createElement("li");
      li.textContent = b;
      mBullets.appendChild(li);
    });

    mTags.innerHTML = "";
    p.tech.forEach(t=>{
      const s = document.createElement("span");
      s.className = "tag";
      s.textContent = t;
      mTags.appendChild(s);
    });

    mLinks.innerHTML = "";
    (p.links || []).forEach(l=>{
      const a = document.createElement("a");
      a.className = "btn";
      a.href = l.url;
      a.target = "_blank";
      a.rel = "noreferrer";
      a.textContent = l.label;
      mLinks.appendChild(a);
    });

    setGalleryMedia(p, 0);
    modal.showModal();
  }

  closeBtn.addEventListener("click", ()=> modal.close());
  modal.addEventListener("click", (e)=>{
    // click outside content to close
    const rect = modal.getBoundingClientRect();
    const inDialog =
      rect.top <= e.clientY && e.clientY <= rect.bottom &&
      rect.left <= e.clientX && e.clientX <= rect.right;
    if (!inDialog) modal.close();
  });

  prevBtn.addEventListener("click", ()=>{
    if (!currentProject) return;
    setGalleryMedia(currentProject, currentIndex - 1);
  });
  nextBtn.addEventListener("click", ()=>{
    if (!currentProject) return;
    setGalleryMedia(currentProject, currentIndex + 1);
  });

  search.addEventListener("input", (e)=>{
    activeSearch = e.target.value || "";
    renderProjects();
  });
  sort.addEventListener("change", (e)=>{
    activeSort = e.target.value;
    renderProjects();
  });

  renderChips();
  renderProjects();