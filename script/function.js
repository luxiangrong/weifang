//jQuery.noConflict();
(function($) {
	$(function() {
		$(document).ready(function() {
			$(".welcome").on('click touchstart', function(e) {
				e.preventDefault();
				$this = $(this);
				$this.addClass('slideUp');
				$(".welcome").off('click touchend');
			});

			var swiper = new Swiper('.swiper-container', {
				pagination : '.pagination',
				loop : true,
				grabCursor : true,
				paginationClickable : true,
				calculateHeight: true
			});
		});
	});
})(jQuery);
