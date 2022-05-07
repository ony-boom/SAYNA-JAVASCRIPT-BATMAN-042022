const titles = document.querySelectorAll(".titles");
const animatedNormally = document.querySelectorAll(".normal-animation");
const hamMenu = document.getElementById("ham-menu");
const links = document.querySelectorAll("#nav a");
const zoomInEffect = document.querySelectorAll(".zoom-in");

zoomInEffect.forEach(el => {
	el.style.opacity = "0";
})

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

function toggleMenu(event) {
	const icon = event.target;
	const nav = event.target.parentElement.nextElementSibling.querySelector("ul");
	const brand = document.querySelector(".navigation__brand");
	brand.classList.toggle("hide");
	
	if (icon.classList.contains("la-bars")) {
		icon.classList.replace("la-bars", "la-times");
	} else {
		icon.classList.replace("la-times", "la-bars");
	}
	
	if (nav.classList.contains("show-nav")) {
		setTimeout(() => {
			nav.classList.add("mobile-hide");
			nav.classList.remove("hide-nav");
		}, 500)
		nav.classList.remove("show-nav");
		nav.classList.add("hide-nav");
	} else {
		nav.classList.remove("mobile-hide");
		nav.classList.remove("hide-nav");
		nav.classList.add("show-nav");
	}
}

hamMenu.addEventListener("click", toggleMenu);

links.forEach((link, idx) => {
	link.addEventListener("click", () => {
		sessionStorage.setItem("currentPage", link.textContent.trim());
		link.classList.add("active");
	})
});

window.onload = function () {
	const currentPage = sessionStorage.getItem("currentPage");
	links.forEach((link, idx) => {
		if (currentPage === link.textContent.trim()) {
			link.classList.add("active");
		}
	});
}

window.addEventListener("scroll", () => {
	handleScroll(titles, "u-animate-title");
	handleScroll(animatedNormally, "u-animate-normal");
	handleScroll(zoomInEffect, "u-animate-image");
});
