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

    data.forEach(article=>{

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

    window.location.href =
    `article.html?id=${article.id}`;

    });

    return div;

}



/* -------------------------
   OPEN ARTICLE
-------------------------- */

function openArticle(article){

    modal.style.display = "block";

    modalTitle.innerText =
    article.title;

    modalBody.innerHTML = `

        <img
        src="${article.image}"
        style="
        width:100%;
        border-radius:15px;
        margin-bottom:20px;">

        <p style="
        line-height:2;
        font-size:1.05rem;">

        ${article.content}

        </p>

    `;

}



/* -------------------------
   CLOSE MODAL
-------------------------- */

closeModal.onclick = ()=>{

    modal.style.display = "none";

};

window.onclick = e=>{

    if(e.target === modal){

        modal.style.display = "none";

    }

};



/* -------------------------
   SEARCH
-------------------------- */

searchInput.addEventListener(
"input",
function(){

    const q =
    this.value.toLowerCase();

    const filtered =
    allArticles.filter(item=>{

        return (

            item.title
            .toLowerCase()
            .includes(q)

            ||

            item.description
            .toLowerCase()
            .includes(q)

            ||

            item.category
            .toLowerCase()
            .includes(q)

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
    "totalSongs"
    ).innerText =
    data.filter(
    a=>a.category==="गीत"
    ).length;

    document.getElementById(
    "totalQuotes"
    ).innerText =
    data.filter(
    a=>a.category==="अमृत वचन"
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
   PWA READY
-------------------------- */

if("serviceWorker" in navigator){

window.addEventListener(
"load",
()=>{

navigator.serviceWorker
.register(
"./sw.js"
);

});

}



/* -------------------------
   INIT
-------------------------- */

loadContent();
