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
				calculateHeight: true,
				roundLengths: true,
			});
			var winWidth = $(window).width();
			var slideImgWidth = $("#slides img").width();
			var slideImgHeight = $("#slides img").height();
			
			
			console.log(slideImgWidth + ":" + slideImgHeight);
			
			$("#slides").slidesjs({
		        width: 580,
		        height: 326,
		        navigation: {
		        	active: false	
		        },
		        pagination: {
			      active: false,
			      effect: "fade"
			        // [string] Can be either "slide" or "fade".
			    }
		    });
		});
	});
})(jQuery);
