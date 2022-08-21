if (localStorage.getItem('cartItems') != null) {
    
  cartDetailsArray = JSON.parse(localStorage.getItem('cartDetailsItems'));
  let counter = document.getElementById('cartCounter');
  counter.innerHTML = cartDetailsArray.length
}

let index = 1;
showSlides(index);

// Next/previous controls
function plusSlides(n) {
  showSlides(index += n);
}

// dotcontrols
function currentSlide(n) {
  showSlides(index = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  
  if (n > slides.length) {
      index = 1
    }

  if (n < 1) {index = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[index-1].style.display = "block";
  dots[index-1].className += " active";
}

function slide(direction){
  var container = document.getElementById('trendingBoxes');
  scrollCompleted = 0;
  var slideVar = setInterval(function(){
      if(direction == 'left'){
          container.scrollLeft -= 20;
      } else {
          container.scrollLeft += 20;
      }
      scrollCompleted += 10;
      if(scrollCompleted >= 100){
          window.clearInterval(slideVar);
      }
  }, 30);
}

/* -------------- Automatic Slide Show --------------
let index = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  index++;
  if (index > slides.length) {index = 1}
  slides[index-1].style.display = "block";
  setTimeout(showSlides, 3000);
}
*/