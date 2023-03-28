window.addEventListener('load', () => {
  const selectPhoneContainer = document.getElementById('selectPhoneModelBlock');
  const selectNotebookContainer = document.getElementById('selectNotebookModel');

  selectPhoneContainer.classList.add('noDisplay');
  selectPhoneContainer.classList.remove('form__item');

  selectNotebookContainer.classList.remove('form__item');
  selectNotebookContainer.classList.add('noDisplay');
})

const parent = document.getElementById("select_devices");

const index = {
  1: {value: 'Ноутбуки'},
  2: {value: 'Смарт часы'},
  3: {value: 'Планшеты'},
  4: {value: 'Смартфоны'},
}
for (const key in index) {
  const option = document.createElement("option");
  option.classList.add("select_devices__option");
  option.innerText = `${index[key].value}`;
  parent.appendChild(option);
}

const selectDevice = document.getElementById('select_devices');

selectDevice.addEventListener('change', () => {
    let currentValue = selectDevice.options[selectDevice.selectedIndex].text;

    const selectPhoneContainer = document.getElementById('selectPhoneModelBlock');
    const selectNotebookContainer = document.getElementById('selectNotebookModel');
    const formNamePhoneEmailContainer = document.getElementById('nameEmailPhoneContainer');
    const selectDeviceConfigContainer = document.getElementById('selectDeviceConfigContainer');

    selectPhoneContainer.classList.add('noDisplay');
    selectPhoneContainer.classList.remove('form__item');

    selectNotebookContainer.classList.remove('form__item');
    selectNotebookContainer.classList.add('noDisplay');
    switch (currentValue) {
      case '(не установлено)':
        formNamePhoneEmailContainer.classList.add('noDisplay');
        selectDeviceConfigContainer.classList.add('noDisplay');
        break
      case 'Ноутбуки':
        console.log('выбран ноут')
        selectNotebookContainer.classList.remove('noDisplay');
        selectNotebookContainer.classList.add('form__item');
        selectDeviceConfigContainer.classList.add('noDisplay');
        formNamePhoneEmailContainer.classList.remove('noDisplay');
        break
      case 'Смарт часы':
        console.log('выбраны часы')
        formNamePhoneEmailContainer.classList.remove('noDisplay');
        selectDeviceConfigContainer.classList.remove('noDisplay');

        break
      case 'Планшеты':
        formNamePhoneEmailContainer.classList.remove('noDisplay');
        selectDeviceConfigContainer.classList.remove('noDisplay');
        selectPhoneContainer.classList.remove('noDisplay');

        console.log('выбраны планшеты')
        break
      case 'Смартфоны':
        formNamePhoneEmailContainer.classList.remove('noDisplay');
        console.log('выбраны смартфоны')
        selectPhoneContainer.classList.remove('noDisplay');
        selectPhoneContainer.classList.add('form__item');
        selectDeviceConfigContainer.classList.remove('noDisplay');
        break

    }
  }
)
