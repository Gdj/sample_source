var __GUIDE_LIST, __SITENAME,  __CONSTANT_HEAD, __CONSTANT_RULE, __CONSTANT_LSIT;

__SITENAME = { siteName : "Sample Code"};
/**
 * 보여줄 칼럼에는 1, 보여주지 않을 칼럼에는 0
 */
__CONSTANT_HEAD = {
    no : 1,  		// NO
    dep1 : 1,		// depth-1
    dep2 : 1,		// depth-2
    dep3 : 0,		// depth-3
    dep4 : 0,		// depth-4
    dep5 : 0,		// depth-5
    url : 1,		// File path
    role : 0,		// 담당자
    stateHTML : 0,	// HTML
    stateJS : 0,	// javascript
    state : 0,		// 완료상태
    pubUpdate  : 1,	// 퍼블수정 날짜
    devUpdate  : 0,	// 개발수정 날짜
    etc : 1			// 기타 메모
};


/***
 * 아래 리스트 추가
 * 지원 key 값
 *  각 뎁스에 해당하는 key값으로 입력
 */
__CONSTANT_LIST = [
/**
    * example
    {
        dep1 : '1뎁스 메뉴 이름',     // option ( 1뎁스 입력시 구분선 )
        dep2 : '2뎁스 메뉴 이름',     // option
        dep3 : '3뎁스 메뉴 이름',     // option
        dep4 : '4뎁스 메뉴 이름',     // option
        dep5 : '5뎁스 메뉴 이름',     // option
        url :  '/html/main.html'	  // 파일URL
        role : '홍길동',             // 담당자
        stateHTML : 1,              // 1을 넣으면 상태에 '완료' 라는 문구 출력, //option
        stateJS : 1,                // 1을 넣으면 상태에 '완료' 라는 문구 출력, //option
        state   : 1,                // 1을 넣으면 상태에 '완료' 라는 문구 출력, //option
        pubUpdate : 2018-0000,		  // 마지막날 배경색표기
        devUpdate : 2018-0000,		  // 
        etc : '디자인변경예정',       // 비고 란에 출력
    }
*/
	
    // Guide
    {		
        dep1 	  	: 'BASIC',
        dep2 	  	: 'guide XHTML1.0',
        url  	  	: './index_XHTML1.0.html',
				pubUpdate : '2019-0001',	
        etc 	  	: '',				
    },  {
        dep1 	  	: '',
        dep2 	  	: 'guide pc',
        url  	  	: './index_HTML5_pc.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    },  {
        dep1 	  	: '',
        dep2 	  	: 'guide mb',
        url  	  	: './index_HTML5_mobile.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    }, {
        dep1 	  	: '',
        dep2 	  	: 'email form',
        url  	  	: './sample_email.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    }, {
        dep1 	  	: '',
        dep2 	  	: 'awesome font',
        url  	  	: './sample_awesome_font.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    },  {
        dep1 	  	: '',
        dep2 	  	: '(fons, box) size',
        url  	  	: './sample_size(rem,vw).html',
				pubUpdate : '2019-0000',	
        etc 	  	: 'rem, vw / fons-siez, box-size',				
    }, 
	
	
		{
        dep1 	  	: 'jquery',
        dep2 	  	: '원형 열림 메뉴',
        url  	  	: './sample_circleMenu.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    }, {
        dep1 	  	: '',
        dep2 	  	: '클립보드',
        url  	  	: './sample_ClipBoard.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    },{
        dep1 	  	: '',
        dep2 	  	: '파일이름 추출',
        url  	  	: './sample_filename.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    }, {
        dep1 	  	: '',
        dep2 	  	: '모바일 클릭',
        url  	  	: './sample_mobileEvent.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    }, {
        dep1 	  	: '',
        dep2 	  	: '오디오 플레이어 ',
        url  	  	: './sample_playerAudio.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    }, {
        dep1 	  	: '',
        dep2 	  	: '비디오 플레이어 ',
        url  	  	: './sample_playerVideo.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    },	{
        dep1 	  	: '',
        dep2 	  	: '롤링넘버',
        url  	  	: './sample_rollingNumber.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    }, 	{
        dep1 	  	: '',
        dep2 	  	: '스크롤 활성화',
        url  	  	: './sample_scroll_action.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    }, 	{
        dep1 	  	: '',
        dep2 	  	: '스크롤 활성화 메뉴',
        url  	  	: './sample_scroll_action_menu.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    }, 	{
        dep1 	  	: '',
        dep2 	  	: '글자 검색',
        url  	  	: './sample_search_text.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '',				
    }, 
	
	
		{
        dep1 	  	: 'plugins',
        dep2 	  	: 'bxslider',
        url  	  	: './sample_bxslider(video).html',
				pubUpdate : '2019-0000',	
        etc 	  	: '비디오들어간 슬라이더',				
    },	
		{
        dep1 	  	: '',
        dep2 	  	: 'swiper',
        url  	  	: './sample_swiper(solid).html',
				pubUpdate : '2019-0000',	
        etc 	  	: '비디오들어간 슬라이더',				
    },	{
        dep1 	  	: '',
        dep2 	  	: 'fullPage',
        url  	  	: './sample_fullpage.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '전체 화면 페이지',				
    },  {
        dep1 	  	: '',
        dep2 	  	: 'jqScibble',
        url  	  	: './sample_jqScibble.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '드로잉',				
    },  {
        dep1 	  	: '',
        dep2 	  	: 'progressbar(svg)',
        url  	  	: './sample_loadingSVG.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '프로그래스',				
    },  {
        dep1        : '',
        dep2        : 'LeaderLine(svg)',
        url         : './sample_LeaderLine.html',
        pubUpdate : '2019-0000',    
        etc         : 'svg 라인',              
    },  
    {
        dep1        : '',
        dep2        : 'Lottie(svg)',
        url         : './sample_lottie.html',
        pubUpdate : '2019-0000',    
        etc         : 'svg Motion',              
    },    {
        dep1        : '',
        dep2        : 'Lottie player(svg)',
        url         : './sample_lottie_player.html',
        pubUpdate : '2019-0000',    
        etc         : 'svg Motion',              
    }, 
    {
        dep1 	  	: '',
        dep2 	  	: 'masonry',
        url  	  	: './sample_masonry.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '레이아웃정열',				
    },	{
        dep1 	  	: '',
        dep2 	  	: 'masonry',
        url  	  	: './sample_masonry2.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '레이아웃정열',				
    },	{
        dep1 	  	: '',
        dep2 	  	: 'CustomScrollbar',
        url  	  	: './sample_mCustomScrollbar.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '스크롤바',				
    },{
        dep1 	  	: '',
        dep2 	  	: 'sample_nanoScroller',
        url  	  	: './sample_nanoScroller.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '스크롤바',				
    },	{
        dep1 	  	: '',
        dep2 	  	: 'multiple file',
        url  	  	: './sample_multiple_file_upload.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '다중 파일첨부',				
    },	{
        dep1 	  	: '',
        dep2 	  	: 'multiple file',
        url  	  	: './sample_multiple_file_upload2.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '다중 파일첨부',				
    },	{
        dep1 	  	: '',
        dep2 	  	: 'powertip',
        url  	  	: './sample_powertip.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '툴팁',				
    },	{
        dep1 	  	: '',
        dep2 	  	: 'jsmovie',
        url  	  	: './sample_sequence.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '시컨스 플레이',				
    }, 	{
        dep1 	  	: '',
        dep2 	  	: 'tweenMax',
        url  	  	: './sample_tweenMax.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '트윈맥스',				
    }, 	{
        dep1 	  	: '',
        dep2 	  	: 'jplayer',
        url  	  	: './sample_video.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '비디오플레이어',				
    }, 	{
        dep1 	  	: '',
        dep2 	  	: 'jplayer',
        url  	  	: './sample_video2.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '비디오플레이어',				
    }, 	{
        dep1 	  	: '',
        dep2 	  	: 'spritespin',
        url  	  	: './sample_vr360.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '시컨스 회전',				
    }, 	{
        dep1 	  	: '',
        dep2 	  	: 'panzoom',
        url  	  	: './sample_zoom.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '줌',				
    }, 	{
        dep1 	  	: '',
        dep2 	  	: 'jQuery-rwdImageMaps',
        url  	  	: './sample_responsiveImgMap.html',
				pubUpdate : '2019-0000',	
        etc 	  	: '반응형 이미지 맵',				
    },	{
        dep1 	  	: 'ajax',
        dep2 	  	: '',
        url  	  	: './web3-ajax/index.html',
				pubUpdate : '2019-0000',	
        etc 	  	: 'ajax 메뉴생성, 파일 Import',				
    }, 	{
        dep1 	  	: 'server script',
        dep2 	  	: 'php, jsp ',
        url  	  	: './weblist_server.zip',
				pubUpdate : '2019-0000',	
        etc 	  	: 'json 파일생성 읽기, 쓰기',				
    },
   
 
];




