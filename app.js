let nextBtn = document.querySelector('.next');
let prevBtn = document.querySelector('.prev');

let slider = document.querySelector('.slider');
let sliderList = slider.querySelector('.list');
let thumbnail = document.querySelector('.thumbnail');

// Function for next button
nextBtn.onclick = function() {
  moveSlider('next');
};

// Function for prev button
prevBtn.onclick = function() {
  moveSlider('prev');
};

function moveSlider(direction) {
  let sliderItems = slider.querySelectorAll('.item');
  let thumbnailItems = thumbnail.querySelectorAll('.item');

  if (direction === 'next') {
    // Move the first slider item to the end
    sliderList.appendChild(sliderItems[0]);
    // Move the first thumbnail item to the end
    thumbnail.appendChild(thumbnailItems[0]);
    // Optionally, add 'next' class for CSS transition if needed
    slider.classList.add('next');
  } else if (direction === 'prev') {
    // Move the last slider item to the beginning
    sliderList.insertBefore(sliderItems[sliderItems.length - 1], sliderItems[0]);
    // Move the last thumbnail item to the beginning
    thumbnail.insertBefore(thumbnailItems[thumbnailItems.length - 1], thumbnailItems[0]);
    // Optionally, add 'prev' class for CSS transition if needed
    slider.classList.add('prev');
  }

  // Optionally, remove transition classes after a delay
  setTimeout(function() {
    slider.classList.remove('next');
    slider.classList.remove('prev');
  }, 500); // Adjust based on CSS transition duration
}
