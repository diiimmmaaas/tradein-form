window.addEventListener('load', () => {
  const form = document.getElementById('form_smartphones')
  form.addEventListener('submit', formSend)

  async function formSend(e){
    e.preventDefault()

    let formData =  new FormData(form)
    for(var pair of formData.entries()) {
      console.log(pair[0]+ ', '+ pair[1]);
    }
  }


  const nameBlock = document.querySelector('#name_block');
  const selectPhoneModelBlock = document.querySelector('#selectPhoneModelBlock');
  const selectNotebookContainer = document.querySelector('.selectNotebookContainer');
  const selectDeviceConfigContainer = document.querySelector('.selectDeviceConfigContainer');
  const selectOtherPhone = document.querySelector('.selectOtherPhone');



  const selectDevices = document.querySelector('.select_devices');
  const selectPhoneModel = document.querySelector('#select_model');
  const selectSmartphones = document.querySelector('#select_smartphones');
  const selectNotebookDeveloperModel = document.querySelector('.select_notebookDeveloperModel');
  const selectMacbookVersionDiv = document.querySelector('.selectMacbookVersion');
  const selectMacbookVersion = document.querySelector('.select_MacbookVersion');
  const selectWatchDeveloperModel = document.querySelector('.select_watchDeveloperModel');

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function changeMacbookModel() {
    let userChooseMacbookModel = selectNotebookDeveloperModel.options[selectNotebookDeveloperModel.selectedIndex].text;
    if (userChooseMacbookModel === 'Apple') {
      selectMacbookVersionDiv.classList.remove('noDisplay');
      selectNotebookContainer.classList.add('noDisplay');
    } else if (userChooseMacbookModel === 'Другой производитель') {
      selectMacbookVersionDiv.classList.add('noDisplay');
      selectNotebookContainer.classList.remove('noDisplay');
      document.querySelector('.selectMacbookYear').classList.add('noDisplay'); //добавление ноудисплей у года ноута
    }
  }

  function changeMacbookVersion() {
    let userChooseMacbookVersion = selectMacbookVersion.options[selectMacbookVersion.selectedIndex].text;

    let macBookYearBlock = document.querySelector('.selectMacbookYear');
    if (userChooseMacbookVersion !== '(не установлено)') {
      macBookYearBlock.classList.remove('noDisplay')
    } else if (userChooseMacbookVersion === '(не установлено)') {
      macBookYearBlock.classList.add('noDisplay');
    }
  }

  let selectAppleWatchVersion = document.querySelector('.selectAppleWatchVersion');
  let selectSamsungWatchVersion = document.querySelector('.selectSamsungWatchVersion');

  function changeWatchModel() {
    let userChooseWatchVersion = selectWatchDeveloperModel.options[selectWatchDeveloperModel.selectedIndex].text;
    if (userChooseWatchVersion === 'Apple') {
      selectAppleWatchVersion.classList.remove('noDisplay');
      selectSamsungWatchVersion.classList.add('noDisplay');
    } else {
      selectAppleWatchVersion.classList.add('noDisplay');
      selectSamsungWatchVersion.classList.remove('noDisplay');
    }
  }

  selectNotebookDeveloperModel.addEventListener("change", changeMacbookModel)
  selectMacbookVersion.addEventListener("change", changeMacbookVersion)

  selectWatchDeveloperModel.addEventListener('change', changeWatchModel);


  selectDevices.addEventListener('change', () => {
        let currentValue = selectDevices.options[selectDevices.selectedIndex].text;

        // все формы
        let formNotebook = document.querySelector('.form_notebook');
        let formWatch = document.querySelector('.form_watch');
        let formLaptop = document.querySelector('.form_tablet');
        let formSmartphone = document.querySelector('.form_smartphones');

        switch (currentValue) {
          case '(не установлено)':
            formNotebook.classList.add('noDisplay');
            formWatch.classList.add('noDisplay');
            formLaptop.classList.add('noDisplay');
            formSmartphone.classList.add('noDisplay');
            break
          case 'Ноутбуки':
            formNotebook.classList.remove('noDisplay');
            formWatch.classList.add('noDisplay');
            formLaptop.classList.add('noDisplay');
            formSmartphone.classList.add('noDisplay');
            break
          case 'Смарт часы':
            formWatch.classList.remove('noDisplay');
            formNotebook.classList.add('noDisplay');
            formLaptop.classList.add('noDisplay');
            formSmartphone.classList.add('noDisplay');
            break
          case 'Планшеты':
            formWatch.classList.add('noDisplay');
            formNotebook.classList.add('noDisplay');
            formLaptop.classList.remove('noDisplay');
            formSmartphone.classList.add('noDisplay');
            break
          case 'Смартфоны':
            formNotebook.classList.add('noDisplay');
            formWatch.classList.add('noDisplay');
            formLaptop.classList.add('noDisplay');
            formSmartphone.classList.remove('noDisplay');
            break
        }
      }
  )

  selectSmartphones.addEventListener('change', () => {
    let currentValue = selectSmartphones.options[selectSmartphones.selectedIndex].text;

    switch (currentValue) {
      case '(не установлено)':
        selectPhoneModelBlock.classList.add('noDisplay')
        selectDeviceConfigContainer.classList.add('noDisplay')
        nameBlock.classList.add('noDisplay')
        selectOtherPhone.classList.add('noDisplay')
        break
      case 'Apple':
        createSmartphoneSelect(iphones)
        selectOtherPhone.classList.add('noDisplay')
        break
      case 'Samsung':
        createSmartphoneSelect(samsung_phones)
        selectOtherPhone.classList.add('noDisplay')
        break
      case 'Xiaomi':
        createSmartphoneSelect(xiaomi_phones)
        selectOtherPhone.classList.add('noDisplay')
        break
      case 'Huawei':
        createSmartphoneSelect(huawei_phones)
        selectOtherPhone.classList.add('noDisplay')
        break
      case 'OnePlus':
        createSmartphoneSelect(oneplus_phones)
        selectOtherPhone.classList.add('noDisplay')
        break
      case 'Другое':
        selectPhoneModelBlock.classList.add('noDisplay')
        selectOtherPhone.classList.remove('noDisplay')
        break
    }
  })

  function createSmartphoneSelect(object){
    selectPhoneModelBlock.classList.remove('noDisplay')
    removeAllChildNodes(selectPhoneModel)
    for (const key in object) {
      const option = document.createElement("option");
      option.classList.add("select_devices__option");
      option.innerText = `${object[key].value}`;
      selectPhoneModel.appendChild(option);
    }
    selectDeviceConfigContainer.classList.remove('noDisplay')
    nameBlock.classList.remove('noDisplay')
  }
})

// ЭТО ФУНКЦИЯ ДЛЯ РАБОТЫ ПАМЯТИ!!!
const values = [16, 32, 64, 128, 256, 512, 1000];

const inputMemory = document.querySelector('.inputMemory'),
  outputMemory = document.querySelector('.outputMemory');

inputMemory.oninput = function() {
  if (values[this.value] < 1000) {
    outputMemory.innerHTML = values[this.value] + ' GB';
  } else {
    outputMemory.innerHTML = 1 + ' TB'
  }
};

inputMemory.oninput();
