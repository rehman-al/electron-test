const ul = document.querySelector('ul');

// listen for items coming from main
window.electronAPI.getItem((item) => {
    let li = document.createElement('li');
    let liText = document.createTextNode(item);
    li.appendChild(liText);
    ul.appendChild(li);
});

window.electronAPI.removeItem(() => {
    console.log('remove item');
    ul.innerHTML = '';
});

