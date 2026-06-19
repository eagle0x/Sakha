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
// const langBtn = document.getElementById("langBtn");

// langBtn.addEventListener("click",()=>{

//     const current =
//     localStorage.getItem("language") || "hi";

//     if(current === "hi"){

//         const combo =
//         document.querySelector(".goog-te-combo");

//         if(!combo) return;

//         combo.value = "en";
//         combo.dispatchEvent(
//             new Event("change")
//         );

//         localStorage.setItem(
//             "language",
//             "en"
//         );

//     }else{

//     localStorage.setItem("language","hi");

//     document.cookie =
//         "googtrans=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;";

//     document.cookie =
//         "googtrans=;domain=" +
//         window.location.hostname +
//         ";path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;";

//     location.reload();

// }

// });

// window.addEventListener("load",()=>{

//     const saved =
//     localStorage.getItem("language");

//     if(saved !== "en") return;

//     const interval = setInterval(()=>{

//         const combo =
//         document.querySelector(".goog-te-combo");

//         if(combo){

//             combo.value = "en";
//             combo.dispatchEvent(new Event("change"));

//             clearInterval(interval);

//         }

//     },500);

// });

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

    [...data]
        .sort((a, b) => b.id - a.id)
        .forEach(article => {

            latestContainer.appendChild(
                createCard(article)
            );

        });

}



/* -------------------------
   CARD
-------------------------- */

function createCard(article){

    const div = document.createElement("div");

    let categoryClass = "";

    switch(article.category){

        case "सुभाषित":
            categoryClass = "subhashit";
            break;

        case "अमृत वचन":
            categoryClass = "amrit";
            break;

        case "गीत":
            categoryClass = "geet";
            break;

        case "प्रेरक प्रसंग":
            categoryClass = "prasang";
            break;
    }

    div.className =
    `card modern-card ${categoryClass}`;

    div.innerHTML = `

        <div class="card-top">

            <span class="card-category ${categoryClass}">
                ${article.category}
            </span>

        </div>

        <h3 class="card-title">
            ${article.title}
        </h3>

        <p class="card-desc">
            ${article.description}
        </p>

        <div class="card-footer">
            पूरा पढ़ें →
        </div>

    `;

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

    const formattedContent = Array.isArray(article.content)
    ? article.content.map(line => {

        line = String(line).trim();

        // blank line
        if(line === ""){
            return "<div class='content-space'></div>";
        }

        // भावार्थ heading
        if(
            line === "भावार्थ :" ||
            line === "भावार्थ:"
        ){
            return `
                <p class="content-line bhaavarth-title">
                    ${line}
                </p>
            `;
        }
        if(line === "गीत सुनें:"){
        return `
            <p class="content-line left-content">
                ${line}
            </p>
            `;
        }

        // youtube links
        if(/^https?:\/\/\S+$/i.test(line)){
            return `
                <p class="content-line left-content">
                    <a href="${line}"
                       target="_blank"
                       rel="noopener noreferrer">
                       ${line}
                    </a>
                </p>
            `;
        }

        return `
            <p class="content-line">
                ${line}
            </p>
        `;

    }).join("")

    : `<p class="content-line">${article.content}</p>`;

    modalBody.innerHTML = `

        <p class="modal-category">
            ${article.category}
        </p>

        <div class="article-content ${
            article.category === "सुभाषित" ||
            article.category === "अमृत वचन" ||
            article.category === "गीत"
                ? "center-content"
                : ""
        }">

            ${formattedContent}

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
   lang
-------------------------- */
const translations = {

    hi: {

        logo: "e-शाखा पुस्तिका",
        front: "शाखा पुस्तिका",
        front1: "राष्ट्र प्रथम • चरित्र निर्माण • संगठन",
        rss: "राष्ट्रीय स्वयंसेवक संघ, हरियाणा",
        content: "लेख",
        lcontent:"नवीनतम सामग्री",

        home: "मुख्य पृष्ठ",
        discourse: "विमर्श",
        activities: "गतिविधियां",
        news: "समाचार",
        biography: "जीवनी",
        panch: "पंच परिवर्तन",

        subhasit: "सुभाषित",
        amrit: "अमृत वचन",
        geet: "गीत",
        story: "प्रेरक प्रसंग",
        name: "शाखा पुस्तिका डिजिटल संस्करण",
        contact: "संपर्क करें..."
    },

    en: {

        logo: "e-Shakha Pustika",
        front: "Shakha Pustika",
        front: "Nation First • Character Building • Organization",
        rss: "Rashtriya Swayamsevak Sangh, Haryana",
        content: "Content",
        lcontent:"Latest Content",
        home: "Home",
        discourse: "Discourse",
        activities: "Activities",
        news: "News",
        biography: "Biography",
        panch: "Panch Parivartan",

        subhasit: "Subhashit",
        amrit: "Amrit Vachan",
        geet: "Geet",
        story: "Inspirational Stories",
        name: "Shakha Pustika Digital Edition",
        contact: "Contact us..."

    }

};

let lang =
localStorage.getItem("lang") || "hi";

function applyLanguage(){

    document
    .querySelectorAll("[data-key]")
    .forEach(el => {

        const key = el.dataset.key;

        if(
            translations[lang] &&
            translations[lang][key]
        ){
            el.textContent =
            translations[lang][key];
        }

    });

    const btn =
    document.getElementById(
    "floatingLangBtn"
    );

    if(btn){

        btn.textContent =
        lang === "hi"
        ? "EN"
        : "हि";

    }

}

applyLanguage();

const floatingBtn =
document.getElementById(
"floatingLangBtn"
);

if(floatingBtn){

    floatingBtn.addEventListener(
    "click",
    () => {

        lang =
        lang === "hi"
        ? "en"
        : "hi";

        localStorage.setItem(
        "lang",
        lang
        );

        applyLanguage();

    }
    );

}
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
