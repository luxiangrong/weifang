//jQuery.noConflict();
(function($) {
	$(function() {
		$(document).ready(function() {
			$(".welcome").on('click touchstart', function(e){
				e.preventDefault();
				$this = $(this);
				$this.addClass('slideUp');
				$(".welcome").off('click touchend');
			});
		});
	});
})(jQuery);