__CONSTANT_RULE = { getIndex: function () { var _idx = ++window['INDEX'] || (window['INDEX'] = 0); return _idx + 1; }, li_option: function ($item) { var _return = ""; /*topLine*/ if ($item.dep1) { _return += ' t-divide'; }; /*compareUpdate*/ if ($item.pubUp && $item.devUp) { if ($item.pubUp > $item.devUp) { _return += ' is-different'; } }; /*isDone*/ if ($item.stateHTML && $item.stateJS) { if ($item.stateHTML && $item.stateJS) { _return += ' is-done'; } }; /* 상태라인 */ if ($item.stateLine) { if ($item.stateLine == "edit") { _return += ' edit'; } if ($item.stateLine == "del") { _return += ' del'; } }; return _return; }, path: function () { return '..' + this.url; }, getfileName: function ($item) { var aURL = $item.url.split('/'); return aURL[aURL.length - 1]; }, };

var _data = { _temp_dep1: "" }; Vue.component('search-component', { props: ['listItem', 'dep1SearchIndex'], data: function () { return _data }, template: '<cite style="position:absolute; font-size:0; line-height:0">{{ listItem.dep1? _temp_dep1 = listItem.dep1 : _temp_dep1 }}</cite>' }); __GUIDE_LIST = new Vue({ el: '#guide_list', data: { config: __SITENAME, t_head: __CONSTANT_HEAD, t_rule: __CONSTANT_RULE, t_body: __CONSTANT_LIST, }, methods: __CONSTANT_RULE, beforeCreate: function () { $("#guide_list").show() }, });


