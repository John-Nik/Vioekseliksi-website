"use strict";

const buttons = document.querySelectorAll('[data-button="button"]');
const biomarkers = document.querySelectorAll('.bio-item');

buttons.forEach((button) => {
    button.addEventListener('click', (clickedButton) => {
        let userClickedLetter = clickedButton.currentTarget.dataset.lettersort;

        biomarkers.forEach((biomarker) => {
            biomarker.style.display = "flex";
        })

        if ( userClickedLetter == 'All' ) {
            biomarkers.forEach((biomarker) => {
                biomarker.style.display = "flex";
            })
        } else {
            biomarkers.forEach((biomarker) => {
                if ( biomarker.dataset.letter != userClickedLetter ) {
                    biomarker.style.display = "none";
                }
            })
        }
    });
})