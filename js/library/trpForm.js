/*
 * Base			: jQuery JavaScript Library v1.12.1
 * trPackage	:
 * trpPopup	    : v0.7
 * release date : 2017.02.17
 * author		: http://turfrain.tistory.com/
 * Copyright 2018. turfrain all rights reserved.
 *
 */


/* input type="file" 이미지로 변경 */
(function($) {    
    $.fn.trpFilestyle = function(options) {
        var self = this;       
        /* TODO: override CSS. */
        var settings = {            
            textClass: 'trp_fileName',
			textWidth: "auto",
			textHeight: "auto",
			buttonClass: "trp_fileButton",
			buttonText: '파일선택',
			buttonImage: "",			
			buttonWidth: "auto",
			buttonHeight: "auto"
        };

        // 옵녓값 합침        
        if(options) {
            $.extend(settings, options);
        };
                        
        return this.each(function() {
		   		var self = this;
					var browser = navigator.userAgent;		// 브라우저

					// 생성되는 input type="text" 
					var _text_html = $("<input type='text' title='file name' readonly='readonly' />").addClass(settings.textClass);	
					_text_html.css({
							"width": settings.textWidth ,
							"height": settings.textHeight ,
							"margin":"2px",
							"display":"inline"
					})
					
					// 생성되는 div 버튼 wrap
					var _button_html = $("<div>").addClass(settings.buttonClass);
					_button_html.css({
						"position": "absolute",
						"display": "inline",		
						"width" :			settings.buttonWidth ,
						"height" :		settings.buttonHeight ,
						"background" :	(settings.buttonImage != "")? "url("+settings.buttonImage+") 0 0 no-repeat" : "none" ,
						"overflow": "hidden"				  
					});
					// 이미지가 없을때 글자로 변경	 "buttonText"속성 사용
					if(settings.buttonImage == ""){ 
						_button_html.prepend(settings.buttonText)
					}
				
					// 속성 적용
					$(self).before(_text_html);
					$(self).wrap(_button_html);
					$(self).css({
						"position": "absolute",
						"top": "0",
						"left": "0",
						opacity: 0, 
						height:	 settings.buttonHeight,
						"margin-left": (/chrome/i.test(browser))? "-75px" : "-160px",		// 크롬일때 / 크롬이 아닐때
						"overflow":"hidden", 
						"cursor": "pointer" 
					});
					// 파일 경로 값넣기
					$(self).on("change", function(){ 
						var _val = $(self).val();
						$(self).parent().siblings(".trp_fileName").attr("value" , _val);
					});

						// 접근성 아웃라인 넣기				
					$(self).on("focus",function(){
						if (/chrome/i.test(browser))
						{	// 크롬
								$(self).parent(".trp_fileButton").css( {"outline" : " 2px auto #4d90fe"  });
						}else{	$(self).parent(".trp_fileButton").css( {"outline" : "1px dotted #000" });
						}
					});
					$(self).on("blur",function(){
						$(self).parent(".trp_fileButton").css( {"outline" : "none" });
					});
		
      
        });	// return
        
		 
    };
    
})(jQuery);




/*  trpCheckBoxAllsImg             : 전체 선택 체크 박스
    @param	$checkAll			: 전체 체크박스 선택자
    @param	$checkItem			: 개별 체크박스 선택자
*/
jQuery.fn.trpCheckBoxAllsImg = function($checkAll, $checkItem){
	var _wrap = this;										// 컨테이너

    /* 전체 선택 */
    $(_wrap).on("change", $checkAll , function(){ 
        if($(_wrap).find($checkAll).prop( "checked" )){
            $(_wrap).find($checkItem).prop('checked', true);
            $(_wrap).find($checkAll).parent().addClass("on");
            $(_wrap).find($checkItem).parent().addClass("on");
        }else{
            $(_wrap).find($checkItem).prop('checked', false);
            $(_wrap).find($checkAll).parent().removeClass("on");
            $(_wrap).find($checkItem).parent().removeClass("on");
        }
    });

    /* 개별 선택 */
    $(_wrap).on("change", $checkItem, function(){
        var n = $(_wrap).find($checkItem + ":checked").length;
       
        // all
        if ( n >= $(_wrap).find($checkItem).length ){
            $(_wrap).find($checkAll).prop('checked', true);
            $(_wrap).find($checkAll).parent().addClass("on");
        }else{
            $(_wrap).find($checkAll).prop('checked', false);
            $(_wrap).find($checkAll).parent().removeClass("on");
        }
        // item
        //if ( !$(this).parent().hasClass("on") ){
		if ( $(this).prop( "checked" ) ){
            $(this).parent().addClass("on");
        }else{
            $(this).parent().removeClass("on");
        }

    });
}
/* //전체 선택 체크 박스 */

