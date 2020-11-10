/*
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpPopup	    : v0.82 _ ones
 * release date : 2018.09.07
 * author		: http://turfrain.tistory.com/
 * Copyright 2018. turfrain all rights reserved.
 *
 */


/**
 * trpLayerFixedPopup		: 레이어 팝업띄움
 * 
 * @param  $tarPopup		: $tarPopup(팝업타겟)
 * @method  open		    : 팝업 띄우기
 * @method  close		    : 팝업 닫기
 * @method  getBtn		    : 팝업 버튼
 */

var trpLayerFixedPopupScroll_top =0;
jQuery.fn.trpLayerFixedPopup = function( $tarPopup ){
    var _self       = this;             // 팝업열기버튼 & 팝업닫을대 돌아갈타겟
    var _selfOff    = true;				// 오픈시 포커스 사용안함.
    var _isShow     = false;			// 팝업 열려 있는지 상태.
    //var trpLayerFixedPopupScroll_top = $(window).scrollTop();
    var _tarPopup   = ( $tarPopup )?_tarPopup=$tarPopup : _tarPopup="" ;
    var _dim = $('<div class="popup-dim"></div>');
    var _dim_class = "";
 

    // 팝업 열기
    function popupOpen($this){           //console.log(">>>  : " + $this);
        if( $this ){_self = $this; }else{ _selfOff = false; }
        if(_tarPopup == ""){ _tarPopup =  $(_self).attr('href'); } // 타겟값이 없다면 a태그로 인식해서 href적용
        
        _dim_class = _tarPopup.replace(/\#/g,'')
        _dim.addClass(_dim_class).css({ display:"none" });
        $(_tarPopup).before(_dim);
        _dim.fadeIn(300);
        $(_tarPopup).fadeIn(300);
        
        if( $(".popupfixed-wrap").filter(":visible").length == 1){
            trpLayerFixedPopupScroll_top = $(window).scrollTop();
            $("html, body").scrollTop(0);
            $(".wrapper").css({ position:"fixed",     top: (trpLayerFixedPopupScroll_top * -1) });
            $(".wrapper").attr("data-pop", "on");
            //$("html, body").css({ overflow : "hidden"});
        }

        return false;
    }


    // 팝업 닫기
    function popupClose($completeFn){
        if( $(".popupfixed-wrap").filter(":visible").length == 0){ return false; }

        $(_dim).fadeOut(300, function(){
            _dim.remove();            
        });
        $(_tarPopup).fadeOut(300 ,function(){
            if( $(".popupfixed-wrap").filter(":visible").length == 0){
                $(".wrapper").css({ position:"relative",  top:"0" });
                $("html, body").scrollTop(trpLayerFixedPopupScroll_top);
                $(".wrapper").attr("data-pop", "off");
                //$("html, body").css({ overflow : "initial"});
            }
			if(_selfOff)$(_self).focus(); 
			if ( $completeFn != undefined && typeof $completeFn == 'function') { // 함수인지 체크해서 호출
				$completeFn();  
			}
        });
        return $(_tarPopup); 
    }

    return { open:function($this){            // 팝업 열기
            if (!_isShow ){                   // false 값일때 열림
                _isShow = true;
                popupOpen($this);
            }

        },close:function($completeFn){                     // 팝업 닫기
            _isShow = false;
            return popupClose($completeFn);
        },getBtn: _self

    }; // return//

};// trpLayerFixedPopup




/**
 * trpBgDim			: 딤드 전체 영역, 투명도, 색상
 * @param $opacity  : 투명도(0.3)
 * @param $bgColor  : 배경색(#000)
 * #opacity  : #popup_dim {position: fixed; top: 0; left: 0; width:100%; height:100%; background: #000; opacity: .7; filter: alpha(opacity=70);  z-index:9990;}
 */
jQuery.fn.trpBgDim = function($opacity,$bgColor){
	//console.log($(this))
	var _docW,_docH, _opacityO , _opacityE, _bgColor;
	//_docW=$(document).width(); 		// dim 크기
	//_docH=$(document).height();		// dim 크기
	_docW="100%";
	_docH="100%";

	_opacityO = ($opacity)? $opacity : 0.7 ;	 // 투명도
	_opacityE = _opacityO *100;					 // ie 투명도
	_bgColor  = ($bgColor)?  $bgColor : "#000" ; // 색상
	$(this).css({ "position":"fixed", top:0, left:0 ,"width":_docW, "height":_docH , opacity:_opacityO, "background-color": _bgColor ,
		"-ms-filter":"progid:DXImageTransform.Microsoft.Alpha(Opacity="+ _opacityE +") !important", "filter": "alpha(opacity="+ _opacityE +") !important"
	});
};



/** ==================== 쿠키관련 ==================== **/
	/**
	*	trpSetCookie : 쿠키세팅
	*	cName		: 쿠키이름
	*	cValue		: 쿠키값
	*	cDay		: 날짜 1일단위
	*/
	function trpSetCookie($cName, $cValue, $cDay){
		var expire = new Date();

		expire.setDate(expire.getDate() + $cDay);				// 현재 날짜+팝업을 안열을 일수
		cookies = $cName + '=' + escape($cValue) + '; path=/ ';	// 한글 깨짐을 막기위해 escape(cValue)를 합니다.
		if(typeof $cDay != 'undefined') cookies += ';expires=' + expire.toGMTString() + ';';  // 쿠키 지속시간 설정( toUTCString )
		document.cookie = cookies;
	}


	/**
	*	trpGetCookie : 쿠키값 가져오기
	*	cName		: 쿠키이름
	*	return		: 쿠키값
	*/
	function trpGetCookie($cName) {
		$cName = $cName + '=';
		var cookieData = document.cookie;
		var start = cookieData.indexOf($cName);
		var cValue = '';
		if(start != -1){
			start += $cName.length;
			var end = cookieData.indexOf(';', start);
			if(end == -1)end = cookieData.length;
			cValue = cookieData.substring(start, end);
		}

		return unescape(cValue);
	}
/** //==================== 쿠키관련 ==================== **/