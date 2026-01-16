function loco() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
  });


  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();

}
loco()

// testimonial functions

const track = document.getElementById('sliderTrack');
const cards = Array.from(document.querySelectorAll('.testimonial-card'));
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

// Circular Logic: Cloning
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);
track.appendChild(firstClone);
track.prepend(lastClone);

const allCards = document.querySelectorAll('.testimonial-card');
let currentIndex = 1; // Real first card
let isTransitioning = false;

function updateSlider(animate = true) {
  const cardWidth = allCards[0].offsetWidth + 30; // 30 is gap
  const containerWidth = document.querySelector('.slider-viewport').offsetWidth;
  const centerOffset = (containerWidth / 2) - (cardWidth / 2);

  if (!animate) track.style.transition = 'none';
  else track.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';

  track.style.transform = `translateX(${-currentIndex * cardWidth + centerOffset}px)`;

  allCards.forEach((card, i) => {
    card.classList.toggle('active', i === currentIndex);
  });
}

track.addEventListener('transitionend', () => {
  isTransitioning = false;
  if (currentIndex === allCards.length - 1) {
    currentIndex = 1;
    updateSlider(false);
  }
  if (currentIndex === 0) {
    currentIndex = allCards.length - 2;
    updateSlider(false);
  }
});

nextBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex++;
  updateSlider();
});

prevBtn.addEventListener('click', () => {
  if (isTransitioning) return;
  isTransitioning = true;
  currentIndex--;
  updateSlider();
});

window.addEventListener('resize', () => updateSlider(false));
window.onload = () => updateSlider(false);

// end testimonials functions

// video section play function
const videoContainer = document.querySelector('.video-container');
const video = document.getElementById('fixoraVideo');
const overlay = document.getElementById('videoOverlay');

overlay.addEventListener('click', () => {
  video.play();
});

video.addEventListener('play', () => {
  videoContainer.classList.add('playing');
});

video.addEventListener('pause', () => {
  videoContainer.classList.remove('playing');
});

video.addEventListener('ended', () => {
  videoContainer.classList.remove('playing');
});
// end video section play function




// contact form functionality
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const privacyCheckbox = document.getElementById('privacy');
    const alertBox = document.getElementById('customAlert');

    // Form submission check
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Console check (Inspect element mein dekhein ye chal raha hai ya nahi)
        console.log("Submit button clicked!"); 

        if (!privacyCheckbox.checked) {
            showPremiumAlert("First agree to the privacy policy", "error");
        } else {
            showPremiumAlert("Your message has been sent successfully!", "success");
            contactForm.reset();
        }
    });

    function showPremiumAlert(message, type) {
        const alertMsg = document.getElementById('alertMessage');
        const alertIcon = document.getElementById('alertIcon');

        alertMsg.innerText = message;

        if(type === 'error') {
            alertBox.style.backgroundColor = '#ef4444';
            alertIcon.className = 'ri-error-warning-line';
        } else {
            alertBox.style.backgroundColor = '#112b55';
            alertIcon.className = 'ri-checkbox-circle-line';
        }

        alertBox.classList.add('show');

        setTimeout(() => {
            alertBox.classList.remove('show');
        }, 3000);
    }
});
//  end contact form functionality

// navbar function
gsap.to("#nav", {
  backgroundColor: "#000",
  height: "85px",
  duration: 0.5,
  scrollTrigger:{
    trigger: "#nav",
    scroller: "#main",
    // markers: true,
    start: "top -10%",
    end: "bottom -11%",
    scrub: 2
  }
});

// end navbar function
