const offersLayers = document.querySelectorAll('.layer');
const offersLayer1 = document.querySelector('.layer1');
const offersLayer2 = document.querySelector('.layer2');
const offersWrappingContainer = document.querySelector('.offers-wrapper');
const offerDesc = document.querySelector('#offers .description');
const offersSectionBlock = document.querySelector('#offers');


const test = new Request('/assets/js/offers.json');

logMovies()
async function logMovies() {

    const response = await fetch(test);
    const jsonData = await response.json();
    const numberOfOffers = jsonData.offersList.length;

    switch (numberOfOffers) {
        case 0:
            offersSectionBlock.style.display = 'none';
            break;
        case 1:
            offersWrappingContainer.style.opacity = '0';
            break;
        case 2:
            offersLayers.forEach((layer) => {
                layer.style.gap = '24px';
            });
            break;
        case 3:
            offersLayers.forEach((layer) => {
                layer.style.gap = '24px';
            });
            break;
    }

    initialPopulationOfImages();    
    function initialPopulationOfImages() {
        for (let i = 0; i < numberOfOffers; i++) {

            let numberOfCycles = i+1;
            let layer1Cycle = numberOfOffers - 1 - i;
            let layer2Cycle = numberOfOffers - i;


            if (layer2Cycle >= numberOfOffers) {
                layer2Cycle = layer2Cycle - numberOfOffers;
            }

            offersLayer1.innerHTML += `<img class="img${numberOfCycles} offerimg image" data-cycle="${layer1Cycle}" data-ID="${numberOfCycles}" src="${jsonData.offersList[layer1Cycle].image}" alt="">`;
            offersLayer2.innerHTML += `<img class="img${numberOfCycles} offerimgtwo image" data-cycle="${layer2Cycle}" data-ID="${numberOfCycles}" src="${jsonData.offersList[layer2Cycle].image}" alt="">`;

            if (i == 3 || i == numberOfOffers - 1) {
                return offersCarousel();
            }
        }
    }


    function offersCarousel() {

        const totalVisibleOffers = document.querySelectorAll('.image');
        const imagesLayer1 = document.querySelectorAll('.offerimg');
        const imagesLayer2 = document.querySelectorAll('.offerimgtwo');
        const highlightedImages = document.querySelectorAll('.offer-highlighted .img');
        const highlightedImageForLayer1 = document.querySelector('.offer-highlighted .img1');
        const highlightedImageForLayer2 = document.querySelector('.offer-highlighted .img2');
        const offersVisiblePerLayer = totalVisibleOffers.length / 2;
        const lastOfferListing = offersVisiblePerLayer - 1;
        let layer1LastOfferElement = document.querySelector('.offerimg:last-child');
        let layer2LastOfferElement = document.querySelector('.offerimgtwo:last-child')
        

        highlightedImageForLayer1.src = imagesLayer1[lastOfferListing].src;
        highlightedImageForLayer2.src = imagesLayer2[lastOfferListing].src;


        offerDesc.textContent = jsonData.offersList[layer1LastOfferElement.dataset.cycle].description;

        let layer2ImageCarouselInterval = setTimeout(() => {

            layer2ImageChange();
            layer2ImageCarouselInterval = setInterval(layer2ImageChange, 20000);
        }, 22000);
        let layer1ImageCarouselInterval = setTimeout(() => {

            layer1ImageChange();
            layer1ImageCarouselInterval = setInterval(layer1ImageChange, 20000);
        }, 12000);
        let intervalLayer = setInterval(offersFadeInOutEffect, 10000);


        totalVisibleOffers.forEach(addOffersInteractivity);


        function offersFadeInOutEffect() {

            offersLayers.forEach((layer) => {
                layer.classList.toggle('visible');
            })
            highlightedImages.forEach((layer) => {
                layer.classList.toggle('visible');
            })
            changeText();
        }


        function layer1ImageChange() {

            imagesLayer1.forEach(changeOfferDataCycleAndImageSrc);
            highlightedImageForLayer1.src = imagesLayer1[lastOfferListing].src
        }

        function layer2ImageChange() {

            imagesLayer2.forEach(changeOfferDataCycleAndImageSrc);
            highlightedImageForLayer2.src = imagesLayer2[lastOfferListing].src
        }


        function changeOfferDataCycleAndImageSrc(offerChecked) {

            executionCycle = offerChecked.dataset.cycle;
            executionCycle = executionCycle - 2;

            if (executionCycle < 0) {
                executionCycle = executionCycle + numberOfOffers;
            }

            offerChecked.dataset.cycle = executionCycle;
            offerChecked.src = jsonData.offersList[executionCycle].image;
        }

        
        function changeText() {
            offerDesc.classList.add('fade');

            if (offersLayer1.classList.contains('visible')) {

                setTimeout(() => { 
                    offerDesc.textContent = jsonData.offersList[layer1LastOfferElement.dataset.cycle].description; 
                    offerDesc.classList.remove('fade');
                }, 175)
            } else {

                setTimeout(() => { 
                    offerDesc.textContent = jsonData.offersList[layer2LastOfferElement.dataset.cycle].description; 
                    offerDesc.classList.remove('fade');
                }, 175)
            }
        }

        
        function layerImageCarouselAndLayerSwitchingStops() {

            clearInterval(layer1ImageCarouselInterval);
            clearInterval(layer2ImageCarouselInterval);
            clearInterval(intervalLayer);
        }

        function restartCarousel(layerClicked) {

            if (layerClicked.classList.contains('layer1')) {

                layer2ImageCarouselInterval = setTimeout(() => {
                    console.log('layer2 switch has been executed');
                    layer2ImageChange();
                    layer2ImageCarouselInterval = setInterval(layer2ImageChange, 20000);
                }, 12000);
                layer1ImageCarouselInterval = setTimeout(() => {
                    console.log('layer1 switch has been executed');
                    layer1ImageChange();
                    layer1ImageCarouselInterval = setInterval(layer1ImageChange, 20000);
                }, 22000); 
            } else {

                layer1ImageCarouselInterval = setTimeout(() => {
                    console.log('layer1 switch has been executed');
                    layer1ImageChange();
                    layer1ImageCarouselInterval = setInterval(layer1ImageChange, 20000);
                }, 12000);
                layer2ImageCarouselInterval = setTimeout(() => {
                    console.log('layer2 switch has been executed');
                    layer2ImageChange();
                    layer2ImageCarouselInterval = setInterval(layer2ImageChange, 20000);
                }, 22000);
            }
            

            changeText();
            intervalLayer = setInterval(offersFadeInOutEffect, 10000);
        }

        

        

        function addOffersInteractivity(buttonClicked) {
            buttonClicked.addEventListener('click', layerImageCarouselAndLayerSwitchingStops);
            buttonClicked.addEventListener('click', (userInteractedWithThis) => {
                
                let cycleNumberOnClickedButton = parseInt(userInteractedWithThis.currentTarget.dataset.cycle);
                let layerClicked = userInteractedWithThis.currentTarget.parentElement;
                let childrenListOfClickedLayerParentElementUnfiltered = layerClicked.parentElement.children
                let childrenListOfClickedLayerParentElement = filterFromHTMLCollectionToNodeList(childrenListOfClickedLayerParentElementUnfiltered);
                let siblingOfLayerClicked = childrenListOfClickedLayerParentElement.filter((layerChecked) => layerChecked != layerClicked);
                let finalOfferVisibleOfLayersClickedSibling = Object.values(siblingOfLayerClicked[0].children).pop();


                finalOfferVisibleOfLayersClickedSibling.dataset.cycle = cycleNumberOnClickedButton;
                finalOfferVisibleOfLayersClickedSibling.src = jsonData.offersList[cycleNumberOnClickedButton].image;

                
                let layersClickedChildrenExceptLastOne;

                getSiblingsOfClickedOffer(finalOfferVisibleOfLayersClickedSibling);


                function getSiblingsOfClickedOffer(elem) {

                    let siblings = [];
                    let sibling = elem.parentNode.firstChild;

                    while (sibling) {
                        if (sibling.nodeType === 1 && sibling !== elem) {
                            siblings.push(sibling);
                        }
                        sibling = sibling.nextSibling
                    }
                
                    layersClickedChildrenExceptLastOne = siblings;

                    changeClickedLayersSiblingChildren();
                };


                function changeClickedLayersSiblingChildren() {

                    layersClickedChildrenExceptLastOne.forEach(changeElementDataCycleAndImageSrc, 0)

                    setTimeout(() => {
                        if (siblingOfLayerClicked[0].classList.contains('visible')) {
                            changeClickedLayerChildren();
                        }
                    }, 500)
                }


                function changeClickedLayerChildren() {

                    let layerClickedChildrenUnfiltered = layerClicked.children
                    let layerClickedChildren = filterFromHTMLCollectionToNodeList(layerClickedChildrenUnfiltered);

                    layerClickedChildren.forEach(changeElementDataCycleAndImageSrc, 1)
                    
                    highlightedImageForLayer1.src = imagesLayer1[lastOfferListing].src;
                    highlightedImageForLayer2.src = imagesLayer2[lastOfferListing].src;
                }


                function changeElementDataCycleAndImageSrc(elementChecked) {
                    let distanceOffset = this;
                    let elementID = parseInt(elementChecked.dataset.id);
                    let distance = totalVisibleOffers.length / 2 - elementID;
                    let calculatedCycleForSibling = cycleNumberOnClickedButton + distance + distanceOffset;
                    

                    if (calculatedCycleForSibling >= numberOfOffers) {
                        calculatedCycleForSibling = calculatedCycleForSibling - numberOfOffers;
                    }
                    
                    elementChecked.dataset.cycle = calculatedCycleForSibling;
                    elementChecked.src = jsonData.offersList[calculatedCycleForSibling].image;
                }


                function filterFromHTMLCollectionToNodeList(elementToFiler) {
                    let elementUnfiltered = Object.entries(elementToFiler);
                    let elementFiltered = elementUnfiltered.map((array) => {
                        return array.slice(1);
                    });
                    let elementNodeList = elementFiltered.map((array) => {
                        return array[0];
                    });

                    return elementNodeList;
                }
                

                highlightedImageForLayer1.src = imagesLayer1[lastOfferListing].src;
                highlightedImageForLayer2.src = imagesLayer2[lastOfferListing].src;


                offersFadeInOutEffect();
                restartCarousel(layerClicked);
                })
            } 
    }
}