let ckeditorDiv = document.getElementById('ckeditor');

const titlulInput = document.getElementById('titlul');
const imgInput = document.getElementById('link-img');
const clasaInput = document.getElementById('clasa-input');
const creareBtn = document.getElementById('creare-btn');

const ordineInput = document.getElementById('ordine');

const formular = document.getElementById('tema-form');
let editor;

ClassicEditor.create(ckeditorDiv, {
    mediaEmbed: {
        previewsInData: true
    }
}).then(saveEditor);

creareBtn.onclick = function(e) {
    e.preventDefault();

    if (formular.checkValidity() == false) {
        formular.reportValidity();
    }
    else {

        let data = new Date();

        let tema = {
            titlul: titlulInput.value,
            img: imgInput.value,
            clasa: Number(clasaInput.value),
            continut: editor.getData(),
            creat: data.getTime(),
            ordine: ordine.value
        }
        console.log(tema);


        formular.reset();
        temeDb.add(tema).then(redirect);
    }
}

function saveEditor(e) {
    editor = e;
}

function redirect(doc) {
    window.location = "tema.html?id=" + doc.id;
}
