const parseCookie = (cookieKey, cookieString) => {
  console.log('cookieKey, cookieString', !(cookieString.includes('null') , cookieString.includes('false') , cookieString.includes('undefined')))
  if (!(cookieString.includes('null') || cookieString.includes('false') || cookieString.includes('undefined'))){
    var name = cookieKey + "=";
    var decodedCookie = decodeURIComponent(cookieString);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null
  }else{
    return null;
  }
}

export default parseCookie