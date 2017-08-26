"use strict";

(function() {
	var fixedTop = false;

	var mobile_menu_visible = 0,
		mobile_menu_initialized = false,
		toggle_initialized = false,
		bootstrap_nav_initialized = false,
		$sidebar = $('.sidebar'),
		isWindows;
	var $window = $(window);
	var $body = $('body');
	var $html = $('html');
	var $sidebar_wrapper = $('.sidebar-wrapper');
	isWindows = navigator.platform.indexOf('Win') > -1 ? true : false;

	if (isWindows && !$body.hasClass('sidebar-mini')){
	   // if we are on windows OS we activate the perfectScrollbar function
	   $('.sidebar .sidebar-wrapper, .main-panel').perfectScrollbar();

	   $html.addClass('perfect-scrollbar-on');
	} else {
	   $html.addClass('perfect-scrollbar-off');
	}

	//swal alert init
	function swalAlert(type, messageUp, messageDown, html){
		
		if(type === 'basic'){
			swal({
				title: messageUp,
				buttonsStyling: false,
				confirmButtonClass: "btn btn-success"
			}).catch(swal.noop);
			
		}else if(type === 'title-and-text'){
			swal({
				title: messageUp,
				text: messageDown,
				buttonsStyling: false,
				confirmButtonClass: "btn btn-info"
			}).catch(swal.noop);
			
		}else if(type === 'success-message'){
			swal({
				title: messageUp,
				text: messageDown,
				buttonsStyling: false,
				confirmButtonClass: "btn btn-success",
				type: "success"
			}).catch(swal.noop);
			
		}else if(type === 'warning-message-and-confirmation'){
			swal({
				title: messageUp,
				text: messageDown,
				type: 'warning',
				showCancelButton: true,
				confirmButtonClass: 'btn btn-success',
				cancelButtonClass: 'btn btn-danger',
				confirmButtonText: 'Да',
				cancelButtonText: 'Нет',
				buttonsStyling: false
			}).then(function() {
				swal({
					title: 'Удалено',
					text: '',
					type: 'success',
					confirmButtonClass: "btn btn-success",
					buttonsStyling: false
				}).catch(swal.noop);
			},function(dismiss){
			
			});
		}else if(type === 'warning-message-and-cancel'){
			swal({
				title: messageUp,
				text: messageDown,
				type: 'warning',
				showCancelButton: true,
				confirmButtonText: 'Да',
				cancelButtonText: 'Нет',
				confirmButtonClass: "btn btn-success",
				cancelButtonClass: "btn btn-danger",
				buttonsStyling: false
			}).then(function() {
				swal({
					title: 'Удалено!',
					text: '',
					type: 'success',
					confirmButtonClass: "btn btn-success",
					buttonsStyling: false
				}).catch(swal.noop);
			}, function(dismiss) {
				// dismiss can be 'overlay', 'cancel', 'close', 'esc', 'timer'
				if (dismiss === 'cancel') {
					swal({
						title: 'Отмена',
						text: '',
						type: 'error',
						confirmButtonClass: "btn btn-info",
						buttonsStyling: false
					}).catch(swal.noop);
				}
			})
			
		}else if(type === 'custom-html'){
			swal({
				title: messageUp,
				buttonsStyling: false,
				confirmButtonClass: "btn btn-success",
				html: html
			}).catch(swal.noop);
			
		}else if(type === 'auto-close'){
			swal({ title: messageUp,
				text: "Закроется через 2 секунды.",
				timer: 2000,
				showConfirmButton: false
			}).catch(swal.noop);
		} else if(type === 'input-field'){
			swal({
				title: messageUp,
				html: '<div class="form-group">' +
				'<input id="input-field" type="text" class="form-control" />' +
				'</div>',
				showCancelButton: true,
				confirmButtonClass: 'btn btn-success',
				cancelButtonClass: 'btn btn-danger',
				confirmButtonText: 'Ввод',
				cancelButtonText: 'Отмена',
				buttonsStyling: false
			}).then(function(result) {
				swal({
					type: 'success',
					html: 'Ваше ввели значение: <strong>' +
					$('#input-field').val() +
					'</strong>',
					confirmButtonClass: 'btn btn-success',
					confirmButtonText: 'Подтвердить',
					buttonsStyling: false
					
				}).catch(swal.noop);
			}).catch(swal.noop)
		}
	}
	//for set value  from datepicker in table new passengers
	function tableClientsSetDateValue(name, value) {
		var clientsTable = $('.table-passengers');
		clientsTable.find('td.' + name).html(value);
	}
	//finction for select color for status select
	function selectStatuscolor(color) {
		var stateClass = '';
		switch(color) {
			case 'default':
				stateClass = "text-default";
				break;
			case 'success':
				stateClass = "text-success";
				break;
			case 'danger':
				stateClass = "text-danger";
				break;
			case 'info':
				stateClass = "text-info";
				break;
			case 'warning':
				stateClass = "text-warning";
				break;
			case 'danger':
				stateClass = "text-danger";
				break;
		}
		return stateClass;
	}
	$(document).ready(function() {
		var window_width = $window.width();
		
		if($body.hasClass('sidebar-mini')){
			pdp.misc.sidebar_mini_active = true;
		}
		
		pdp.initSidebarsCheck();
		
		pdp.initMinimizeSidebar();
		
		$('.form-control').on("focus", function(){
			$(this).parent('.input-group').addClass("input-group-focus");
		}).on("blur", function(){
			$(this).parent(".input-group").removeClass("input-group-focus");
		});
		
		//  Activate the tooltips
		$('[rel="tooltip"]').tooltip();
		
		// Init Tags Input
		if($(".tagsinput").length != 0){
			$(".tagsinput").tagsInput();
		}
		
		//  Init Bootstrap Select Picker
		if($(".selectpicker").length != 0){
			$(".selectpicker").selectpicker({
				size: 9
			});
		}
		//init datapicker
		if($('.datetimepicker').length) {
			$('.datetimepicker').datetimepicker({
				locale: 'ru',
				icons: {
					time: "fa fa-clock-o",
					date: "fa fa-calendar",
					up: "fa fa-chevron-up",
					down: "fa fa-chevron-down",
					previous: 'fa fa-chevron-left',
					next: 'fa fa-chevron-right',
					today: 'fa fa-screenshot',
					clear: 'fa fa-trash',
					close: 'fa fa-remove',
					inline: true
				}
			});
		}
		if($('.timepicker').length) {
			$('.timepicker').datetimepicker({
//          format: 'H:mm',    // use this format if you want the 24hours timepicker
				format: 'h:mm A',    //use this format if you want the 12hours timpiecker with AM/PM toggle
				icons: {
					time: "fa fa-clock-o",
					date: "fa fa-calendar",
					up: "fa fa-chevron-up",
					down: "fa fa-chevron-down",
					previous: 'fa fa-chevron-left',
					next: 'fa fa-chevron-right',
					today: 'fa fa-screenshot',
					clear: 'fa fa-trash',
					close: 'fa fa-remove',
					inline: true
				}
			});
		}
		if($('.datepicker').length) {
			$('.datepicker').datetimepicker({
				format: 'DD/MM/YYYY',
				locale: 'ru',
				icons: {
					time: "fa fa-clock-o",
					date: "fa fa-calendar",
					up: "fa fa-chevron-up",
					down: "fa fa-chevron-down",
					previous: 'fa fa-chevron-left',
					next: 'fa fa-chevron-right',
					today: 'fa fa-screenshot',
					clear: 'fa fa-trash',
					close: 'fa fa-remove',
					inline: true
				}
			}).on('dp.change', function(date) {
				if($(this).attr('name') === 'client-birthday' || $(this).attr('name') === 'client-passport-date-from' || $(this).attr('name') === 'client-passport-date-to') {
					tableClientsSetDateValue($(this).attr('name'), $(this).val());
				}
			});
		}
		if($('.card-login').length) {
			//for animation login form
			setTimeout(function() {
				// after 1000 ms we add the class animated to the login/register card
				$('.card-login').removeClass('card-hidden');
			}, 700)
		}
		//initial file input
		if($('.fileinput').length) {
			$('.fileinput').fileinput();
		}
		//upload file in orders managers documents
		if($('.documents').length) {
			var typeDocument = '',
				listDocuments = $('.documents .list');
			$('.documents-footer .btn').attr('disabled',true);
			
			//select documents type
			$('.js-documents-type').on('change',function () {
				typeDocument = $(this).val();
				$('.documents-footer .btn').removeClass('disabled').attr('disabled',false);
				$('.documents-footer .btn input[type="file"]').attr('disabled',false);
			});
			$('.js-queue-documents').on('click', function () {
				var listDocuments = $('.documents .list'),
						itemTypeDocument =  '<li>' +
																'<span>' + typeDocument + '</span>' +
																'<span class="btn btn-default btn-file js-file-queue"><span>Загрузить файл</span><input type="file" name="..."></span>' +
																'</li>'
					;
					if(typeDocument.length) {
						listDocuments.append(itemTypeDocument);
					}
			});
			$('.js-file input[type="file"]').on('change',function () {
				var fileName = $(this).val(),
						itemTypeDocument =  '<li>' +
																'<span>' + fileName + '</span>' +
																'<a href="javascript:void(0);" class="btn-delete"><i class="ti-trash"></i></a>' +
																'</li>';
				listDocuments.append(itemTypeDocument);
			});
			$('body .documents .list').on('click', '.btn-delete', function (e) {
				e.preventDefault();
				swalAlert('warning-message-and-confirmation', "Удалить этот документ?");
			});
			$('body .documents .list').on('change', '.js-file-queue input[type="file"]', function () {
				var currentListItem = $(this).parent().parent(),
						currentFileName = $(this).val(),
						itemTypeDocument =  '<span>' + currentFileName + '</span>' +
																'<a href="javascript:void(0);" class="btn-delete"><i class="ti-trash"></i></a>';
				currentListItem.html(itemTypeDocument);
			});
		}
		//button delete in tables manager orders, agent, clients
		$('.table-orders .btn-delete').on('click',function (e) {
			e.preventDefault();
			swalAlert('warning-message-and-confirmation', "Удалить этот договор?");
		});
		$('.table-agents .btn-delete, .table-clients .btn-delete').on('click',function (e) {
			e.preventDefault();
			swalAlert('warning-message-and-confirmation', "Удалить запись?");
		});
		// $('.table-clients .btn-delete').on('click',function (e) {
		// 	e.preventDefault();
		// 	swalAlert('warning-message-and-confirmation', "Удалить этот договор?");
		// })
		//buntton show more in table manager orders
		$('.table-orders .js-edit-status').on('click',function () {
			var $tableOrdersStatusCol = $(this).parent().parent().find('.status'),
				$labelStatus = $tableOrdersStatusCol.find('.status-label'),
				$selectStatus = $tableOrdersStatusCol.find('.status-select'),
				isEditing = $tableOrdersStatusCol.hasClass('editing');
			
			if (isEditing) {
				var currentVal = $selectStatus.find('option:selected').val(),
					currentOptionText = $selectStatus.find('option:selected').text(),
					currentOptionState = $selectStatus.find('option:selected').attr('data-state');
					
				$labelStatus.text(currentOptionText);
				$labelStatus.attr('data-option', currentVal);
				$labelStatus.removeClassWild("text-*");
				$labelStatus.addClass(selectStatuscolor(currentOptionState));
			} else {
				var currentVal = $labelStatus.attr('data-option');
				$selectStatus.find('option').each(function () {
					if($(this).val() === currentVal) {
						$(this).prop('selected', true);
					}
				});
			}
			$tableOrdersStatusCol.toggleClass('editing');
		});
		//select status color on change
		$('.js-select-status').on('change',function () {
			// $(this).find('option').prop('selected',false);
			var currentSelect = $(this),
					currentColor = currentSelect.find('option:selected').attr('data-state');
			currentSelect.removeClassWild("bg-*");
			currentSelect.addClass('bg-' + currentColor);
		});
		
		//new order manager client data push in table of passengers
		if($('.client-data').length) {
			var clientsTable = $('.table-passengers');
		}
		$('.client-data .js-control-data').on('input keyup change click', function () {
			var currentVal = $(this).val(),
					currentName = $(this).attr('name');
			switch(currentName) {
				case 'client-name':
					clientsTable.find('td.client-name').html(currentVal);
					break;
				case 'client-passport-number':
					clientsTable.find('td.client-passport-number').html(currentVal);
					break
				case 'client-contacts':
					clientsTable.find('td.client-contacts').html(currentVal);
					break
				default:
					break
			}
		});
		
	});

	
	// activate collapse right menu when the windows is resized
	$window.resize(function(){
		pdp.initSidebarsCheck();

	});

	var pdp = {
		misc:{
			navbar_menu_visible: 0,
			active_collapse: true,
			disabled_collapse_init: 0

		},
		initSidebarsCheck: function(){
			// Init navigation toggle for small screens
			if($window.width() <= 991){
				if($sidebar.length !== 0){
					pdp.initSidebarMenu();
				} else {
					pdp.initBootstrapNavbarMenu();
				}
			} else if(mobile_menu_initialized === true){
				// reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
				$sidebar_wrapper.find('.navbar-form').remove();
				$sidebar_wrapper.find('.nav-mobile-menu').remove();

				mobile_menu_initialized = false;
			}
		},

		initMinimizeSidebar: function(){
			var $sidebar_collapse = $('.sidebar .collapse');

			// when we are on a Desktop Screen and the collapse is triggered we check if the sidebar mini is active or not. If it is active then we don't let the collapse to show the elements because the elements from the collapse are showing on the hover state over the icons in sidebar mini, not on the click.
			$sidebar_collapse.on('show.bs.collapse',function(){
				if($window.width() > 991){
					if(pdp.misc.sidebar_mini_active === true){
						return false;
					} else{
						return true;
					}
				}
			});

			$('#minimizeSidebar').on('click',function(){
				var $btn = $(this);

				if(pdp.misc.sidebar_mini_active === true){
					$body.removeClass('sidebar-mini');
					$btn.html('<i class="ti-arrow-left"></i>');
					pdp.misc.sidebar_mini_active = false;

					if(isWindows){
						$('.sidebar .sidebar-wrapper').perfectScrollbar();
					}

				}else{

					$sidebar_collapse.collapse('hide').on('hidden.bs.collapse',function(){
						$(this).css('height','auto');
					});

					if(isWindows){
						$('.sidebar .sidebar-wrapper').perfectScrollbar('destroy');
					}

					setTimeout(function(){
						$body.addClass('sidebar-mini');
						$btn.html('<i class="ti-arrow-right"></i>');

						$sidebar_collapse.css('height','auto');
						pdp.misc.sidebar_mini_active = true;
					},300);
				}

				// we simulate the window Resize so the charts will get updated in realtime.
				var simulateWindowResize = setInterval(function(){
					window.dispatchEvent(new Event('resize'));
				},180);

				// we stop the simulation of Window Resize after the animations are completed
				setTimeout(function(){
					clearInterval(simulateWindowResize);
				},1000);
			});
		},

		initSidebarMenu: function(){

			if(!mobile_menu_initialized){

				var $navbar = $('nav').find('.navbar-collapse').first().clone(true);

				var nav_content = '';
				var mobile_menu_content = '';

				$navbar.children('ul').each(function(){

					var content_buff = $(this).html();
					nav_content = nav_content + content_buff;
				});

				nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';

				var $navbar_form = $('nav').find('.navbar-form').clone(true);

				var $sidebar_nav = $sidebar_wrapper.find(' > .nav');

				// insert the navbar form before the sidebar list
				var $nav_content = $(nav_content);
				$nav_content.insertBefore($sidebar_nav);
				$navbar_form.insertBefore($nav_content);

				$(".sidebar-wrapper .dropdown .dropdown-menu > li > a").on('click',function(event) {
					event.stopPropagation();

				});

				mobile_menu_initialized = true;
			} else {
				if($window.width() > 991){
					// reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
					$sidebar_wrapper.find('.navbar-form').remove();
					$sidebar_wrapper.find('.nav-mobile-menu').remove();

					mobile_menu_initialized = false;
				}
			}

			if(!toggle_initialized){
				var $toggle = $('.navbar-toggle');

				$toggle.on('click',function (){

					if(mobile_menu_visible === 1) {
						$html.removeClass('nav-open');

						$('.close-layer').remove();
						setTimeout(function(){
							$toggle.removeClass('toggled');
						}, 400);

						mobile_menu_visible = 0;
					} else {
						setTimeout(function(){
							$toggle.addClass('toggled');
						}, 430);

						var main_panel_height = $('.main-panel')[0].scrollHeight;
						var $layer = $('<div class="close-layer"></div>');
						$layer.css('height',main_panel_height + 'px');
						$layer.appendTo(".main-panel");


						setTimeout(function(){
							$layer.addClass('visible');
						}, 100);

						$layer.on('click',function() {
							$html.removeClass('nav-open');
							mobile_menu_visible = 0;

							$layer.removeClass('visible');

							 setTimeout(function(){
								$layer.remove();
								$toggle.removeClass('toggled');

							 }, 400);
						});

						$html.addClass('nav-open');
						mobile_menu_visible = 1;

					}
				});

				toggle_initialized = true;
			}

		},

		  initBootstrapNavbarMenu: debounce(function(){

			if(!bootstrap_nav_initialized){
				var $navbar = $('nav').find('.navbar-collapse').first().clone(true);

				var nav_content = '';
				var mobile_menu_content = '';

				//add the content from the regular header to the mobile menu
				$navbar.children('ul').each(function(){
					var content_buff = $(this).html();
					nav_content = nav_content + content_buff;
				});

				nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';

				$navbar.html(nav_content);
				$navbar.addClass('off-canvas-sidebar');

				// append it to the body, so it will come from the right side of the screen
				$body.append($navbar);

				var $toggle = $('.navbar-toggle');

				$navbar.find('a').removeClass('btn btn-round btn-default');
				$navbar.find('button').removeClass('btn-round btn-fill btn-info btn-primary btn-success btn-danger btn-warning btn-neutral');
				$navbar.find('button').addClass('btn-simple btn-block');

				$toggle.on('click',function (){
					if(mobile_menu_visible === 1) {
						$html.removeClass('nav-open');

						$('.close-layer').remove();
						setTimeout(function(){
							$toggle.removeClass('toggled');
						}, 400);

						mobile_menu_visible = 0;
					} else {
						setTimeout(function(){
							$toggle.addClass('toggled');
						}, 430);

						var $layer = $('<div class="close-layer"></div>');
						$layer.appendTo(".wrapper-full-page");

						setTimeout(function(){
							$layer.addClass('visible');
						}, 100);


						$layer.on('click',function() {
							$html.removeClass('nav-open');
							mobile_menu_visible = 0;

							$layer.removeClass('visible');

							 setTimeout(function(){
								$layer.remove();
								$toggle.removeClass('toggled');

							 }, 400);
						});

						$html.addClass('nav-open');
						mobile_menu_visible = 1;

					}

				});
				bootstrap_nav_initialized = true;
			}
		}, 500),
	}


	// Returns a function, that, as long as it continues to be invoked, will not
	// be triggered. The function will be called after it stops being called for
	// N milliseconds. If `immediate` is passed, trigger the function on the
	// leading edge, instead of the trailing.

	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			clearTimeout(timeout);
			timeout = setTimeout(function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			}, wait);
			if (immediate && !timeout) func.apply(context, args);
		};
	};
	//remove class by mask
	$.fn.removeClassWild = function(mask) {
		return this.removeClass(function(index, cls) {
			var re = mask.replace(/\*/g, '\\S+');
			return (cls.match(new RegExp('\\b' + re + '', 'g')) || []).join(' ');
		});
	};

})();