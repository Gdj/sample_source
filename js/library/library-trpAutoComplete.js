
//
/********************* 자동완성 ************************/
//
/*  trpAutocomplete       : 자동완성
    @param	inpArr  			: 자동완성 선택자
    @param	arr       		: 배열 데이터
    @param  callbackFn    : 함수
    @return setDropClass      : 드롭다운 클래스
    @return setDropRePositon  : 드롭다운 위치 잡기
*/
function trpAutocomplete(inpArr, arr, callbackFn) {
  /*the autocomplete function takes two arguments,
  the text field element and an array of possible autocompleted values:*/
  var currentFocus;
  var searchB = false;
  var dropClass  = "";  // 드롭다운 클래스 
  /* [2023-1129] 스크롤 움직임 저지 */
  var scrollStop = 0;
  scrollStop  = window.scrollY;
  window.removeEventListener("scroll", stopBodyScroll);
  window.addEventListener("scroll"   , stopBodyScroll);

  /* ----------------- [2024-0102] 브라우져 크기 반응 */
  var currentInp; 
  var moveSetTime = null;
  function autocompleteListResizeFn(e){
   // Drop close------------------
   var x = document.getElementsByClassName("autocomplete-items");
   for (var i = 0; i < x.length; i++) {
    x[i].parentNode.removeChild(x[i]);
   }
  }
  /* 위치 잡기 */
  function autocompleteRePositionFn(){
    if(currentInp != undefined){
      var _inp     = currentInp;
      var __w      = _inp.offsetWidth;
      var __offset = _inp.getBoundingClientRect();
      var __autocomplete_items = $(".autocomplete-items");
      __autocomplete_items.Gwdith = __w+"px";
      __autocomplete_items.Gtop  = __offset.top + __offset.height +  window.scrollY + "px";
      __autocomplete_items.Gleft = __offset.left+"px"; 
      __autocomplete_items.css({ width:__autocomplete_items.Gwdith, top: __autocomplete_items.Gtop, left : __autocomplete_items.Gleft })
      //console.log(">>::>>", __autocomplete_items.Gwdith  , __autocomplete_items.Gtop , __autocomplete_items.Gleft )
    }

    if(moveSetTime != null){ setTimeMoveClear(); }
    moveSetTime = setTimeout(setTimeMovePopFn, 200);
  }
  function setTimeMovePopFn(){
    autocompleteRePositionFn();
    setTimeMoveClear()
  }
  function setTimeMoveClear(){
    clearTimeout(moveSetTime);
    moveSetTime = null;
  }
  /* ----------------- // [2024-0102] 브라우져 크기 반응 */

  function stopBodyScroll(){
    scrollStop = window.scrollY;
  }
  /* // [2023-1129] 스크롤 움직임 저지 */

  /* [2024-0102] 초기시행 이벤트 & id심기 */
  inpArr.forEach(function(inputs, idx){
    //inputs.inp = inputs;

    inputs.removeEventListener("input", eventInputFn );
    inputs.addEventListener("input", eventInputFn );

    /*execute a function presses a key on the keyboard:*/
    inputs.removeEventListener("keyup", eventKeyUpFn);
    inputs.addEventListener("keyup", eventKeyUpFn);

    /*execute a function when someone clicks in the document:*/
    document.inp = inputs;
    document.removeEventListener("click", eventDocClickFn);
    document.addEventListener("click", eventDocClickFn);

    /* ----------------- [2024-0102] 브라우져 크기 반응  */
    window.removeEventListener("resize", autocompleteListResizeFn);
    window.addEventListener("resize"   , autocompleteListResizeFn);
    /* ----------------- // [2024-0102] 브라우져 크기 반응  */

    /* ----------------- [2024-0102] 아이디 부여  */
    var names = $(inputs).attr("class").replace(/ /g,"");
    inputs.setAttribute("idx", "trpAC_" + idx + names);
    /* ----------------- // [2024-0102] 아이디 부여  */
  })
  /* // [2024-0102] 초기시행 이벤트 & id심기 */



  /* ------------------ 키보드 선택 active fn */
  /* [2024-0102] 커서 스크롤  */
  function addActive(x, $b, xx) {
    /*a function to classify an item as "active":*/
    /* [2024-0111] 수정 // */
    if (!x) return false;

    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = (x.length - 1);
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
    var _sTop = $(".autocomplete-active", xx).outerHeight() * $(".autocomplete-active", xx).index();
    var _sH   = $(xx).height() -  $(".autocomplete-active", xx).height();
    if( _sH < _sTop){
      var _goTop = _sTop - _sH + $(".autocomplete-active", xx).height();
      $(xx).scrollTop(_goTop);
    }else { 
      $(xx).scrollTop(0);
    }
    // console.log("====>> current커서 움직임 <<======== : ",_sH,  _sTop , _goTop)
    /* [2024-0102] 커서 스크롤 false 하단기준 // */
    //x[currentFocus].scrollIntoView(false);
  }
  /* // [2024-0102] 커서 스크롤  */

  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt, inp) {
    /*close all autocomplete lists in the document,
    except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  

  /* ------------------ eventInputFn */
  /* 인풋 검색 _ 리스트팝 생성*/
  function eventInputFn(e) {
    var a, b, i, val = this.value;
    /* ----------------- [2024-0102]  */
    //var _inp = e.currentTarget.inp;
    var _inp = e.currentTarget;
    var _idx = _inp.getAttribute("idx");
    currentInp = _inp;
    /* ----------------- // [2024-0102]  */
    /*close any already open lists of autocompleted values*/
    closeAllLists(undefined, _inp);
    if (!val) { return false;}
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    /* ----------------- [2024-0102]  */
    a.setAttribute("id", _idx + "autocomplete-list");
    /* // ----------------- [2024-0102]  */
    a.setAttribute("class", "autocomplete-items");
    if(dropClass != ""){
      a.setAttribute("class", "autocomplete-items " + dropClass);
    }
    /*append the DIV element as a child of the autocomplete container:*/
    var appen_wrap = document.getElementById("layout-wrapper");
    appen_wrap.parentNode.appendChild(a);
    /// this.parentNode.appendChild(a);
    /*for each item in the array...*/
    for (i = 0; i < arr.length; i++) {
      /*check if the item starts with the same letters as the text field value:*/
      var _data = arr[i].toUpperCase(); // 데이터
      var _val  = val.toUpperCase();    // 입력값
      var _strStart = _data.indexOf(_val);
      if (_data.indexOf(_val) !== -1) {
        b = document.createElement("DIV");
        b.innerHTML = arr[i].substr(0, _strStart);
        b.innerHTML += "<strong>" + arr[i].substr(_strStart, _val.length) + "</strong>";
        b.innerHTML += arr[i].substr((_strStart + _val.length), arr[i].length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.inp = _inp;
        b.removeEventListener("click", eventInputClickFn);
        b.addEventListener("click", eventInputClickFn);
        a.appendChild(b);
      }
    }
    var __w      = _inp.offsetWidth;
    var __offset = _inp.getBoundingClientRect()
    var _w =  a.parentNode.offsetWidth;
    var _offset = a.parentNode.getBoundingClientRect();
    a.style.width = __w+"px";
    /* ----------------- [2024-0102]  */
    /// a.style.top  = __offset.top + __offset.height +  window.pageYOffset + "px";
    a.style.top  = __offset.top + __offset.height +  window.scrollY + "px";
    a.style.left = __offset.left+"px";
    
    
    if(document.querySelector('#'+_idx +'autocomplete-list div') != null){
      document.querySelector('#'+_idx +'autocomplete-list').style.display = "blick";
    }else{
      document.querySelector('#'+_idx +'autocomplete-list').style.display = "none";
    }
    /* // ----------------- [2024-0102]  */

  } //eventInputFn

  /* 인풋 검색 선택 */
  function eventInputClickFn(e){
    /*insert the value for the autocomplete text field:*/
    var _inp = e.currentTarget.inp; 
    _inp.value = this.getElementsByTagName("input")[0].value;
    /*close the list of autocompleted values,
    (or any other open lists of autocompleted values:*/
    closeAllLists(undefined, _inp);
    if(typeof callbackFn === 'function') {
      callbackFn( _inp.value );
    }
  } //eventInputClickFn

  /* ------------- [2024-0102] eventKeyUpFn // */
  function eventKeyUpFn(e){
    /* ------------- [2024-0102] */
    ///var x = document.getElementById(this.idx + "autocomplete-list");
    var x = document.getElementById(this.getAttribute("idx") + "autocomplete-list");
    var xx = x;
    /* [2024-0111] 데이터 리스트 없을때 */
    if( $( "div", x).length == 0 ){ return false; }
 
    /* ------------- // [2024-0102] */
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {  // down
      /*If the arrow DOWN key is pressed,
      increase the currentFocus variable:*/
      currentFocus++;
      /*and and make the current item more visible:*/
      /*  [2024-0102] 커서 스크롤  // */
      addActive(x, false, xx);
    } else if (e.keyCode == 38) { //up
      /*If the arrow UP key is pressed,
      decrease the currentFocus variable:*/
      currentFocus--;
      /*and and make the current item more visible:*/
      /*  [2024-0102] 커서 스크롤  // */
      addActive(x, true, xx);
    } else if (e.keyCode == 13) { // enter
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    } else if (e.keyCode == 27) { // esc
      eventDocClickFn(e)// 검색 닫기
    }
    /* [2023-1129] */
    $("html, body").scrollTop(scrollStop);
    /* //[2023-1129] */
  }//eventKeyUpFn
  
  function eventDocClickFn(e){
    var _inp = e.currentTarget.inp;
    closeAllLists(undefined, _inp);  //     closeAllLists(e.target, _inp);
  }

  return {
    setDropClass: function($str){
      dropClass = $str;
    },
    setDropRePositon: function($autocomplete_items){
      autocompleteRePosition();
    }
  }
}
