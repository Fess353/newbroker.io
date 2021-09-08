'use strict';

/* eslint-env es6 */
let centerCat = document.querySelector('.main-page__center-cat');
let centerCatCash = document.querySelector('.main-page__center-cat-cash');
let leftCat = document.querySelector('.main-page__left-cat');
let rightCat = document.querySelector('.main-page__right-cat');
let resultCat = document.querySelector('.main-page__result-cat');
let background = document.querySelectorAll('.background__animation-container');
let title = document.querySelector('.title');
let question = document.querySelector('.question');
let tail = document.querySelector('.question__tail');
let mainPageButton = document.querySelector('.main-page__button');
let answersContainer = document.querySelector('.answers');
let answers = document.querySelectorAll('.answers__button');
let resultType = document.querySelector('.main-page__result-type');
let resultText = document.querySelector('.main-page__result-text');
let resultTitle = document.querySelector('.main-page__result-title');
let finalBlock = document.querySelector('.final-block');
let finalBlockTitle = document.querySelector('.final-block__title');
let sendButton = document.querySelector('.js_validate');
let emailInput = document.querySelector('.final-block__email-input');
let checkbox = document.querySelector('.final-block__checkbox-input');
let $error = $('.final-block__email-error');
let popup = document.querySelector('.main-page__popup-final-wrapper');
let popupCloseBtn = document.querySelector('.popup-final__close-btn');
let finalBlockArrow = document.querySelector('.final-block__arrow');
let checkboxLabel = document.querySelector('.final-block__checkbox-label');
let catCounter = 1;
let pageCounter = 0;
let resultArray = [];

for (let i = 0; i < answers.length; i++) {
	answers[i].dataset.num = i;
}

window.onload = function () {
	if ($(window).width() < 768) {
		$('html, body').animate(
			{
				scrollTop: $(mainPageButton).offset().top
			},
			{
				duration: 400,
				easing: 'linear'
			}
		);
	}
};

function cssTrick() {
	let viewheight = $(window).height();
	let viewwidth = $(window).width();
	let viewport = document.querySelector('meta[name=viewport]');
	viewport.setAttribute(
		'content',
		'height=' + viewheight + ', width=' + viewwidth + ', initial-scale=1.0'
	);
}
emailInput.addEventListener('focus', cssTrick);

function stopCssTrick() {
	let viewport = document.querySelector('meta[name=viewport]');
	setTimeout(() => {
		viewport.setAttribute(
			'content',
			'width=device-width, height=device-height, initial-scale=1.0 maximum-scale=1.0'
		);
	}, 200);
}

emailInput.addEventListener('blur', stopCssTrick);

popupCloseBtn.onclick = function () {
	$(popup).fadeOut(400);
};

function changeLinksToVisited(event) {
	if (
		event.target.nodeName === 'IMG' &&
		$(event.target)
			.closest('.final-block__social-btn')
			.hasClass('final-block__social-btn')
	) {
		$(event.target)
			.closest('.final-block__social-btn')
			.addClass('final-block__social-btn_visited');
		$(event.target).addClass('final-block__social-icon_visited');
	}
}
document.addEventListener('click', changeLinksToVisited);

let questionsArray = [
	'В 2018 году США и Китай снова что-то не поделили и развязали торговую войну. Фондовый рынок США сначала упал на 10%, а через три месяца взлетел.',
	'Одна летучая мышь не только разрушила наши планы на 2020 год, но и обвалила фондовый рынок почти на 50%. И хоть пандемия продолжается, биржа уверенно восстанавливается.',
	'В 2012 году в акции Facebook никто не верил, как сегодня никто не верит в новый дизайн. Сейчас активы выросли в цене почти в семь раз и стоят $264',
	'Небольшая фармацевтическая компания Moderna сказала, что мы спасены. Она разработала и успешно испытала вакцину против коронавируса. После этого акции компании выросли с $30 до $90',
	'Акции Boeing ещё держались после того, как 737-MAX перестали использовать все авиакомпании, а производство остановилось. А вот пандемия здорово их пошатнула'
];

