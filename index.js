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


  const contentBlock = document.getElementById('content');
  const nameBlock = document.getElementById('name_block');
  const selectWatchContainer = document.getElementById('selectWatchContainer');
  const selectSmartphonesContainer = document.getElementById('selectSmartphonesContainer');
  const selectPhoneModelBlock = document.getElementById('selectPhoneModelBlock');
  const selectNotebookDeveloperContainer = document.getElementById('selectNotebookDeveloperContainer');
  const selectNotebookContainer = document.getElementById('selectNotebookContainer');
  const selectDeviceConfigContainer = document.getElementById('selectDeviceConfigContainer');



  const selectDevices = document.getElementById('select_devices');
  const selectPhoneModel = document.getElementById('select_model');
  const selectSmartphones = document.getElementById('select_smartphones');
  const selectWatches = document.getElementById('select_watches');
  const selectNotebookDeveloperModel = document.getElementById('select_notebookDeveloperModel');

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

        switch (currentValue) {
          case '(не установлено)':
            contentBlock.classList.add('noDisplay')
            break
          case 'Ноутбуки':
            contentBlock.classList.remove('noDisplay')
            selectWatchContainer.classList.add('noDisplay')
            selectSmartphonesContainer.classList.add('noDisplay')
            selectPhoneModelBlock.classList.add('noDisplay')
            selectNotebookDeveloperContainer.classList.remove('noDisplay')
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
      case 'OnePlus':

        break
    }
  })

  selectNotebookDeveloperModel.addEventListener('change', () => {
    let currentValue = selectNotebookDeveloperModel.options[selectNotebookDeveloperModel.selectedIndex].text;

    switch (currentValue) {
      case '(не установлено)':
        break
      case 'Apple':
        break
      case 'Другой производитель':
        selectNotebookContainer.classList.remove('noDisplay')
        break
    }
  })
})




