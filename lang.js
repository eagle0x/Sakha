const translations = {
    hi:{
        logo:"e-शाखा पुस्तिका",
        rss:"राष्ट्रीय स्वयंसेवक संघ, हरियाणा",
        home:"मुख्य पृष्ठ",
        discourse:"विमर्श",
        activities:"गतिविधियां",
        news:"समाचार",
        biography:"जीवनी",
        panch:"पंच परिवर्तन"
    },

    en:{
        logo:"e-Shakha Pustika",
        rss:"Rashtriya Swayamsevak Sangh, Haryana",
        home:"Home",
        discourse:"Discourse",
        activities:"Activities",
        news:"News",
        biography:"Biography",
        panch:"Panch Parivartan"
    }
};

let lang = localStorage.getItem("lang") || "hi";

function applyLanguage(){

    document.querySelectorAll("[data-key]")
    .forEach(el=>{

        const key = el.dataset.key;

        if(translations[lang]?.[key]){
            el.textContent =
            translations[lang][key];
        }

    });

    const btn =
    document.getElementById("floatingLangBtn");

    if(btn){

        btn.textContent =
        lang === "hi"
        ? "EN"
        : "हि";

    }
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
