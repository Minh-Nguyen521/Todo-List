function getCookie(token) {
  const tokenEQ = token + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(tokenEQ) === 0) return c.substring(tokenEQ.length, c.length);
  }
  return null;
}
export default getCookie;
