const questionsJSONList = new Request('/assets/js/questions.json');
const inputBox =  document.querySelector('#test');
const searchResultsShownInHTML = document.querySelector('#searchResults');
let questionsList = [];
let value = '';

grabQuestionsJSON();
async function grabQuestionsJSON() {
    const response = await fetch(questionsJSONList);
    const JSON_Data = await response.json();
    questionsList = JSON_Data.questions;
    checkInputValue();
}


function checkInputValue() {
    inputBox.addEventListener('input', (key) => {
        value = inputBox.value;
        searchMatchesOfInput(value);
    });
}

function searchMatchesOfInput (inputQuery) {
    console.clear()
    let searchResultsShownListings = searchResultsShownInHTML.lastElementChild;
    let words = inputQuery.split(' ');
    words = words.filter((word) => word != '');
    console.log(words)
    let firstSearch = [];
    let second_search = [];
    let sortedResults = [];

    
    if ( value === '' ) {
        searchResultsShownInHTML.innerHTML = '';
    }

    while (searchResultsShownListings) {
        searchResultsShownInHTML.removeChild(searchResultsShownListings);
        searchResultsShownListings = searchResultsShownInHTML.lastElementChild
    }

    first_search();
    
    function first_search() {
        let unfilteredSearch = [];
        let filteredSearch = [];
        let possiblyMistypedWords = [];

        words.forEach((word) => {
            let resultFound = questionsList.filter((question) => question.toString().includes(word));
            if ( !resultFound.toString().includes(word) ) {
                possiblyMistypedWords.push(word);
            }
            unfilteredSearch.push(resultFound);
        })
        

        unfilteredSearch.forEach((resultFound) => {
            resultFound.forEach((result) => {
                let processedResult = [result, 1];
                filteredSearch.push(processedResult);
            })
        });
        
        toFindDuplicates(filteredSearch);
        
        function toFindDuplicates(arry) {
            let filteredArray = [];

            arry.forEach((item) => {
                let itemString = item[0].toString();
                let filteredArrayString = filteredArray.toString();
                
                if ( filteredArrayString.includes(itemString) ) {
                    filteredArray.forEach((question) => {
                        
                        if ( question[0].toString() == itemString ) {
                            let position = filteredArray.indexOf(question);
                            question[1]++;
                            let newItem = [item[0], question[1]];

                            filteredArray.splice(position, 1, newItem)
                        }
                    })
                } else {
                    filteredArray.push(item);
                }
            })
            
            
            firstSearch = filteredArray;
        }

        if (possiblyMistypedWords.length > 0) {
            // possibly_mistyped_words(possiblyMistypedWords);
        } else {
            rankResults();
        }
    }
    
    


    function possibly_mistyped_words(mistyped_words) {
        let google_autocorrected_words = [];

        mistyped_words.forEach((word) => {
            const autocorrect = new Request(`https://www.googleapis.com/customsearch/v1?key=AIzaSyDnrmfKehW6KJL4xqC2mHDiaZm3gocAmAI&cx=843e64b6a2ef24323&q=autocorrect of ${word} cyprus`)

            fetch(autocorrect)
            .then((result) => {return result.json()})
            .then((print) => {
                if ( Object.hasOwn(print, 'spelling' ) ) {
                    google_autocorrected_words.push(print.spelling.correctedQuery);
                }
            })
        })

        second_search_process(google_autocorrected_words);
    }


    
    function second_search_process(autocorrected_words) {
        let unfilteredSearch = [];

        autocorrected_words.forEach((word) => {
            let resultFound = questionsList.filter((question) => question.includes(word));
            unfilteredSearch.push(resultFound);
        })

        second_search = unfilteredSearch.map((result) => {
            let processedResult = [result, 1];
            return processedResult;
        })

        rankResults();
    }


    function rankResults() {
        let allResultsUnfiltered = firstSearch.concat(second_search);
        let allResultsFiltered = [];

        toFindDuplicates(allResultsUnfiltered);

        function toFindDuplicates(arry) {
            let filteredArray = [];

            arry.forEach((item) => {
                let itemString = item[0].toString();
                let filteredArrayString = filteredArray.toString();
                
                if ( filteredArrayString.includes(itemString) ) {
                    filteredArray.forEach((question) => {
                        
                        if ( question[0].toString() == itemString ) {
                            let position = filteredArray.indexOf(question);
                            question[1]++;
                            let newItem = [item[0], question[1]];

                            filteredArray.splice(position, 1, newItem)
                        }
                    })
                } else {
                    filteredArray.push(item);
                }
            })
            
            
            allResultsFiltered = filteredArray;
            sortResults(allResultsFiltered, allResultsFiltered.length);
        }
 
        function sortResults(arr, n) {
            var i, j, temp;
            var swapped;
            for (i = 0; i < n - 1; i++) {
                swapped = false;
                for (j = 0; j < n - i - 1; j++) {
                    if (arr[j][1] > arr[j + 1][1]) {
                        temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                        swapped = true;
                    }
                }
        

                if (swapped == false)
                break;
            }

            sortedResults = arr.reverse();
            populateList();
        }
    }

    function populateList() {
        sortedResults.forEach((question) => {
            if ( searchResultsShownInHTML.childElementCount != 5 ) {
                searchResultsShownInHTML.innerHTML += `<li>${question[0]}</li>`
            }
        })
    }


    





    









    // questionsList.forEach((questionScanned) => {
    //     if ( questionScanned.includes(inputQuery) ) {
    //         if ( searchResultsShownInHTML.childElementCount != 5 ) {
    //             searchResultsShownInHTML.innerHTML += `<li>${questionScanned}</li>`
    //         }
    //     }
    // }
}





