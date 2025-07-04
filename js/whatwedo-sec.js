const slider = document.getElementById('slider');
const cardItems = slider.querySelectorAll('.card-item');
const prevBtn = document.querySelector('.nav-btn.left');
const nextBtn = document.querySelector('.nav-btn.right');
let index = 0;
let startTouchX = 0;
let isMouseDown = false;
let startMouseX = 0;
let autoScrollInterval;
const autoScrollSpeed = 5000; // Time interval in ms for auto-scroll (e.g., 5 seconds)
let autoScrollTimeout;
const userInteractionTimeout = 5000; // Time in ms before resuming auto-scroll (e.g., 2 seconds)

function getMoveCount() {
  return window.innerWidth < 768 ? 1 : 2;
}

function getCardWidth() {
  return cardItems[0].offsetWidth + 20;
}

function clampIndex() {
  const moveCount = getMoveCount();
  const maxIndex = cardItems.length - moveCount;
  if (index > maxIndex) {
    index = Math.max(0, maxIndex);
  }
  if (index < 0) {  // Prevent going before the first item
    index = 0;
  }
}

function updateButtons() {
  const moveCount = getMoveCount();
  prevBtn.disabled = index <= 0;
  nextBtn.disabled = index >= cardItems.length - moveCount;
}

function updateSliderPosition() {
  const cardWidth = getCardWidth();
  const offset = -index * cardWidth;
  slider.style.transform = `translateX(${offset}px)`;
}

function moveSlider(direction) {
  const moveCount = getMoveCount();
  index += direction * moveCount;

  clampIndex();
  updateSliderPosition();
  updateButtons();
}

function handleResize() {
  clampIndex();
  updateSliderPosition();
  updateButtons();
}

// Touch event handlers for swiping
function handleTouchStart(event) {
  startTouchX = event.touches[0].clientX;
}

function handleTouchMove(event) {
  if (!startTouchX) return;

  const moveX = event.touches[0].clientX - startTouchX;
  if (Math.abs(moveX) > 50) {  // Check if the move is significant enough
    if (moveX < 0) {
      if (index < cardItems.length - getMoveCount()) {  // Prevent moving right when on the last card
        moveSlider(1);  // Move right
      }
    } else if (moveX > 0) {
      if (index > 0) {  // Prevent moving left when on the first card
        moveSlider(-1); // Move left
      }
    }
    startTouchX = 0;  // Reset start position after a swipe
  }
}

function handleTouchEnd() {
  startTouchX = 0;  // Reset touch position after ending the touch
}

// Mouse dragging event handlers
function handleMouseDown(event) {
  isMouseDown = true;
  startMouseX = event.clientX;
  slider.style.cursor = 'grabbing';  // Change cursor to indicate dragging
}

function handleMouseMove(event) {
  if (!isMouseDown) return;

  const moveX = event.clientX - startMouseX;
  if (Math.abs(moveX) > 50) {  // Check if the move is significant enough
    if (moveX < 0) {
      if (index < cardItems.length - getMoveCount()) {  // Prevent moving right when on the last card
        moveSlider(1);  // Move right
      }
    } else if (moveX > 0) {
      if (index > 0) {  // Prevent moving left when on the first card
        moveSlider(-1); // Move left
      }
    }
    startMouseX = event.clientX;  // Update the start position
  }
}

function handleMouseUp() {
  isMouseDown = false;
  slider.style.cursor = 'grab';  // Revert cursor back to normal
}

function handleMouseLeave() {
  if (isMouseDown) {
    isMouseDown = false;
    slider.style.cursor = 'grab';  // Revert cursor back to normal if mouse leaves
  }
}

// Auto-scroll logic
function autoScroll() {
  if (index < cardItems.length - getMoveCount()) {
    moveSlider(1);  // Move to the next card
  } else {
    // Remove the transition for smooth looping
    slider.style.transition = 'none';
    index = 0; // Reset to the first card
    updateSliderPosition();
    updateButtons();
    
    // After the reset, re-enable the transition with a small delay
    setTimeout(() => {
      slider.style.transition = 'transform 0.5s ease';
    }, 50);
  }
}

// Start auto-scrolling when page loads
function startAutoScroll() {
  autoScrollInterval = setInterval(autoScroll, autoScrollSpeed);
}

// Stop auto-scroll when user interacts with the slider (optional)
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
  clearTimeout(autoScrollTimeout);
}

// Resume auto-scroll after user stops interacting for a while
function resumeAutoScroll() {
  clearTimeout(autoScrollTimeout);  // Clear any previous timeout
  autoScrollTimeout = setTimeout(startAutoScroll, userInteractionTimeout); // Restart after inactivity
}

// Hook into buttons and touch events
window.moveSlider = moveSlider;

// Init
window.addEventListener('load', () => {
  handleResize();
  startAutoScroll(); // Start auto-scroll when page loads
});
window.addEventListener('resize', handleResize);

// Touch events for swipe functionality
slider.addEventListener('touchstart', handleTouchStart);
slider.addEventListener('touchmove', handleTouchMove);
slider.addEventListener('touchend', handleTouchEnd);

// Mouse events for dragging functionality
slider.addEventListener('mousedown', handleMouseDown);
slider.addEventListener('mousemove', handleMouseMove);
slider.addEventListener('mouseup', handleMouseUp);
slider.addEventListener('mouseleave', handleMouseLeave);

// Stop auto-scroll on user interaction (optional)
slider.addEventListener('mousedown', stopAutoScroll);
slider.addEventListener('touchstart', stopAutoScroll);

// Resume auto-scroll after a delay of user inactivity
slider.addEventListener('mouseup', resumeAutoScroll);
slider.addEventListener('touchend', resumeAutoScroll);
slider.addEventListener('mouseleave', resumeAutoScroll);
