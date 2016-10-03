//--------- tamplate function --------------

Handlebars.registerHelper('getPointsHTML', (slidesQuantity, index) => {
	let pointsBarHTML = '';
	let markedPointHtml =
			'<div class="slide__point slide__point_marked"></div>';
	for(let i = 0; i < slidesQuantity; i++) {
		if(i == index) {
			pointsBarHTML += markedPointHtml;
		} else {
			pointsBarHTML += `<div class='slide__point' data-index='${i}'></div>`;
		}
	}
	return new Handlebars.SafeString(pointsBarHTML);
});



//--------- Carousel class --------------------

class Carousel {

	constructor(slideList) {
		this.slideList = slideList;
		this.slideList.forEach( (slide, index) => {
			slide.slidesQuantity = slideList.length;
			slide.index = index;
		});
	}

	render(container) {
		this.container = container;
		this.renderSlide(0);
	}

	renderNextSlide() {
		if(this.currentSlideIndex + 1 === this.slideList.length) {
			this.renderSlide(0);
		} else {
			this.renderSlide(this.currentSlideIndex + 1);
		}
	}

	renderPreviousSlide() {
		if(this.currentSlideIndex === 0) {
			this.renderSlide(this.slideList.length - 1);
		} else {
			this.renderSlide(this.currentSlideIndex - 1);
		}
	}

	renderWhichPointClicked(e) {
		if(e.target.dataset.index) {
			this.renderSlide(parseInt(e.target.dataset.index));
		}
	}

	renderSlide(index) {
		this.currentSlideIndex = index;
		this.container.innerHTML = this.getCarouselBody(index);
		this.setHandlers();

		//Event dispatcher. Next line need only for switcher works.
		this.dispatchEvent();
	}

	setHandlers() {
		let nextArrow = document.getElementById('nextArrow');
		let previousArrow = document.getElementById('previousArrow');
		let pointsBar = document.getElementById('pointsBar');

		let slide = document.getElementById('slide');

		nextArrow.addEventListener('click', this.renderNextSlide.bind(this));
		previousArrow.addEventListener('click', this.renderPreviousSlide.bind(this));
		slide.addEventListener('mouseover', this.addHoveredClass.bind(this));
		slide.addEventListener('mouseout', this.removeHoveredClass.bind(this));
		slide.addEventListener('click', this.renderWhichPointClicked.bind(this));
	}

	//Event dispatcher. Next method need only for switcher works
	dispatchEvent() {
		let slide = document.getElementById('slide');

		let nextSlideEvent = new CustomEvent('nextSlide', {bubbles: true});
		slide.dispatchEvent(nextSlideEvent);
	}

	addHoveredClass(e) {
		this.addClass(e.target, 'hovered');
	}

	removeHoveredClass(e) {
		this.removeClass(e.target, 'hovered');
	}

	addClass(element, modificator) {
		let classList = element.classList;
		let classesQuantity = classList.length;
		for( let i = 0; i < classesQuantity; i++) {
			if(classList[i].includes('__')) {
				classList.add(`${classList[i]}_${modificator}`);
			}
		}
	}

	removeClass(element, modificator) {
	let classList = element.classList;
	for( let i = 0; i < classList.length; i++) {
		if(classList[i].includes(`_${modificator}`)) {
			classList.remove( classList[i] );
		}
	}
};

	getCarouselBody(index) {
		this.tamplate = Handlebars.compile(
			document.getElementById('carouselTamplate').innerHTML
		);
		return this.tamplate(this.slideList[index]);
	}
};



//----------------------- main code --------------------

//------------------carousels init -----------------

let jsCarousel = new Carousel([
	{
		header: 'YandexMap API',
		text: 'Приложение представляет из себя Яндекс-карту. На карте можно выбирать объекты и оставлять свои отзывы о них.Для выбора объекта необходимо просто кликнуть по нему. При клике на объект отображается всплывающее окно (окно отзывов). В заголовке окна отображен адрес выбранного объекта. Окно позволяет добавить отзыв об объекту и посмотреть уже имеющиеся отзывы.При создании отзыва в соответствующее место карты добавляется метка. Все метки одного объекта и объектов поблизости группируются в одну. У сгруппированных меток показывается их количество.Если кликнуть на одиночную метку, то появится окно отзывов по данному объекту. Если кликнуть на сгруппированную метку, то откроется карусель с отзывами. Каждый элемент карусели содержит адрес объекта. При клике на адрес, откроется окно с отзывами по данному объекту. При масштабировании карты происходит группировка меток.Примененные технологии: JavaScript ES2015 (ES6), Yandex Maps API, Handlebars.',
		preview: '../img/yampsPreview.png',
		exampleKind: 'JS Examples',
		gitHubLink: 'https://github.com/Ollemesh/yandexMapsApi',
		exampleLink: 'examples/yandexMapsApi'
	},
	{
		header: 'FriendsFilter',
		text: 'Приложение представляет из себя два списка. В левом перечислены все ваши друзья ВКонтакте. В правом списке только те друзья, которых вы выберете. Друзей можно перемещать между списками двумя способами: перетаскиванием (Drag&Drop) и нажимая на "+ / x" рядом с другом. В обоих списках работает поиск по фамилии. Нажав на "сохранить" оба списка сохраняются и при перезагрузке страницы восстанавливаются.Примененные технологии и парадигмы: JavaScript ES2015 (ES6), VK API, Handlebars, ООП.',
		preview: '../img/fFiltrPreview.png',
		exampleKind: 'JS Examples',
		gitHubLink: 'https://github.com/Ollemesh/FriendsFilter',
		exampleLink: 'examples/fFilter'
	}
]);