/*  trpCheckBoxAlls             : 전체 선택 체크 박스
    @param	$checkAll			: 전체 체크박스 선택자
    @param	$checkItem			: 개별 체크박스 선택자
*/
jQuery.fn.trpCheckBoxAlls = function($checkAll, $checkItem){
	var _wrap = this;										// 컨테이너

    /* 전체 선택 */
    $(_wrap).on("click", $checkAll , function(){
        if($(_wrap).find($checkAll).prop( "checked" )){
            $(_wrap).find($checkItem).prop('checked', true);
        }else{
            $(_wrap).find($checkItem).prop('checked', false);
        }
    });

    /* 개별 선택 */
    $(_wrap).on("click", $checkItem, function(){
        var n = $(_wrap).find($checkItem + ":checked").length;
        if ( n >= $(_wrap).find($checkItem).length ){
            $(_wrap).find($checkAll).prop('checked', true);
        }else{
            $(_wrap).find($checkAll).prop('checked', false);
        }
    });
}
/* //전체 선택 체크 박스 */






/* 카운트 UI  
<span class="ui-count">
	<input type="text" class="ui-countTxt" value="1" min="1" max="5">
</span>
$('.ui-count').uiCount();
*/
$.fn.uiCount = function(options){
    var settings = {
        initCount:0,
        onComplete:function(){ return true;}
    };
    settings = jQuery.extend(settings, options || {});
    function fill_num(num, count) {
		num = num + '';
		return num.length >= count ? num : new Array(count - num.length + 1).join('0') + num;
	}
    return this.each(function() {
		var _this=  $(this),
			_wrap = $(this).closest(".ui-count"),
			countTxt = $('input.ui-countTxt',_this),
			_min, _max,
			_count;
      
		if( $(_this).find('input.ui-countTxt').attr("min") != undefined ){
			_min =  parseInt( $(_this).find('input.ui-countTxt').attr("min") );
		}else { _min = 0}
		if( $(_this).find('input.ui-countTxt').attr("max") != undefined ){
			_max = parseInt( $(_this).find('input.ui-countTxt').attr("max") );
		}else { _max = 9999; }

		function setLayout() {
			_this.append("<a href='#' class='arrow_up'><span class='blind'>up</span></a>");
			_this.append("<a href='#' class='arrow_down'><span class='blind'>down</span></a>");
			checkVal();
		}
		function checkVal() {
			_count = (countTxt.val().length) ? parseInt(countTxt.val()) : 0;
			_count = isNaN(_count) ? 0 : _count;
			if( _min == 00 ){ countTxt.val( fill_num(_count, 2) ); }else{ countTxt.val(_count); }
		}

		function upCount(){
			_count = parseInt(countTxt.val())+1;
			_count = (_count > _max) ? _max : _count;
			if( _min == 00 ){ countTxt.val( fill_num(_count, 2) ); }else{ countTxt.val(_count); }
		}
		function downCount(){
			_count = parseInt(countTxt.val())-1;
			_count = (_count > _min) ? _count : _min;
			if( _min == 00 ){ countTxt.val( fill_num(_count, 2) ); }else{ countTxt.val(_count); }
		}
		function addEvent(){			
			$(_wrap).on('click', '.arrow_up', function() {
				upCount(); //countTxt.focus();
				return false;
			});
			$(_wrap).on('click', '.arrow_down', function() {
				downCount(); //countTxt.focus();
				return false;
			});
			$(_wrap).on('mousewheel', function(e) {
				e.preventDefault();
                var E = e.originalEvent;
                delta = 0;
				if(E.detail) { delta = E.detail * -40; /* 파폭 */ }else{ delta = E.wheelDelta; };
				if( delta > 0){ upCount() }else{ downCount() };
            });
			countTxt.off().on('change', checkVal);
		}

		var init=function() { 
            // 테그가생성되었으면 다시 실행하지 않는다.  
            //$(_wrap).find(".arrow_down).click(function(){ alert("click");});
            if( $(_this).find("a").hasClass("arrow_down" ) ){
                return false; 
            }
			setLayout();
			addEvent();
		}();
	});
}
/* //카운트 UI  */

