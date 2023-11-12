const links = document.querySelectorAll('#wrapper .link');
const navButton =  document.querySelector('.navButton');
const mobileMenuBackdrop = document.querySelector('.container-links')

links.forEach(underline, window.location.pathname);

function underline(link) {
    if (link.children[0].dataset.link.includes(this)) {

        link.children[0].style.textDecoration = 'underline';
        link.children[0].style.textDecorationColor = 'var(--primary-blue-color)';
        link.children[0].style.textDecorationThickness = '3px';
        link.classList.add('active');
    };
};

navButton.addEventListener('click', toggleMenu);

function toggleMenu(btn) {
    if (btn.target.classList.contains('container-links') || btn.currentTarget.classList.contains('navButton')) {
        if (navButton.parentElement.parentElement.classList.contains('open-menu')) {
            mobileMenuBackdrop.removeEventListener('click', toggleMenu);
        } else {
            mobileMenuBackdrop.addEventListener('click', toggleMenu);
        }
    navButton.parentElement.parentElement.classList.toggle('open-menu');
    }
}