let catsDescriptionArray = [
	'Твой портфель идеально сбалансирован, а будущее расписано на пять лет вперед. Что ещё надо? Например, научиться эффективно действовать в непредвиденных ситуациях. <a class="main-page__result-link" href="#" rel="noopener" target="_blank">«Открытие Брокер» подготовил для тебя несколько идей.</a>',
	'Ураган страсти, заключенный в теле инвестора. Ты найдёшь применение любым активам. У нас для тебя кое что есть — зарегистрируйся в «Открытие Брокер» и получи акцию в подарок. <a class="main-page__result-link" href="#" rel="noopener" target="_blank"> Подробности здесь </a>',
	'Действуешь вопреки общей тенденции, а иногда и вопреки здравому смыслу? Временами прокатывает? Поздравляем. Но ты же знаешь, что можешь больше. <a class="main-page__result-link" href="#" rel="noopener" target="_blank"> Если тебе тоже не даёт покоя звезда Уоррена Баффета, учись инвестировать с умом. </a>',
	'Свой капитал ты сохранишь. Несмотря на инфляцию, пандемию, падение метеорита или высадку инопланетян. Если хочешь больше зарабатывать на инвестициях — <a class="main-page__result-link" href="#" rel="noopener" target="_blank"> жми сюда. </a>',
	'В розыгрышах, конечно, приятно участвовать. Но сейчас даже школьник знает, как торговать на бирже. Поэтому мы для тебя подготовили программу бесплатного обучения. А если <a class="main-page__result-link" href="#" rel="noopener" target="_blank"> зарегистрируешься с этого сайта </a>, подарим акцию'
];

let catsTypeArray = [
	'Инвестор-дотошка',
	'Инвестор от бога',
	'Инвестор-авантюрист',
	'Инвестор-перестраховщик',
	'Инвестор-падаван'
];

let answersArray = [
	[
		'Мастера Дзена учили меня балансу. Продам 10% активов.',
		'Буду шортить индекс S&P 500 с коротким стопом.',
		'Раз график ползёт вверх, куплю фьючерс на NASDAQ с «плечом»',
		'Мой путь — наблюдать за ростом',
		'Пока не знаю — хочу приз!'
	],
	[
		' Раз акции, имбирь и гречка растут в цене, их я и возьму.',
		' Однажды все будут здоровы, а я пока куплю акции фармацевтических компаний. ',
		' Полюбуюсь паникой брокеров и вложу деньги в ETF-фонды. ',
		' Обменяю деньги с депозита на облигации. Мой девиз: медленно, но верно! ',
		' Я планирую выиграть путешествие. Моё действие — отдых. '
	],
	[
		'Сокращу долю акций в своём портфеле с 4% до 2%',
		'Думаю зашортить акции с коротким стоп-лоссом. Делаю так, потому что знаю, что означают эти слова',
		'Куплю ещё акций — Дуров всё равно не вернул стену',
		'Оставлю акции и подарю своим внукам на совершеннолетие',
		'Сокращу долю акций в своём портфеле с 4% до 2%'
	],
	[
		'Сокращу долю акций Moderna в портфеле — не резиновый',
		'Если дотянут до $100, быстро продам акции. Пока поищу ещё каких-нибудь умников',
		'Куплю пока акции Pfizer. Чем они хуже?! ',
		'После 90 жизнь только начинается. Я подожду.',
		'Мы уже закончили?'
	],
	[
		'У меня портфеле уже лежат Delta Air Lines и Aeroflot. Зачем мне Boeing?',
		'Поставлю короткий стоп-лосс. Посмеют хоть немного упасть — программа их продаст',
		'Спорим, акции скоро рухнут?! Ставлю на падение 2 к 1',
		'С глаз долой, из портфеля — вон',
		'А сейчас? Пора переходить к награждению!'
	]
];

// Записываем ответы в массив
function writeResultData(event) {
	if (
		event.target.nodeName === 'BUTTON' &&
		event.target.dataset.num !== undefined
	) {
		resultArray.push(event.target.dataset.num);
	}
}
document.addEventListener('click', writeResultData);

// выбор и появление котов, счетчик котов
function loadCat(num) {
	if (num % 2 === 0) {
		$(leftCat).transit({ x: '300px', opacity: '1' }, 400);
	} else {
		$(rightCat).transit({ x: '-300px', opacity: '1' }, 400);
	}
}

