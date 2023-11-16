const links = document.querySelectorAll('#wrapper .link');
const navBarBurgerButton =  document.querySelector('.navButton');
const mobileMenuBackdrop = document.querySelector('.container-links')

links.forEach(underlineActiveTab, window.location.pathname);

function underlineActiveTab(link) {
    if (link.children[0].dataset.link.includes(this)) {

        link.children[0].style.textDecoration = 'underline';
        link.children[0].style.textDecorationColor = 'var(--primary-blue-color)';
        link.children[0].style.textDecorationThickness = '3px';
        link.classList.add('active');
    };
};

navBarBurgerButton.addEventListener('click', toggleMenu);

function toggleMenu(buttonUserClicked) {
    if (buttonUserClicked.target.classList.contains('container-links') || buttonUserClicked.currentTarget.classList.contains('navButton')) {
        if (navBarBurgerButton.parentElement.parentElement.classList.contains('open-menu')) {
            mobileMenuBackdrop.removeEventListener('click', toggleMenu);
        } else {
            mobileMenuBackdrop.addEventListener('click', toggleMenu);
        }
        navBarBurgerButton.parentElement.parentElement.classList.toggle('open-menu');
    }
}