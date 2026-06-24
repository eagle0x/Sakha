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
        txtj:"महापुरुषों की जीवनी",
        ca:"📰 वर्तमान मामले",
        txtca:"इस सप्ताह की प्रमुख घटनाएँ एवं समसामयिक विषय",
        all:"सभी",
        nat:"राष्ट्रीय",
        inat:"अंतरराष्ट्रीय",
        game:"खेल",
        sc:"विज्ञान",
        eco:"अर्थव्यवस्था",
        env:"पर्यावरण",
        name: "शाखा पुस्तिका डिजिटल संस्करण",
        contact: "संपर्क करें..."
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
        txtj: "Biographies of Great Personalities",
        ca: "📰 Current Affairs",
        txtca: "News of the Week",
        all:"All",
        nat:"National",
        inat:"International",
        game:"Games",
        sc:"Science",
        eco:"Economy",
        env:"Enviroment",
        name: "Shakha Pustika Digital Edition",
        contact: "Contact us..."
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