// убираем котов
function removeCat(num) {
	if (num % 2 === 0) {
		$(leftCat).transit({ x: '-300px', opacity: '1' }, 400);
	} else {
		$(rightCat).transit({ x: '300px', opacity: '1' }, 400);
	}
	catCounter++;
}

// перемещение  хвоста вопроса
function showQuestionTail(num) {
	if (num % 2 !== 0) {
		$(tail).transit({ rotateY: '0' });
		setTimeout(() => {
			$(tail).transit({ x: '10vw', opacity: '1' }, 200);
		}, 300);
	} else {
		setTimeout(() => {
			$(tail)
				.transit({ rotateY: '180deg' })
				.transit({ x: '20vw', opacity: '1' }, 200);
		}, 300);
	}
}
// Добавляем слушатель ответа
function answersAddListenerToAnswer(event) {
	if (
		event.target.nodeName === 'BUTTON' &&
		event.target.classList.contains('answers__button')
	) {
		// eslint-disable-next-line no-use-before-define
		loadNewQuestion(event.target.dataset.num);
	}
}

// меняем тексты ответов, уменьшаем окно вопроса, убираем лишние  элементы
function loadAnswers() {
	$('.main-page__answers-container').css('display', 'block');
	answersContainer.scrollTop = 0;
	function changeAnswers(num) {
		for (let i = 0; i < answers.length; i++) {
			answers[i].textContent = answersArray[num][i];
		}
	}

	if ($(window).width() < 768) {
		$(question).transit({ y: '-80px', scale: '0.6' }, 300);
	} else if ($(window).width() < 1399) {
		$(question).transit({ y: '-40px', scale: '0.80' }, 300);
	} else {
		$(question).transit({ y: '-40px', scale: '0.84' }, 300);
	}

	$(mainPageButton).transit({ y: '300px', opacity: '0' }, 300);
	$(tail).transit({ opacity: '0' }, 100);
	$(answersContainer).transit({ opacity: '1' }, 500);
	removeCat(catCounter);
	changeAnswers(pageCounter);
	document.addEventListener('click', answersAddListenerToAnswer);
}

function scrollToButtonMobile() {
	if ($(window).width() < 768) {
		$('html, body').animate(
			{
				scrollTop: $(mainPageButton).offset().top
			},
			{
				duration: 200,
				easing: 'linear'
			}
		);
	}
}

// загрузка нового вопроса
function nextQuestion(num) {
	if (pageCounter > 0) {
		$(question).transit({ y: '0', scale: '1' }, 300);
		$(answersContainer).transit({ opacity: '0' }, 200);
	}

	$('.main-page__answers-container').css('display', 'none');
	question.textContent = questionsArray[num];

	loadCat(catCounter);
	showQuestionTail(catCounter);

	setTimeout(() => {
		mainPageButton.textContent = 'Что будешь делать?';
	}, 400);

	$(mainPageButton).transit({ y: '0', opacity: '1' }, 100);
	$(question).transit({ x: '-100px', opacity: '1' }, 400);
	mainPageButton.addEventListener('click', loadAnswers);
	setTimeout(() => {
		scrollToButtonMobile();
	}, 200);
}

// Прячем первую страницу, по окончании исчезновения вызываем функцию загрузки нового вопроса
function hideFirstPage() {
	mainPageButton.removeEventListener('click', hideFirstPage);
	$(centerCat).transit({ y: '300px', opacity: '0' }, 500);
	$(mainPageButton).transit({ y: '300px', opacity: '0' }, 400);
	$(title).transit({ rotateY: '90deg', opacity: '0' }, 300);
	$('.main-page__question-container').css('display', 'block');
	$('.main-page__rules-button')
		.transit({ x: '400px', opacity: '0' }, 500)
		.css('display', 'none');
	$('.main-page__footer').css('display', 'none');
	$('.main-page').css('overflow-y', 'hidden');
	$(centerCatCash).transit({ opacity: 0, top: '+=1500' }, 400).fadeOut(1);
	$(background)
		.stop()
		.transit({ opacity: 0 }, 400, 'linear', nextQuestion(pageCounter));
	setTimeout(() => {
		$(background).css('display', 'none');
	}, 400);
}
mainPageButton.addEventListener('click', hideFirstPage);

