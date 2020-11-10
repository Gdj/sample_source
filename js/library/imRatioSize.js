/*
 * Base			: jQuery JavaScript Library v1.9.1 
 * imPackage	: 
 * imRatioSize	: v0.6
 * release date : 2015.08.19
 * author		: turfrain@daum.com
 * Copyright 2015. turfrain all rights reserved.
 *
 */


/*
*	imRatioSize : 비레에 맞게 크기를 반환함
*   @options 	maxTri : 참조되는 타겟의 최대값
*   @options 	minTri : 참조되는 타겟의 최소값
*   @options 	maxTar : 변경될 타겟의 최대값
*   @options 	minTar : 변경될 타겟의 최소값
*   @options 	property : 변경될 속성값
*/

(function($) {
   $.fn.imRatioSize = function(options) {

// Establish default settings/variables
// ====================================
    var settings = $.extend({        
		maxTri    : 9999,       
        minTri    : 1,					// trigger
		maxTar    : 9999,
        minTar    : 1,					// target
		property  : "height"
    }, options),

// Do the magic math
// =================
		
		changes = function(el) {
			var $el		= $(el),
				elw		= $el.width(),
				width	= elw > settings.maxTri ? settings.maxTri : elw < settings.minTri ? settings.minTri : elw,
				size	= rangeRatio(settings.minTri, settings.maxTri, width, settings.minTar, settings.maxTar );
			$el.css( settings.property , size + 'px');		    
		},
		

		rangeRatio = function($rMin, $rMax, $rTar, $tMin, $tMax ){	
			
			var rMin 	= 0;					// Refer 참고 최소 값		
			var rMax	= $rMax - $rMin;		// Refer 참고 최대 값	
			var rTar 	= $rTar - $rMin;		// Refer 참고 변화 값
			var rPer;							// Refer 참고 변화 퍼센트
			var tMin 	= 0;					// target타겟 최소값
			var tMax	= $tMax - $tMin;		// target타겟 최대값 
			
			//rPer = Math.abs(rTar) / rMax  // 퍼센테지	== 100% => 1.0
			rPer = rTar / rMax				// 퍼센테지	== 100% => 1.0
				
			return (tMax * rPer)+ $tMin;	// 참고 비례 타겟값
		};
		
// Make the magic visible
// ======================
      return this.each(function() {
      // Context for resize callback
         var that = this;  
      // Make changes upon resize
         $(window).resize(function(){changes(that);});
      // Set changes on load
         changes(this);
      });
   };





}(jQuery));