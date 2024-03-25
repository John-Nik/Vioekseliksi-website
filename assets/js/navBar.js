const navBarBurgerButton =  document.querySelector('.navButton');
const mobileMenuBackdrop = document.querySelector('.container-links');
const htmlBody = document.querySelector('body');

navBarBurgerButton.addEventListener('click', toggleMenu);

function toggleMenu(buttonUserClicked) {
    if (buttonUserClicked.target.classList.contains('container-links') || buttonUserClicked.currentTarget.classList.contains('navButton')) {
        if (htmlBody.classList.contains('open-menu')) {
            console.log('toggle button clicked');
            mobileMenuBackdrop.removeEventListener('click', toggleMenu);
        } else {
            console.log('toggle button clicked');
            mobileMenuBackdrop.addEventListener('click', toggleMenu);
        }
        htmlBody.classList.toggle('open-menu');
    }
}