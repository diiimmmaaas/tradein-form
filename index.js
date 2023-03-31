window.addEventListener("load", () => {
  let wrapper = document.querySelector(".wrapper");
  let formSmartphones = document.getElementById("form_smartphones");
  formSmartphones.addEventListener("submit",(e) => formSend(e, formSmartphones));

  async function formSend(e, form) {
    e.preventDefault();

    let error = formValidate(form);
    let formData = new FormData(form);
    if (error   === 0){
      const resultObj = {}
      for (var pair of formData.entries()) {
          resultObj[pair[0]] = pair[1]
      }
      console.log(resultObj);


      // wrapper.classList.add('_sending')
      //
      // let response = await fetch('sendmail.php', {
      //   method: 'POST',
      //   body: formData
      // })
      // if (response.ok){
      //   let result = await response.json()
      //   alert(result.message)
      //   formSmartphones.reset()
      //   wrapper.classList.remove('_sending')
      // } else {
      //   alert("Ошибка")
      //   wrapper.classList.remove('_sending')
      // }
    } else {
      alert('Заполните обязательные поля')
    }
  }

  function formValidate(form) {
    let error = 0;
    let formReq = document.querySelectorAll("._req");

    for (let i = 0; i < formReq.length; i++) {
      const element = formReq[i];
      formRemoveError(element);
      formRemoveErrorParentElement(element)

      if (element.classList.contains("_email")) {
        if (emailTest(element)) {
          formAddError(element);
          error++;
        }
      } else if (element.getAttribute("type") === 'checkbox' && element.checked === false){
        formAddError(element);
        formAddErrorParentElement(element);
        error++;
      } else {
        if (element.value === ''){
          formAddError(element);
          error++;
        }
        if (element.value === 'notSelected'){
          formAddError(element);
          error++;
        }
      }
    }
    return error;
  }

  function formAddError(input) {
    input.classList.add("_error");
  }

  function formAddErrorParentElement(input) {
    input.parentElement.classList.add("_error");
  }

  function formRemoveError(input) {
    input.classList.remove("_error");
  }

  function formRemoveErrorParentElement(input) {
    input.parentElement.classList.remove("_error");
  }

  function emailTest(input) {
    return !/^\w+([\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
  }


  const nameBlock = document.querySelector("#name_block");
  const selectPhoneModelBlock = document.querySelector("#selectPhoneModelBlock");
  const selectNotebookContainer = document.querySelector(".selectNotebookContainer");
  const selectDeviceConfigContainer = document.querySelector(".selectDeviceConfigContainer");
  const selectOtherPhone = document.querySelector(".selectOtherPhone");

  const smartphonesCategory = document.querySelector(".smartphones_category");
  const watchCategory = document.querySelector(".watch_category");
  const notebookCategory = document.querySelector(".notebook_category");
  const tabletCategory = document.querySelector(".tablet_category");

  const selectDevices = document.querySelector(".select_devices");
  const selectPhoneModel = document.querySelector("#select_model");
  const selectSmartphones = document.querySelector("#select_smartphones");
  const selectNotebookDeveloperModel = document.querySelector(".select_notebookDeveloperModel");
  const selectMacbookVersionDiv = document.querySelector(".selectMacbookVersion");
  const selectMacbookVersion = document.querySelector(".select_MacbookVersion");
  const selectWatchDeveloperModel = document.querySelector(".select_watchDeveloperModel");
  const macBookYearBlock = document.querySelector(".selectMacbookYear");

  function removeAllChildNodes(parent) {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  }

  function changeMacbookModel() {
    let userChooseMacbookModel = selectNotebookDeveloperModel.options[selectNotebookDeveloperModel.selectedIndex].text;
    if (userChooseMacbookModel === "Apple") {
      selectMacbookVersionDiv.classList.remove("noDisplay");
      selectNotebookContainer.classList.add("noDisplay");
      createSmartphoneSelect(selectMacbookVersionDiv, selectMacbookVersion, macbook_laptop)
    } else if (userChooseMacbookModel === "Другой производитель") {
      selectMacbookVersionDiv.classList.add("noDisplay");
      selectNotebookContainer.classList.remove("noDisplay");
      document.querySelector(".selectMacbookYear").classList.add("noDisplay"); //добавление ноудисплей у года ноута
    } else if(userChooseMacbookModel === "(не установлено)"){
      selectMacbookVersionDiv.classList.add("noDisplay");
      selectNotebookContainer.classList.add("noDisplay");
      macBookYearBlock.classList.add("noDisplay");
    }
  }

  function changeMacbookVersion() {
    let userChooseMacbookVersion = selectMacbookVersion.options[selectMacbookVersion.selectedIndex].text;


    if (userChooseMacbookVersion !== "(не установлено)") {
      macBookYearBlock.classList.remove("noDisplay");
    } else if (userChooseMacbookVersion === "(не установлено)") {
      macBookYearBlock.classList.add("noDisplay");
    }
  }

  let selectAppleWatchVersion = document.querySelector(".selectAppleWatchVersion");
  let selectSamsungWatchVersion = document.querySelector(".selectSamsungWatchVersion");

  function changeWatchModel() {
    let userChooseWatchVersion = selectWatchDeveloperModel.options[selectWatchDeveloperModel.selectedIndex].text;
    if (userChooseWatchVersion === "Apple") {
      selectAppleWatchVersion.classList.remove("noDisplay");
      selectSamsungWatchVersion.classList.add("noDisplay");
    } else {
      selectAppleWatchVersion.classList.add("noDisplay");
      selectSamsungWatchVersion.classList.remove("noDisplay");
    }
  }

  let selectLaptopDeveloperModel = document.querySelector(".select_laptopDeveloperModel");
  let selectAppleIpadVersion = document.querySelector(".selectAppleIpadVersion");
  let selectSamsungLaptopVersion = document.querySelector(".selectSamsungLaptopVersion");

  function changeLaptopModel() {
    let userChooseLaptopVersion = selectLaptopDeveloperModel.options[selectLaptopDeveloperModel.selectedIndex].text;
    if (userChooseLaptopVersion === "Apple") {
      selectAppleIpadVersion.classList.remove("noDisplay");
      selectSamsungLaptopVersion.classList.add("noDisplay");
    } else {
      selectAppleIpadVersion.classList.add("noDisplay");
      selectSamsungLaptopVersion.classList.remove("noDisplay");
    }
  }

  selectNotebookDeveloperModel.addEventListener("change", changeMacbookModel);
  selectMacbookVersion.addEventListener("change", changeMacbookVersion);

  selectWatchDeveloperModel.addEventListener("change", changeWatchModel);
  selectLaptopDeveloperModel.addEventListener("change", changeLaptopModel);


  let formNotebook = document.querySelector(".form_notebook");
  let formWatch = document.querySelector(".form_watch");
  let formLaptop = document.querySelector(".form_tablet");
  let formSmartphone = document.querySelector(".form_smartphones");

  smartphonesCategory.addEventListener("click", () => {
    formNotebook.classList.add("noDisplay");
    formWatch.classList.add("noDisplay");
    formLaptop.classList.add("noDisplay");
    formSmartphone.classList.remove("noDisplay");
  });

  watchCategory.addEventListener("click", () => {
    formWatch.classList.remove("noDisplay");
    formNotebook.classList.add("noDisplay");
    formLaptop.classList.add("noDisplay");
    formSmartphone.classList.add("noDisplay");
  });

  notebookCategory.addEventListener("click", () => {
    formNotebook.classList.remove("noDisplay");
    formWatch.classList.add("noDisplay");
    formLaptop.classList.add("noDisplay");
    formSmartphone.classList.add("noDisplay");
  });

  tabletCategory.addEventListener("click", () => {
    formWatch.classList.add("noDisplay");
    formNotebook.classList.add("noDisplay");
    formLaptop.classList.remove("noDisplay");
    formSmartphone.classList.add("noDisplay");
  });

  selectSmartphones.addEventListener("change", () => {
    let currentValue = selectSmartphones.options[selectSmartphones.selectedIndex].text;

    switch (currentValue) {
      case "(не установлено)":
        selectPhoneModelBlock.classList.add("noDisplay");
        selectDeviceConfigContainer.classList.add("noDisplay");
        nameBlock.classList.add("noDisplay");
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "Apple":
        createSmartphoneSelect(selectPhoneModelBlock,selectPhoneModel, iphones);
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "Samsung":
        createSmartphoneSelect(selectPhoneModelBlock,selectPhoneModel, samsung_phones);
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "Xiaomi":
        createSmartphoneSelect(selectPhoneModelBlock,selectPhoneModel, xiaomi_phones);
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "Huawei":
        createSmartphoneSelect(selectPhoneModelBlock,selectPhoneModel, huawei_phones);
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "OnePlus":
        createSmartphoneSelect(selectPhoneModelBlock,selectPhoneModel, oneplus_phones);
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "Другое":
        selectPhoneModelBlock.classList.add("noDisplay");
        selectOtherPhone.classList.remove("noDisplay");
        break;
    }
  });

  function createSmartphoneSelect(blockSelector, select,object) {
    blockSelector.classList.remove("noDisplay");
    removeAllChildNodes(select);
    for (const key in object) {
      const option = document.createElement("option");
      option.classList.add("select_devices__option");
      option.innerText = `${object[key].value}`;
      select.appendChild(option);
    }
    selectDeviceConfigContainer.classList.remove("noDisplay");
    nameBlock.classList.remove("noDisplay");
  }
});

// ЭТО ФУНКЦИЯ ДЛЯ РАБОТЫ ПАМЯТИ!!!
const values = [16, 32, 64, 128, 256, 512, 1000];

function renderMemorySmartphone() {
  if (values[this.value] < 1000) {
    outputMemorySmartphone.innerHTML = values[this.value] + " GB";
  } else {
    outputMemorySmartphone.innerHTML = 1 + " TB";
  }
}

function renderMemoryLaptop() {
  if (values[this.value] < 1000) {
    outputMemoryLaptop.innerHTML = values[this.value] + " GB";
  } else {
    outputMemoryLaptop.innerHTML = 1 + " TB";
  }
}

function renderMemoryTablet() {
  if (values[this.value] < 1000) {
    outputMemoryTablet.innerHTML = values[this.value] + " GB";
  } else {
    outputMemoryTablet.innerHTML = 1 + " TB";
  }
}

const inputMemorySmartphone = document.querySelector(".inputMemorySmartphone"),
    outputMemorySmartphone = document.querySelector(".outputMemorySmartphone");

const inputMemoryLaptop = document.querySelector(".inputMemoryLaptop"),
    outputMemoryLaptop = document.querySelector(".outputMemoryLaptop");

const inputMemoryTablet = document.querySelector(".inputMemoryTablet"),
    outputMemoryTablet = document.querySelector(".outputMemoryTablet");

inputMemorySmartphone.oninput = renderMemorySmartphone;
inputMemorySmartphone.oninput();

inputMemoryLaptop.oninput = renderMemoryLaptop;
inputMemoryLaptop.oninput();

inputMemoryTablet.oninput = renderMemoryTablet;
inputMemoryTablet.oninput();
