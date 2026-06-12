const params =
new URLSearchParams(
window.location.search
);

const newsId =
params.get("id");

async function loadNews(){

    const res =
    await fetch(
        "articles/current-affairs.json"
    );

    const data =
    await res.json();

    const article =
    data.find(
        n => n.id == newsId
    );

    if(!article){

        document.body.innerHTML =

        "<h1 style='padding:50px'>समाचार नहीं मिला</h1>";

        return;

    }

    document.getElementById(
        "articleContainer"
    ).innerHTML = `

        <span class="article-category">

            ${article.category}

        </span>

        <h1 class="article-title">

            ${article.title}

        </h1>

        <div class="article-meta">

            📅 ${article.date}

        </div>

        <img
        src="${article.image}"
        class="article-cover">

        <div class="article-body">

            ${article.content}

        </div>

        <div class="article-actions">

            <button
            class="action-btn"
            onclick="shareArticle()">

                📤 शेयर

            </button>

            <button
            class="action-btn"
            onclick="printArticle()">

                🖨️ PDF

            </button>

        </div>

    `;

    renderRelated(
        data,
        article
    );

}

function renderRelated(
    all,
    current
){

    const related =

        all.filter(

            item =>

            item.category ===
            current.category

            &&

            item.id !== current.id

        )

        .slice(0,4);

    document.getElementById(
        "relatedNews"
    ).innerHTML =

    related.map(item => `

        <a
        href="current-article.html?id=${item.id}"
        style="text-decoration:none;color:inherit;">

            <div class="related-card">

                <img src="${item.image}">

                <div class="related-card-content">

                    <h3>

                        ${item.title}

                    </h3>

                    <p>

                        ${item.description}

                    </p>

                </div>

            </div>

        </a>

    `).join("");

}

function shareArticle(){

    if(navigator.share){

        navigator.share({

            title:
            document.title,

            url:
            window.location.href

        });

    }

}

function printArticle(){

    window.print();

}

/* Theme */

const themeBtn =
document.getElementById(
    "themeBtn"
);

if(
    localStorage.getItem(
        "theme"
    ) === "dark"
){

    document.body.classList.add(
        "dark"
    );

}

themeBtn.addEventListener(
"click",
()=>{

    document.body.classList.toggle(
        "dark"
    );

    localStorage.setItem(

        "theme",

        document.body.classList.contains(
            "dark"
        )

        ? "dark"

        : "light"

    );

});

/* Progress Bar */

window.addEventListener(
"scroll",
()=>{

    const winScroll =

    document.documentElement
    .scrollTop;

    const height =

    document.documentElement
    .scrollHeight

    -

    document.documentElement
    .clientHeight;

    document.getElementById(
        "progressBar"
    ).style.width =

    (winScroll/height)*100

    + "%";

});

loadNews();
