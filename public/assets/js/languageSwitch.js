const selectLanguage = document.querySelector("#language-svg-container"),
  languageOptions = document.querySelector(".unrevealed");
selectLanguage.addEventListener("click", () => {
  languageOptions.classList.toggle("visible");
});
const cookieEn = document.querySelector(".cookieEn"),
  cookieGr = document.querySelector(".cookieGr");
cookieEn.addEventListener("click", () => {
  let e = JSON.stringify(window.location.pathname).replace("gr/", "");
  Cookies.set("english", "en", { expires: 30 }),
    Cookies.remove("greek"),
    (window.location.href = JSON.parse(e));
}),
  cookieGr.addEventListener("click", () => {
    let e = JSON.stringify(window.location.pathname).replace(".com/", ".com/gr/");
    Cookies.set("greek", "gr", { expires: 30 }),
      Cookies.remove("english"),
      (window.location.href = JSON.parse(e));
  });

if (
    Cookies.get("greek") &&
    JSON.stringify(window.location.pathname).includes("en")
) {
    let e = JSON.stringify(window.location.pathname).replace(".com/", ".com/gr/");
    Cookies.set("greek", "gr", { expires: 30 }),
        (window.location.href = JSON.parse(e));
} else if (
    Cookies.get("english") &&
    JSON.stringify(window.location.pathname).includes("gr")
) {
    let i = JSON.stringify(window.location.pathname).replace("gr/", "");
    Cookies.set("english", "en", { expires: 30 }),
        (window.location.href = JSON.parse(i));
}
