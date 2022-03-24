$(document).ready(function () {
	$('.carousel__inner').slick({
		speed: 1200,
		adaptiveHeight: false,
		prevArrow: '<button type="button" class="slick-prev"><img alt="left" src="./icon/chevron-left-solid.svg"></img></button>',
		nextArrow: '<button type="button" class="slick-next"><img alt="right" src="./icon/chevron-right-solid.svg"></img></button>',
		responsive: [
			{
				breakpoint: 991,
				settings: {
					dots: false,
					arrows: true
				}
			},
			{
				breakpoint: 767,
				settings: {
					dots: false,
					arrows: true
				}
			},
			{
				breakpoint: 575,
				settings: {
					dots: false,
					arrows: true
				}
			}
		]
	});

	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	function toggleSlide(item) {
		$(item).each(function (i) {
			$(this).on('click', function (e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link_content');
	toggleSlide('.catalog-item__link_list');

	//modal

	$('[data-modal=consultation]').on('click', function () {
		$('.overlay, #consultation').fadeIn('slow');
	});

	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut('slow');
	});

	$('.catalog-item__btn').each(function(i) {
		$(this).on('click', function () {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
			$('.overlay, #order').fadeIn('slow');
		});
	});

	
	function valideForms (form) {
		$(form).validate({
			rules: {
				name: "required",
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
				name: "Пожалуйста, введите свое имя",
				phone: "Пожалуйста, введите свой номер телефона",
				email: {
					required: "Пожалуйста, введите свою почту",
					email: "Неправильно введен адрес почты"
				},
			},
		});
	};

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');
	
	$('input[name=phone]').mask("+7 (999) 999-99-99");


	// Smooth scroll and pageup

	$(window).scroll(function() {
		if ($(this).scrollTop () > 1600) {
			$('.page-up').fadeIn();
		} else {
			$('.page-up').fadeOut();
		}
	});

	$("a[href^='#']").click(function () {
		var _href = $(this).attr("href");
		$("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
		return false;
	});

	$('form').submit(function(e) {
		e.preventDefault();
		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find('input').val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn('slow');
			$('form').trigger('reset');
		});
		return false;
	});

	new WOW().init();

});

