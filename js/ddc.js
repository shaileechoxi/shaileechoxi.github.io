// DDC type script

class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = "";
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
}

//Type Method
TypeWriter.prototype.type = function() {
  // Current Index of words
  const current = this.wordIndex % this.words.length;
  // Get full text of current word
  const fullTxt = this.words[current];
  console.log(fullTxt);

  // Check if Deleting
  if (this.isDeleting) {
    // Remove character
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    // Add Character
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  // Insert  txt into element
  this.txtElement.innerHTML = `<span class="txt-type text-secondary">${this.txt}</span>`;

  // Type Speed
  let typeSpeed = 300;
  if (this.isDeleting) {
    typeSpeed /= 2;
  }

  // If word is complete
  if (!this.isDeleting && this.txt === fullTxt) {
    // Make a pause at end
    typeSpeed = this.wait;
    // Set delete to true
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    // Move to next word
    this.wordIndex++;
    // Pause before start typing
    typeSpeed = 500;
  }
  setTimeout(() => this.type(), typeSpeed);
};

//Init On DOM Load
document.addEventListener("DOMContentLoaded", init);

//Init App
function init() {
  const txtElement = document.querySelector(".txt-type");
  const words = JSON.parse(txtElement.getAttribute("data-words"));
  const wait = txtElement.getAttribute("data-wait");

  //Init TypeWritter
  new TypeWriter(txtElement, words, wait);
}
