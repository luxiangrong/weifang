/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
(function($) {
	jQuery.event.props.push( "touches" );
	$.fn.touchwipe = function(settings) {
		var config = {
			min_move_x : 20,
			min_move_y : 20,
			wipeLeft : function() {
			},
			wipeRight : function() {
			},
			wipeUp : function() {
			},
			wipeDown : function() {
			},
			wipeMoving: function(){
			},
			wipeStart: function(){
			},
			wipeEnd: function(){},
			preventDefaultEvents : 'horizontal',
			stopPropagation : 'horizontal',
			activeRect:[0,0,1,1],
			simulate: true
		};
		
		var onTouchMove,onTouchEnd,onTouchStart;

		if(settings === 'cancel') {
			this.each(function() {
			});
		}

		if (settings)
			$.extend(config, settings);

		this.each(function() {
			var $this = $(this);
			var startX;
			var startY;
			var dx;
			var dy;
			var isMoving = false;

			function cancelTouch() {
				this.removeEventListener('touchmove', onTouchMove);
				if('ontouchmove' in document.documentElement) {
					this.removeEventListener('touchmove', onTouchMove);
				} else {
					if(config.simulate) {
						$this.off('mousemove', onTouchMove);
					}
				}
				startX = null;
				startY = null;
				dx = null;
				dy = null;
				isMoving = false;
			}

			onTouchMove = function(e) {
				if (isMoving) {
					if(e.touches && e.touches.length == 1) {
						var x = e.touches[0].clientX;
						var y = e.touches[0].clientY;
					} else if (config.simulate) {
						var x = e.originalEvent.clientX;
						var y = e.originalEvent.clientY;
					}
					
					dx = startX - x;
					dy = startY - y;
					if(config.preventDefaultEvents == 'horizontal') {
						if(Math.abs(dx) > Math.abs(dy)) {
							config.wipeMoving(dx, dy);
							e.preventDefault();
						} 
					} else {
						if(Math.abs(dx) < Math.abs(dy)) {
							config.wipeMoving(dx, dy);
							e.preventDefault();
						} 
					}
					
				}
			};

			onTouchEnd = function(e) {
				config.wipeEnd();
				if (isMoving) {
					if (Math.abs(dx) >= config.min_move_x) {
						if(Math.abs(dx) > Math.abs(dy)) {
							if (dx > 0) {
								config.wipeLeft();
							} else {
								config.wipeRight();
							}
						}
						cancelTouch();
					} else if (Math.abs(dy) >= config.min_move_y) {
						if(Math.abs(dx) > Math.abs(dy)) {
							if (dy > 0) {
								config.wipeDown();
							} else {
								config.wipeUp();
							}
						}
						cancelTouch();
					}
				}
				isMoving = false;
			};

			onTouchStart = function(e) {
				if(e.touches && e.touches.length == 1) {
					startX = e.touches[0].clientX;
					startY = e.touches[0].clientY;
				} else if (config.simulate) {
					startX = e.originalEvent.clientX ;
					startY = e.originalEvent.clientY;
				}
				
				config.wipeStart(startX, startY);
				if(isInActiveRect(startX, startY)) {
					if (config.stopPropagation) {
						$.Event(e).stopPropagation();
					}
					if(e.target) {
						var $target = $(e.target);
						if($target.attr('data-stopPropagation')) {
						}
					}
					
					isMoving = true;
					if('ontouchmove' in document.documentElement) {
						// this.removeEventListener('touchmove', onTouchMove, true);
						// this.addEventListener('touchmove', onTouchMove, true);
						$this.off('touchmove').on('touchmove', onTouchMove);
					} else {
						if(config.simulate) {
							$this.off('mousemove').on('mousemove', onTouchMove);
						}
					}
					if('ontouchend' in document.documentElement) {
						// this.removeEventListener('touchend', onTouchEnd, true);
						// this.addEventListener('touchend', onTouchEnd, true);
						$this.off('touchend').on('touchend', onTouchEnd);''
					} else {
						if(config.simulate) {
							$this.off('mouseup').on('mouseup', onTouchEnd);
						}
					}
				}
			};
			
			function isInActiveRect(x, y) {
				var _x = x / $(this).width();
				var _y = y / $(this).height();
				
				if(_x < config.activeRect[0]) return false;
				if(_x > config.activeRect[2]) return false;
				if(_y < config.activeRect[1]) return false;
				if(_y > config.activeRect[3]) return false;
				return true;
			}

			if ('ontouchstart' in document.documentElement) {
				$this.off('touchstart');
				// this.removeEventListener('touchestart', onTouchStart, true);
				this.addEventListener('touchstart', onTouchStart, true);
				// $this.off('touchstart').on('touchstart', onTouchStart);
			} else {
				if(config.simulate) {
					$this.off('mousedown').on('mousedown', onTouchStart);
				}
			}
		});

		return this;
	};

})(jQuery);