// расчитываем самый частый элемент для типа
// eslint-disable-next-line max-len
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

function showFinalBlock() {
	setTimeout(() => {
		$(finalBlock).transit({ opacity: '1' }, 500);
	}, 2000);
}
function loadResultPage() {
	let num = maxOccurences(resultArray).item;
	resultType.textContent = catsTypeArray[num];
	resultText.innerHTML = catsDescriptionArray[num];
	$('.main-page__result').css('display', 'flex');
	$(answersContainer).transit({ opacity: '0' }, 300);
	setTimeout(() => {
		$('.main-page__answers-container').css('display', 'none');
		$('.main-page__question-container').css('display', 'none');
		$('.main-page__center-cat').css('display', 'none');
	}, 300);

	setTimeout(() => {
		$('.main-page__final-block').css('display', 'block');
	}, 2500);

	resultCat.insertAdjacentHTML(
		'beforeend',
		`<picture class="main-page__result-cat-picture">
		<source srcset="img/cat_result_xs${num}.webp" media="(max-width: 767px)" type="image/webp">
		<source srcset="img/cat_result_sm${num}.webp" type="image/webp">
    	<source srcset="img/cat_result_xs${num}.png" media="(max-width: 767px)">
    	<img src="img/cat_result_sm${num}.png" alt="result">
    	</picture>`
	);

	$(resultTitle).transit({ opacity: '1', rotateY: '360deg' }, 400).transit(
		{
			scale: 0,
			y: '-190px',
			opacity: '0',
			delay: 1500
		},
		400,
		'ease'
	);

	resultType.style.display = 'block';
	$(resultType)
		.transit({ opacity: '1', rotateX: '720deg' }, 500)
		.transit({ scale: 0.8, y: '-15vh', delay: 2000 }, 500, 'ease');

	$(resultCat)
		.transit({ opacity: '1' }, 500)
		.transit({ scale: 0.7, y: '-25vh', delay: 2000 }, 500, 'ease');

	$(resultText).transit(
		{ opacity: '1', y: '-17vh', delay: 2300 },
		500,
		showFinalBlock()
	);
}

function hideOtherAnswersOnclick(n) {
	for (let i = 0; i < answers.length; i++) {
		if (i !== n) {
			$(answers[i]).transit({ opacity: '0' }, 300);
		}
		// eslint-disable-next-line eqeqeq
		if (i == n) {
			$(answers[i]).prop('disabled', true);
			$(answers[i]).css('background-color', '#FF9800');
			$(answers[i]).css('opacity', '1');

			setTimeout(() => {
				$(answers[i]).prop('disabled', false);
				$(answers[i]).css('background-color', '#FF6F32');
				$(answers[i]).css('opacity', 'unset');
			}, 1000);
		}

		if (pageCounter < questionsArray.length - 1) {
			setTimeout(() => {
				$(answers[i]).transit({ opacity: '1' }, 0);
			}, 1300);
		}
	}
}

// Прячем другие ответы кроме выбранного, загрузка нового вопроса
function loadNewQuestion(num) {
	document.removeEventListener('click', answersAddListenerToAnswer);
	answersContainer.style.overflow = 'hidden';
	setTimeout(() => {
		answersContainer.style.overflow = 'auto';
	}, 1000);

	hideOtherAnswersOnclick(num);

	setTimeout(() => {
		$(question).transit({ x: '0', opacity: '0' }, 400);
	}, 600);

	$(tail).transit({ x: '0', opacity: '0' }, 100);

	pageCounter++;
	if (pageCounter < questionsArray.length) {
		setTimeout(() => {
			nextQuestion(pageCounter);
		}, 800);
	} else {
		setTimeout(() => {
			loadResultPage();
		}, 500);
	}
}

