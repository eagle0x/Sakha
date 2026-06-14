// DEVELOPMENT MODE ONLY

if ('serviceWorker' in navigator) {

    navigator.serviceWorker.getRegistrations()
    .then(registrations => {

        for (const registration of registrations) {

            registration.unregister();

        }

    });

    caches.keys().then(names => {

        names.forEach(name => {

            caches.delete(name);

        });

    });

}
const latestContainer =
document.getElementById("latestContainer");

/*const featuredContainer =
document.getElementById("featuredContainer");

const songsContainer =
document.getElementById("songsContainer");*/

const searchInput =
document.getElementById("searchInput");

const themeBtn =
document.getElementById("themeBtn");
const menuBtn =
document.getElementById("menuBtn");

const navLinks =
document.getElementById("navLinks");
const modal =
document.getElementById("articleModal");

const modalTitle =
document.getElementById("modalTitle");

const modalBody =
document.getElementById("modalBody");

const closeModal =
document.getElementById("closeModal");

let allArticles = [];

/* -------------------------
   MOBILE MENU
-------------------------- */

menuBtn.addEventListener(
"click",
()=>{

    navLinks.classList.toggle(
    "show"
    );

});
/* -------------------------
   LANG BUTTON
-------------------------- */
const langBtn =
document.getElementById("langBtn");

let currentLang =
localStorage.getItem("language") || "hi";

updateLangButton();

langBtn?.addEventListener("click",()=>{

    currentLang =
    currentLang === "hi"
    ? "en"
    : "hi";

    localStorage.setItem(
        "language",
        currentLang
    );

    updateLangButton();

    translatePage(currentLang);

});

function updateLangButton(){

    if(!langBtn) return;

    langBtn.textContent =
    currentLang === "hi"
    ? "EN"
    : "हि";
}
/* -------------------------
   DARK MODE
-------------------------- */

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
}

themeBtn.addEventListener("click",()=>{

    document.body.classList.toggle("dark");

    localStorage.setItem(
        "theme",
        document.body.classList.contains("dark")
        ? "dark"
        : "light"
    );

});



/* -------------------------
   LOAD JSON
-------------------------- */

async function loadContent(){

    try{

        const res =
        await fetch("articles/content.json");

        const data =
        await res.json();

        allArticles = data;

        renderArticles(data);

        updateStats(data);

    }
    catch(err){

        console.error(err);

    }

}



/* -------------------------
   RENDER
-------------------------- */

function renderArticles(data){

    latestContainer.innerHTML = "";
    /*featuredContainer.innerHTML = "";
    songsContainer.innerHTML = "";*/

    [...data].reverse().forEach(article=>{

        const card = createCard(article);

        /*if(article.featured){

            featuredContainer.appendChild(
                card.cloneNode(true)
            );

        }

        if(article.category === "गीत"){

            songsContainer.appendChild(
                card.cloneNode(true)
            );

        }*/

        latestContainer.appendChild(card);

    });

}



/* -------------------------
   CARD
-------------------------- */

function createCard(article){

    const div =
    document.createElement("div");

    div.className = "card";

    div.innerHTML = `

        <img
        src="${article.image}"
        alt="${article.title}"
        loading="lazy">

        <div class="card-body">

            <span class="badge">
                ${article.category}
            </span>

            <h3>
                ${article.title}
            </h3>

            <p>
                ${article.description}
            </p>


        </div>

    `;

    div.style.cursor = "pointer";

div.addEventListener("click",()=>{

    openArticle(article);

    });

    return div;

}



/* -------------------------
   OPEN ARTICLE
-------------------------- */

function openArticle(article){

    modal.style.display = "block";

    document.body.style.overflow = "hidden";

    modalTitle.innerText = article.title;

    modalBody.innerHTML = `

        <img
    src="${article.image}"
    alt="${article.title}">

        <p style="
            color:var(--muted);
            margin-bottom:15px;
        ">

            ${article.category}

        </p>

        <div style="
            line-height:2;
            font-size:1.05rem;
        ">

            ${article.content}

        </div>

    `;
}



/* -------------------------
   CLOSE MODAL
-------------------------- */

closeModal.onclick = ()=>{

    modal.style.display = "none";

    document.body.style.overflow = "";

};

window.onclick = e=>{

    if(e.target === modal){

        modal.style.display = "none";

        document.body.style.overflow = "";

    }

};



/* -------------------------
   SEARCH
-------------------------- */

const categoryAliases = {

    "गीत":
    "song geet prayer",

    "सुभाषित":
    "subhashit sanskrit quote thought",

    "अमृत वचन":
    "quote inspiration motivation",

    "प्रेरक प्रसंग":
    "story incident inspiration",

};

searchInput.addEventListener("input",()=>{

    const query =
    searchInput.value.toLowerCase();

    const filtered =
    allArticles.filter(article=>{

        const aliases =

            categoryAliases[
                article.category
            ] || "";

        return (

            article.title
            .toLowerCase()
            .includes(query)

            ||

            article.description
            .toLowerCase()
            .includes(query)

            ||

            article.category
            .toLowerCase()
            .includes(query)

            ||

            aliases
            .toLowerCase()
            .includes(query)

            ||

            (
                article.keywords || ""
            )
            .toLowerCase()
            .includes(query)

        );

    });

    renderArticles(filtered);

});

/* -------------------------
   FILTER CHIPS
-------------------------- */

const chips =
document.querySelectorAll(".chip");

chips.forEach(chip=>{

    chip.addEventListener("click",()=>{

        chips.forEach(c=>{

            c.classList.remove("active");

        });

        chip.classList.add("active");

        const category =
        chip.innerText.trim();

        if(category === "सभी"){

            renderArticles(allArticles);

            return;

        }

        const filtered =
        allArticles.filter(item=>
            item.category === category
        );

        renderArticles(filtered);

    });

});



/* -------------------------
   STATS
-------------------------- */

function updateStats(data){

    document.getElementById(
    "totalArticles"
    ).innerText =
    data.length;

    document.getElementById(
    "totalSubhashit"
    ).innerText =
    data.filter(
    a => a.category === "सुभाषित"
    ).length;

    document.getElementById(
    "totalSongs"
    ).innerText =
    data.filter(
    a => a.category === "गीत"
    ).length;

    document.getElementById(
    "totalQuotes"
    ).innerText =
    data.filter(
    a => a.category === "अमृत वचन"
    ).length;

    document.getElementById(
    "totalPrasang"
    ).innerText =
    data.filter(
    a => a.category === "प्रेरक प्रसंग"
    ).length;
}



/* -------------------------
   RANDOM QUOTE
-------------------------- */

function randomQuote(){

const quotes = [

"उठो जागो और लक्ष्य प्राप्ति तक मत रुको।",

"स्वयं को कमजोर समझना सबसे बड़ा पाप है।",

"एक विचार लो, उसी विचार को अपना जीवन बना लो।",

"राष्ट्र सर्वोपरि है।",

"चरित्र ही मनुष्य की सबसे बड़ी शक्ति है।"

];

document.getElementById(
"dailyQuote"
).innerText =

quotes[
Math.floor(
Math.random() *
quotes.length
)
];

}

randomQuote();



/* -------------------------
   CHECK FOR UPDATES
-------------------------- */

if("serviceWorker" in navigator){

    navigator.serviceWorker
    .register("./sw.js")

    .then(reg => {

        reg.update();

        setInterval(() => {

            reg.update();

        }, 300000);

    });

}


/* -------------------------
   INIT
-------------------------- */

loadContent();
