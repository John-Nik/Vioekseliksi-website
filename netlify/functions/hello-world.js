export const handler = async (query) => {
  const mistyped_words_string = query.queryStringParameters.input;
  const mistyped_words_array = mistyped_words_string.split(' ');
  let google_autocorrected_words = [];
  const googleCloudAPIKey = process.env.google_cloud_api_key;
  const googleSearchEngineID = process.env.google_search_engine_id;


  mistyped_words_array.forEach((word) => {
    const autocorrect = new Request(`https://www.googleapis.com/customsearch/v1?key=${googleCloudAPIKey}&cx=${googleSearchEngineID}&q=autocorrect of ${word} cyprus`)
    
    fetch(autocorrect)
    .then((resultOfGoogleAutocorrect) => {return resultOfGoogleAutocorrect.json()})
    .then((correctedWord) => {
      if ( Object.hasOwn(correctedWord, 'spelling' ) ) {
        google_autocorrected_words.push(correctedWord.spelling.correctedQuery);
      }
    })
  })


  
    

  console.log(googleCloudAPIKey)
  return {
    statusCode: 200,
    body: JSON.stringify({
      google_autocorrected_words
    })
  }
}