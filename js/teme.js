const claseDiv = document.getElementById('clase');

temeDb.onSnapshot(extragereTeme);

function extragereTeme(snapshot) {
    console.log(snapshot);

    let docs = snapshot.docs;
    let temeClasa = {};

    for (let i = 0; i < docs.length; i++) {
        let tema = docs[i].data();
        tema.id = docs[i].id;

        console.log(tema);

        if (!(tema.clasa in temeClasa)) {
            temeClasa[tema.clasa] = [];
        }

        temeClasa[tema.clasa].push(tema);
    }

    console.log(temeClasa);
    renderClase(temeClasa);
}

function renderClase(temeClasa) {
    let html = "";

    // trecem prin fiecare grup
    // parcurgem fiecare cheie din temeClasa
    for (let clasa in temeClasa) {
        html += `
            <details>
            <summary>Clasa ${clasa}</summary>
            <div class="module">
        `

        temeClasa[clasa].sort(compar);

        // Afisam toate temele din acest grup
        for (let tema of temeClasa[clasa]) {
            html += `
                <a class="modul" href="tema.html?id=${tema.id}">
                    <img src="${tema.img}">
                    <div class="modul-titlu">
                     ${tema.titlul}
                    </div>
                </a>
            `
        }

        // incheiem construirea grupului
        html += `
            </div>
            </details>
        `
        
        //mergem la urmatorul grup
    }

    claseDiv.innerHTML = html;
}

function compar(a, b) {
    return a.ordine - b.ordine;
}