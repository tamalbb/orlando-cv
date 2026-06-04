// ===========================
//  AUTH
// ===========================
const USUARIO  = "admin";
const PASSWORD = "tamal123";

document.getElementById("adminBtn").addEventListener("click", () => {
    document.getElementById("loginModal").style.display = "flex";
});

function cerrarLogin() {
    document.getElementById("loginModal").style.display = "none";
}

function login() {
    const u = document.getElementById("usuario").value;
    const p = document.getElementById("password").value;
    if (u === USUARIO && p === PASSWORD) {
        document.getElementById("loginModal").style.display = "none";
        abrirPanel();
        localStorage.setItem("adminLogueado", "true");
    } else {
        const inp = document.getElementById("password");
        inp.style.borderColor = "#ff4d1c";
        inp.value = "";
        setTimeout(() => inp.style.borderColor = "", 1500);
    }
}

function cerrarSesion() {
    localStorage.removeItem("adminLogueado");
    document.getElementById("adminPanel").style.display = "none";
    document.getElementById("videoFormPublic").style.display = "none";
}

function abrirPanel() {
    document.getElementById("adminPanel").style.display = "block";
    document.getElementById("videoFormPublic").style.display = "flex";
    llenarInputsAdmin();
    renderSkillsAdmin();
    renderVideosAdmin();
}

document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarLogin(); });

