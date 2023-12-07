//
/********************* trpSelectedItem ************************/
//
/*  trpSelectedItem                           : 셀렉티드 아이템
    @param	$fn(arr:array, seleted:array)     : 선택 상태 이벤트
    @param	$option : {}                      : option
*/
jQuery.fn.trpSelectedItem = function($fn, $option){
  var _wrapId   = undefined;  // data-wrap_id
  var _conId    = undefined;  // data-con_id
  var _wrap     = this;       // selected_item-area
  $(_wrap).each(function($idx){
    console.log("$idx : ", $idx);
    _wrapId = $(this).data("wrap_id");
    $(this).attr("data-con_id", "conid-"+_wrapId+"-"+$idx );
    $(".js-selected_item_complete", this).attr("data-con_id", "conid-"+_wrapId+"-"+$idx );
    $(".js-selected_item_target"  , this).attr("data-con_id", "conid-"+_wrapId+"-"+$idx );
    console.log("_wrapId : ", _wrapId)
  })
  
  var _parent          = undefined;   // 현재 : selected_item-area
  var _completeWrap    = undefined;   // 현재 : selected_item_complete
  var _completeItems   = undefined;   // complete items
  var _targetItems     = undefined;   // target   items 
  var _selectIdArr   = [];            // 선택항목 ID
  var _selectItemArr = [];            // 선택항목 Item
  var _NotSelectItemArr = [];         // 미선택항목 Item
  var _settings = {
    target_out : true,       // 선택 타겟 생성위치 (true, false) true : #layout-wrapper , false : 현재위치
  };
  if( $option ) { $.extend(_settings, $option) }; // 팝업일때  target_out:false 검색 포커스


  /* === 완료타겟 선택 open (드롭다운 & 선택해제 이벤트)  selected_item_complete  */
  $(_wrap).off("click", ".js-selected_item_complete");
  $(_wrap).on( "click", ".js-selected_item_complete", function($e){   
    $e.preventDefault();

    if( $(".js-selected_item_complete").hasClass("active"))  { closeEventAction(); console.log("창닫기") }    // 창닫기
    if( $(this).hasClass("disabled")) { return false; }                                                  // disabled 클래스 있을때 실행 안함. 
    selected_item_target_open(this);
  });
  function selected_item_target_open($this){ 
    _completeWrap   = $this;
    _parent         = $($this).closest(".selected_item-area");
    _conId          = $(".js-selected_item_complete", _parent).data("con_id");
    _completeItems  = ".js-selected_item_complete[data-con_id="+ _conId+"]";
    _targetItems    = ".js-selected_item_target[data-con_id="+   _conId+"]";
    setTimeout(searchEventSet, 100);

    $(_completeItems).addClass("active");
    $(_targetItems).addClass("open")
    targetlistRenewalFn();  // 열릴때 실행 함수.
    openEventTrigger();     // 열때 이벤트 트리거
    setTimeout(closeEvent, 100);
    $("#layout-wrapper").append( $(_targetItems) );
    $(_targetItems).find(".js-selected_item_search").focus();
    selected_item_target_Event();     // 리스트 타겟 선택
    selectEvent();                    // 선택 이벤트 실행
  }


  /* === 완료타겟 삭제 이벤트  */
  $(_wrap).off("click", ".js-selected_item_complete .js-complete_item-del");
  $(_wrap).on("click",  ".js-selected_item_complete .js-complete_item-del", function($e){   
    $e.stopPropagation();
    selectedItem_complete_delFN( $(this).closest(".complete-item") );
    selectEvent();
  })
  // === 완료타겟 삭제 실행 
  function selectedItem_complete_delFN($tag){
    var _dataID    = $tag.data("id");
    var _conID = $($tag).closest(".js-selected_item_complete").data("con_id");
    $tag.remove();
    var _target_area = ".js-selected_item_target[data-con_id="+ _conID+"]";

    $(_target_area).find("li[data-id="+_dataID+"]").removeClass("active");
  }


  /* === 리스트타겟 선택 이벤트  selected_item_target */
  function selected_item_target_Event(){
    $("body").off("click", ".js-selected_item_target li");
    $("body").on("click",  ".js-selected_item_target li", function($e){
      $e.stopPropagation();
      selectedItem_targetFN($(this));
      selectEvent();
    })
  }
  // =-= 리스트타겟 선택 실행
  function selectedItem_targetFN($tag){
    var _id  = $tag.data("id");
    var _txt = $tag.text();
    var _addTag = `
      <div class="complete-item" data-id="${_id}">
        <span> ${_txt}</span>
        <button type="button" class="complete-btn js-complete_item-del">Remove item</button>
      </div>
    `

    if($tag.hasClass("active")){
      $($tag).data("id", _id).removeClass("active");
      $(".js-selected_item_complete .complete-inner .complete-item[data-id="+_id+"]", _wrap).remove();
    }else{
      $($tag).addClass("active");
      $(".js-selected_item_complete .complete-inner", _parent).append(_addTag);
    };
  }


  // === 검색 (event)
  var _liFocus = -1;
  function searchEventSet(){
    /* 검색된 값 중 선택안된 총겟수 */
    var   _liTotal = $("ul>li.search", _targetItems).not(".active").length;


    /* 검색 초기화 */
    $(".js-selected_item_search", _targetItems).val("");
    $(".search-empty", _targetItems).removeClass("on");
    $("ul>li", _targetItems).addClass("search");
    $("ul>li", _targetItems).each(function($idx, $item){
      $($item).attr("idx", $idx);
    })
    
    /* 검색 임풋 입력 */
    $(".js-selected_item_search", _targetItems).off("keyup");
    $(".js-selected_item_search", _targetItems).on("keyup", function($e) {
      var k = $(this).val();
      console.log("Key ?: ", k)
      $("li", _targetItems).attr("idx","")
      $("li", _targetItems).addClass("hide").removeClass("search");
      var temp = $("li:contains('" + k + "')", _targetItems); // 보여질애들
      $(temp).removeClass("hide").addClass("search");;
      $(temp).each(function($idx, $item){
        $($item).attr("idx", $idx);
      })

      /* 메시지노출 */
      var _searchCount = 0;
      var _total =  $("li", _targetItems).length;
      _searchCount =  $("li.hide", _targetItems).length;
      if( _searchCount == _total){
        $(".search-empty", _targetItems).addClass("on");
      }else{
        $(".search-empty", _targetItems).removeClass("on");
      }

    })

    /* 방향키   */
    $(window).off("keydown");
    $(window).on("keydown",function($e){
      const keycode = $e.keyCode;
      _NotSelectItemArr = $("ul>li.search",_targetItems).not("li.active");
      _liTotal          = _NotSelectItemArr.length;
      switch (keycode) {
        case(38) :  // Up
          $e.preventDefault();
          $("ul>li",_targetItems).removeClass("hover");
          _liFocus--;
          focusMove(_liTotal, true)
          break;
          case (40) : // Down
          $e.preventDefault();
          $("ul>li",_targetItems).removeClass("hover");
          _liFocus++; 
          focusMove(_liTotal, false)
        break;
        case (13) : // Enter
          selectedItem_targetFN($("ul>li.hover",_targetItems));
          selectEvent();
        break;
        case (27) : // esc
          closeEventAction();
        break;
      }
    })
  }
  function focusMove($total, $b){
    if ( _liFocus < 0 ){
      _liFocus = $total -1; 
    }else if( _liFocus >= $total ){
      _liFocus = 0;
    }
    console.log("move preventDefault : ", _liFocus , $total ) 
    
    $(_NotSelectItemArr[_liFocus]).addClass("hover");
    console.log(">=-=< : ", _NotSelectItemArr )
    if(_NotSelectItemArr.length > 0){
      _NotSelectItemArr[_liFocus].scrollIntoView($b);  // 상단기준 이동(true), 하단기준이동(false) 
    }
  }


  // === 전체 해제
  function selectedItem_resetFN($conId){
    if($conId == undefined){
      $(".js-selected_item_complete .complete-item", _wrap).remove();
      $(".js-selected_item_target ul li", _wrap).removeClass("active");
    }else{
      var _completeItems  = ".js-selected_item_complete[data-con_id="+ _conId+"]";
      var _targetItems    = ".js-selected_item_target[data-con_id="+   _conId+"]";
      $(_completeItems + " .complete-item").remove();
      $(_targetItems + " ul li").removeClass("active");
    }
    selectEvent();
  }


  // === 리스트상태 이벤트 
  // _completeItems
  // _targetItems
  function selectEvent(){
    var _idArr     = [];
    var _tagArr    = []; 
    var _notTagArr = []; /// 선택되지 않은 아이템
    
    var _total =  $(_targetItems + " li").length;
    /* 선택 된것 / 선택되지 않은것 */
    $(_targetItems +" li").each(function($index, $item){
      if($(this).hasClass("active")){
        _idArr.push($(this).attr("data-id"));
        _tagArr.push(this);
      }else if($(this).hasClass("search")){
        _notTagArr.push(this);
      }
    })

    /* 타겟 선택 메시지 */
    if(_idArr.length == _total){
      $(".data-empty", _targetItems).addClass("on");
    }else{
      $(".data-empty", _targetItems).removeClass("on");
    }

    /* 완료 선택 메시지 */
    if(_idArr.length == 0){
      $(".complete-inner", _wrap).addClass("data_none");
    }else{
      $(".complete-inner", _wrap).removeClass("data_none");
    }

    _selectIdArr      = _idArr;
    _selectItemArr    = _tagArr;
    _NotSelectItemArr = _notTagArr;
    targetlistRenewalFn();
    if($fn){ $fn(_idArr, _tagArr); } // 선택 항목 콜백
  }
  

  /* === 닫기 Event 생성*/
  function closeEvent() { 
    $('html > *').on("click", function ($e) {
      $e.preventDefault();
      var _close_list =  $(_targetItems).attr("data-trp-focusid");
      var _tarGet_list = $($e.target).closest(".js-selected_item_target").attr("data-trp-focusid");
      if ( _close_list != _tarGet_list ){
        closeEventAction();
      }
    });
  }
  function closeEventAction(){
    $(window).off("keydown");
    $(".js-selected_item_target").each(function($idx){
      var wrapID = $(this).data("con_id");
      $(".js-selected_item-area[data-con_id='"+ wrapID +"']").append(this);
      console.log((".js-selected_item-area[data-con_id='"+ wrapID +"']"));
    });
    $(".js-selected_item_complete").removeClass("active")
    $(".js-selected_item_target").removeClass("open")


    // _parent.append( $(_targetItems) ); // 윈래자리 이동
    // $(_completeItems).removeClass("active");
    // $(_targetItems).removeClass("open");
    $('html > *').off("click");
    _parent = undefined;
    searchReset();
    closeEventTrigger();
  }
  function searchReset(){
    $(_targetItems + " li").removeClass("hide");
    $(_targetItems + " .data-empty").removeClass("on");
    $(_targetItems + " .js-selected_item_search").val("");
  }
  

  /* === open 이벤트 트리거 */
  function openEventTrigger() {
    closeEventTrigger();
    $(window).on("scroll resize", function(){
      targetlistRenewalFn();
    })
  }
  function closeEventTrigger(){
    $(window).off("scroll resize")
  }
  /* 리스트타겟 Layer위치 트래킹 */
  function targetlistRenewalFn(){ 
    var scroll_top    = document.scrollingElement.scrollTop;
    var com_offset    = $(_completeWrap).offset();
    var com_width     = $(_completeWrap).outerWidth();
    var com_height    = $(_completeWrap).height();
    var tar_height    = $(_targetItems).height();
    var doc_H         = $( document ).innerHeight(); 
    var _top          = com_offset.top + com_height - scroll_top;       ///- (scroll_top - com_height);

    if( (com_offset.top + tar_height + com_height) >= doc_H ){
      _top = com_offset.top - ( tar_height + 5 );
    } 

    $(_targetItems).css({ "top":_top+"px", "left":com_offset.left+"px", "width":com_width+"px" })
  }


  return {
    setListActive: function($arr, $conId){
      var _id;
      var _tag;
      var _txt; 
      var _addTag = "";
      setTimeout(function(){
        selectedItem_resetFN($conId);
        for( i = 0; i < $arr.length; i++){
          _id = $arr[i];
          _tag = $(".js-selected_item_target ul li[data-id="+_id+"]", _wrap);
          _txt = _tag.text();
  
          _addTag += `
          <div class="complete-item" data-id="${_id}" >
            <span> ${_txt}</span>
            <button type="button" class="complete-btn js-complete_item-del">Remove item</button>
          </div>
          `;
          /// if( _addItemTag != ""){ _addTag = _addItemTag }; // 사용자 정의 테그아이템
          
          _tag.addClass("active");
        }
        $(".js-selected_item_complete .complete-inner", _wrap).append(_addTag);
        selectEvent();
      },100)
    },
    setListReset: function($conId){
      selectedItem_resetFN($conId);
    },
    getIdArr : function(){
      return _selectIdArr;
    },
    getItemArr : function(){
      return _selectItemArr;
    },
	} 
}
