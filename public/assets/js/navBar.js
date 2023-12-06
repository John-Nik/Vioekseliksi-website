const navBarBurgerButton =  document.querySelector('.navButton');
const mobileMenuBackdrop = document.querySelector('.container-links');
const htmlBody = document.querySelector('body');

navBarBurgerButton.addEventListener('click', toggleMenu);

function toggleMenu(buttonUserClicked) {
    if (buttonUserClicked.target.classList.contains('container-links') || buttonUserClicked.currentTarget.classList.contains('navButton')) {
        if (htmlBody.classList.contains('open-menu')) {
            mobileMenuBackdrop.removeEventListener('click', toggleMenu);
        } else {
            mobileMenuBackdrop.addEventListener('click', toggleMenu);
        }
        htmlBody.classList.toggle('open-menu');
    }
}

import CMS from 'decap-cms-app'
// Initialize the CMS object
CMS.init()
// Now the registry is available via the CMS object.
CMS.registerPreviewTemplate('my-template', MyTemplate)