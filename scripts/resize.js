console.log("JavaScript súbor načítaný.");


let fontSize = 16;


function increaseFontSize() {
  fontSize += 2;
  document.querySelectorAll('.sekcia-zmena-section p, .sekcia-zmena-section h3').forEach(element => {
    element.style.fontSize = fontSize + 'px';
  });
  console.log("Veľkosť textu zväčšená na:", fontSize);
}


function decreaseFontSize() {
  fontSize -= 2;
  document.querySelectorAll('.sekcia-zmena-section p, .sekcia-zmena-section h3').forEach(element => {
    element.style.fontSize = fontSize + 'px';
  });
  console.log("Veľkosť textu zmenšená na:", fontSize);
}


window.addEventListener('load', () => {
  const increaseButton = document.getElementById('increase_font');
  const decreaseButton = document.getElementById('decrease_font');

  if (increaseButton && decreaseButton) {
    increaseButton.addEventListener('click', increaseFontSize);
    decreaseButton.addEventListener('click', decreaseFontSize);
    console.log("Udalosti tlačidiel nastavené.");
  } else {
    console.log("Tlačidlá sa nenašli.");
  }
});
