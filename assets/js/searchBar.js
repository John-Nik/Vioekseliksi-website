const questionsJSONList = new Request('/assets/js/questions.json');
const inputBox =  document.querySelector('#test');
const htmlResultsShown = document.querySelector('#searchResults');
let questionsList = [];
let userQuery = '';
let hasTimeoutStarted = false;
grab_questions_JSON_file();
async function grab_questions_JSON_file() {
    const response = await fetch(questionsJSONList);
    const JSON_Data = await response.json();
    questionsList = JSON_Data.questions;
    checkUserInput();
}


function checkUserInput() {
    inputBox.addEventListener('input', query);

    inputBox.addEventListener('touchstart', () => {
        inputBox.removeEventListener('input', query);
        inputBox.addEventListener('keyup', query);
    })

    function query() {
        userQuery = inputBox.value;
        startSearching(userQuery);
    }
}

function startSearching (inputQuery) {
    let resultDisplayed = htmlResultsShown.lastElementChild;
    let words = inputQuery.split(' ');
    words = words.filter((word) => word != '');
    let firstSearch = [];
    let second_search = [];
    let sortedResults = [];
    let doneTypingInterval = 2000;
    let typingTimer;
    let isUserTyping = true;

    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {isUserTyping = false}, doneTypingInterval);


    if ( inputQuery === '' ) {
        htmlResultsShown.innerHTML = '';
    }


    while (resultDisplayed) {
        htmlResultsShown.removeChild(resultDisplayed);
        resultDisplayed = htmlResultsShown.lastElementChild
    }


    first_search();
    
    function first_search() {
        let searchResults = [];
        let rankedResults = [];
        let possiblyMistypedWords = [];


        words.forEach((word) => {
            let resultFound = [];

            questionsList.forEach((question) => {
                let questionString = question.toString();

                if ( questionString.includes(word) || questionString.toLowerCase().includes(word) || questionString.toUpperCase().includes(word) ) {
                    resultFound.push(question);
                } else {
                    possiblyMistypedWords.push(word)
                }
            })

            searchResults.push(resultFound);
            filterResults();
        })
        
        
        function filterResults() {
            searchResults.forEach((resultFound) => {
                resultFound.forEach((result) => {
                    let processedResult = [result, 1];
                    rankedResults.push(processedResult);
                })
            });
        }

        addingDuplicatesTogether(rankedResults);
        
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
        let response = {};
        let checkUserTyping;

        clearTimeout(checkUserTyping);
        checkUserTyping = setTimeout(() => {
            if (isUserTyping == false) {
                asyncFetch();
                async function asyncFetch() {
                    response = await fetch(`/.netlify/functions/hello-world?input=${mistyped_words_string}`).then(response => response.json());
                    second_search_process(response);
                }
            }
        }, doneTypingInterval + 5) 
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

        function sortResults(array, arrayLength) {
            let temp;
            let swapped;

            for (let i = 0; i < arrayLength - 1; i++) {
                swapped = false;
                for (let j = 0; j < arrayLength - i - 1; j++) {
                    if (array[j][1] > array[j + 1][1]) {
                        temp = array[j];
                        array[j] = array[j + 1];
                        array[j + 1] = temp;
                        swapped = true;
                    }
                }

                if (swapped == false)
                break;
            }

            sortedResults = array.reverse();
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