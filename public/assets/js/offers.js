const offersLayers = document.querySelectorAll('.layer');
const offersLayer1 = document.querySelector('.layer1');
const offersLayer2 = document.querySelector('.layer2');
const offersWrappingContainer = document.querySelector('.offers-wrapper');
const offerDesc = document.querySelector('#offers .description');


const test = new Request('/assets/js/offers.json');

logMovies()
async function logMovies() {
    const response = await fetch(test);
    const jsonData = await response.json();
    const numberOfOffers = jsonData.offersList.length;


    if (numberOfOffers == 1) {
        offersWrappingContainer.style.opacity = '0';
    }
    if (numberOfOffers == 2 || numberOfOffers == 3) {
        offersLayers.forEach((layer) => {
            layer.style.gap = '24px';
        })
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
        let lastOfferListingDataCycleForLayer1 = imagesLayer1[lastOfferListing].dataset.cycle;
        let lastOfferListingDataCycleForLayer2 = imagesLayer2[lastOfferListing].dataset.cycle;
        

        highlightedImageForLayer1.src = imagesLayer1[lastOfferListing].src;
        highlightedImageForLayer2.src = imagesLayer2[lastOfferListing].src;


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
        offerDesc.textContent = jsonData.offersList[layer1LastOfferElement.dataset.cycle].description;


        function addOffersInteractivity(buttonClicked) {
            buttonClicked.addEventListener('click', layerImageCarouselAndLayerSwitchingStops);
            buttonClicked.addEventListener('click', (userInteractedWithThis) => {
                
                let cycleNumberOnClickedButton = parseInt(userInteractedWithThis.currentTarget.dataset.cycle);
                let layerClicked = userInteractedWithThis.currentTarget.parentElement;
                let childrenListOfClickedLayerParentElement = layerClicked.parentElement.children
                let childrenListOfClickedLayerParentElementUnfiltered = Object.entries(childrenListOfClickedLayerParentElement);
                let filteredChildrenListOfClickedLayerParentElement = childrenListOfClickedLayerParentElementUnfiltered.map((array) => {
                    return array.slice(1);
                });
                let usableArrayOfChildrenListForClickedLayersParentElement = filteredChildrenListOfClickedLayerParentElement.map((array) => {
                    return array[0];
                });
                let siblingOfLayerClicked = usableArrayOfChildrenListForClickedLayersParentElement.filter((layerChecked) => layerChecked != layerClicked)
                let finalOfferVisibleOfLayersClickedSibling = Object.values(siblingOfLayerClicked[0].children).pop();


                finalOfferVisibleOfLayersClickedSibling.dataset.cycle = cycleNumberOnClickedButton;
                finalOfferVisibleOfLayersClickedSibling.src = jsonData.offersList[cycleNumberOnClickedButton].image


                let layersClickedChildrenExceptLastOne;
                getSiblingsOfClickedOffer(finalOfferVisibleOfLayersClickedSibling)

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
                    layersClickedChildrenExceptLastOne.forEach((sibling) => {
                        let elementID = parseInt(sibling.dataset.id);
                        let distance = totalVisibleOffers.length / 2 - elementID;
                        let calculatedCycleForSibling = cycleNumberOnClickedButton + distance;
    
                        if (calculatedCycleForSibling >= numberOfOffers) {
                            calculatedCycleForSibling = calculatedCycleForSibling - numberOfOffers;
                        }
    
                        sibling.dataset.cycle = calculatedCycleForSibling;
    
                        sibling.src = jsonData.offersList[calculatedCycleForSibling].image;
                    })
                    setTimeout(() => {
                        if (siblingOfLayerClicked[0].classList.contains('visible')) {
                            changeClickedLayerChildren();
                        }
                    }, 500)
                }
                
                function changeClickedLayerChildren() {
                    let layerClickedChildren = layerClicked.children
                    let layerClickedChildrenUnfiltered = Object.entries(layerClickedChildren);
                    let filteredLayerClickedChildren = layerClickedChildrenUnfiltered.map((array) => {
                        return array.slice(1);
                    });
                    let usableArrayOfLayerClickedChildren = filteredLayerClickedChildren.map((array) => {
                        return array[0];
                    });

                    console.log(usableArrayOfLayerClickedChildren)

                    usableArrayOfLayerClickedChildren.forEach((child) => {
                        let elementID = parseInt(child.dataset.id);
                        let distance = totalVisibleOffers.length / 2 - elementID;
                        let calculatedCycleForSibling = cycleNumberOnClickedButton + distance + 1;
    
                        if (calculatedCycleForSibling >= numberOfOffers) {
                            calculatedCycleForSibling = calculatedCycleForSibling - numberOfOffers;
                        }
    
                        child.dataset.cycle = calculatedCycleForSibling;
    
                        child.src = jsonData.offersList[calculatedCycleForSibling].image;
                    })
                    highlightedImageForLayer1.src = imagesLayer1[lastOfferListing].src;
                    highlightedImageForLayer2.src = imagesLayer2[lastOfferListing].src;
                }
                
                
                highlightedImageForLayer1.src = imagesLayer1[lastOfferListing].src;
                highlightedImageForLayer2.src = imagesLayer2[lastOfferListing].src;
                offersLayers.forEach((layer) => {
                    layer.classList.toggle('visible')
                })
                highlightedImages.forEach((layer) => {
                    layer.classList.toggle('visible');
                })

                

                restartCarousel(layerClicked);
                })
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

        


        function layerImageCarouselAndLayerSwitchingStops() {

            clearInterval(layer1ImageCarouselInterval);
            clearInterval(layer2ImageCarouselInterval);
            clearInterval(intervalLayer);
        }

        

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

            imagesLayer1.forEach((blabla) => {
                executionCycle = blabla.dataset.cycle;
                executionCycle = executionCycle - 2;
                if (executionCycle < 0) {
                    executionCycle = executionCycle + numberOfOffers;
                }
                blabla.dataset.cycle = executionCycle;
                blabla.src = jsonData.offersList[executionCycle].image;
            })
            highlightedImageForLayer1.src = imagesLayer1[lastOfferListing].src
        }

        function layer2ImageChange() {

            imagesLayer2.forEach((blabla) => {
                executionCycle = blabla.dataset.cycle;
                executionCycle = executionCycle - 2;
                if (executionCycle < 0) {
                    executionCycle = executionCycle + numberOfOffers;
                }
                blabla.dataset.cycle = executionCycle;
                blabla.src = jsonData.offersList[executionCycle].image;
                
            })
            highlightedImageForLayer2.src = imagesLayer2[lastOfferListing].src
        }
    }
}