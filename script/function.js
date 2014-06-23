//jQuery.noConflict();
(function($) {
	$(function() {
		$(document).ready(function() {
			$(".welcome").on('click touchstart', function(e) {
				e.preventDefault();
				window.location.href="index.html"
			});

			var swiper = new Swiper('.swiper-container', {
				pagination : '.pagination',
				loop : true,
				grabCursor : true,
				paginationClickable : true,
				calculateHeight : true,
				roundLengths : true
			});

		});

		$('.head-nav .menu').on('click', function() {
			var status = $(document.body).data("sideNavStatus");
			if(status == undefined || status == 'hide') {
				showSideNav();
			} else {
				hideSideNav();
			}
			
		});

		var winWidth = $(window).width();
		function showSideNav() {
			$(".side-nav, .content-wrap, .head-nav").removeClass('no-transition');
			$(".side-nav, .content-wrap, .head-nav").css('transform', 'translate3d(' + $(".side-nav").width() + 'px, 0px, 0px)');
			$(".side-nav, .content-wrap, head-nav").css('-webkit-transform', 'translate3d(' + $(".side-nav").width() + 'px, 0px, 0px)');

			$(".fullScreenHolder").remove();
			var fullScreenHolder = $("<div class='fullScreenHolder'></div>");
			fullScreenHolder.css({
				'position' : 'fixed',
				'right' : '0',
				'top' : '0',
				'width' : '100%',
				'height' : '100%',
				'z-index' : 2500
			});
			$(".content-wrap").prepend(fullScreenHolder);
			settings.activeRect = [0, 0, 1, 1];
			fullScreenHolder.touchwipe(settings);
			
			$(document.body).data('sideNavStatus', 'show');
		}

		function hideSideNav() {

			$(".side-nav, .content-wrap, .head-nav").removeClass('no-transition');

			$(".side-nav, .content-wrap, .head-nav").css('transform', 'translate3d(0px, 0px, 0px)');
			$(".side-nav, .content-wrap, .head-nav").css('-webkit-transform', 'translate3d(0px, 0px, 0px)');

			$(".fullScreenHolder").remove();
			
			$(document.body).data('sideNavStatus', 'hide');
		}

		function wipeMoving(dx, dy) {
			$(".side-nav, .content-wrap, .head-nav").addClass('no-transition');

			var sideNavT3DX = initTranslate3dX.sideNav - dx;
			var pageWalT3DX = initTranslate3dX.pageWal - dx;

			//console.log(sideNavT3DX + "    -      " + pageWalT3DX);
			if (sideNavT3DX <= 0 || sideNavT3DX >= winWidth /2  ) {
				return;
			}

			$(".side-nav, .content-wrap, .head-nav").css('transform', 'translate3d(' + sideNavT3DX + 'px, 0px, 0px)');
			$(".side-nav, .content-wrap, .head-nav").css('-webkit-transform', 'translate3d(' + sideNavT3DX + 'px, 0px, 0px)');
		}

		var parseToMatrix = function(str) {
			var reg = /^matrix\((-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+),\s*(-?\d+)\)$/;
			var matches = str.match(reg);
			if ($.isArray(matches) && matches.length == 7) {
				matches.splice(0, 1);
				return matches;
			}
			return [0, 0, 0, 0, 0, 0];
		};

		var initTranslate3dX = {
			'sideNav' : 0,
			'pageWal' : 0
		};

		$("body, .side-nav").on('touchstart mousedown', function() {
			if ('-webkit-transform' in document.documentElement.style) {
				initTranslate3dX = {
					'sideNav' : parseToMatrix($(".side-nav").css('-webkit-transform'))[4],
					'pageWal' : parseToMatrix($(".content-wrap").css('-webkit-transform'))[4]
				};
			}
			if ('transform' in document.documentElement.style) {
				initTranslate3dX = {
					'sideNav' : parseToMatrix($(".side-nav").css('transform'))[4],
					'pageWal' : parseToMatrix($(".content-wrap").css('transform'))[4]
				};
			}
		}).on('touchend mouseup', function() {
			$(".side-nav, .content-wrap, .head-nav").removeClass('no-transition');
		});

		var settings = {
			wipeMoving : function(dx, dy) {
				wipeMoving(dx, dy);
			},
			wipeLeft : function() {
				hideSideNav();
			},
			wipeRight : function() {
				showSideNav();
			},
			wipeStart : function() {
				if ('-webkit-transform' in document.documentElement.style) {
					initTranslate3dX = {
						'sideNav' : parseToMatrix($(".side-nav").css('-webkit-transform'))[4],
						'pageWal' : parseToMatrix($(".content-wrap").css('-webkit-transform'))[4]
					};
				}
				if ('transform' in document.documentElement.style) {
					initTranslate3dX = {
						'sideNav' : parseToMatrix($(".side-nav").css('transform'))[4],
						'pageWal' : parseToMatrix($(".content-wrap").css('transform'))[4]
					};
				}
			},
			min_move_x : 2,
			activeRect : [0, 0, 0.3, 1]
		};
		$("body").touchwipe(settings);
		settings.activeRect = [0, 0, 1, 1];
		$(".side-nav").touchwipe(settings);
		$(".head-nav").touchwipe(settings);
	});
})(jQuery);
