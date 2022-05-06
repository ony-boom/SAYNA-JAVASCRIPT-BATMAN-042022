const nextSynopsysBtn = document.getElementById("next-slide");
const prevSynopsysBtn = document.getElementById("prev-slide");
const videoSlides = document.querySelectorAll("div[id^=video-slide-]");

const MEDIA_SLIDER_ACTION = {
  next: "next",
  prev: "previous"
}

let currentSliderIdx = 0;

function handleMediaSlider(action) {
  switch (action) {
    case MEDIA_SLIDER_ACTION.next:
      currentSliderIdx < videoSlides.length - 1 ? currentSliderIdx++ : currentSliderIdx = 0;
      break;
    case MEDIA_SLIDER_ACTION.prev:
      currentSliderIdx > 0 ? currentSliderIdx-- : currentSliderIdx = videoSlides.length - 1;
      break;
  }
  videoSlides[currentSliderIdx].scrollIntoView({ behavior: "smooth" });
}

nextSynopsysBtn.addEventListener("click", () => {
  handleMediaSlider(MEDIA_SLIDER_ACTION.next);
});

prevSynopsysBtn.addEventListener("click", () => {
  handleMediaSlider(MEDIA_SLIDER_ACTION.prev);
})