/* trpTimepicker */
$.fn.trpTimepicker = function(options){
	var _this = this, _hours, _minute, _ampm;
	var _timeEL = 
	_timeEL = '<div class="trp-timepicker am" >';
	_timeEL += '<span class="ui-count">';
	_timeEL += '<input type="text" class="ui-countTxt hours" readonly value="1" min="1" max="12" title="mouse wheel">';
	_timeEL += '</span>';
	_timeEL += '<span class="ui-count" minute>';
	_timeEL += '<input type="text" class="ui-countTxt minute" readonly value="00" min="00" max="59" title="mouse wheel">';
	_timeEL += '</span>';
	_timeEL += '<button class="btn ui-ampm" data-ampm="AM" >AM</button>';
	_timeEL += '</div>';
	$(_this).append(_timeEL);

	function upDate_time(){ 
		_hours  = $(".trp-timepicker .hours", _this ).val();
		_minute = $(".trp-timepicker .minute", _this ).val();
		_ampm   = $(".trp-timepicker .ui-ampm", _this ).attr("data-ampm");
		$(".timepicker-box input", _this ).val( _hours + " : "+ _minute+ " : " + _ampm);
	}

	$(".timepicker-box", _this ).on("click", function($e){		
		$(".trp-timepicker", _this ).addClass("on").show();		
	});

	$(document).on("click", function (t) { 
		if ( $(".trp-timepicker", _this ).hasClass("on") ){
			var n = $(t.target);
			upDate_time();
			if (!n.parents().hasClass("timepicker-area")){
				$(".trp-timepicker", _this ).removeClass("on").hide();
			} 
		}
	});


	$('.ui-count').uiCount();  
	$(".trp-timepicker", _this).on("click", ".ui-ampm", function() { 		
		$(".trp-timepicker").toggleClass("am");
		$(".trp-timepicker").hasClass("am")? $(this).attr("data-ampm", "AM").text("AM"): $(this).attr("data-ampm", "PM").text("PM")
	});
	$(".trp-timepicker .ui-count a", _this ).on("click", function(){
		setTimeout( upDate_time , 10);
	} );
	$(".trp-timepicker .ui-count", _this).on('mousewheel',  upDate_time );
}





/* jqGrid */
/**
 * @param schFunc		: make funcNm
 * @param listId		: 그리드 ID
 * @param listPager		: 페이저 ID
 * @param listRecords	: 총 건수
 * @returns
 */
function GridPager(schFunc, listId, listPager, listRecords,listPrefix) {
	console.log("dkkkdk")
Object.defineProperty(this, "funcNm", {
	value: listPrefix.schEng() + "." + schFunc,
	configurable: false,
	enumerable: false,
	writable: false
});	

Object.defineProperty(this, "$gridId", {
	value: $("#" + listPrefix + listId),
	configurable: false,
	enumerable: false,
	writable: false
});

Object.defineProperty(this, "$pagerId", {
	value: $("#" + listPrefix + listPager),
	configurable: false,
	enumerable: false,
	writable: false
});	

Object.defineProperty(this, "tRecord", {
	value: $("#" + listPrefix + listRecords),
	configurable: false,
	enumerable: false,
	writable: false
});	

/**
 * 한 페이지에 보여줄 페이지 수 (ex:1 2 3 4 5)
 */
Object.defineProperty(this, "pageCount", {
	value: 10,
	configurable: false,
	enumerable: false,
	writable: false
});

/**
 * 페이지 정보를 나타낼 것인지 여부
 */ 
Object.defineProperty(this, "customPageInfo", {
	value: false,
	configurable: false,
	enumerable: false,
	writable: false
});

/**
 * 첫번째 페이지
 */
Object.defineProperty(this, "gridPageNo", {
	value: 1,
	configurable: false,
	enumerable: false,
	writable: true
});

/**
 * 페이지 정보의 종류
 *  customPageInfo 가 true일때 보여짐
 *  TOT 	= 총 페이지수 / 갯수 (현재 페이지의 시작 레코드 ~ 현재 페이지의 마지막 레코드) <=== 기본값 <br/>
 *  TOTP 	= 총 페이지수 / 갯수 <br/>
 *  PSE 	= (현재 페이지의 시작 레코드 ~ 현재 페이지의 마지막 레코드) <br/>
 */
Object.defineProperty(this, "customPageInfoType", {
	value: "PSE",
	configurable: false,
	enumerable: false,
	writable: false
});

Object.defineProperty(this, "listPrefix", {
	value: listPrefix,
	configurable: false,
	enumerable: false,
	writable: false
});
}

