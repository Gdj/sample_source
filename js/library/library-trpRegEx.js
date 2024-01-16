// 숫자만 입력 받기
var _trpRegExp_number = /[0-9]/g; 

// 숫자, 음수
var _trpRegExp_negative = /^[-+]?[0-9]*/g; 

// 숫자&도트
var _trpRegExp_number_dot = /[0-9\.]/g;
// 소수점2자리
var _trpRegExp_dot2 = /^[\d]*\.?(\d){0,2}/g;

// 3자리마다. 
var _trpRegExp_number_comma = /\B(?=(\d{3})+(?!\d))/g;
                          //= /\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g

                          // 전화 번호 
var _trpRegExp_Phone =  /^(\d{2,3})(\d{3,4})(\d{4})$/g;
//var _trpRegExp_Phone = ^[\d]{0,3}[- .]?[\d]{0,4}[- .]{1}[\d]{0,4}/g;

// 특수 문자 
var _trpSpecial_characters = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;


// 이메일 
var _trpEmail = /[a-zA-Z0-9._+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9.]+/g;



/**
 * trpInputType($text, $type) : 
 * @param {*} $text : 문자열
 * @param {*} $type : 타입
 */
function trpInputType($text, $type){
  var _result="";
  switch($type) {
    case "rx-number":               // 숫자
      _result = trpRegExp( $text, _trpRegExp_number);
    break;
    case "rx-negative":             // 숫자, 음수
      _result = trpRegExp( $text, _trpRegExp_negative);
    break;
    case "rx-number.":              // 숫자, 소수점(2자리)
      _result = trpRegExp( $text, _trpRegExp_number_dot);
      _result = trpRegExp( _result, _trpRegExp_dot2);
    break;
    case "rx-number,":              // 숫자, 3자리 콤마
      _result = trpRegExp( $text, _trpRegExp_number);
      _result = _result.toString().replace(_trpRegExp_number_comma, ",");
    break;
    case "rx-number,.":             // 숫자 3자리 콤마, 소수점(2자리)
      _result = trpRegExp( $text, _trpRegExp_number_dot);
      _result = trpRegExp( _result, _trpRegExp_dot2);
      _result = _result.toString().replace(_trpRegExp_number_comma, ",");
    break;
    case "rx-tel":                  // 전화번호
      _result = trpRegExp( $text, _trpRegExp_number);
      _result = _result.toString().replace(_trpRegExp_Phone, '$1-$2-$3');
    break;
    case "rx-special_characters":   // 특수문자
      _result = $text.toString();
      _result = _result.replace(_trpSpecial_characters, "");
    break;
    default:
    //실행내용
  }
  return _result;
}



/**
 * trpRegExp($text, $regexp) : $text 들어오는 문자를 $regexp로 걸러내기
 * @param {*} $text   : 문자열
 * @param {*} $regexp : 정규식 패턴
 * @returns           : 필터 문자열     
 */
function trpRegExp( $text, $regexp ){
  var str = "";
  var arr = [];
  //ex) str = $regexp.exec($text.toString());   == 
  //ex) str = $text.toString().match($regexp);  == 
  arr = $text.toString().match($regexp);
  //console.log(">>", arr)
  if(arr != null){
    //ex)  str = arr.reduce((previous, current) => {
    //        return previous + current;
    //     });
    str = arr.join("");
  }
  return str; 
  
}

// srt.exec(RegExp) : 문자열에서 일치하는 항목에 대해 이 정규식을 사용하여 검색을 실행하고 결과 배열반환, 없으면 "null"
// RegExp.exec(str) : 문자열에서 일치하는 항목에 대해 이 정규식을 사용하여 검색을 실행하고 결과 배열반환, 없으면 "null"
// RegExp.test(str) : 문자열에서 일치하는 항목에 대해 이 정규식을 사용하여 검색을 실행하고 결과가 있으면 true, 없으면 false
// match()f