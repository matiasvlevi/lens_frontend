
const BASE = 'http://127.0.0.1:4567';

function dropHandler(ev) {
    console.log("File(s) dropped");
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();

    if (ev.target.id == "drop_zone") 
      ev.target.setAttribute('class', '')

    handleFiles(ev.dataTransfer.files)
}

function handleFiles(files) {
    ([...files]).forEach(uploadFile)
}

async function uploadFile(file) {
    let url = `${BASE}/upload?file=${file.name}&id=0`
    let text = await file.text();
    console.log(text)

    fetch(url, {
      method: 'POST',
      body: text,
      mode: 'no-cors',
      headers: {
        'Accept': 'text/plain',
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then(() => { 
        location.reload();
    })
    .catch(() => { /* Error. Inform the user */ })
}

function openDialog() {
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.addEventListener('change',e => {
        console.log(e.target.files[0])
        uploadFile(e.target.files[0])
    })
    fileSelector.click()
}

function dragOverHandler(ev) {
   // console.log("File(s) in drop zone");

   if (ev.target.id == "drop_zone") 
    ev.target.setAttribute('class', 'hover')

    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
}



function download(dataurl, filename) {

    var a = document.createElement("a");
    a.download = filename
    a.setAttribute('href', dataurl);

    console.log(a)
    a.click();
    return false;
}

function remove_item(event) {
  fetch(`${BASE}/delete?file=${event.target.id}`).then(x => location.reload());
}

function download_svg(e) {
    console.log(e.target)
    let filename = e.target.id.split('.')[0];
    
    const BASE = 'http://127.0.0.1:4567';
    download(`${BASE}/download/svg/${filename}.svg?id=${0}`, filename + '.svg')
}
