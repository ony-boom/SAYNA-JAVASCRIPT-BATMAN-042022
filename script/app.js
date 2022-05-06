const nextSynopsysBtn = document.getElementById("next-slide");
const prevSynopsysBtn = document.getElementById("prev-slide");
const videoSlides = document.querySelectorAll("div[id^=video-slide-]");
const trailerOutput = document.getElementById("trailer-frame");
const titles = document.querySelectorAll(".titles");
const subtitle = document.querySelectorAll(".subtitle");
const newsletterForm = document.getElementById("newsletter-form");
const modal = document.getElementById("modal");
const modalBackdrop = document.getElementById("modal-backdrop");
const accordion = document.querySelector("#select-acc img");
const hamMenu = document.getElementById("ham-menu");


const zoomInEffect = [
	...document.querySelectorAll(".showcases__card"),
	document.querySelector(".video-slider")
];
const animatedNormally = [
	...document.querySelectorAll(".normal-animation"),
	document.querySelector(".section-slider .row")
];

const animatedEl = [...titles, ...subtitle, ...zoomInEffect, ...animatedNormally];
animatedEl.forEach(element => {
	element.style.opacity = "0";
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
let currentQuotesIdx = 0;

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

/**
 * "Renvoie vrai si le haut de l'élément est dans la fenêtre, sinon renvoie faux."
 *
 * La fonction prend deux arguments :
 *
 * element : l'élément à vérifier s'il se trouve dans la fenêtre d'affichage.
 * scrollPercent : Le pourcentage de l'élément qui doit être dans la fenêtre d'affichage pour que la fonction renvoie true.
 * La fonction renvoie true si le haut de l'élément se trouve dans la fenêtre, sinon elle renvoie false
 * @param element - L'élément que vous voulez vérifier s'il est visible.
 * @param [scrollPercent=100] - Le pourcentage de l'élément qui doit être visible pour que la fonction renvoie true.
 * @returns La fonction isInView() renvoie une valeur booléenne.
 */
function isInView(element, scrollPercent = 100) {
	const elementTop = element.getBoundingClientRect().top;
	return elementTop <= window.innerHeight * (scrollPercent / 100);
}

/**
 * Ajoutez le nom de la classe à l'élément.
 * @param element - L'élément auquel vous voulez ajouter la classe.
 * @param className - Le nom de la classe à ajouter à l'élément.
 */
function displayInViewElement(element, className) {
	element.classList.add(className);
}

/**
 * Supprimez le nom de la classe de l'élément.
 * @param element - L'élément que vous souhaitez masquer.
 * @param className - Le nom de la classe à ajouter à l'élément.
 */
function hideElement(element, className) {
	element.classList.remove(className);
}

/**
 * Si l'élément est en vue, affichez-le, sinon masquez-le
 * @param nodeList - Il s'agit de la liste des éléments dont nous voulons vérifier s'ils sont visibles.
 * @param className - le nom de classe qui sera ajouté à l'élément lorsqu'il sera en vue
 */
function handleScroll(nodeList, className) {
	nodeList.forEach(element => {
		if (isInView(element, 100)) {
			displayInViewElement(element, className);
		} else {
			hideElement(element, className)
		}
	})
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

nextSynopsysBtn.addEventListener("click", () => {
	handleMediaSlider(MEDIA_SLIDER_ACTION.next);
}, true);

prevSynopsysBtn.addEventListener("click", () => {
	handleMediaSlider(MEDIA_SLIDER_ACTION.prev);
}, true);

newsletterForm.addEventListener("submit", handleSubmit);
modalBackdrop.addEventListener("click", removeModal, false);

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
})

function toggleMobileMenu() {

}

hamMenu.addEventListener("click", toggleMobileMenu)

window.addEventListener("scroll", () => {
	handleScroll(titles, "u-animate-title");
	handleScroll(subtitle, "u-animate-paragraph");
	handleScroll(zoomInEffect, "u-animate-image");
	handleScroll(animatedNormally, "u-animate-normal");
});