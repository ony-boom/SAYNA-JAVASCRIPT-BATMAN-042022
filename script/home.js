const subtitle = document.querySelectorAll(".subtitle");
const trailerOutput = document.getElementById("trailer-frame");
const videoSlides = document.querySelectorAll("div[id^=video-slide-]");
const nextSynopsysBtn = document.getElementById("next-slide");
const prevSynopsysBtn = document.getElementById("prev-slide");
const newsletterForm = document.getElementById("newsletter-form");
const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const accordion = document.querySelector("#select-acc img");

const animatedEl = [...titles, ...subtitle, ...animatedNormally];
animatedEl.forEach(element => {
	if (element) {
		element.style.opacity = "0";
	}
})

const videoTrailersLink = [
	"https://www.youtube.com/embed/jXrFsn9pcZY",
	"https://www.youtube.com/embed/UMgb3hQCb08",
	"https://www.youtube.com/embed/OiqPQ7L_C00"
]

const MEDIA_SLIDER_ACTION = {
	next: "next", prev: "previous"
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
	videoSlides[currentSliderIdx].scrollIntoView({behavior: "smooth"});
	trailerOutput.src = videoTrailersLink[currentSliderIdx];
}

function handleSubmit(event) {
	event.preventDefault();
	modal.classList.remove("hidden");
}

function removeModal(event) {
	modal.classList.add("remove");
	
	setTimeout(() => {
		modal.classList.replace("remove", "hidden");
	}, 300);
}

accordion.addEventListener("click", () => {
	const panel = document.querySelector(".panel");
	
	if (panel.style.display === "block") {
		setTimeout(() => {
			panel.style.display = "block";
		}, 500);
	} else {
		panel.style.display = "block";
	}
	
	if (panel.style.maxHeight) {
		panel.style.maxHeight = null;
	} else {
		panel.style.maxHeight = panel.scrollHeight + "px";
	}
});

newsletterForm.addEventListener("submit", handleSubmit);
modalBackdrop.addEventListener("click", removeModal, false);

nextSynopsysBtn.addEventListener("click", () => {
	handleMediaSlider(MEDIA_SLIDER_ACTION.next);
}, true);

prevSynopsysBtn.addEventListener("click", () => {
	handleMediaSlider(MEDIA_SLIDER_ACTION.prev);
}, true);

window.addEventListener("scroll", () => {
	handleScroll(subtitle, "u-animate-paragraph");
});
