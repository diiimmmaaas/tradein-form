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
    switch (currentValue) {
      case 'Ноутбуки':
        console.log('выбран ноут')
        break
      case 'Смарт часы':
        console.log('выбраны часы')
        break
      case 'Планшеты':
        console.log('выбраны планшеты')
        break
      case 'Смартфоны':
        console.log('выбраны смартфоны')
        break
    }
  }
)
