const form = document.querySelector('form');
const items = document.getElementById('item');
form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(e) {
    e.preventDefault();
   const itemValue = items.value
    window.electronAPI.sendItem(itemValue)



}