GridPager.prototype.Show = function() {
var pageInner 		= "";
var pageTargetID	= this.funcNm;
var currentPage 	= this.$gridId.getGridParam("page");							// 현재 페이지	
var totalSize 		= this.$gridId.getGridParam("records");							// 전체 리스트 수		
var totalPage 		= Math.ceil(totalSize / this.$gridId.getGridParam("rowNum"));	// 그리드 데이터 전체의 페이지 수	
var totalPageList 	= Math.ceil(totalPage / this.pageCount);						// 전체 페이지 수를 한화면에 보여줄 페이지로 나눈다.	
var pageList 		= Math.ceil(currentPage / this.pageCount);						// 페이지 리스트가 몇번째 리스트인지

var table = "";
table+= "<table style=\"width:100%; height:{0}px; \">";
table+= "	<tr>";
table+= "		<td width=\"29%\"></td>";
table+= "		<td align=\"center\">{1}</td>";
table+= "		<td width=\"29%\" align=\"right\">{2}</td>";
table+= "	</tr>";
table+= "</table>";

this.tRecord.text(String(totalSize).PrtComma());	// 총35건 표기     

/**
 * 조회된 데이터가 없을때 표시
 */
if (this.$gridId.find("#" + this.listPrefix + "noDataTr").length > 0) {
	this.$gridId.find("tbody:last > tr:last").remove();
}

if(totalSize == 0) {
	
	var rowZeroTag = "";
	rowZeroTag += "<tr id=\"" + this.listPrefix + "noDataTr\">";
	rowZeroTag += "	<td colspan=\"{0}\" class=\"gridNoData\" style=\"height:{1}px;\" >";
	rowZeroTag += "		{2}"
	rowZeroTag += "	</td>";
	rowZeroTag += "</tr>";		
	
	rowZeroTag = rowZeroTag.format(
					(this.$gridId.getGridParam("colNames")).length
					, gridRowHeight
					, langNm.LangMessage.LANGMESSAGE_0336
				);
	this.$gridId.find("tbody").append(rowZeroTag);

	// ============================================================ //
	pageInner += "<span class='customPageMoveBtn'><i class='fa fa-fast-backward' title='" + langNm.LangMessage.LANGMESSAGE_0340 + "'></i></span>";
	pageInner += "<span class='customPageMoveBtn'><i class='fa fa-step-backward' title='" + langNm.LangMessage.LANGMESSAGE_0340 + "'></i></span>";
	pageInner += "<span class='customPageNumberBtn'><a href='javascript:none();' id='1'>1</a></span>";
	pageInner += "<span class='customPageMoveBtn'><i class='fa fa-step-forward' title='" + langNm.LangMessage.LANGMESSAGE_0487 + "'></i></span>";
	pageInner += "<span class='customPageMoveBtn'><i class='fa fa-fast-forward' title='" + langNm.LangMessage.LANGMESSAGE_0487 + "'></i></span>";	
	
	table = table.format(gridRowHeight, pageInner, (this.customPageInfo ? langNm.LangMessage.LANGMESSAGE_0336 + "&nbsp&nbsp" : ""));

	// 페이징할 DIV태그에 우선 내용을 비우고 페이징 태그삽입
	this.$pagerId.empty();
	// 너비 조정
	var w = this.$gridId.width();
	this.$pagerId.width(w);
	// 페이징 html 추가
	this.$pagerId.append(table);
	// 페이징 클래스 추가
	this.$pagerId.addClass("customPaginateBar");

	return;
} 
//	console.log("currentPage="+currentPage+"/ totalPage="+totalSize);
//	console.log("this.pageCount="+this.pageCount+"/ pageList="+pageList);

// 페이지 리스트가 1보다 작으면 1로 초기화
if(pageList < 1) pageList = 1;	
// 페이지 리스트가 총 페이지 리스트보다 커지면 총 페이지 리스트로 설정
if(pageList > totalPageList) pageList = totalPageList;
// 시작 페이지
var startPageList = ((pageList - 1) * this.pageCount) + 1;
// 끝 페이지
var endPageList = startPageList + this.pageCount - 1;

//	console.log("startPageList="+startPageList+"/ endPageList="+endPageList);

// 시작 페이지와 끝페이지가 1보다 작으면 1로 설정
// 끝 페이지가 마지막 페이지보다 클 경우 마지막 페이지값으로 설정
if(startPageList < 1) startPageList = 1;
if(endPageList > totalPage) endPageList = totalPage;
if(endPageList < 1) endPageList = 1;

// 페이징 DIV에 넣어줄 태그 생성변수 
pageInner = "";

// 페이지 리스트가 1이나 데이터가 없을 경우 (링크 빼고 흐린 이미지로 변경)
//	if(pageList < 2) {
//		pageInner += "<span class='customPageMoveBtn'><i class='fa fa-fast-backward' title='" + langNm.LangMessage.LANGMESSAGE_0340 + "'></i></span>";
//		pageInner += "<span class='customPageMoveBtn'><i class='fa fa-step-backward' title='" + langNm.LangMessage.LANGMESSAGE_0340 + "'></i></span>";
//	}


// 이전 페이지 리스트가 있을 경우 (링크넣고 뚜렷한 이미지로 변경)
if(pageList > 0) {
	var titlePrePage = langNm.LangMessage.LANGMESSAGE_0433;

	pageInner += "<span class='customPageMoveBtn'><a class='first' href='javascript:" + pageTargetID + "(\"first\");' title='" + langNm.LangMessage.LANGMESSAGE_0339 + "'><i class='fa fa-fast-backward faPointer'></i></a></span>";
	pageInner += "<span class='customPageMoveBtn'><a class='pre' href='javascript:" + pageTargetID + "(\"pre\");' title='" + titlePrePage + "'><i class='fa fa-step-backward faPointer'></i></a></span>";
}

// 페이지 숫자를 찍으며 태그생성 (현재페이지는 강조태그) 
for(var i = startPageList; i <= endPageList ; i++) {
	var titleGoPage = i + langNm.LangMessage.LANGMESSAGE_0230;

	if(i == currentPage) {
		pageInner = pageInner + "<span class='customPageNumberBtn'><a href='javascript:" + pageTargetID + "(" + (i) + ");' id='" + (i) + "' title='"+ titleGoPage +"'><strong>"+(i)+"</strong></a></span>";
	} else {
		pageInner = pageInner + "<span class='customPageNumberBtn'><a href='javascript:" + pageTargetID + "(" + (i) + ");' id='" + (i) + "' title='"+ titleGoPage +"'>"+(i)+"</a></span>";
	}
}
//	console.log("총페이지 갯수"+totalPageList);
//	console.log("현재페이지리스트 번호"+pageList);

// 다음 페이지 리스트가 있을 경우
if(totalPageList >= pageList) {
	var titleNextPage = langNm.LangMessage.LANGMESSAGE_0401;

	pageInner += "<span class='customPageMoveBtn'><a class='next' href='javascript:" + pageTargetID + "(\"next\");' title='" + titleNextPage + "'><i class='fa fa-step-forward faPointer'></i></a></span>";
	pageInner += "<span class='customPageMoveBtn'><a class='last' href='javascript:" + pageTargetID + "(\"last\");' title='" + langNm.LangMessage.LANGMESSAGE_0486 + "'><i class='fa fa-fast-forward faPointer'></i></a></span>";
}

// 현재 페이지리스트가 마지막 페이지 리스트일 경우
//	if(totalPageList == pageList) {
//		pageInner += "<span class='customPageMoveBtn'><i class='fa fa-step-forward' title='" + langNm.LangMessage.LANGMESSAGE_0487 + "'></i></span>";
//		pageInner += "<span class='customPageMoveBtn'><i class='fa fa-fast-forward' title='" + langNm.LangMessage.LANGMESSAGE_0487 + "'></i></span>";
//	}   

// 페이지 정보 셋팅
var pageInfoText = ""; // 페이지 정보를 담을 변수
if(this.customPageInfo) {
	//////////////////////////////////////////////////////////////////////////////////////////
	var base = parseInt(this.$gridId.getGridParam('page'), 10) - 1 ;
	if(base < 0) { base = 0; }
	base = base * parseInt(this.$gridId.getGridParam('rowNum'), 10);
	var from = base + 1;
	var to = base + this.$gridId.getGridParam('reccount') ;
	//////////////////////////////////////////////////////////////////////////////////////////

	if(totalSize == 0) {
		pageInfoText = langNm.LangMessage.LANGMESSAGE_0336 
	} else {
		var totpTxt = "총 " + totalPage + " 페이지" + " / " + totalSize + " 개";
		var pseTxt = "( " + from + " ~ " + to + " )";
		var totTxt = totpTxt + " 중 " + pseTxt;
		if(this.customPageInfoType == "TOTP") {
			pageInfoText = totpTxt;
		}else if(this.customPageInfoType == "PSE") {
			pageInfoText = pseTxt;
		}else{
			pageInfoText = totTxt;
		}
	}
}

table = table.format(gridRowHeight, pageInner, (this.customPageInfo ? pageInfoText + "&nbsp&nbsp" : ""));
// 페이징할 DIV태그에 우선 내용을 비우고 페이징 태그삽입
this.$pagerId.empty();
// 너비 조정
//var w = this.$gridId.width();
//this.$pagerId.width(w);
// 페이징 html 추가
this.$pagerId.append(table);
// 페이징 클래스 추가
this.$pagerId.addClass("customPaginateBar");

//	console.log("totalPage: " + totalPage);
//	console.log("totalSize: " + totalSize);
//	console.log("base: " + base);
//	console.log("to: " + to);
//	console.log("from: " + from);
//	console.log("rowNum: " + $gridId.getGridParam('rowNum'));	
};

