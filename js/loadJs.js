function addJavascript(jsname) {
	var th = document.getElementsByTagName('head')[0];
	var s = document.createElement('script');
	s.setAttribute('type','text/javascript');
	s.setAttribute('src',jsname);
	th.appendChild(s);
}
addJavascript('./js/library/jquery-1.10.2.min.js')
addJavascript('./js/library/jquery.easing.1.3.min.js');
addJavascript('./js/scrollActive.js');
addJavascript('./js/common.js');