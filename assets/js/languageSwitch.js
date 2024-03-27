const selectLanguage = document.querySelector("#language-svg-container");
const languageOptions = document.querySelector(".unrevealed");


selectLanguage.addEventListener("click", () => {
  languageOptions.classList.toggle("visible");
});


const cookieEn = document.querySelector(".cookieEn");
const cookieGr = document.querySelector(".cookieGr");


cookieEn.addEventListener("click", () => {
  let e = JSON.stringify(window.location.pathname).replace("/gr", "");

  Cookies.set("english", "en", { expires: 30 });

  Cookies.remove("greek");

  (window.location.href = JSON.parse(e));
})


cookieGr.addEventListener("click", () => {
  let i = JSON.stringify(window.location.pathname).slice(0, 1);
  Cookies.remove("english");
  Cookies.set("greek", "gr", { expires: 30 });

  if (i == "/" ) {
    let c = i + "gr" + JSON.stringify(window.location.pathname).slice(0, 1);
    console.log(c);
    (window.location.href = JSON.parse(c));
  } else {
    let b = i + "/gr" + JSON.stringify(window.location.pathname).slice(0, 1);
    (window.location.href = JSON.parse(b));
  }
})

if ( Cookies.get('greek') == 'gr' && JSON.stringify(window.location.pathname).includes('gr') == false ) {
  Cookies.set('greek', 'gr', { expires: 30 });
  Cookies.remove('english');

  let c = '/gr' + window.location.pathname;
  window.location.href = c;

} else if ( Cookies.get('english') == 'en' && JSON.stringify(window.location.pathname).includes("gr") ) {
  let i = JSON.stringify(window.location.pathname).replace("gr/", "");

  Cookies.set("english", "en", { expires: 30 });
  Cookies.remove('greek');

  window.location.href = JSON.parse(i);
}