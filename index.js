window.addEventListener('load', () => {
  const form = document.getElementById('form')
  form.addEventListener('submit', formSend)

  async function formSend(e){
    e.preventDefault()

    let formData =  new FormData(form)
    for(var pair of formData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
    }
  }
})

const contentBlock = document.getElementById('content');
const selectDeviceConfigContainer = document.getElementById('selectDeviceConfigContainer');
const selectDevices = document.getElementById('select_devices');
const selectDeveloperSmartphones = document.getElementById('selectSmartphonesContainer');
const selectPhoneModelBlock = document.getElementById('selectPhoneModelBlock');
const selectPhoneModel = document.getElementById('select_model');
const selectSmartphones = document.getElementById('select_smartphones');
const selectWatches = document.getElementById('select_watches');
const selectNotebook = document.getElementById('select_notebook');
const nameBlock = document.getElementById('name_block');

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function createNotebookForm(){
  selectNotebook.classList.remove('noDisplay')
  nameBlock.classList.remove('noDisplay')
}

function createSmartphonesForm(){
  selectDeviceConfigContainer.classList.remove('noDisplay')
  nameBlock.classList.remove('noDisplay')
}

function createSmartphoneSelect(object){
  selectPhoneModelBlock.classList.remove('noDisplay')
  removeAllChildNodes(selectPhoneModel)
  for (const key in object) {
    const option = document.createElement("option");
    option.classList.add("select_devices__option");
    option.innerText = `${object[key].value}`;
    selectPhoneModel.appendChild(option);
  }
  createSmartphonesForm()
}

selectSmartphones.addEventListener('change', () => {
  let currentValue = selectSmartphones.options[selectSmartphones.selectedIndex].text;

  switch (currentValue) {
    case '(не установлено)':
      selectPhoneModelBlock.classList.add('noDisplay')
      selectDeviceConfigContainer.classList.add('noDisplay')
      nameBlock.classList.add('noDisplay')
      break
    case 'Apple':
      createSmartphoneSelect(iphones)
      break
    case 'Samsung':
      createSmartphoneSelect(samsungPhones)
      break
    case 'Xiaomi':

      break
    case 'Huawei':

      break
  }
})

selectDevices.addEventListener('change', () => {
    let currentValue = selectDevices.options[selectDevices.selectedIndex].text;

    switch (currentValue) {
      case '(не установлено)':
        contentBlock.classList.add('noDisplay')
        break
      case 'Ноутбуки':
        contentBlock.classList.remove('noDisplay')
        selectNotebook.classList.remove('noDisplay')
        selectDeveloperSmartphones.classList.add('noDisplay')
        break
      case 'Смарт часы':
        contentBlock.classList.remove('noDisplay')
        break
      case 'Планшеты':
        contentBlock.classList.remove('noDisplay')
        break
      case 'Смартфоны':
        contentBlock.classList.remove('noDisplay')
        selectDeveloperSmartphones.classList.remove('noDisplay')
        break
    }
  }
)
