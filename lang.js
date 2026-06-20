const translations = {...};

let lang =
localStorage.getItem("lang") || "hi";

function applyLanguage(){

    document
    .querySelectorAll("[data-key]")
    .forEach(el=>{

        const key = el.dataset.key;

        if(translations[lang]?.[key]){
            el.textContent =
            translations[lang][key];
        }

    });

}

applyLanguage();

document
.getElementById("floatingLangBtn")
?.addEventListener("click",()=>{

    lang =
    lang === "hi"
    ? "en"
    : "hi";

    localStorage.setItem(
        "lang",
        lang
    );

    applyLanguage();

});
