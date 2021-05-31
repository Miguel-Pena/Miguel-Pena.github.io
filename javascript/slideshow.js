let index = 1;
showSlides(index);

// Next/previous controls
function plusSlides(n) {
  showSlides(index += n);
}

// Thumbnail image controls
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