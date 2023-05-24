const firebaseConfig = {
    apiKey: "AIzaSyCUVoX79jzH62ExCXBtFT4Fn99ChrskBwc",
    authDomain: "cursuri-3547a.firebaseapp.com",
    projectId: "cursuri-3547a",
    storageBucket: "cursuri-3547a.appspot.com",
    messagingSenderId: "605416695499",
    appId: "1:605416695499:web:718be4a4cc2e8b925e5d4e",
    measurementId: "G-P5HY8JNDYT"
};

const postareBtn = document.getElementById('postare-btn');
const admin = "r96lp5aR88NIBOxFELMR7RpDQ7u1";

firebase.initializeApp(firebaseConfig);

// referinta la serviciul de autentificare
const auth = firebase.auth();

// referinta la baza de date
const db = firebase.firestore();

// referinta la colectia teme din Baza de date
const temeDb = db.collection("teme");

let user = null;

const yearElement = document.getElementById('year');

if (yearElement) {
    let date = new Date();
    
    yearElement.innerHTML = date.getDate() + "/" + (date.getMonth() + 1) + "/" +  date.getFullYear() + " ©";
}

function mobileMenu() {
    var x = document.getElementById("navbar");
    if (x.className === "") {
        x.className = "mobile";
    } else {
        x.className = "";
    }
}

function refresh() {
    window.location.reload();
}

function isAdmin() {
    if (user == null) {
        return false;
    }

    return admin == user.uid;
}

function formatareData(stamp) {

    let data = new Date(stamp);

    let an = data.getFullYear();
    let luna = data.getMonth() + 1;
    let zi = data.getDate();

    let result = zi + "-" + luna + "-" + an;
    
    return result;
}

auth.onAuthStateChanged( function(fuser) {
    user = fuser;
    
    if (isAdmin() == true) {
        postareBtn.style.display = "block";
    }
    else {
        postareBtn.style.display = "none";
    }

    document.querySelector("body").style.display = "block";
});