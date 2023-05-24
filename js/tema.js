const url = new URL(document.location);
let id = url.searchParams.get("id");


const temaDiv = document.getElementById('continut-tema');

temeDb.doc(id).get().then(renderTema);

function renderTema(doc) {
    let tema = doc.data();
    let html = "";

    console.log(tema);

    let deleteBtn = "";
    let editBtn = "";

    if (isAdmin() == true) {
        deleteBtn = '<div onclick="sterge()" class="delete"><i class="fas fa-trash"></i></div>';
        editBtn = `<a href="editare.html?id=${id}" class="edit"><i class="fas fa-edit"></i></a>`;
    }

    html = `
    <div class="tema-full">
        <div class="tema-titlu-full">
            <img src="${tema.img}">
            <h1 class="centered"> ${tema.titlul} </h1>

            ${deleteBtn}
            ${editBtn}

        </div>

        <div>
            ${tema.continut}
        </div>
    
        <br/>
        <span id="data">${ formatareData(tema.creat) }</span>
    </div>
    `

    document.getElementById('clasa').innerHTML = tema.clasa;
    document.getElementById('tema-link').innerHTML = tema.titlul;

    temaDiv.innerHTML = html;
}

function sterge() {
    let confirmare = confirm("Sunteti sigur ?");

    if (confirmare == true) {
        temeDb.doc(id).delete().then(redirectTeme);
    }
}

function redirectTeme() {
    window.location = "teme.html";
}