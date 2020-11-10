  /**
   *  @author    (turfrain)
   *  @version   pageing scroll 
   *  @since     19.08.2016
   */

  //---------------------------------------------------------------------------------------------------------------
  //  								VARIABLES					(변수&상수)
  //---------------------------------------------------------------------------------------------------------------
  var WHELL_OFFSET = 0;  // 휠감지 (up :1 , down:-1)
  var RESIZE_HEIGHT = 0; // 화면 높이	
  
  
  /* ------------------------------------------ 이벤트 ( scroll, resize) ----------------------------  */
  // 타켓위치 리턴 (단독실행)
  function targetPositionY($tar) {return $($tar).offset().top;}

  /* 현제 스크롤 위치 */
  function getNowScroll() {
  	var de = document.documentElement;
  	var b = document.body;
  	var now = {};
  	now.X = document.all ? (!de.scrollLeft ? b.scrollLeft : de.scrollLeft) : (window.pageXOffset ? window.pageXOffset : window.scrollX);
  	now.Y = document.all ? (!de.scrollTop ? b.scrollTop : de.scrollTop) : (window.pageYOffset ? window.pageYOffset : window.scrollY);
  	now.TOTAL = $(document).height();
  	return now;
  }

  /* call back 스크롤 앵커 실행 (컨텐츠위치, 상대값, 실행&초기화, 실행함수, 초기화함수) */
function callBackScrollActive($tarY, $offSet, $off, $fn1, $fun2){     
	if( getNowScroll().Y >=  ($tarY-$offSet) && getNowScroll().Y <= $tarY+RESIZE_HEIGHT){		
		if($off){ 	$fn1();    	$off=false;      }
	}else if ( getNowScroll().Y <=  ($tarY-RESIZE_HEIGHT) || getNowScroll().Y > $tarY+RESIZE_HEIGHT)	{
		if(!$off){	$fun2();  	$off=true;		}
	}
	return $off;
}


function callBackMenuActive($tarY, $offSet, $off, $fn1, $fun2){  
	if( getNowScroll().Y >=  ($tarY-$offSet) ){		
		if($off){ 	$fn1();    	$off=false;      }
	}else{
		if(!$off){	$fun2();  	$off=true;		}
	}
	return $off;
}


  /* 리사이즈 이벤트 실행 */
  function resizeEventCall() {
  	RESIZE_HEIGHT = $(window).height();
  }




 //----------------------------------------------------------------------------------------------------------------
 //  								WINDWON READY				
 //----------------------------------------------------------------------------------------------------------------

  $(window).ready(function () {
	  	  
  	/* ------------------------------------------ 이벤트 ( scroll, resize) ----------------------------  */
  	// ===============  스크롤 이벤트 
  	$(window).scroll(function($e) { 		
		if(typeof(window["scrollCall"]) == "function") scrollCall(); 	// 페이지에 있어야하는 함수
	});
	if(typeof(window["scrollCall"]) == "function") scrollCall(); 	// 페이지에 있어야하는 함수		
	
	// 리싸이즈 윈도우 높이 
	$(window).resize(function(){
		if(typeof(window["resizeCall"]) == "function") resizeCall(); 	// 페이지에 있어야하는 함수		
		resizeEventCall();
	});
	if(typeof(window["resizeCall"]) == "function") resizeCall(); 	// 페이지에 있어야하는 함수		
	resizeEventCall();
	
  });
  /* === //window ready ==== */
	
