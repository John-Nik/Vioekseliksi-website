const questionsJSONList = new Request('/assets/js/questions.json');
const inputBox =  document.querySelector('#test');
const htmlResultsShown = document.querySelector('#searchResults');
let questionsList = [];
let value = '';
let hasTimeoutStarted = false;
grab_questions_JSON_file();
async function grab_questions_JSON_file() {
    const response = await fetch(questionsJSONList);
    const JSON_Data = await response.json();
    questionsList = JSON_Data.questions;
    checkUserInput();
}


function checkUserInput() {
    inputBox.addEventListener('input', () => {
        value = inputBox.value;
        startSearching(value);
    });

    inputBox.addEventListener('focusin', () => {
        inputBox.addEventListener('touchend', userInput)
    })

    inputBox.addEventListener('focusout', () => {
        inputBox.removeEventListener('touchend', userInput)
    })

    function userInput() {
        value = inputBox.value;
        startSearching(value);
    }
}

function startSearching (inputQuery) {
    // console.clear()
    let lastSearchResultDisplayed = htmlResultsShown.lastElementChild;
    let words = inputQuery.split(' ');
    words = words.filter((word) => word != '');
    let firstSearch = [];
    let second_search = [];
    let sortedResults = [];


    if ( inputQuery === '' ) {
        htmlResultsShown.innerHTML = '';
    }


    while (lastSearchResultDisplayed) {
        htmlResultsShown.removeChild(lastSearchResultDisplayed);
        lastSearchResultDisplayed = htmlResultsShown.lastElementChild
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
            filterResults();
        })
        
        
        function filterResults() {
            unfilteredSearch.forEach((resultFound) => {
                resultFound.forEach((result) => {
                    let processedResult = [result, 1];
                    filteredSearch.push(processedResult);
                })
            });
        }
        

        addingDuplicatesTogether(filteredSearch);
        
        function addingDuplicatesTogether(listItems) {
            let addedDuplicates = [];


            listItems.forEach((item) => {
                let itemToString = item[0].toString();
                let addedDuplicatesToString = addedDuplicates.toString();
                

                if ( addedDuplicatesToString.includes(itemToString) ) {
                    addedDuplicates.forEach((currentlyCheckedQuestion) => {
                        if ( currentlyCheckedQuestion[0].toString() == itemToString ) {
                            let indexPositionOfDuplicatedQuestion = addedDuplicates.indexOf(currentlyCheckedQuestion);
                            currentlyCheckedQuestion[1]++;
                            let newItem = [item[0], currentlyCheckedQuestion[1]];

                            addedDuplicates.splice(indexPositionOfDuplicatedQuestion, 1, newItem)
                        }
                    })
                } else {
                    addedDuplicates.push(item);
                }
            })
            
            
            firstSearch = addedDuplicates;
        }

        if (possiblyMistypedWords.length > 0) {
            autocorrect(possiblyMistypedWords);
        } else {
            rankResults();
        }
    }
    

    
    async function autocorrect(mistyped_words) {
        let mistyped_words_string = mistyped_words.toString().replace(',', ' ');
        let timeout = setTimeout(() => {}, 200);
        let response;


        clearTimeout(timeout);

        if ( hasTimeoutStarted == false ) {
            timeout = setTimeout(() => {

                if (hasTimeoutStarted == true) {
                    hasTimeoutStarted = false;
                    run();
                    async function run() {
                        response = await fetch(`/.netlify/functions/hello-world?input=${mistyped_words_string}`).then(response => response.json());
                        second_search_process(response);
                    }
                }
                
            }, 200);
        }
        
        hasTimeoutStarted = true;
    }


    
    function second_search_process(autocorrected_words) {
        let unfilteredSearch = [];

        for (let i = 0; i < autocorrected_words.length; i++) {
            let resultFound = questionsList.filter((question) => question.includes(autocorrected_words[i]));
            unfilteredSearch.push(resultFound);
        }

        second_search = unfilteredSearch.map((result) => {
            let processedResult = [result, 1];
            return processedResult;
        })

        rankResults();
    }


    function rankResults() {
        let allResultsUnfiltered = firstSearch.concat(second_search);
        let allResultsFiltered = [];

        addingDuplicatesTogether(allResultsUnfiltered);

        function addingDuplicatesTogether(listItems) {
            let addedDuplicates = [];

            listItems.forEach((item) => {
                let itemToString = item[0].toString();
                let addedDuplicatesToString = addedDuplicates.toString();
                
                if ( addedDuplicatesToString.includes(itemToString) ) {
                    addedDuplicates.forEach((question) => {
                        
                        if ( question[0].toString() == itemToString ) {
                            let indexPositionOfDuplicatedQuestion = addedDuplicates.indexOf(question);
                            question[1]++;
                            let newItem = [item[0], question[1]];

                            addedDuplicates.splice(indexPositionOfDuplicatedQuestion, 1, newItem)
                        }
                    })
                } else {
                    addedDuplicates.push(item);
                }
            })
            
            
            allResultsFiltered = addedDuplicates;
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
            if ( htmlResultsShown.childElementCount != 5 ) {
                let questionID = question[0].replaceAll(' ', '-')
                htmlResultsShown.innerHTML += `<li onclick="window.location.hash = '#${questionID}'">${question[0]}</li>`
            }
        })
    }
}