// tạo mảng chứa giá trị dạng table
const VALUES = [
  { id: "keo", value: "✌🏽" },
  { id: "bua", value: "✊🏽" },
  { id: "bao", value: "🖐🏽" },
];
// khi thắng: indexPlayer - indexComputer = 1 || -2
// khi thua: indexPlayer - indexComputer = 0
// khi hòa: else

//hàm đổi giá trị cho máy liên tục
let i = 0;
const handleChange = () => {
  let computer = document.querySelector("#computer");
  computer.textContent = VALUES[i].value;
  computer.dataset.id = VALUES[i].id; //cài thêm data-id cho computer
  i = i === VALUES.length - 1 ? 0 : ++i;
};

let interval = setInterval(handleChange, 100);
//lưu interval để dành cho trường hợp cần dừng lại

//viết hàm so sánh 2 giá trị valuePlayer và valueComputer
const compare = (valuePlayer, valueComputer) => {
  let indexPlayer = VALUES.findIndex((item) => item.id == valuePlayer);
  let indexComputer = VALUES.findIndex((item) => item.id == valueComputer);
  result = indexPlayer - indexComputer;
  if (result == 1 || result == -2) return 1;
  else if (result == 0) return 0;
  else return -1;
};
//sưj kiện click của ng chơi
const playerItems = document.querySelectorAll(".user");
playerItems.forEach((item) => {
  item.addEventListener("click", (event) => {
    clearInterval(interval); //dừng máy lại
    let valuePlayer = event.target.id;
    let valueComputer = computer.dataset.id;
    let result = compare(valuePlayer, valueComputer);

    //duyệt từng nút user xóa hết actived
    playerItems.forEach((_item) => {
      _item.classList.remove("actived");
      _item.style.pointerEvents = "none";
    });
    //thêm actived cho thằng vừa nhấn
    event.target.classList.add("actived");

    //tạo thông báo
    const alertDiv = document.createElement("div");
    alertDiv.classList.add("alert");
    let msg = "";
    if (result == 1) {
      msg = "Thắng rồi nhe";
      alertDiv.classList.add("alert-success");
    } else if (result == 0) {
      msg = "Hòa ròi nhe";
      alertDiv.classList.add("alert-warning");
    } else {
      msg = "Gà vãi lò n";
      alertDiv.classList.add("alert-dark");
    }
    alertDiv.textContent = msg;
    document.querySelector(".notification").appendChild(alertDiv);
    document.querySelector("#play-again").classList.remove("d-none");
  });
});

//event chơi lại
document.querySelector(".btn-play-again").addEventListener("click", (even) => {
  clearInterval(interval);
  interval = setInterval(handleChange, 100);
  //xóa actived
  playerItems.forEach((item) => {
    item.classList.remove("actived");
    item.style.pointerEvents = "";
  });
  //xóa nội dung trong phần thông báo
  document.querySelector(".notification").innerHTML = "";
  document.querySelector("#play-again").classList.add("d-none");
});
