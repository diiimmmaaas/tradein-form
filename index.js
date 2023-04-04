"use strict"

window.addEventListener("load", () => {

  (function() {
    [].forEach.call( document.querySelectorAll('.tel'), function(input) {
      var keyCode;
      function mask(event) {
        event.keyCode && (keyCode = event.keyCode);
        var pos = this.selectionStart;
        if (pos < 3) event.preventDefault();
        var matrix = "+7 (___) ___ ____",
            i = 0,
            def = matrix.replace(/\D/g, ""),
            val = this.value.replace(/\D/g, ""),
            new_value = matrix.replace(/[_\d]/g, function(a) {
              return i < val.length ? val.charAt(i++) || def.charAt(i) : a
            });
        i = new_value.indexOf("_");
        if (i != -1) {
          i < 5 && (i = 3);
          new_value = new_value.slice(0, i)
        }
        var reg = matrix.substr(0, this.value.length).replace(/_+/g,
            function(a) {
              return "\\d{1," + a.length + "}"
            }).replace(/[+()]/g, "\\$&");
        reg = new RegExp("^" + reg + "$");
        if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) this.value = new_value;
        if (event.type == "blur" && this.value.length < 5)  this.value = ""
      }

      input.addEventListener("input", mask, false);
      input.addEventListener("focus", mask, false);
      input.addEventListener("blur", mask, false);
      input.addEventListener("keydown", mask, false)

    });

  })()

  let wrapper = document.querySelector(".wrapper");
  let formSmartphone = document.getElementById("form_smartphones");
  let formNotebook = document.getElementById("form_notebook");
  let formWatch = document.getElementById("form_watch");
  let formLaptop = document.getElementById("form_tablet");

  let formReqSmartphone = document.querySelectorAll("._req_smartphone");
  let formReqNotebook = document.querySelectorAll("._req_notebook");
  let formReqWatch = document.querySelectorAll("._req_watch");
  let formReqTablet = document.querySelectorAll("._req_tablet");

  formSmartphone.addEventListener("submit", (e) => formSend(e, formSmartphone, formReqSmartphone));
  formNotebook.addEventListener("submit", (e) => formSend(e, formNotebook, formReqNotebook));
  formWatch.addEventListener("submit", (e) => formSend(e, formWatch, formReqWatch));
  formLaptop.addEventListener("submit", (e) => formSend(e, formLaptop, formReqTablet));

  async function formSend(e, form, formReq) {
    e.preventDefault();

    let error = formValidate(formReq);
    let formData = new FormData(form);
    if (error === 0) {
      const resultObj = {};
      for (var pair of formData.entries()) {
        resultObj[pair[0]] = pair[1];
      }
      console.log(resultObj);
      debugger

      // wrapper.classList.add('_sending')

      // let response = await fetch('mail.php', {
      //   method: 'POST',
      //   body: formData
      // })
      // if (response.ok){
      //   let result = await response.json()
      //   alert(result.message)
      //   form.reset()
      //   // wrapper.classList.remove('_sending')
      // } else {
      //   alert("Ошибка")
      //   // wrapper.classList.remove('_sending')
      // }
    } else {
      alert("Заполните обязательные поля");
    }
  }

  function formValidate(formReq) {
    let error = 0;


    for (let i = 0; i < formReq.length; i++) {
      const element = formReq[i];
      formRemoveError(element);
      formRemoveErrorParentElement(element);

      if (element.classList.contains("_email")) {
        if (emailTest(element)) {
          formAddError(element);
          error++;
        }
      } else if (element.getAttribute("type") === "checkbox" && element.checked === false) {
        formAddError(element);
        formAddErrorParentElement(element);
        error++;
      } else {
        if (element.value === "") {
          formAddError(element);
          error++;
        }
        if (element.value === "notSelected") {
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
    return !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.value);
  }

  function isNumber(n){
    return !isNaN(parseFloat(n)) && isFinite(n)
  }

  function loadFile(device, tab, selectBlock, selectModel){
    const req = new XMLHttpRequest();
    req.open('GET', tab, true);
    req.responseType = 'arraybuffer';
    req.onload = function(e){
      const workBook = XLSX.read(req.response, {type: 'array'})
      const allSheetsRows = Object.keys(workBook.Sheets).map((sheet) => {
        return {
          sheet: sheet,
          rows: sheet2arr(workBook.Sheets[sheet])
              .filter(row => row[1] && isNumber(row[1]))
              .map(row => {
                row[1] = +row[1]
                return row
              })
        }
      })
      const result = allSheetsRows.filter(sheet => sheet.sheet === device).map(s => s.rows)
      createSmartphoneSelect(selectBlock, selectModel, result);
    }
    req.send();
  }

  function sheet2arr(sheet){
    const result = []
    let row;
    let rowNum;
    let colNum;
    const range = XLSX.utils.decode_range(sheet['!ref']);
    for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++){
      row= [];
      for (colNum = range.s.c; colNum <= range.e.c; colNum++){
        const nextCell = sheet[
            XLSX.utils.encode_cell({r: rowNum, c: colNum})
            ];
        if (typeof nextCell === 'undefined'){
          row.push(void 0);
        } else {
          row.push(nextCell.w)
        }
      }
      result.push(row)
    }
    return result
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
      loadFile('Apple', './notebook.xlsx', selectMacbookVersionDiv, selectMacbookVersion)
    } else if (userChooseMacbookModel === "Другой производитель") {
      selectMacbookVersion.value = '(не установлено)'
      selectMacbookVersionDiv.classList.add("noDisplay");
      selectNotebookContainer.classList.remove("noDisplay");
      macBookYearBlock.classList.add("noDisplay"); //добавление ноудисплей у года ноута
    } else if (userChooseMacbookModel === "(не установлено)") {
      selectMacbookVersionDiv.classList.add("noDisplay");
      selectNotebookContainer.classList.add("noDisplay");
      macBookYearBlock.classList.add("noDisplay");
      selectDeviceConfigContainer.classList.add("noDisplay");
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
  let selectAppleWatch = document.querySelector(".select_AppleWatchVersion");
  let selectSamsungWatch = document.querySelector(".select_SamsungWatchVersion");
  let selectSizeWatch = document.querySelector(".selectSizeWatch");

  function changeWatchModel() {
    let userChooseWatchVersion = selectWatchDeveloperModel.options[selectWatchDeveloperModel.selectedIndex].text;
    if (userChooseWatchVersion === "Apple") {
      selectAppleWatchVersion.classList.remove("noDisplay");
      selectSizeWatch.classList.remove("noDisplay");
      selectSamsungWatchVersion.classList.add("noDisplay");
      loadFile('Apple', './watch.xlsx',selectAppleWatchVersion,selectAppleWatch)
    } else if (userChooseWatchVersion === "Samsung") {
      selectSizeWatch.classList.add("noDisplay");
      selectAppleWatchVersion.classList.add("noDisplay");
      selectSamsungWatchVersion.classList.remove("noDisplay");
      loadFile('Samsung', './watch.xlsx',selectSamsungWatchVersion,selectSamsungWatch)
    } else if (userChooseWatchVersion === "(не установлено)") {
      selectSizeWatch.classList.add("noDisplay");
      selectAppleWatchVersion.classList.add("noDisplay");
      selectSamsungWatchVersion.classList.add("noDisplay");
      selectDeviceConfigContainer.classList.add("noDisplay");
    }
  }

  let selectLaptopDeveloperModel = document.querySelector(".select_laptopDeveloperModel");
  let selectAppleIpadVersion = document.querySelector(".selectAppleIpadVersion");
  let selectSamsungLaptopVersion = document.querySelector(".selectSamsungLaptopVersion");
  let selectAppleIpad = document.querySelector(".select_AppleIpadVersion");
  let selectSamsungLaptop = document.querySelector(".select_SamsungLaptopVersion");

  function changeLaptopModel() {
    let userChooseLaptopVersion = selectLaptopDeveloperModel.options[selectLaptopDeveloperModel.selectedIndex].text;
    if (userChooseLaptopVersion === "Apple") {
      selectAppleIpadVersion.classList.remove("noDisplay");
      selectSamsungLaptopVersion.classList.add("noDisplay");
      loadFile('Apple', './tablet.xlsx', selectAppleIpadVersion, selectAppleIpad)
    } else if (userChooseLaptopVersion === "Samsung") {
      selectAppleIpadVersion.classList.add("noDisplay");
      selectSamsungLaptopVersion.classList.remove("noDisplay");
      loadFile('Samsung', './tablet.xlsx', selectSamsungLaptopVersion, selectSamsungLaptop)
    } else if (userChooseLaptopVersion === "(не установлено)"){
      selectAppleIpadVersion.classList.add("noDisplay");
      selectSamsungLaptopVersion.classList.add("noDisplay");
    }
  }

  selectNotebookDeveloperModel.addEventListener("change", changeMacbookModel);
  selectMacbookVersion.addEventListener("change", changeMacbookVersion);

  selectWatchDeveloperModel.addEventListener("change", changeWatchModel);
  selectLaptopDeveloperModel.addEventListener("change", changeLaptopModel);

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
        selectDeviceConfigContainer.classList.add("noDisplay");
        nameBlock.classList.add("noDisplay");
        selectOtherPhone.classList.add("noDisplay");
        selectPhoneModelBlock.classList.add("noDisplay");
        break;
      case "Apple":
        loadFile("Iphones", './phones.xlsx', selectPhoneModelBlock, selectPhoneModel)
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "Samsung":
        loadFile("Samsung_phones", './phones.xlsx', selectPhoneModelBlock, selectPhoneModel)
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "Xiaomi":
        loadFile("Xiaomi_phones", './phones.xlsx', selectPhoneModelBlock, selectPhoneModel)
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "Huawei":
        loadFile("Huawei_phones", './phones.xlsx', selectPhoneModelBlock, selectPhoneModel)
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "OnePlus":
        loadFile("OnePlus_phones",'./phones.xlsx', selectPhoneModelBlock, selectPhoneModel)
        selectOtherPhone.classList.add("noDisplay");
        break;
      case "Другое":
        selectPhoneModelBlock.classList.add("noDisplay");
        selectOtherPhone.classList.remove("noDisplay");
        selectPhoneModel.value = '(не установлено)'
        break;
    }
  });

  function createSmartphoneSelect(blockSelector, select, object) {
    blockSelector.classList.remove("noDisplay");
    removeAllChildNodes(select);
    if (object){
      object.forEach(obj => obj.forEach(o => {
        const option = document.createElement("option");
        option.classList.add("select_devices__option");
        option.innerText = `${o[0]}`;
        select.appendChild(option)
      }))
    }
    selectDeviceConfigContainer.classList.remove("noDisplay");
    nameBlock.classList.remove("noDisplay");
  }

});
