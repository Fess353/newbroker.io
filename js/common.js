'use strict';

/* eslint-env es6 */
function setDocumentVh(selector) {
	let vh = window.innerHeight * 0.01;
	document.documentElement.style.setProperty('--vh', `${vh}px`);
	let elem = document.querySelector(selector);
	let scrollWidth = window.innerWidth - elem.clientWidth;
	document.documentElement.style.setProperty(
		'--scroll-width',
		`${scrollWidth}px`
	);
}
window.addEventListener('resize', function () {
	setDocumentVh('body');
});
setDocumentVh('body');

// Объявление переменных
let mainButton = document.querySelector('.page__button_1');
let body = document.querySelector('body');
let finalArrow = document.querySelector('.final-block__arrow');
let finalBlock = document.querySelector('.final-block');
let pageCounter = 1;
let totalPages = 6;
let resultArray = [];

let catsDescriptionArray = [
	'Твой портфель идеально сбалансирован, а будущее расписано на пять лет вперед. Что ещё надо? Например, научиться эффективно действовать в непредвиденных ситуациях. <a class="page__result-link" href="#" rel="noopener" target="_blank">«Открытие Брокер» подготовил для тебя несколько идей.</a>',
	'Ураган страсти, заключенный в теле инвестора. Ты найдёшь применение любым активам. У нас для тебя кое что есть — зарегистрируйся в «Открытие Брокер» и получи акцию в подарок. <a class="page__result-link" href="#" rel="noopener" target="_blank"> Подробности здесь </a>',
	'Действуешь вопреки общей тенденции, а иногда и вопреки здравому смыслу? Временами прокатывает? Поздравляем. Но ты же знаешь, что можешь больше. <a class="page__result-link" href="#" rel="noopener" target="_blank"> Если тебе тоже не даёт покоя звезда Уоррена Баффета, учись инвестировать с умом. </a>',
	'Свой капитал ты сохранишь. Несмотря на инфляцию, пандемию, падение метеорита или высадку инопланетян. Если хочешь больше зарабатывать на инвестициях — <a class="page__result-link" href="#" rel="noopener" target="_blank"> жми сюда. </a>',
	'В розыгрышах, конечно, приятно участвовать. Но сейчас даже школьник знает, как торговать на бирже. Поэтому мы для тебя подготовили программу бесплатного обучения. А если <a class="page__result-link" href="#" rel="noopener" target="_blank"> зарегистрируешься с этого сайта </a>, подарим акцию'
];
let catsTypeArray = [
	'Инвестор-дотошка',
	'Инвестор от бога',
	'Инвестор-авантюрист',
	'Инвестор-перестраховщик',
	'Инвестор-падаван'
];

// перейти к ответам на странице, убрать ненужные элементы
function showAnswers(num) {
	let btn = document.querySelector(`.page${num} .page__button`);
	btn.addEventListener('click', function () {
		$(`.page${num} .question__wrapper`).addClass('question-scale-animation');
		$(`.page${num} .question__tail`).addClass(
			'question__tail-disappear-animation'
		);
		$(`.page${num} .page__cat-right-img`).addClass(
			'page__cat-right-disappear-animation'
		);
		$(`.page${num} .page__cat-left-img`).addClass(
			'page__cat-left-disappear-animation'
		);
		$(`.page${num} .page__button-wrapper`).addClass(
			'button-disappear-animation'
		);
		$(`.page${num} .page__answers`).addClass('answers-appear-animation');
		setTimeout(() => {
			$(`.page${num} .page__cat-right`).css('display', 'none');
		}, 310);
	});
}

// загрузка следующей страницы
function loadNextPage(num) {
	let currentPage = $(`.page${num}`);
	let nextPage = $(`.page${num + 1}`);
	setTimeout(() => {
		$(nextPage).css('display', 'block');
	}, 500);
	setTimeout(() => {
		$(currentPage).css('display', 'none');
	}, 600);
	if (pageCounter < totalPages) {
		setTimeout(() => {
			showAnswers(pageCounter);
		}, 400);
	} else {
		// eslint-disable-next-line no-use-before-define
		loadResultPage();
	}
}

// расчет типа на основании ответов из массива
const maxOccurences = array => Array.from(
	array
		.reduce(
			(map, value) => map.set(value, map.has(value) ? map.get(value) + 1 : 1),
			new Map()
		)
		.entries()
)
	.reduce((max, entry) => (entry[1] > max[1] ? entry : max))
	.reduce((item, count) => ({ item, count }));

// Переключение на новую страницу
function switchPage() {
	// переход с первой страницы
	mainButton.addEventListener('click', function () {
		$('.page1').css('overflow', 'hidden');
		$('.page__cat-center').addClass('page__cat-center-disappear-animation');
		$('.page__button_1').addClass('button-disappear-animation');
		$('.page__title').addClass('hide');
		$('.page1 .background__animation').fadeOut(500);
		loadNextPage(pageCounter);
		pageCounter++;

		let time = 30;
		setInterval(() => {
			$('.page1 .background__animation').css('animation-duration', `${time}s`);
			time -= 0.2;
		}, 5);
	});

	// переход по остальным страницам + исчезновение ответов при смене страниц
	document.querySelectorAll('.answers__container').forEach(function (elem) {
		elem.addEventListener('click', function (e) {
			if (e.target.classList.contains('answers__button')) {
				$(body).css('pointer-events', 'none');
				setTimeout(() => {
					$(body).css('pointer-events', 'auto');
				}, 600);
				$(e.target).css('background-color', '#ff9800');
				$(`.page${pageCounter} .question`)
					.css('opacity', '1')
					.addClass('question-disappear-animation');

				e.target.parentElement.classList.add('answers-disappear-animation');
				resultArray.push(e.target.dataset.num);
				loadNextPage(pageCounter);
				pageCounter++;

				if ($(window).width() > 1439) {
					let array = Array.from(e.target.parentElement.children);
					let currentAnswerNum = Number(e.target.dataset.num);

					for (let i = 1; i < array.length; i++) {
						if (i !== currentAnswerNum) {
							array[i].classList.add('answers_dissolve');
						}
					}
				}
			}
		});
	});
}