function showValidationError() {
	$(emailInput).addClass('final-block__email-input_error');
	$(emailInput)
		.transit({ x: '10px' }, 50)
		.transit({ x: '-20px' }, 50)
		.transit({ x: '0px' }, 50)
		.transit({ x: '10px' }, 50)
		.transit({ x: '-20px' }, 50)
		.transit({ x: '0px' }, 50);

	$error.css('opacity', '1');
	$error.fadeIn();
	$error.text('Адрес не прошел валидацию. Попробуйте еще раз.');
}

// Проверка имейл по регулярному выражению
function validateEmail() {
	let email = $('.final-block__email-input').val();
	if (email.length === 0) {
		showValidationError();
	}

	let regularEmailForm =
		/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
	return regularEmailForm.test(String(email).toLowerCase());
}

function refreshCheckbox() {
	checkboxLabel.classList.remove('final-block__checkbox-label_error');
}
checkboxLabel.addEventListener('click', refreshCheckbox);

function checkCheckbox() {
	if ($(checkbox).is(':checked')) {
		checkboxLabel.classList.remove('final-block__checkbox-label_error');
		return true;
	}
	checkboxLabel.classList.add('final-block__checkbox-label_error');
	return false;
}

// Валидация и отправка в случае успешной проверки
function validate() {
	if (validateEmail()) {
		$(emailInput).removeClass('final-block__email-input_error');
		$error.fadeOut();
	} else {
		showValidationError();
	}
}
emailInput.addEventListener('blur', validate);

// открытие-закрытие финального блока
let finalBlockCounter = 0;
function moveFinalBlock() {
	let num = $('.final-block').height() * 0.85;
	if (finalBlockCounter % 2 === 0) {
		$('.final-block').transit({ y: `-${num}` }, 600);
		setTimeout(() => {
			$('.final-block__arrow').addClass('arrow_still');
		}, 550);
	} else {
		$('.final-block').transit({ y: '0' }, 600);
		setTimeout(() => {
			$('.final-block__arrow').removeClass('arrow_still');
		}, 550);
	}
	finalBlockCounter++;
}
finalBlockArrow.addEventListener('click', moveFinalBlock);
finalBlockTitle.addEventListener('click', moveFinalBlock);

// тестовые функции и сет имейлов для проверки финального попапа
let emailTestSet = new Set();
emailTestSet.add('test@mail.ru');
emailTestSet.add('test2@gmail.com');

function checkEmailBase() {
	let e = $('.final-block__email-input').val().toString().toLowerCase();
	// тестовый блок
	if (!emailTestSet.has(e)) {
		emailTestSet.add(e);
		document.querySelector('.popup-final__text').textContent =
			'Спасибо, ты участвуешь в Акции!';
		document.querySelector('.popup-final__icon-img').src =
			'img/popup_success.png';
		document.querySelector('.popup-final__line').style.opacity = '1';
	} else {
		document.querySelector('.popup-final__text').textContent =
			'Такой email уже участвует в Акции';
		document.querySelector('.popup-final__icon-img').src =
			'img/popup_error.png';
		document.querySelector('.popup-final__line').style.opacity = '0';
	}
	// конец тестового блока

	// В дальнейшем исправить на конструкцию с промисами
	// let url = '';
	// let response = await fetch(url);
	// let commits = await response.json();
}
function showPopup() {
	checkEmailBase();
	$(popup).fadeOut(0).css('opacity', '1');
	$(popup).css('opacity', '1').fadeIn(300);
}

// Отправка формы, пример
function sendForm() {
	validateEmail();
	checkCheckbox();
	if (checkCheckbox() && validateEmail()) {
		setTimeout(() => {
			showPopup();
		}, 300);
	}
}
sendButton.addEventListener('click', sendForm);

answersContainer.addEventListener('scroll', function () {
	let elem = document.querySelector('.js_last');
	if (elem.getBoundingClientRect().bottom < window.innerHeight + 50) {
		$('.answers__arrow').addClass('arrow_still');
	} else {
		$('.answers__arrow').removeClass('arrow_still');
	}
});

checkboxLabel.addEventListener('focus', function () {
	checkboxLabel.addEventListener('keydown', function () {
		if ($(checkbox).is(':checked')) {
			$(checkbox).prop('checked', false);
		} else {
			$(checkbox).prop('checked', true);
		}
	});
});