let webPagesCarousel = new Carousel([
	{
		header: 'Web Page',
		text: 'Example of my design and slicing skills',
		preview: '../img/webPagePreview.png',
		exampleKind: 'Web Pages Examples',
		gitHubLink: 'https://github.com/Ollemesh/webPage',
		exampleLink: 'examples/webPage'
	},
	{
		header: 'to CSSSR test',
		text: 'Test task to CSSSR team',
		preview: '../img/csssrPreview.png',
		exampleKind: 'Web Pages Examples',
		gitHubLink: 'https://github.com/Ollemesh/csssr',
		exampleLink: 'examples/csssr'
	}
]);

let carousels = {jsCarousel, webPagesCarousel};
//------------------------------------------------------------------

window.onload =  () => {

//-------------- background -----------------------

	let background = document.getElementById('background');
	let backgroundCover = document.getElementById('backgroundCover');

	console.log('DOCUMENT LOADED');
	background.hidden = false;
	backgroundCover.classList.add('background-cover_loaded');

//----------------- other contacts pop-up ------------

document.getElementById('contacts').addEventListener('click', showOtherContacts);
document.addEventListener('click', hideOtherContacts);

//---------------------- carousel ---------------------------------

document.addEventListener('click', showCarousel);
document.addEventListener('nextSlide', setSwitcherHandlers);
document.addEventListener('click', followLink);

};

//------------------- Handlers init ---------------------------------

//--------------------Handlers from bcard script ----------------------------

function showOtherContacts(e) {
	let otherContacts = document.createElement('div');
	otherContacts.classList.add('additionalContacts')

	let tamplate = document.getElementById('otherContactsTemplate').innerHTML;
	otherContacts.innerHTML = Handlebars.compile(tamplate)();

	document.getElementById('card').appendChild(otherContacts);

	e.stopPropagation();
};

function hideOtherContacts(e) {
	if ( e.target.classList[0] && e.target.classList[0].includes('additionalContacts') ) return;
	if ( document.querySelector('.additionalContacts') )
		document.getElementById('card').removeChild(document.querySelector('.additionalContacts'));
};
//----------------------------------------------------

//--------------------Handlers from carousel script----------------------------

let slide, switcher, currentExample;

function enableSwitcher(e) {
	if(e.target.classList[0] === 'slide__examples-switcher') {
		currentExample = switcher.innerHTML;
		switcher.innerHTML = '';
		for( let carousel in carousels ) {
			let example = document.createElement('div');
			example.classList.add('examples-switcher__example');
			example.innerHTML = carousels[carousel].slideList[0].exampleKind;
			example.dataset.carousel = carousel; // save the link to carousel object
			switcher.appendChild(example);
		}
	}
};

function disableSwitcher(e) {
	if(e.relatedTarget.classList[0] != 'examples-switcher__example') {
		removeAllChidrens(switcher);
		switcher.innerHTML = currentExample;
		switcher.classList.remove('slide__examples-switcher_hovered');
	}
	else if (e.relatedTarget.classList[0] === 'examples-switcher__example' && e.target.classList[0] != 'examples-switcher__example') { //чтобы не сработал обработчик, отменяющий класс hovered у switcher. В этом классе прописана обводка рамки
		e.stopPropagation();
	}
};

function removeAllChidrens(element) {
	while (element.firstChild) {
		element.removeChild(element.firstChild);
	}
};

function chooseCarousel(e) {
	if(e.target.dataset.carousel) {
		carousels[e.target.dataset.carousel].render(document.getElementById('carouselContainer'));
	}
};

function setSwitcherHandlers() {
	switcher = document.getElementById('switcher');
	slide = document.getElementById('slide');

	switcher.addEventListener('mouseover', enableSwitcher);
	switcher.addEventListener('mouseout', disableSwitcher);
	switcher.addEventListener('click', chooseCarousel);
};

function followLink(e) {
	if(e.target.dataset.link) {
		document.location.href = e.target.dataset.link;
	}
};

//----------------------------------------------------

//--------------- lats parts Handlers for render carousels after button click ----------------------

function showCarousel(e) {
	if(e.target.dataset.type) {
		carousels[e.target.dataset.type].render(getCarouselContainer());
	}
};

