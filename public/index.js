
const BASE = window.location.href;
const delay = (t) => new Promise(resolve => setTimeout(resolve, t));

/**
 * Zoom items in grid
 * @param {event} e DOM event
 */
function zoom(e) {
  const main = document.querySelector('main');
  document.querySelectorAll('.lens').forEach(lens => {
    lens.style.width = `${e.target.value/3}px`
  })
  main.style.gridTemplateColumns = 
    `repeat(auto-fit, minmax(${e.target.value}px, ${e.target.value}px))`
}

function dragOverHandler(ev) {
  if (ev.target.id == "drop_zone") 
    
   // Drop box hover
  ev.target.setAttribute('class', 'hover');

  ev.preventDefault();
}


function dropHandler(ev) {
  ev.preventDefault();
  
   // Drop box hover
  if (ev.target.id == "drop_zone") 
    ev.target.setAttribute('class', '')

  // upload files
  handleFiles(ev.dataTransfer.files)
}

async function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    await uploadFile(files[i]);
  }

  location.reload();
}

async function uploadFile(file) {
  let url = `${BASE}/upload?file=${file.name}`
  let text = await file.text();

  return await fetch(url, {
    method: 'POST',
    body: text,
    mode: 'no-cors',
    headers: {
      'Accept': 'text/plain',
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

function openDialog() {
  const fileSelector = document.createElement('input');
  fileSelector.setAttribute('type', 'file');
  fileSelector.setAttribute('multiple', 'true');
  fileSelector.addEventListener('change',async (e) => {
    await handleFiles(e.target.files);
  })
  fileSelector.click()
}

/**
 * Download a file from the server
 * 
 * @param {string} dataurl The url to download 
 * @param {string} filename the name of the file
 */
function download(dataurl, filename) {

  var a = document.createElement("a");
  a.download = filename
  a.setAttribute('href', dataurl);

  a.click();
  return false;
}

function remove_item(event) {

  let elem = event.target;
  do { elem = elem.parentNode; } while
   (!elem.classList.contains("item-container"));

  fetch(`${BASE}/delete?file=${event.target.id}`, {
    method: 'GET',
    mode: 'no-cors',
    headers: {
      'Accept': 'text/plain',
      'Content-Type': 'text/plain',
      'Access-Control-Allow-Origin': '*'
    }
  }).then(x => {
    elem.classList.add('hide');
    
    setTimeout(() => elem.remove(), 200)
  });
}

function download_file(e, ext) {
  let filename = e.target.id.split('.')[0];
  
  download(
    `${BASE}/download/${ext}/${filename}.${ext}?id=${0}`, filename + `.${ext}`
  )
}