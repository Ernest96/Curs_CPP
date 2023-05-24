const url = new URL(document.location);
let id = url.searchParams.get("id");

let ckeditorDiv = document.getElementById('ckeditor');

const titlulInput = document.getElementById('titlul');
const imgInput = document.getElementById('link-img');
const clasaInput = document.getElementById('clasa-input');

const editareBtn = document.getElementById('editare-btn');

const ordineInput = document.getElementById('ordine');

const formular = document.getElementById('tema-form');

let editor;
let tema;

ClassicEditor.create(ckeditorDiv, {
    mediaEmbed: {
        previewsInData: true
    }
}).then(saveEditor);

temeDb.doc(id).get().then(constructForm);

editareBtn.onclick = function(e) {
    e.preventDefault();

    if (formular.checkValidity() == false) {
        formular.reportValidity();
    }
    else {

        let tema = {
            titlul: titlulInput.value,
            img: imgInput.value,
            clasa: Number(clasaInput.value),
            continut: editor.getData(),
            ordine: ordine.value
        }
        console.log(tema);


        formular.reset();
        temeDb.doc(id).update(tema).then(redirect);
    }
}

function constructForm(doc) {
    tema = doc.data();

    titlulInput.value = tema.titlul;
    imgInput.value = tema.img;
    clasaInput.value = tema.clasa;
    ordineInput.value = tema.ordine;

    editor.setData(tema.continut);
}

function saveEditor(e) {
    editor = e;
}

function redirect() {
    window.location = "tema.html?id=" + id;
}