// ===========================
//  TABS ADMIN
// ===========================
function abrirTab(btn, id) {
    document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(t => t.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(id).classList.add("active");
}

// ===========================
//  DEFAULTS
// ===========================
const DEFAULTS = {
    heroNombre:    "TAMAL",
    heroSubtitulo: "YouTube · TikTok · Redes Sociales",
    heroTag:       "Editor de Video · Los Mochis, Sinaloa",
    perfil:        "Editor de video con experiencia en contenido para YouTube, TikTok y redes sociales. Estudiante de Ingeniería en Software en la UAdeO Los Mochis. He formado parte del equipo de producción de Akim, trabajando en edición de largo formato, highlights y contenido para formatos cortos. Me adapto bien tanto a trabajo en equipo como de forma independiente.",
    stat1num: "3+",  stat1lbl: "Años editando",
    stat2num: "100+", stat2lbl: "Videos editados",
    stat3num: "YT",  stat3lbl: "YouTube Ready",
    tituloPortafolio: "Trabajos recientes",
    contactoTitulo:   "Trabajemos juntos.",
    contactoSubtitulo:"¿Tienes un proyecto? Hablemos.",
    habilidades: ["Adobe Premiere Pro","CapCut","Filmora","Edición en PC","Edición Móvil","YouTube","TikTok","Redes Sociales","Highlights / Clips","Trabajo en Equipo","Atención al detalle","Cumplimiento de plazos","Adaptación rápida","Comunicación efectiva"],
    contacto: { correo: "tucorreo@gmail.com", ubicacion: "Los Mochis, Sinaloa", telefono: "—", instagram: "", tiktok: "", youtube: "" }
};

function get(key, fallback) {
    const v = localStorage.getItem(key);
    return (v !== null && v !== undefined) ? v : fallback;
}
function getJSON(key, fallback) {
    try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
}

// ===========================
//  CARGA INICIAL
// ===========================
window.addEventListener("load", () => {
    if (localStorage.getItem("adminLogueado") === "true") abrirPanel();
    renderHero();
    renderPerfil();
    renderSkills();
    renderVideos();
    renderContacto();
    initScrollAnim();
});

// ===========================
//  HERO
// ===========================
function renderHero() {
    const nombre    = get("heroNombre",    DEFAULTS.heroNombre);
    const subtitulo = get("heroSubtitulo", DEFAULTS.heroSubtitulo);
    const tag       = get("heroTag",       DEFAULTS.heroTag);
    document.getElementById("heroNombreEl").textContent    = nombre;
    document.getElementById("heroSubtituloEl").textContent = subtitulo;
    document.getElementById("heroTagEl").textContent       = tag;
    document.getElementById("navLogo").textContent         = nombre.charAt(0) + "/";
    document.getElementById("footerNombre").textContent    = "© 2026 " + nombre;
    document.title = nombre + " — Editor de Video";
}

function guardarHero() {
    const nombre    = document.getElementById("heroNombre").value.trim();
    const subtitulo = document.getElementById("heroSubtitulo").value.trim();
    const tag       = document.getElementById("heroTag").value.trim();
    if (nombre)    localStorage.setItem("heroNombre",    nombre);
    if (subtitulo) localStorage.setItem("heroSubtitulo", subtitulo);
    if (tag)       localStorage.setItem("heroTag",       tag);
    renderHero();
    toast("Hero actualizado ✓");
}

// ===========================
//  PERFIL
// ===========================
function renderPerfil() {
    document.getElementById("perfilTexto").textContent = get("perfil", DEFAULTS.perfil);
    document.getElementById("stat1numEl").textContent  = get("stat1num", DEFAULTS.stat1num);
    document.getElementById("stat1lblEl").textContent  = get("stat1lbl", DEFAULTS.stat1lbl);
    document.getElementById("stat2numEl").textContent  = get("stat2num", DEFAULTS.stat2num);
    document.getElementById("stat2lblEl").textContent  = get("stat2lbl", DEFAULTS.stat2lbl);
    document.getElementById("stat3numEl").textContent  = get("stat3num", DEFAULTS.stat3num);
    document.getElementById("stat3lblEl").textContent  = get("stat3lbl", DEFAULTS.stat3lbl);
}

function guardarPerfil() {
    const campos = ["nuevoPerfil","stat1num","stat1lbl","stat2num","stat2lbl","stat3num","stat3lbl"];
    const keys   = ["perfil","stat1num","stat1lbl","stat2num","stat2lbl","stat3num","stat3lbl"];
    campos.forEach((id, i) => {
        const v = document.getElementById(id).value.trim();
        if (v) localStorage.setItem(keys[i], v);
    });
    renderPerfil();
    toast("Perfil actualizado ✓");
}

// ===========================
//  SKILLS
// ===========================
const SKILLS_TECNICAS    = ["Adobe Premiere Pro","CapCut","Filmora","Edición en PC","Edición Móvil","Highlights / Clips"];
const SKILLS_PLATAFORMAS = ["YouTube","TikTok","Redes Sociales"];
const SKILLS_BLANDAS     = ["Trabajo en Equipo","Atención al detalle","Cumplimiento de plazos","Adaptación rápida","Comunicación efectiva"];

function renderSkills() {
    // Habilidades categorizadas fijas
    renderSkillSet("skillsTecnicas",    SKILLS_TECNICAS);
    renderSkillSet("skillsPlataformas", SKILLS_PLATAFORMAS);
    renderSkillSet("skillsBlandas",     SKILLS_BLANDAS);
    // Habilidades extra agregadas por el admin
    const extra = getJSON("habilidades", []);
    const container = document.getElementById("skillsContainer");
    container.innerHTML = "";
    extra.forEach(h => {
        const span = document.createElement("span");
        span.textContent = h;
        container.appendChild(span);
    });
}

function renderSkillSet(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = "";
    items.forEach(h => {
        const span = document.createElement("span");
        span.textContent = h;
        el.appendChild(span);
    });
}

function renderSkillsAdmin() {
    const list = document.getElementById("skillsAdminList");
    list.innerHTML = "";
    const habilidades = getJSON("habilidades", []);
    if (habilidades.length === 0) {
        list.innerHTML = '<p style="font-size:12px;color:var(--muted);margin-top:8px">Las habilidades de las categorías fijas se editan en el código. Aquí puedes agregar extras.</p>';
        return;
    }
    habilidades.forEach((h, i) => {
        const tag = document.createElement("div");
        tag.className = "skill-admin-tag";
        tag.innerHTML = `<span>${h}</span><button onclick="eliminarHabilidad(${i})" title="Eliminar">✕</button>`;
        list.appendChild(tag);
    });
}

function agregarHabilidad() {
    const input = document.getElementById("habilidadInput");
    const h = input.value.trim();
    if (!h) return;
    let arr = getJSON("habilidades", []);
    if (!arr.includes(h)) { arr.push(h); localStorage.setItem("habilidades", JSON.stringify(arr)); }
    input.value = "";
    renderSkills();
    renderSkillsAdmin();
    toast("Habilidad agregada ✓");
}

function eliminarHabilidad(i) {
    let arr = getJSON("habilidades", []);
    arr.splice(i, 1);
    localStorage.setItem("habilidades", JSON.stringify(arr));
    renderSkills();
    renderSkillsAdmin();
    toast("Habilidad eliminada");
}

// ===========================
//  VIDEOS — multi-plataforma
// ===========================

// Detecta la plataforma y extrae ID/embed info de la URL
function detectarPlataforma(url) {
    if (!url) return null;

    // YouTube: watch, youtu.be, shorts
    if (url.includes("youtube.com/watch?v=") || url.includes("youtu.be/") || url.includes("youtube.com/shorts/")) {
        let id = null;
        if (url.includes("watch?v="))  id = url.split("watch?v=")[1].split("&")[0];
        else if (url.includes("youtu.be/")) id = url.split("youtu.be/")[1].split("?")[0];
        else if (url.includes("shorts/"))   id = url.split("shorts/")[1].split("?")[0];
        if (id) return { plataforma: "youtube", id, embedUrl: `https://www.youtube.com/embed/${id}` };
    }

    // TikTok: /video/ID
    const ttMatch = url.match(/tiktok\.com\/.+\/video\/(\d+)/);
    if (ttMatch) {
        return { plataforma: "tiktok", id: ttMatch[1], embedUrl: `https://www.tiktok.com/embed/v2/${ttMatch[1]}` };
    }

    // Instagram Reels / Posts
    const igMatch = url.match(/instagram\.com\/(reel|p)\/([A-Za-z0-9_-]+)/);
    if (igMatch) {
        return { plataforma: "instagram", id: igMatch[2], embedUrl: `https://www.instagram.com/${igMatch[1]}/${igMatch[2]}/embed/` };
    }

    // Facebook Videos
    if (url.includes("facebook.com") && (url.includes("/videos/") || url.includes("/reel/"))) {
        const encodedUrl = encodeURIComponent(url);
        return { plataforma: "facebook", id: url, embedUrl: `https://www.facebook.com/plugins/video.php?href=${encodedUrl}&show_text=false` };
    }

    return null;
}

// Icono/badge de plataforma
function badgePlataforma(plataforma) {
    const badges = { youtube: "▶ YouTube", tiktok: "🎵 TikTok", instagram: "📸 Instagram", facebook: "👍 Facebook" };
    return badges[plataforma] || plataforma;
}

// Aspect ratio según plataforma (TikTok e IG son verticales)
function aspectRatio(plataforma) {
    return (plataforma === "tiktok" || plataforma === "instagram") ? "9/16" : "16/9";
}

function renderVideos() {
    const container  = document.getElementById("videoContainer");
    const emptyState = document.getElementById("empty-state");
    container.innerHTML = "";
    const videos = getJSON("videos", []);
    if (!videos.length) { emptyState.style.display = "flex"; return; }
    emptyState.style.display = "none";

    let hasTikTok = false;

    videos.forEach((v, i) => {
        const info = detectarPlataforma(v.url || v);
        if (!info) return;
        const div = document.createElement("div");
        div.className = "video-card";
        const isVertical = info.plataforma === "tiktok" || info.plataforma === "instagram";
        if (isVertical) div.classList.add("video-card-vertical");

        let embedHtml = "";
        if (info.plataforma === "tiktok") {
            hasTikTok = true;
            const cleanUrl = (v.url || v).split("?")[0];
            embedHtml = `<blockquote class="tiktok-embed" cite="${cleanUrl}" data-video-id="${info.id}" style="max-width:100%;min-width:100%;border-left:none;padding:0;margin:0;"><section></section></blockquote>`;
        } else {
            embedHtml = `<iframe src="${info.embedUrl}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
        }

        div.innerHTML = `
            <span class="video-platform-badge">${badgePlataforma(info.plataforma)}</span>
            ${embedHtml}
            ${v.titulo ? `<div class="video-card-info"><p class="video-card-title">${v.titulo}</p></div>` : ""}
            <button class="video-card-del" onclick="eliminarVideo(${i})" title="Eliminar">\u2715</button>
        `;
        container.appendChild(div);
    });

    if (hasTikTok) {
        const existingScript = document.getElementById("tiktok-embed-script");
        if (existingScript) {
            existingScript.remove();
        }
        const s = document.createElement("script");
        s.id = "tiktok-embed-script";
        s.src = "https://www.tiktok.com/embed.js";
        s.async = true;
        document.body.appendChild(s);
    }
}

function renderVideosAdmin() {
    const list = document.getElementById("videosAdminList");
    list.innerHTML = "";
    const videos = getJSON("videos", []);
    videos.forEach((v, i) => {
        const info = detectarPlataforma(v.url || v);
        const badge = info ? `<span style="font-size:.75em;opacity:.7;margin-right:6px">${badgePlataforma(info.plataforma)}</span>` : "";
        const item = document.createElement("div");
        item.className = "video-admin-item";
        item.innerHTML = `<span>${badge}${v.titulo || v.url || v}</span><button onclick="eliminarVideo(${i})" title="Eliminar">✕</button>`;
        list.appendChild(item);
    });
}

function agregarVideo() {
    const url = document.getElementById("videoUrl").value.trim();
    if (!url) return;
    if (!detectarPlataforma(url)) { toast("URL no válida. Acepta YouTube, TikTok, Instagram o Facebook ✗", true); return; }
    let videos = getJSON("videos", []);
    videos.push({ url, titulo: "" });
    localStorage.setItem("videos", JSON.stringify(videos));
    document.getElementById("videoUrl").value = "";
    renderVideos();
    renderVideosAdmin();
    toast("Video agregado ✓");
}

function agregarVideoAdmin() {
    const url    = document.getElementById("videoUrlAdmin").value.trim();
    const titulo = document.getElementById("videoTituloAdmin").value.trim();
    if (!url) return;
    if (!detectarPlataforma(url)) { toast("URL no válida. Acepta YouTube, TikTok, Instagram o Facebook ✗", true); return; }
    let videos = getJSON("videos", []);
    videos.push({ url, titulo });
    localStorage.setItem("videos", JSON.stringify(videos));
    document.getElementById("videoUrlAdmin").value = "";
    document.getElementById("videoTituloAdmin").value = "";
    renderVideos();
    renderVideosAdmin();
    toast("Video agregado ✓");
}

function eliminarVideo(i) {
    let videos = getJSON("videos", []);
    videos.splice(i, 1);
    localStorage.setItem("videos", JSON.stringify(videos));
    renderVideos();
    renderVideosAdmin();
    toast("Video eliminado");
}

function guardarTituloPortafolio() {
    const t = document.getElementById("tituloPortafolio").value.trim();
    if (!t) return;
    localStorage.setItem("tituloPortafolio", t);
    document.getElementById("tituloPortafolioEl").textContent = t;
    toast("Título actualizado ✓");
}

// ===========================
//  CONTACTO
// ===========================
function renderContacto() {
    const c = getJSON("contacto", DEFAULTS.contacto);
    document.getElementById("correo").textContent    = c.correo   || "—";
    document.getElementById("ubicacion").textContent = c.ubicacion || "—";
    document.getElementById("telefono").textContent  = c.telefono  || "—";
    // título y subtítulo
    document.getElementById("contactoTituloEl").textContent    = get("contactoTitulo",    DEFAULTS.contactoTitulo);
    document.getElementById("contactoSubtituloEl").textContent = get("contactoSubtitulo", DEFAULTS.contactoSubtitulo);
    // titulo portafolio
    document.getElementById("tituloPortafolioEl").textContent  = get("tituloPortafolio",  DEFAULTS.tituloPortafolio);
    // redes sociales
    const social = document.getElementById("socialLinks");
    social.innerHTML = "";
    const redes = [
        { key:"instagram", label:"Instagram", emoji:"📸" },
        { key:"tiktok",    label:"TikTok",    emoji:"🎵" },
        { key:"youtube",   label:"YouTube",   emoji:"▶" }
    ];
    redes.forEach(r => {
        if (c[r.key]) {
            const a = document.createElement("a");
            a.className = "social-link";
            a.href = c[r.key];
            a.target = "_blank";
            a.rel = "noopener";
            a.innerHTML = `<span>${r.emoji}</span> ${r.label}`;
            social.appendChild(a);
        }
    });
}

function guardarContacto() {
    const contacto = {
        correo:    document.getElementById("correoInput").value.trim()    || getJSON("contacto", DEFAULTS.contacto).correo,
        ubicacion: document.getElementById("ubicacionInput").value.trim() || getJSON("contacto", DEFAULTS.contacto).ubicacion,
        telefono:  document.getElementById("telefonoInput").value.trim()  || getJSON("contacto", DEFAULTS.contacto).telefono,
        instagram: document.getElementById("instagramInput").value.trim(),
        tiktok:    document.getElementById("tiktokInput").value.trim(),
        youtube:   document.getElementById("youtubeInput").value.trim()
    };
    localStorage.setItem("contacto", JSON.stringify(contacto));

    const titulo    = document.getElementById("contactoTitulo").value.trim();
    const subtitulo = document.getElementById("contactoSubtitulo").value.trim();
    if (titulo)    localStorage.setItem("contactoTitulo",    titulo);
    if (subtitulo) localStorage.setItem("contactoSubtitulo", subtitulo);

    renderContacto();
    toast("Contacto actualizado ✓");
}

// ===========================
//  LLENAR INPUTS ADMIN
// ===========================
function llenarInputsAdmin() {
    // Hero
    document.getElementById("heroNombre").value    = get("heroNombre",    DEFAULTS.heroNombre);
    document.getElementById("heroSubtitulo").value = get("heroSubtitulo", DEFAULTS.heroSubtitulo);
    document.getElementById("heroTag").value       = get("heroTag",       DEFAULTS.heroTag);
    // Perfil
    document.getElementById("nuevoPerfil").value = get("perfil", DEFAULTS.perfil);
    document.getElementById("stat1num").value    = get("stat1num", DEFAULTS.stat1num);
    document.getElementById("stat1lbl").value    = get("stat1lbl", DEFAULTS.stat1lbl);
    document.getElementById("stat2num").value    = get("stat2num", DEFAULTS.stat2num);
    document.getElementById("stat2lbl").value    = get("stat2lbl", DEFAULTS.stat2lbl);
    document.getElementById("stat3num").value    = get("stat3num", DEFAULTS.stat3num);
    document.getElementById("stat3lbl").value    = get("stat3lbl", DEFAULTS.stat3lbl);
    // Portafolio
    document.getElementById("tituloPortafolio").value = get("tituloPortafolio", DEFAULTS.tituloPortafolio);
    // Contacto
    const c = getJSON("contacto", DEFAULTS.contacto);
    document.getElementById("correoInput").value    = c.correo    || "";
    document.getElementById("telefonoInput").value  = c.telefono  || "";
    document.getElementById("ubicacionInput").value = c.ubicacion || "";
    document.getElementById("instagramInput").value = c.instagram || "";
    document.getElementById("tiktokInput").value    = c.tiktok    || "";
    document.getElementById("youtubeInput").value   = c.youtube   || "";
    document.getElementById("contactoTitulo").value    = get("contactoTitulo",    DEFAULTS.contactoTitulo);
    document.getElementById("contactoSubtitulo").value = get("contactoSubtitulo", DEFAULTS.contactoSubtitulo);
}

// ===========================
//  TOAST
// ===========================
function toast(msg, err = false) {
    let t = document.getElementById("toast");
    if (!t) { t = document.createElement("div"); t.id = "toast"; document.body.appendChild(t); }
    t.textContent = msg;
    t.style.background = err ? "rgba(255,77,28,.15)" : "";
    t.style.borderColor = err ? "var(--accent)" : "";
    t.style.opacity = "0";
    t.style.transform = "translateX(-50%) translateY(12px)";
    requestAnimationFrame(() => {
        t.style.opacity = "1";
        t.style.transform = "translateX(-50%) translateY(0)";
    });
    clearTimeout(t._timer);
    t._timer = setTimeout(() => {
        t.style.opacity = "0";
        t.style.transform = "translateX(-50%) translateY(8px)";
    }, 2500);
}

// ===========================
//  SCROLL ANIMATIONS
// ===========================
function initScrollAnim() {
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.style.opacity = "1";
                e.target.style.transform = "translateY(0)";
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1 });

    const targets = document.querySelectorAll(".perfil-num, .perfil-text, .exp-card, .contact-item, .video-card");
    targets.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(22px)";
        el.style.transition = `opacity .5s ${i * 0.06}s ease, transform .5s ${i * 0.06}s ease`;
        obs.observe(el);
    });
}
