class TxtRotate {
    // takes the HTML element, array of words to rotate, and time period as arguments.
    constructor(el, toRotate, period) {
      this.toRotate = toRotate;  // Array of words to rotate
      this.el = el;              // The HTML element where the text will appear
      this.loopNum = 0;          // Keeps track of which word is currently shown
      this.period = parseInt(period, 10) || 100;  // Time (in ms) before rotating
      this.txt = '';             // The text currently being displayed
      this.isDeleting = false;   // Tracks whether we are adding or deleting letters
      this.tick();               // Start the typing effect
    }
  
    // responsible for adding/removing letters and rotating the text.
    tick() {
      const i = this.loopNum % this.toRotate.length;  // Get  current word
      const fullTxt = this.toRotate[i];  // Full word to display
  
      // If deleting letters, reduce the length of the current text
      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } 
      // If not deleting, increase the length of the current text
      else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
  
      // Insert the current text into the HTML element, wrapped in a span
      this.el.innerHTML = `<span class="wrap">${this.txt}</span>`;
  
      // Set the speed of typing (randomized to make it look natural)
      let delta = 150 - Math.random() * 100;
  
      // If deleting, make the speed faster
      if (this.isDeleting) { delta /= 2; }
  
      // If we've finished typing the current word, pause before deleting it
      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;  // Pause before deleting
        this.isDeleting = true;  // Start deleting next
      } 
      // If we've finished deleting the word, start typing the next one
      else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;  // Stop deleting
        this.loopNum++;  // Move to the next word in the array
        delta = 500;     // Pause before typing the next word
      }
  
      // Repeat the function after 'delta' milliseconds
      setTimeout(() => this.tick(), delta);
    }
}

// When the page loads, find all elements with class 'txt-rotate'
window.onload = function() {
    const elements = document.getElementsByClassName('txt-rotate');
    
    for (let i = 0; i < elements.length; i++) {
      // Get the list of words to rotate and the period from the element's data attributes
      const toRotate = elements[i].getAttribute('data-rotate');
      const period = elements[i].getAttribute('data-period');
      
      // If there are words to rotate, create a new TxtRotate instance
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
  
    // Create a CSS rule to make the text look like it's being typed (with a blinking cursor effect)
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";  // Blinking cursor style
    document.body.appendChild(css);  // Add the style to the page
  };
  


