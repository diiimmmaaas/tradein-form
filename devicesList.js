window.addEventListener('load', () => {
  const selectPhoneContainer = document.getElementById('selectPhoneModelBlock');
  const selectNotebookContainer = document.getElementById('selectNotebookModel');

  selectPhoneContainer.classList.add('noDisplay');
  selectPhoneContainer.classList.remove('form__item');

  selectNotebookContainer.classList.remove('form__item');
  selectNotebookContainer.classList.add('noDisplay');
})

const parent = document.getElementById("select_devices");

const devicesList = {
  1: {value: 'Ноутбуки'},
  2: {value: 'Смарт часы'},
  3: {value: 'Планшеты'},
  4: {value: 'Смартфоны'},
}
for (const key in devicesList) {
  const option = document.createElement("option");
  option.classList.add("select_devices__option");
  option.innerText = `${devicesList[key].value}`;
  parent.appendChild(option);
}

const selectDevice = document.getElementById('select_devices');

selectDevice.addEventListener('change', () => {
  let currentValue = selectDevice.options[selectDevice.selectedIndex].text;

  const selectPhoneContainer = document.getElementById('selectPhoneModelBlock');
  const selectNotebookContainer = document.getElementById('selectNotebookModel');

  selectPhoneContainer.classList.add('noDisplay');
  selectPhoneContainer.classList.remove('form__item');

  selectNotebookContainer.classList.remove('form__item');
  selectNotebookContainer.classList.add('noDisplay');
  switch (currentValue) {
      case 'Ноутбуки':
        console.log('выбран ноут')
        selectNotebookContainer.classList.remove('noDisplay');
        selectNotebookContainer.classList.add('form__item');
        break
      case 'Смарт часы':
        console.log('выбраны часы')
        break
      case 'Планшеты':
        console.log('выбраны планшеты')
        break
      case 'Смартфоны':
        console.log('выбраны смартфоны')
        selectPhoneContainer.classList.remove('noDisplay');
        selectPhoneContainer.classList.add('form__item');
        break
    }
  }
)