window.onload = function () {
	setTimeout(() => {
		$('.background__animation').css('animation-play-state', 'running');
	}, 1500);
	switchPage();
};

// отрисовка финальной страницы
function loadResultPage() {
	let num = maxOccurences(resultArray).item - 1;
	let resultType = document.querySelector('.question_result');
	let resultText = document.querySelector('.page__result-text');
	let resultCat = document.querySelector('.page__result-cat');

	resultType.textContent = catsTypeArray[num];
	resultText.innerHTML = catsDescriptionArray[num];
	resultCat.insertAdjacentHTML(
		'beforeend',
		`<picture class="main-page__result-cat-picture">
			<source srcset="img/cat_result_xs${num}.webp" media="(max-width: 767px)" type="image/webp">
			<source srcset="img/cat_result_sm${num}.webp" type="image/webp">
			<source srcset="img/cat_result_xs${num}.png" media="(max-width: 767px)">
			<img src="img/cat_result_sm${num}.png" alt="result">
			</picture>`
	);

	setTimeout(() => {
		finalBlock.classList.toggle('final-block_closed');
		finalBlock.classList.toggle('final-block_hidden');
	}, 1600);
}

// открытие-закрытие финального блока
let finalButton = document.querySelector('.final-block__button');
let popupCloseBtn = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.page__popup');

function moveFinalBlock() {
	finalArrow.classList.toggle('arrow_still');
	finalBlock.classList.toggle('final-block_opened');
	finalBlock.classList.toggle('final-block_closed');
}

finalArrow.addEventListener('click', moveFinalBlock);
document
	.querySelector('.final-block__title')
	.addEventListener('click', moveFinalBlock);

// закрытие попапа
popupCloseBtn.addEventListener('click', function () {
	popup.classList.remove('popup_visible');
});

// отметка о посещении ссылки соцсетей
let socialBtns = document.querySelector('.final-block__social-btns');
socialBtns.addEventListener('click', function (event) {
	if (!event.target.classList.contains('final-block__social-icon')) return;
	event.target.parentElement.classList.add('final-block__social-btn_visited');
	event.target.classList.add('final-block__social-icon_visited');
});

// выравнивание стрелки на ответах
function changeArrow(className) {
	let container = document.querySelectorAll(`.${className}`);
	for (let i = 0; i < container.length; i++) {
		let arrow = container[i].querySelector('.answers__arrow');
		let lastAnswer = container[i].querySelector('.js_last');

		container[i].parentElement.addEventListener(
			'scroll',
			function () {
				if (
					lastAnswer.getBoundingClientRect().bottom <
					window.innerHeight + 50
				) {
					arrow.classList.add('arrow_still');
				} else {
					arrow.classList.remove('arrow_still');
				}
			},
			true
		);
	}
}
changeArrow('answers__container');

// показать ошибку на инпуте
let emailInput = document.querySelector('.final-block__email-input');
function showValidationError() {
	emailInput.classList.add('final-block__email-input_error');
}

// валидация имейл по регулярному выражению
function validateEmail() {
	let email = $('.final-block__email-input').val();
	if (email.length === 0) {
		showValidationError();
	}

	let regularEmailForm =
		/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	return regularEmailForm.test(String(email).toLowerCase());
}

// проверка имейл
function validate() {
	if (validateEmail()) {
		emailInput.classList.remove('final-block__email-input_error');
	} else {
		showValidationError();
	}
}
emailInput.addEventListener('blur', validate);

// инпут, смена класса для ховера
let checkbox = document.querySelector('.final-block__checkbox-input');

function showHover () {
	document
		.querySelector('.final-block__checkbox-label')
		.classList.toggle('none');
	document
		.querySelector('.button__text')
		.classList.toggle('button__text_disabled');
	if (!finalButton.disabled) {
		finalButton.disabled = true;
	} else {
		finalButton.disabled = false;
	}
}
checkbox.addEventListener('change', showHover);

// тестовая проверка попапа - подписка на акцию
let emailTestSet = new Set();
emailTestSet.add('test@mail.ru');
emailTestSet.add('test2@gmail.com');
function showPopup() {
	popup.classList.add('popup_visible');
	let e = $('.final-block__email-input').val().toString().toLowerCase();
	if (!emailTestSet.has(e)) {
		emailTestSet.add(e);
		$('.popup__success').css('opacity', '1');
		$('.popup__decline').css('opacity', '0');
	} else {
		$('.popup__success').css('opacity', '0');
		$('.popup__decline').css('opacity', '1');
	}
}

function testRegister() {
	if (!finalButton.disabled && validateEmail()) {
	// let url = '';
		// let mail = $('.final-block__email-input').val().toString().toLowerCase();
		// let response = await fetch(url, {
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json;charset=utf-8'
		// 	},
		// 	body: JSON.stringify(mail)
		// });
		// let result = await response.json();
		showPopup();
	}
}

finalButton.addEventListener('click', testRegister);
// конец тестового блока
