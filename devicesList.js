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

const options = document.querySelectorAll('.select_devices__option')
