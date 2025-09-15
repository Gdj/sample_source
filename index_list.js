var __GUIDE_LIST, __SITENAME,  __CONSTANT_HEAD, __CONSTANT_RULE, __CONSTANT_LSIT;

__SITENAME = { siteName : "Sample Code"};
/**
 * 보여줄 칼럼에는 1, 보여주지 않을 칼럼에는 0
 */
__CONSTANT_HEAD = {
    no : 1,  		// NO
    dep1 : 1,		// depth-1
    dep2 : 1,		// depth-2
    dep3 : 1,		// depth-3
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
        stateLine : "",              // 상태 클래스 (이상무 : "" ,  진행 : "ing" ,  수정 : "edit", 삭제 : "del")
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
      stateLine : "",  
      dep1: 'BASIC',
      dep2: 'guide XHTML1.0',
      dep3: '', 
      url: './index_XHTML1.0.html',
      pubUpdate: '2022-0001',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'guide pc',
      dep3: '', 
      url: './index_HTML5_pc.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'guide mb',
      dep3: '', 
      url: './index_HTML5_mobile.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'email form',
      dep3: '', 
      url: './sample_email.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'awesome font',
      dep3: '', 
      url: './sample_awesome_font.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '(fons, box) size',
      dep3: '', 
      url: './sample_size(rem,vw).html',
      pubUpdate: '2022-0000',
      etc: 'rem, vw / fons-siez, box-size',
    },


    {
      stateLine : "",  
      dep1: 'jquery',
      dep2: '원형 열림 메뉴',
      dep3: '', 
      url: './sample_circleMenu.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '클립보드',
      dep3: '', 
      url: './sample_ClipBoard.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '파일이름 추출',
      dep3: '', 
      url: './sample_filename.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '모바일 클릭',
      dep3: '', 
      url: './sample_mobileEvent.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '오디오 플레이어 ',
      dep3: '', 
      url: './sample_playerAudio.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '비디오 플레이어 ',
      dep3: '', 
      url: './sample_playerVideo.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '롤링넘버',
      dep3: '', 
      url: './sample_rollingNumber.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '스크롤 활성화',
      dep3: '', 
      url: './sample_scroll_action.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '스크롤 활성화 메뉴',
      dep3: '', 
      url: './sample_scroll_action_menu.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '글자 찾기',
      dep3: '', 
      url: './sample_find_text.html',
      pubUpdate: '2022-0000',
      etc: '[검색] 검색영역안에서 단어찾기',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '글자 아템별 찾기',
      dep3: '', 
      url: './sample_find_item_text.html',
      pubUpdate: '2022-0000',
      etc: '[검색] 반복되는 아이템 영역 안에 단어찾기',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '글자 아템별 찾기',
      dep3: '', 
      url: './sample_find_itemtext.html',
      pubUpdate: '2022-0000',
      etc: '[검색]',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'json download',
      dep3: '', 
      url: './sample_json_download.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'SVG 도넛',
      dep3: '', 
      url: './sample_svg_donut.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'SVG 라인',
      dep3: '', 
      url: './sample_svg_line.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'css charts',
      dep3: '', 
      url: './sample_charts.html',
      pubUpdate: '2022-0000',
      etc: 'charts',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: '플립카운터',
      dep3: '', 
      url: './sample_filpCounter0.html',
      pubUpdate: '2022-0000',
      etc: '0~2 / other(https://github.com/objectivehtml/FlipClock / https://url.kr/beul21) ',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: '3D rotator',
      dep3: '', 
      url: './sample_3dRotatorGallery.html',
      pubUpdate: '2022-0000',
      etc: '',
    }, 


    {
      stateLine : "",  
      dep1: 'Trp',
      dep2: 'trpSelectedItem',
      dep3: '', 
      url: './sample_trpSelectedItem.html',
      pubUpdate: '2023-1207',
      etc: '멀티셀렉터 item',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: 'trpAutoComplete',
      dep3: '', 
      url: './sample_trpAutoComplete.html',
      pubUpdate: '2024-0313',
      etc: '데이터 기반 자동완성',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: 'trpRegEx',
      dep3: '', 
      url: './sample_trpRegEx.html',
      pubUpdate: '2023-1211',
      etc: 'real time RexEx',
    }, 


    {
      stateLine : "",  
      dep1: 'plugins',
      dep2: 'bxslider',
      dep3: '', 
      url: './sample_bxslider(video).html',
      pubUpdate: '2022-0000',
      etc: '비디오들어간 슬라이더',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'swiper',
      dep3: '', 
      url: './sample_swiper.html',
      pubUpdate: '2022-0000',
      etc: '입채',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: 'fullPage',
      dep3: '', 
      url: './sample_fullpage.html',
      pubUpdate: '2022-0000',
      etc: '전체 화면 페이지',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: '',
      dep3: 'ex2', 
      url: './sample_fullpage2.html',
      pubUpdate: '2022-0000',
      etc: '전체 화면 페이지',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: 'jqScibble',
      dep3: '', 
      url: './sample_jqScibble.html',
      pubUpdate: '2022-0000',
      etc: '드로잉',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'progressbar(svg)',
      dep3: '', 
      url: './sample_loadingSVG.html',
      pubUpdate: '2022-0000',
      etc: '프로그래스',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'LeaderLine(svg)',
      dep3: '', 
      url: './sample_LeaderLine.html',
      pubUpdate: '2022-0000',
      etc: 'svg 라인',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'Lottie(svg)',
      dep3: '', 
      url: './sample_lottie.html',
      pubUpdate: '2022-0000',
      etc: 'svg Motion',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'Lottie player(svg)',
      dep3: '', 
      url: './sample_lottie_player.html',
      pubUpdate: '2022-0000',
      etc: 'svg Motion',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'masonry',
      dep3: '', 
      url: './sample_masonry.html',
      pubUpdate: '2022-0000',
      etc: '레이아웃정열',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: '',
      dep3: 'ex2', 
      url: './sample_masonry2.html',
      pubUpdate: '2022-0000',
      etc: '레이아웃정열',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'imagesloaded@4',
      dep3: '', 
      url: './sample_imagesloaded.html',
      pubUpdate: '2022-0000',
      etc: '이미지 로더',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'loadImagesV1.2.2',
      dep3: '', 
      url: './sample_loadImages.html',
      pubUpdate: '2022-0000',
      etc: '이미지 로더',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'DOPImageLoader',
      dep3: '', 
      url: './sample_imageLoader.html',
      pubUpdate: '2022-0000',
      etc: '이미지 로더 (대체이미지)',
    },  {
      stateLine : "",  
      dep1: '',
      dep2: 'CustomScrollbar',
      dep3: '', 
      url: './sample_mCustomScrollbar.html',
      pubUpdate: '2022-0000',
      etc: '스크롤바',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'sample_nanoScroller',
      dep3: '', 
      url: './sample_nanoScroller.html',
      pubUpdate: '2022-0000',
      etc: '스크롤바',
    },
    {
      stateLine : "",  
      dep1: '',
      dep2: 'sample_smooth-scrollbar',
      dep3: '', 
      url: './sample_smooth-scrollbar.html',
      pubUpdate: '2022-0000',
      etc: '아이폰 스크롤바',
    },
    {
      stateLine : "",  
      dep1: '',
      dep2: 'multiple file',
      dep3: '', 
      url: './sample_multiple_file_upload.html',
      pubUpdate: '2022-0000',
      etc: '다중 파일첨부',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'multiple file',
      dep3: '', 
      url: './sample_multiple_file_upload2.html',
      pubUpdate: '2022-0000',
      etc: '다중 파일첨부',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'powertip',
      dep3: '', 
      url: './sample_powertip.html',
      pubUpdate: '2022-0000',
      etc: '툴팁',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'jsmovie',
      dep3: '', 
      url: './sample_sequence.html',
      pubUpdate: '2022-0000',
      etc: '시컨스 플레이',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'tweenMax',
      dep3: '', 
      url: './sample_tweenMax.html',
      pubUpdate: '2022-0000',
      etc: '트윈맥스',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'jplayer',
      dep3: '', 
      url: './sample_video.html',
      pubUpdate: '2022-0000',
      etc: '비디오플레이어',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'jplayer',
      dep3: '', 
      url: './sample_video2.html',
      pubUpdate: '2022-0000',
      etc: '비디오플레이어',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'spritespin',
      dep3: '', 
      url: './sample_vr360.html',
      pubUpdate: '2022-0000',
      etc: '시컨스 회전',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'spritespin_v4.0.11',
      dep3: '', 
      url: './sample_vr360v2.html',
      pubUpdate: '2022-0000',
      etc: '시컨스 회전 컨트롤러',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'panzoom',
      dep3: '', 
      url: './sample_zoom.html',
      pubUpdate: '2022-0000',
      etc: '줌',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: '',
      dep3: '', 
      url: './sample_zoom-v3.2.2.html',
      pubUpdate: '2022-0000',
      etc: '줌',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: 'zoom2',
      dep3: '', 
      url: './sample_zoom2.html',
      pubUpdate: '2022-0000',
      etc: '줌 zoom-by-ironex.min.js , imgViewer2.min.js',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: 'jQuery-rwdImageMaps',
      dep3: '', 
      url: './sample_responsiveImgMap.html',
      pubUpdate: '2022-0000',
      etc: '반응형 이미지 맵',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: 'lazyload',
      dep3: '', 
      url: './sample_vanilla-lazyload.html',
      pubUpdate: '2022-0000',
      etc: 'vanilla-lazyload',
    }, 
    {
      stateLine : "",  
      dep1: '',
      dep2: 'seamscroll',
      dep3: '', 
      url: './sample_seamscroll.html',
      pubUpdate: '2022-0000',
      etc: 'news 흐름',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'highcharts',
      dep3: '', 
      url: './sample_charts_highcharts.html',
      pubUpdate: '2022-0000',
      etc: 'charts',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'jqGride 4.7.0',
      dep3: '', 
      url: './sample_jqgrid.html',
      pubUpdate: '2022-0000',
      etc: 'grid, 테이블 페이지',
    }, {
      stateLine : "",  
      dep1: '',
      dep2: 'jqGride 4.6.0',
      dep3: '', 
      url: './sample_jqgrid4.6.0.html',
      pubUpdate: '2022-0000',
      etc: 'grid, 테이블 페이지',
    }, 
  
    {
      stateLine : "",  
      dep1: 'ajax',
      dep2: '',
      dep3: '', 
      url: './web3-ajax/index.html',
      pubUpdate: '2022-0000',
      etc: 'ajax 메뉴생성, 파일 Import',
    }, {
      stateLine : "",  
      dep1: 'server script',
      dep2: 'php, jsp ',
      dep3: '', 
      url: './weblist_server.zip',
      pubUpdate: '2022-0000',
      etc: 'json 파일생성 읽기, 쓰기',
    },


    ];



  __CONSTANT_RULE = { getIndex: function () { var _idx = ++window['INDEX'] || (window['INDEX'] = 0); return _idx + 1; }, li_option: function ($item) { var _return = ""; /*topLine*/ if ($item.dep1) { _return += ' t-divide'; }; /*compareUpdate*/ if ($item.pubUp && $item.devUp) { if ($item.pubUp > $item.devUp) { _return += ' is-different'; } }; /*isDone*/ if ($item.stateHTML && $item.stateJS) { if ($item.stateHTML && $item.stateJS) { _return += ' is-done'; } }; /* 상태라인 */ if ($item.stateLine) { if ($item.stateLine == "ing") { _return += ' state_ing'; } if ($item.stateLine == "edit") { _return += ' state_edit'; } if ($item.stateLine == "del") { _return += ' state_del'; } }; return _return; }, path: function () { return '..' + this.url; }, getfileName: function ($item) { var aURL = $item.url.split('/'); return aURL[aURL.length - 1]; }, };


  var _data = { _temp_dep1: "" }; Vue.component('search-component', { props: ['listItem', 'dep1SearchIndex'], data: function () { return _data }, template: '<cite style="position:absolute; font-size:0; line-height:0">{{ listItem.dep1? _temp_dep1 = listItem.dep1 : _temp_dep1 }}</cite>' }); __GUIDE_LIST = new Vue({ el: '#guide_list', data: { config: __SITENAME, t_head: __CONSTANT_HEAD, t_rule: __CONSTANT_RULE, t_body: __CONSTANT_LIST, }, methods: __CONSTANT_RULE, beforeCreate: function () { $("#guide_list").show() }, mounted: function () { 
      /* $("._GUIDE__list__body > li.state_ing").hide();  */
  }, });
  
  
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
              var _tag = $("._GUIDE__list__col--update-pub").eq(i).closest("._GUIDE__list__item");
              var _sch = _tag.find("._GUIDE__list__col--no .sch_state");
              _tag.addClass("state_new");
              _sch.text(_sch.text() + " state_new");
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
              }); /* 입력 문자 해쉬 변환 */
              if ($e.keyCode === 13) {
                  window.location.hash = '';
                  var _url = window.location.href;
                  if (_url.indexOf("#") == -1) {
                      window.location.href = _url + "#" + encodeURI(t, "UTF-8");
                  } else {
                      window.location.href = _url + encodeURI(t, "UTF-8");
                  }
                  searchFn();
              }
          });
      };
      $("#list-head").length && searchFn();
      
      if (window.location.hash) {
          var _hash = decodeURI(window.location.hash, "UTF-8");
          $("#list-sch_txt").val(_hash.replace("#", ""));
          $("#list-sch_txt").trigger("keyup");
      }; /* 검색 클릭 */
      $(".js-legend_list li").on("click", function ($e) {
          $e.preventDefault();
          var _state_sch = $(this).data("state");
          if ($("#list-sch_txt").val()) {
              $(".js-legend_list li").removeClass("on");
              $("#list-sch_txt").val("");
              $("#list-sch_txt").trigger("keyup");
          } else {
              $(this).addClass("on");
              $("#list-sch_txt").val(_state_sch);
              $("#list-sch_txt").trigger("keyup");
          }
      })
  });