$(document).ready(function () {
    /* 배열 변수넣기 */
    var _updateArr = [];
    $("._GUIDE__list__col--update-pub").each(function (index) {
        _updateArr.push($("._GUIDE__list__col--update-pub").eq(index).text().replace("-", ""));
    }); /* 배열 최대값 */
    var _max = _updateArr.reduce(function (a, b) {
        return Math.max(a, b);
    }); /* 최대값 클래스 넣기 */
    for (var i in _updateArr) {
        if (_updateArr[i] == _max) {
            $("._GUIDE__list__col--update-pub").eq(i).closest("._GUIDE__list__item").addClass("new_update");
        }
    }; /* 검색 */
    var oItems = $("#list-body ._GUIDE__list__item ._GUIDE__list__col").each(function ($index) {
        $(this).attr("data-search", $(this).text().toLowerCase());
    });
    var searchFn = function () {
        var o = $("#list-body");
        $("#list-sch_txt").on("keyup", function ($e) {
            var t = $(this).val().toLowerCase();
            o.find("li").hide(), /* o.find(":contains(" + t + ")").closest("li").show(); */ $("#list-body ._GUIDE__list__item ._GUIDE__list__col").each(function ($index) {
                var str = $(this).attr("data-search");
                if (str.match(t)) {
                    $(this).closest("li").show();
                }
            });
            /* 입력 문자 해쉬 변환 */
            if ($e.keyCode === 13) {
              window.location.hash='';
              var _url = window.location.href;
              console.log(_url.replace("#", '') , t);
              window.location.href = window.location.href + t;
              searchFn(); 
          }
        });
    };
    $("#list-head").length && searchFn();
    
    if( window.location.hash ){
      var _hash = window.location.hash;      
      $("#list-sch_txt").val( _hash.replace("#", "") );
      $("#list-sch_txt").trigger("keyup");
    };
});
