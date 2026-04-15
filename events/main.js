const bgButton = document.getElementById("bgChangeButton");

function changeBackgroundColour() {
  document.body.style.backgroundColor = "salmon";
}

bgButton.addEventListener("click", changeBackgroundColour);
