window.addEventListener('load', () => {
  // const form = document.getElementById('form')
  // form.addEventListener('submit', formSend)
  //
  // async function formSend(e){
  //   e.preventDefault()
  //
  //   let formData =  new FormData(form)
  //   for(var pair of formData.entries()) {
  //     console.log(pair[0]+ ', '+ pair[1]);
  //   }
  // }


  const contentBlock = document.querySelector('.content');
  const nameBlock = document.querySelector('.name_block');
  const selectWatchContainer = document.querySelector('.selectWatchContainer');
  const selectSmartphonesContainer = document.querySelector('.selectSmartphonesContainer');
  const selectPhoneModelBlock = document.querySelector('.selectPhoneModelBlock');
  const selectNotebookDeveloperContainer = document.querySelector('.selectNotebookDeveloperContainer');
  const selectNotebookContainer = document.querySelector('.selectNotebookContainer');
  const selectDeviceConfigContainer = document.querySelector('.selectDeviceConfigContainer');



  const selectDevices = document.querySelector('.select_devices');
  const selectPhoneModel = document.querySelector('.select_model');
  const selectSmartphones = document.querySelector('.select_smartphones');
  const selectWatches = document.querySelector('.select_watches');
  const selectNotebookDeveloperModel = document.querySelector('.select_notebookDeveloperModel');
  const selectMacbookVersionDiv = document.querySelector('.selectMacbookVersion');
  const selectMacbookVersion = document.querySelector('.select_MacbookVersion');

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

  selectNotebookDeveloperModel.addEventListener("change", changeMacbookModel)
  selectMacbookVersion.addEventListener("change", changeMacbookVersion)

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
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
    selectDeviceConfigContainer.classList.remove('noDisplay')
    nameBlock.classList.remove('noDisplay')
  }

  selectDevices.addEventListener('change', () => {
        let currentValue = selectDevices.options[selectDevices.selectedIndex].text;

        // все формы
        let formNotebook = document.querySelector('.form_notebook');
        // let formWatch = document.querySelector('');
        // let formLaptop = document.querySelector('');
        // let formSmartphone = document.querySelector('');

        switch (currentValue) {
          case '(не установлено)':
            formNotebook.classList.add('noDisplay');
            break
          case 'Ноутбуки':
            formNotebook.classList.remove('noDisplay');
            break
          case 'Смарт часы':
            contentBlock.classList.remove('noDisplay')
            selectWatchContainer.classList.remove('noDisplay')
            selectSmartphonesContainer.classList.add('noDisplay')
            selectPhoneModelBlock.classList.add('noDisplay')
            selectNotebookDeveloperContainer.classList.add('noDisplay')
            break
          case 'Планшеты':
            contentBlock.classList.remove('noDisplay')
            break
          case 'Смартфоны':
            contentBlock.classList.remove('noDisplay')
            selectWatchContainer.classList.add('noDisplay')
            selectSmartphonesContainer.classList.remove('noDisplay')
            selectPhoneModelBlock.classList.add('noDisplay')
            selectNotebookDeveloperContainer.classList.add('noDisplay')
            break
        }
      }
  )

//   selectSmartphones.addEventListener('change', () => {
//     let currentValue = selectSmartphones.options[selectSmartphones.selectedIndex].text;
//
//     switch (currentValue) {
//       case '(не установлено)':
//         selectPhoneModelBlock.classList.add('noDisplay')
//         selectDeviceConfigContainer.classList.add('noDisplay')
//         nameBlock.classList.add('noDisplay')
//         break
//       case 'Apple':
//         createSmartphoneSelect(iphones)
//         break
//       case 'Samsung':
//         createSmartphoneSelect(samsungPhones)
//         break
//       case 'Xiaomi':
//
//         break
//       case 'Huawei':
//
//         break
//       case 'OnePlus':
//
//         break
//     }
//   })
//
//   selectNotebookDeveloperModel.addEventListener('change', () => {
//     let currentValue = selectNotebookDeveloperModel.options[selectNotebookDeveloperModel.selectedIndex].text;
//
//     switch (currentValue) {
//       case '(не установлено)':
//         break
//       case 'Apple':
//         break
//       case 'Другой производитель':
//         selectNotebookContainer.classList.remove('noDisplay')
//         break
//     }
//   })
})

// ЭТО ФУНКЦИЯ ДЛЯ РАБОТЫ ПАМЯТИ!!!

const values = [16, 32, 64, 128, 256, 512, 1000];

const inputMemory = document.querySelector('.inputMemory'),
  outputMemory = document.querySelector('.outputMemory');

console.log(outputMemory)
console.log(inputMemory)

inputMemory.oninput = function() {
  // outputMemory.innerHTML = values[this.value];
  if (values[this.value] < 1000) {
    outputMemory.innerHTML = values[this.value] + ' GB';
  } else {
    outputMemory.innerHTML = 1 + ' TB'
  }
};

// set the default value
inputMemory.oninput();