function getCarouselContainer() {
	let carouselContainer = document.getElementById('carouselContainer');

	if(!carouselContainer) {
		carouselContainer = document.createElement('div');
		carouselContainer.setAttribute('id', 'carouselContainer');
		carouselContainer.style.cssText = `
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0.5);`;
		body.appendChild(carouselContainer);

		carouselContainer.addEventListener('click', (e) => {
			if(e.target === carouselContainer)
				body.removeChild(carouselContainer);
		})
	}

	return carouselContainer;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vLS0tLS0tLS0tIHRhbXBsYXRlIGZ1bmN0aW9uIC0tLS0tLS0tLS0tLS0tXHJcblxyXG5IYW5kbGViYXJzLnJlZ2lzdGVySGVscGVyKCdnZXRQb2ludHNIVE1MJywgKHNsaWRlc1F1YW50aXR5LCBpbmRleCkgPT4ge1xyXG5cdGxldCBwb2ludHNCYXJIVE1MID0gJyc7XHJcblx0bGV0IG1hcmtlZFBvaW50SHRtbCA9XHJcblx0XHRcdCc8ZGl2IGNsYXNzPVwic2xpZGVfX3BvaW50IHNsaWRlX19wb2ludF9tYXJrZWRcIj48L2Rpdj4nO1xyXG5cdGZvcihsZXQgaSA9IDA7IGkgPCBzbGlkZXNRdWFudGl0eTsgaSsrKSB7XHJcblx0XHRpZihpID09IGluZGV4KSB7XHJcblx0XHRcdHBvaW50c0JhckhUTUwgKz0gbWFya2VkUG9pbnRIdG1sO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0cG9pbnRzQmFySFRNTCArPSBgPGRpdiBjbGFzcz0nc2xpZGVfX3BvaW50JyBkYXRhLWluZGV4PScke2l9Jz48L2Rpdj5gO1xyXG5cdFx0fVxyXG5cdH1cclxuXHRyZXR1cm4gbmV3IEhhbmRsZWJhcnMuU2FmZVN0cmluZyhwb2ludHNCYXJIVE1MKTtcclxufSk7XHJcblxyXG5cclxuXHJcbi8vLS0tLS0tLS0tIENhcm91c2VsIGNsYXNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5jbGFzcyBDYXJvdXNlbCB7XHJcblxyXG5cdGNvbnN0cnVjdG9yKHNsaWRlTGlzdCkge1xyXG5cdFx0dGhpcy5zbGlkZUxpc3QgPSBzbGlkZUxpc3Q7XHJcblx0XHR0aGlzLnNsaWRlTGlzdC5mb3JFYWNoKCAoc2xpZGUsIGluZGV4KSA9PiB7XHJcblx0XHRcdHNsaWRlLnNsaWRlc1F1YW50aXR5ID0gc2xpZGVMaXN0Lmxlbmd0aDtcclxuXHRcdFx0c2xpZGUuaW5kZXggPSBpbmRleDtcclxuXHRcdH0pO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyKGNvbnRhaW5lcikge1xyXG5cdFx0dGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcblx0XHR0aGlzLnJlbmRlclNsaWRlKDApO1xyXG5cdH1cclxuXHJcblx0cmVuZGVyTmV4dFNsaWRlKCkge1xyXG5cdFx0aWYodGhpcy5jdXJyZW50U2xpZGVJbmRleCArIDEgPT09IHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCkge1xyXG5cdFx0XHR0aGlzLnJlbmRlclNsaWRlKDApO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZUluZGV4ICsgMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXJQcmV2aW91c1NsaWRlKCkge1xyXG5cdFx0aWYodGhpcy5jdXJyZW50U2xpZGVJbmRleCA9PT0gMCkge1xyXG5cdFx0XHR0aGlzLnJlbmRlclNsaWRlKHRoaXMuc2xpZGVMaXN0Lmxlbmd0aCAtIDEpO1xyXG5cdFx0fSBlbHNlIHtcclxuXHRcdFx0dGhpcy5yZW5kZXJTbGlkZSh0aGlzLmN1cnJlbnRTbGlkZUluZGV4IC0gMSk7XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW5kZXJXaGljaFBvaW50Q2xpY2tlZChlKSB7XHJcblx0XHRpZihlLnRhcmdldC5kYXRhc2V0LmluZGV4KSB7XHJcblx0XHRcdHRoaXMucmVuZGVyU2xpZGUocGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5pbmRleCkpO1xyXG5cdFx0fVxyXG5cdH1cclxuXHJcblx0cmVuZGVyU2xpZGUoaW5kZXgpIHtcclxuXHRcdHRoaXMuY3VycmVudFNsaWRlSW5kZXggPSBpbmRleDtcclxuXHRcdHRoaXMuY29udGFpbmVyLmlubmVySFRNTCA9IHRoaXMuZ2V0Q2Fyb3VzZWxCb2R5KGluZGV4KTtcclxuXHRcdHRoaXMuc2V0SGFuZGxlcnMoKTtcclxuXHJcblx0XHQvL0V2ZW50IGRpc3BhdGNoZXIuIE5leHQgbGluZSBuZWVkIG9ubHkgZm9yIHN3aXRjaGVyIHdvcmtzLlxyXG5cdFx0dGhpcy5kaXNwYXRjaEV2ZW50KCk7XHJcblx0fVxyXG5cclxuXHRzZXRIYW5kbGVycygpIHtcclxuXHRcdGxldCBuZXh0QXJyb3cgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dEFycm93Jyk7XHJcblx0XHRsZXQgcHJldmlvdXNBcnJvdyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmV2aW91c0Fycm93Jyk7XHJcblx0XHRsZXQgcG9pbnRzQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BvaW50c0JhcicpO1xyXG5cclxuXHRcdGxldCBzbGlkZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZScpO1xyXG5cclxuXHRcdG5leHRBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVuZGVyTmV4dFNsaWRlLmJpbmQodGhpcykpO1xyXG5cdFx0cHJldmlvdXNBcnJvdy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMucmVuZGVyUHJldmlvdXNTbGlkZS5iaW5kKHRoaXMpKTtcclxuXHRcdHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIHRoaXMuYWRkSG92ZXJlZENsYXNzLmJpbmQodGhpcykpO1xyXG5cdFx0c2xpZGUuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCB0aGlzLnJlbW92ZUhvdmVyZWRDbGFzcy5iaW5kKHRoaXMpKTtcclxuXHRcdHNsaWRlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5yZW5kZXJXaGljaFBvaW50Q2xpY2tlZC5iaW5kKHRoaXMpKTtcclxuXHR9XHJcblxyXG5cdC8vRXZlbnQgZGlzcGF0Y2hlci4gTmV4dCBtZXRob2QgbmVlZCBvbmx5IGZvciBzd2l0Y2hlciB3b3Jrc1xyXG5cdGRpc3BhdGNoRXZlbnQoKSB7XHJcblx0XHRsZXQgc2xpZGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2xpZGUnKTtcclxuXHJcblx0XHRsZXQgbmV4dFNsaWRlRXZlbnQgPSBuZXcgQ3VzdG9tRXZlbnQoJ25leHRTbGlkZScsIHtidWJibGVzOiB0cnVlfSk7XHJcblx0XHRzbGlkZS5kaXNwYXRjaEV2ZW50KG5leHRTbGlkZUV2ZW50KTtcclxuXHR9XHJcblxyXG5cdGFkZEhvdmVyZWRDbGFzcyhlKSB7XHJcblx0XHR0aGlzLmFkZENsYXNzKGUudGFyZ2V0LCAnaG92ZXJlZCcpO1xyXG5cdH1cclxuXHJcblx0cmVtb3ZlSG92ZXJlZENsYXNzKGUpIHtcclxuXHRcdHRoaXMucmVtb3ZlQ2xhc3MoZS50YXJnZXQsICdob3ZlcmVkJyk7XHJcblx0fVxyXG5cclxuXHRhZGRDbGFzcyhlbGVtZW50LCBtb2RpZmljYXRvcikge1xyXG5cdFx0bGV0IGNsYXNzTGlzdCA9IGVsZW1lbnQuY2xhc3NMaXN0O1xyXG5cdFx0bGV0IGNsYXNzZXNRdWFudGl0eSA9IGNsYXNzTGlzdC5sZW5ndGg7XHJcblx0XHRmb3IoIGxldCBpID0gMDsgaSA8IGNsYXNzZXNRdWFudGl0eTsgaSsrKSB7XHJcblx0XHRcdGlmKGNsYXNzTGlzdFtpXS5pbmNsdWRlcygnX18nKSkge1xyXG5cdFx0XHRcdGNsYXNzTGlzdC5hZGQoYCR7Y2xhc3NMaXN0W2ldfV8ke21vZGlmaWNhdG9yfWApO1xyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fVxyXG5cclxuXHRyZW1vdmVDbGFzcyhlbGVtZW50LCBtb2RpZmljYXRvcikge1xyXG5cdGxldCBjbGFzc0xpc3QgPSBlbGVtZW50LmNsYXNzTGlzdDtcclxuXHRmb3IoIGxldCBpID0gMDsgaSA8IGNsYXNzTGlzdC5sZW5ndGg7IGkrKykge1xyXG5cdFx0aWYoY2xhc3NMaXN0W2ldLmluY2x1ZGVzKGBfJHttb2RpZmljYXRvcn1gKSkge1xyXG5cdFx0XHRjbGFzc0xpc3QucmVtb3ZlKCBjbGFzc0xpc3RbaV0gKTtcclxuXHRcdH1cclxuXHR9XHJcbn07XHJcblxyXG5cdGdldENhcm91c2VsQm9keShpbmRleCkge1xyXG5cdFx0dGhpcy50YW1wbGF0ZSA9IEhhbmRsZWJhcnMuY29tcGlsZShcclxuXHRcdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nhcm91c2VsVGFtcGxhdGUnKS5pbm5lckhUTUxcclxuXHRcdCk7XHJcblx0XHRyZXR1cm4gdGhpcy50YW1wbGF0ZSh0aGlzLnNsaWRlTGlzdFtpbmRleF0pO1xyXG5cdH1cclxufTtcclxuXHJcblxyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBtYWluIGNvZGUgLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tY2Fyb3VzZWxzIGluaXQgLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmxldCBqc0Nhcm91c2VsID0gbmV3IENhcm91c2VsKFtcclxuXHR7XHJcblx0XHRoZWFkZXI6ICdZYW5kZXhNYXAgQVBJJyxcclxuXHRcdHRleHQ6ICfQn9GA0LjQu9C+0LbQtdC90LjQtSDQv9GA0LXQtNGB0YLQsNCy0LvRj9C10YIg0LjQtyDRgdC10LHRjyDQr9C90LTQtdC60YEt0LrQsNGA0YLRgy4g0J3QsCDQutCw0YDRgtC1INC80L7QttC90L4g0LLRi9Cx0LjRgNCw0YLRjCDQvtCx0YrQtdC60YLRiyDQuCDQvtGB0YLQsNCy0LvRj9GC0Ywg0YHQstC+0Lgg0L7RgtC30YvQstGLINC+INC90LjRhS7QlNC70Y8g0LLRi9Cx0L7RgNCwINC+0LHRitC10LrRgtCwINC90LXQvtCx0YXQvtC00LjQvNC+INC/0YDQvtGB0YLQviDQutC70LjQutC90YPRgtGMINC/0L4g0L3QtdC80YMuINCf0YDQuCDQutC70LjQutC1INC90LAg0L7QsdGK0LXQutGCINC+0YLQvtCx0YDQsNC20LDQtdGC0YHRjyDQstGB0L/Qu9GL0LLQsNGO0YnQtdC1INC+0LrQvdC+ICjQvtC60L3QviDQvtGC0LfRi9Cy0L7QsikuINCSINC30LDQs9C+0LvQvtCy0LrQtSDQvtC60L3QsCDQvtGC0L7QsdGA0LDQttC10L0g0LDQtNGA0LXRgSDQstGL0LHRgNCw0L3QvdC+0LPQviDQvtCx0YrQtdC60YLQsC4g0J7QutC90L4g0L/QvtC30LLQvtC70Y/QtdGCINC00L7QsdCw0LLQuNGC0Ywg0L7RgtC30YvQsiDQvtCxINC+0LHRitC10LrRgtGDINC4INC/0L7RgdC80L7RgtGA0LXRgtGMINGD0LbQtSDQuNC80LXRjtGJ0LjQtdGB0Y8g0L7RgtC30YvQstGLLtCf0YDQuCDRgdC+0LfQtNCw0L3QuNC4INC+0YLQt9GL0LLQsCDQsiDRgdC+0L7RgtCy0LXRgtGB0YLQstGD0Y7RidC10LUg0LzQtdGB0YLQviDQutCw0YDRgtGLINC00L7QsdCw0LLQu9GP0LXRgtGB0Y8g0LzQtdGC0LrQsC4g0JLRgdC1INC80LXRgtC60Lgg0L7QtNC90L7Qs9C+INC+0LHRitC10LrRgtCwINC4INC+0LHRitC10LrRgtC+0LIg0L/QvtCx0LvQuNC30L7RgdGC0Lgg0LPRgNGD0L/Qv9C40YDRg9GO0YLRgdGPINCyINC+0LTQvdGDLiDQoyDRgdCz0YDRg9C/0L/QuNGA0L7QstCw0L3QvdGL0YUg0LzQtdGC0L7QuiDQv9C+0LrQsNC30YvQstCw0LXRgtGB0Y8g0LjRhSDQutC+0LvQuNGH0LXRgdGC0LLQvi7QldGB0LvQuCDQutC70LjQutC90YPRgtGMINC90LAg0L7QtNC40L3QvtGH0L3Rg9GOINC80LXRgtC60YMsINGC0L4g0L/QvtGP0LLQuNGC0YHRjyDQvtC60L3QviDQvtGC0LfRi9Cy0L7QsiDQv9C+INC00LDQvdC90L7QvNGDINC+0LHRitC10LrRgtGDLiDQldGB0LvQuCDQutC70LjQutC90YPRgtGMINC90LAg0YHQs9GA0YPQv9C/0LjRgNC+0LLQsNC90L3Rg9GOINC80LXRgtC60YMsINGC0L4g0L7RgtC60YDQvtC10YLRgdGPINC60LDRgNGD0YHQtdC70Ywg0YEg0L7RgtC30YvQstCw0LzQuC4g0JrQsNC20LTRi9C5INGN0LvQtdC80LXQvdGCINC60LDRgNGD0YHQtdC70Lgg0YHQvtC00LXRgNC20LjRgiDQsNC00YDQtdGBINC+0LHRitC10LrRgtCwLiDQn9GA0Lgg0LrQu9C40LrQtSDQvdCwINCw0LTRgNC10YEsINC+0YLQutGA0L7QtdGC0YHRjyDQvtC60L3QviDRgSDQvtGC0LfRi9Cy0LDQvNC4INC/0L4g0LTQsNC90L3QvtC80YMg0L7QsdGK0LXQutGC0YMuINCf0YDQuCDQvNCw0YHRiNGC0LDQsdC40YDQvtCy0LDQvdC40Lgg0LrQsNGA0YLRiyDQv9GA0L7QuNGB0YXQvtC00LjRgiDQs9GA0YPQv9C/0LjRgNC+0LLQutCwINC80LXRgtC+0Lou0J/RgNC40LzQtdC90LXQvdC90YvQtSDRgtC10YXQvdC+0LvQvtCz0LjQuDogSmF2YVNjcmlwdCBFUzIwMTUgKEVTNiksIFlhbmRleCBNYXBzIEFQSSwgSGFuZGxlYmFycy4nLFxyXG5cdFx0cHJldmlldzogJy4uL2ltZy95YW1wc1ByZXZpZXcucG5nJyxcclxuXHRcdGV4YW1wbGVLaW5kOiAnSlMgRXhhbXBsZXMnLFxyXG5cdFx0Z2l0SHViTGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9PbGxlbWVzaC95YW5kZXhNYXBzQXBpJyxcclxuXHRcdGV4YW1wbGVMaW5rOiAnZXhhbXBsZXMveWFuZGV4TWFwc0FwaSdcclxuXHR9LFxyXG5cdHtcclxuXHRcdGhlYWRlcjogJ0ZyaWVuZHNGaWx0ZXInLFxyXG5cdFx0dGV4dDogJ9Cf0YDQuNC70L7QttC10L3QuNC1INC/0YDQtdC00YHRgtCw0LLQu9GP0LXRgiDQuNC3INGB0LXQsdGPINC00LLQsCDRgdC/0LjRgdC60LAuINCSINC70LXQstC+0Lwg0L/QtdGA0LXRh9C40YHQu9C10L3RiyDQstGB0LUg0LLQsNGI0Lgg0LTRgNGD0LfRjNGPINCS0JrQvtC90YLQsNC60YLQtS4g0JIg0L/RgNCw0LLQvtC8INGB0L/QuNGB0LrQtSDRgtC+0LvRjNC60L4g0YLQtSDQtNGA0YPQt9GM0Y8sINC60L7RgtC+0YDRi9GFINCy0Ysg0LLRi9Cx0LXRgNC10YLQtS4g0JTRgNGD0LfQtdC5INC80L7QttC90L4g0L/QtdGA0LXQvNC10YnQsNGC0Ywg0LzQtdC20LTRgyDRgdC/0LjRgdC60LDQvNC4INC00LLRg9C80Y8g0YHQv9C+0YHQvtCx0LDQvNC4OiDQv9C10YDQtdGC0LDRgdC60LjQstCw0L3QuNC10LwgKERyYWcmRHJvcCkg0Lgg0L3QsNC20LjQvNCw0Y8g0L3QsCBcIisgLyB4XCIg0YDRj9C00L7QvCDRgSDQtNGA0YPQs9C+0LwuINCSINC+0LHQvtC40YUg0YHQv9C40YHQutCw0YUg0YDQsNCx0L7RgtCw0LXRgiDQv9C+0LjRgdC6INC/0L4g0YTQsNC80LjQu9C40LguINCd0LDQttCw0LIg0L3QsCBcItGB0L7RhdGA0LDQvdC40YLRjFwiINC+0LHQsCDRgdC/0LjRgdC60LAg0YHQvtGF0YDQsNC90Y/RjtGC0YHRjyDQuCDQv9GA0Lgg0L/QtdGA0LXQt9Cw0LPRgNGD0LfQutC1INGB0YLRgNCw0L3QuNGG0Ysg0LLQvtGB0YHRgtCw0L3QsNCy0LvQuNCy0LDRjtGC0YHRjy7Qn9GA0LjQvNC10L3QtdC90L3Ri9C1INGC0LXRhdC90L7Qu9C+0LPQuNC4INC4INC/0LDRgNCw0LTQuNCz0LzRizogSmF2YVNjcmlwdCBFUzIwMTUgKEVTNiksIFZLIEFQSSwgSGFuZGxlYmFycywg0J7QntCfLicsXHJcblx0XHRwcmV2aWV3OiAnLi4vaW1nL2ZGaWx0clByZXZpZXcucG5nJyxcclxuXHRcdGV4YW1wbGVLaW5kOiAnSlMgRXhhbXBsZXMnLFxyXG5cdFx0Z2l0SHViTGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9PbGxlbWVzaC9GcmllbmRzRmlsdGVyJyxcclxuXHRcdGV4YW1wbGVMaW5rOiAnZXhhbXBsZXMvZkZpbHRlcidcclxuXHR9XHJcbl0pO1xyXG5cclxubGV0IHdlYlBhZ2VzQ2Fyb3VzZWwgPSBuZXcgQ2Fyb3VzZWwoW1xyXG5cdHtcclxuXHRcdGhlYWRlcjogJ1dlYiBQYWdlJyxcclxuXHRcdHRleHQ6ICdFeGFtcGxlIG9mIG15IGRlc2lnbiBhbmQgc2xpY2luZyBza2lsbHMnLFxyXG5cdFx0cHJldmlldzogJy4uL2ltZy93ZWJQYWdlUHJldmlldy5wbmcnLFxyXG5cdFx0ZXhhbXBsZUtpbmQ6ICdXZWIgUGFnZXMgRXhhbXBsZXMnLFxyXG5cdFx0Z2l0SHViTGluazogJ2h0dHBzOi8vZ2l0aHViLmNvbS9PbGxlbWVzaC93ZWJQYWdlJyxcclxuXHRcdGV4YW1wbGVMaW5rOiAnZXhhbXBsZXMvd2ViUGFnZSdcclxuXHR9LFxyXG5cdHtcclxuXHRcdGhlYWRlcjogJ3RvIENTU1NSIHRlc3QnLFxyXG5cdFx0dGV4dDogJ1Rlc3QgdGFzayB0byBDU1NTUiB0ZWFtJyxcclxuXHRcdHByZXZpZXc6ICcuLi9pbWcvY3Nzc3JQcmV2aWV3LnBuZycsXHJcblx0XHRleGFtcGxlS2luZDogJ1dlYiBQYWdlcyBFeGFtcGxlcycsXHJcblx0XHRnaXRIdWJMaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL09sbGVtZXNoL2Nzc3NyJyxcclxuXHRcdGV4YW1wbGVMaW5rOiAnZXhhbXBsZXMvY3Nzc3InXHJcblx0fVxyXG5dKTtcclxuXHJcbmxldCBjYXJvdXNlbHMgPSB7anNDYXJvdXNlbCwgd2ViUGFnZXNDYXJvdXNlbH07XHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG53aW5kb3cub25sb2FkID0gICgpID0+IHtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0gYmFja2dyb3VuZCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuXHRsZXQgYmFja2dyb3VuZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZ3JvdW5kJyk7XHJcblx0bGV0IGJhY2tncm91bmRDb3ZlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdiYWNrZ3JvdW5kQ292ZXInKTtcclxuXHJcblx0Y29uc29sZS5sb2coJ0RPQ1VNRU5UIExPQURFRCcpO1xyXG5cdGJhY2tncm91bmQuaGlkZGVuID0gZmFsc2U7XHJcblx0YmFja2dyb3VuZENvdmVyLmNsYXNzTGlzdC5hZGQoJ2JhY2tncm91bmQtY292ZXJfbG9hZGVkJyk7XHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tIG90aGVyIGNvbnRhY3RzIHBvcC11cCAtLS0tLS0tLS0tLS1cclxuXHJcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250YWN0cycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd090aGVyQ29udGFjdHMpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhpZGVPdGhlckNvbnRhY3RzKTtcclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSBjYXJvdXNlbCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2hvd0Nhcm91c2VsKTtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbmV4dFNsaWRlJywgc2V0U3dpdGNoZXJIYW5kbGVycyk7XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9sbG93TGluayk7XHJcblxyXG59O1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tIEhhbmRsZXJzIGluaXQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tSGFuZGxlcnMgZnJvbSBiY2FyZCBzY3JpcHQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxyXG5cclxuZnVuY3Rpb24gc2hvd090aGVyQ29udGFjdHMoZSkge1xyXG5cdGxldCBvdGhlckNvbnRhY3RzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0b3RoZXJDb250YWN0cy5jbGFzc0xpc3QuYWRkKCdhZGRpdGlvbmFsQ29udGFjdHMnKVxyXG5cclxuXHRsZXQgdGFtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3RoZXJDb250YWN0c1RlbXBsYXRlJykuaW5uZXJIVE1MO1xyXG5cdG90aGVyQ29udGFjdHMuaW5uZXJIVE1MID0gSGFuZGxlYmFycy5jb21waWxlKHRhbXBsYXRlKSgpO1xyXG5cclxuXHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2FyZCcpLmFwcGVuZENoaWxkKG90aGVyQ29udGFjdHMpO1xyXG5cclxuXHRlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gaGlkZU90aGVyQ29udGFjdHMoZSkge1xyXG5cdGlmICggZS50YXJnZXQuY2xhc3NMaXN0WzBdICYmIGUudGFyZ2V0LmNsYXNzTGlzdFswXS5pbmNsdWRlcygnYWRkaXRpb25hbENvbnRhY3RzJykgKSByZXR1cm47XHJcblx0aWYgKCBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkaXRpb25hbENvbnRhY3RzJykgKVxyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NhcmQnKS5yZW1vdmVDaGlsZChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWRkaXRpb25hbENvbnRhY3RzJykpO1xyXG59O1xyXG4vLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbi8vLS0tLS0tLS0tLS0tLS0tLS0tLS1IYW5kbGVycyBmcm9tIGNhcm91c2VsIHNjcmlwdC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cclxuXHJcbmxldCBzbGlkZSwgc3dpdGNoZXIsIGN1cnJlbnRFeGFtcGxlO1xyXG5cclxuZnVuY3Rpb24gZW5hYmxlU3dpdGNoZXIoZSkge1xyXG5cdGlmKGUudGFyZ2V0LmNsYXNzTGlzdFswXSA9PT0gJ3NsaWRlX19leGFtcGxlcy1zd2l0Y2hlcicpIHtcclxuXHRcdGN1cnJlbnRFeGFtcGxlID0gc3dpdGNoZXIuaW5uZXJIVE1MO1xyXG5cdFx0c3dpdGNoZXIuaW5uZXJIVE1MID0gJyc7XHJcblx0XHRmb3IoIGxldCBjYXJvdXNlbCBpbiBjYXJvdXNlbHMgKSB7XHJcblx0XHRcdGxldCBleGFtcGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRcdGV4YW1wbGUuY2xhc3NMaXN0LmFkZCgnZXhhbXBsZXMtc3dpdGNoZXJfX2V4YW1wbGUnKTtcclxuXHRcdFx0ZXhhbXBsZS5pbm5lckhUTUwgPSBjYXJvdXNlbHNbY2Fyb3VzZWxdLnNsaWRlTGlzdFswXS5leGFtcGxlS2luZDtcclxuXHRcdFx0ZXhhbXBsZS5kYXRhc2V0LmNhcm91c2VsID0gY2Fyb3VzZWw7IC8vIHNhdmUgdGhlIGxpbmsgdG8gY2Fyb3VzZWwgb2JqZWN0XHJcblx0XHRcdHN3aXRjaGVyLmFwcGVuZENoaWxkKGV4YW1wbGUpO1xyXG5cdFx0fVxyXG5cdH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGRpc2FibGVTd2l0Y2hlcihlKSB7XHJcblx0aWYoZS5yZWxhdGVkVGFyZ2V0LmNsYXNzTGlzdFswXSAhPSAnZXhhbXBsZXMtc3dpdGNoZXJfX2V4YW1wbGUnKSB7XHJcblx0XHRyZW1vdmVBbGxDaGlkcmVucyhzd2l0Y2hlcik7XHJcblx0XHRzd2l0Y2hlci5pbm5lckhUTUwgPSBjdXJyZW50RXhhbXBsZTtcclxuXHRcdHN3aXRjaGVyLmNsYXNzTGlzdC5yZW1vdmUoJ3NsaWRlX19leGFtcGxlcy1zd2l0Y2hlcl9ob3ZlcmVkJyk7XHJcblx0fVxyXG5cdGVsc2UgaWYgKGUucmVsYXRlZFRhcmdldC5jbGFzc0xpc3RbMF0gPT09ICdleGFtcGxlcy1zd2l0Y2hlcl9fZXhhbXBsZScgJiYgZS50YXJnZXQuY2xhc3NMaXN0WzBdICE9ICdleGFtcGxlcy1zd2l0Y2hlcl9fZXhhbXBsZScpIHsgLy/Rh9GC0L7QsdGLINC90LUg0YHRgNCw0LHQvtGC0LDQuyDQvtCx0YDQsNCx0L7RgtGH0LjQuiwg0L7RgtC80LXQvdGP0Y7RidC40Lkg0LrQu9Cw0YHRgSBob3ZlcmVkINGDIHN3aXRjaGVyLiDQkiDRjdGC0L7QvCDQutC70LDRgdGB0LUg0L/RgNC+0L/QuNGB0LDQvdCwINC+0LHQstC+0LTQutCwINGA0LDQvNC60LhcclxuXHRcdGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcblx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gcmVtb3ZlQWxsQ2hpZHJlbnMoZWxlbWVudCkge1xyXG5cdHdoaWxlIChlbGVtZW50LmZpcnN0Q2hpbGQpIHtcclxuXHRcdGVsZW1lbnQucmVtb3ZlQ2hpbGQoZWxlbWVudC5maXJzdENoaWxkKTtcclxuXHR9XHJcbn07XHJcblxyXG5mdW5jdGlvbiBjaG9vc2VDYXJvdXNlbChlKSB7XHJcblx0aWYoZS50YXJnZXQuZGF0YXNldC5jYXJvdXNlbCkge1xyXG5cdFx0Y2Fyb3VzZWxzW2UudGFyZ2V0LmRhdGFzZXQuY2Fyb3VzZWxdLnJlbmRlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2Fyb3VzZWxDb250YWluZXInKSk7XHJcblx0fVxyXG59O1xyXG5cclxuZnVuY3Rpb24gc2V0U3dpdGNoZXJIYW5kbGVycygpIHtcclxuXHRzd2l0Y2hlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzd2l0Y2hlcicpO1xyXG5cdHNsaWRlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlJyk7XHJcblxyXG5cdHN3aXRjaGVyLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGVuYWJsZVN3aXRjaGVyKTtcclxuXHRzd2l0Y2hlci5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGRpc2FibGVTd2l0Y2hlcik7XHJcblx0c3dpdGNoZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaG9vc2VDYXJvdXNlbCk7XHJcbn07XHJcblxyXG5mdW5jdGlvbiBmb2xsb3dMaW5rKGUpIHtcclxuXHRpZihlLnRhcmdldC5kYXRhc2V0LmxpbmspIHtcclxuXHRcdGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBlLnRhcmdldC5kYXRhc2V0Lmxpbms7XHJcblx0fVxyXG59O1xyXG5cclxuLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG4vLy0tLS0tLS0tLS0tLS0tLSBsYXRzIHBhcnRzIEhhbmRsZXJzIGZvciByZW5kZXIgY2Fyb3VzZWxzIGFmdGVyIGJ1dHRvbiBjbGljayAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXHJcblxyXG5mdW5jdGlvbiBzaG93Q2Fyb3VzZWwoZSkge1xyXG5cdGlmKGUudGFyZ2V0LmRhdGFzZXQudHlwZSkge1xyXG5cdFx0Y2Fyb3VzZWxzW2UudGFyZ2V0LmRhdGFzZXQudHlwZV0ucmVuZGVyKGdldENhcm91c2VsQ29udGFpbmVyKCkpO1xyXG5cdH1cclxufTtcclxuXHJcbmZ1bmN0aW9uIGdldENhcm91c2VsQ29udGFpbmVyKCkge1xyXG5cdGxldCBjYXJvdXNlbENvbnRhaW5lciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjYXJvdXNlbENvbnRhaW5lcicpO1xyXG5cclxuXHRpZighY2Fyb3VzZWxDb250YWluZXIpIHtcclxuXHRcdGNhcm91c2VsQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcblx0XHRjYXJvdXNlbENvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2Nhcm91c2VsQ29udGFpbmVyJyk7XHJcblx0XHRjYXJvdXNlbENvbnRhaW5lci5zdHlsZS5jc3NUZXh0ID0gYFxyXG5cdFx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XHJcblx0XHRcdHRvcDogMDtcclxuXHRcdFx0bGVmdDogMDtcclxuXHRcdFx0d2lkdGg6IDEwMCU7XHJcblx0XHRcdGhlaWdodDogMTAwJTtcclxuXHRcdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO2A7XHJcblx0XHRib2R5LmFwcGVuZENoaWxkKGNhcm91c2VsQ29udGFpbmVyKTtcclxuXHJcblx0XHRjYXJvdXNlbENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcblx0XHRcdGlmKGUudGFyZ2V0ID09PSBjYXJvdXNlbENvbnRhaW5lcilcclxuXHRcdFx0XHRib2R5LnJlbW92ZUNoaWxkKGNhcm91c2VsQ29udGFpbmVyKTtcclxuXHRcdH0pXHJcblx0fVxyXG5cclxuXHRyZXR1cm4gY2Fyb3VzZWxDb250YWluZXI7XHJcbn07Il0sImZpbGUiOiJtYWluLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