/**
* first 	: 첫 	페이지로 이동
* pre		: 이전 	페이지로 이동
* next 	: 다음 	페이지로 이동
* last		: 마지막 	페이지로 이동
* Number	: 클릭한 	페이지로 이동
*/
GridPager.prototype.GoPage = function(pageArg, pageSo, pagePrm) {
if(typeof(pageArg) == "number") {
	this.gridPageNo = pageArg;
} else {	
	var totalPage = Math.ceil(this.$gridId.getGridParam("records") / this.$gridId.getGridParam("rowNum"));
	if(pageArg == "first") {
		this.gridPageNo = 1;
	} else if(pageArg == "pre") {
		var currentPage = this.$gridId.getGridParam("page");		
//			currentPage -= this.pageCount;				
//			var pageList = Math.ceil(currentPage / this.pageCount);
//			currentPage = (pageList - 1) * this.pageCount + this.pageCount;
		if(currentPage != 1) {
			currentPage--;	
		} 
		
		this.gridPageNo = currentPage;
	} else if(pageArg == "next") {
		var currentPage = this.$gridId.getGridParam("page");		
//			currentPage += this.pageCount;		
//			var pageList = Math.ceil(currentPage / this.pageCount);
//			currentPage = (pageList - 1) * this.pageCount + 1;	
		if(currentPage < totalPage) {
			currentPage++;	
		}			
		
		this.gridPageNo = currentPage;			
	} else if(pageArg == "last") {
		var totalSize = this.$gridId.getGridParam("records");
		var totalPage = Math.ceil(totalSize / this.$gridId.getGridParam("rowNum"));
		
		this.gridPageNo = totalPage;
	}
}

pagePrm.PAGE = this.gridPageNo;

this.$gridId.jqGrid("clearGridData");
this.$gridId.jqGrid("setGridParam", {	
	url: ProObject.GetUrl(pageSo)
	, postData: ProObject.SetDto(pagePrm)
	, page: this.gridPageNo
}).trigger("reloadGrid");
};