const setCookie = (cookieName, value, exdays) => {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + exdays);
  var cookieValue =
    escape(value) + (exdays == null ? "" : "; expires=" + exdate.toGMTString());
  document.cookie = cookieName + "=" + cookieValue;
};

const getCookie = cookieName => {
  var x, y;
  var val = document.cookie.split(";");

  for (var i = 0; i < val.length; i++) {
    x = val[i].substr(0, val[i].indexOf("="));
    y = val[i].substr(val[i].indexOf("=") + 1);
    x = x.replace(/^\s+|\s+$/g, ""); // 앞과 뒤의 공백 제거하기
    if (x == cookieName) {
      return unescape(y); // unescape로 디코딩 후 값 리턴
    }
  }
};

export { setCookie, getCookie };
