const translations = {
    hi:{
        logo:"e-शाखा पुस्तिका",
        rss:"राष्ट्रीय स्वयंसेवक संघ, हरियाणा",
        home:"मुख्य पृष्ठ",
        discourse:"विमर्श",
        activities:"गतिविधियां",
        news:"समाचार",
        biography:"जीवनी",
        panch:"पंच परिवर्तन",
        sod: "विमर्श के विषय",
        txt: "शाखा में होने वाले वैचारिक विमर्श के प्रमुख विषय",
        txtj:"महापुरुषों की जीवनी"
    },

    en:{
        logo:"e-Shakha Pustika",
        rss:"Rashtriya Swayamsevak Sangh, Haryana",
        home:"Home",
        discourse:"Discourse",
        activities:"Activities",
        news:"News",
        biography:"Biography",
        panch:"Panch Parivartan",
        sod: "Subject of Discourse",
        txt: "Main Subjects of Ideological Discourse in the Shakha",
        txtj: "Biographies of Great Personalities"
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
