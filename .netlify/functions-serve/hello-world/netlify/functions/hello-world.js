var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// netlify/functions/hello-world.js
var hello_world_exports = {};
__export(hello_world_exports, {
  handler: () => handler
});
module.exports = __toCommonJS(hello_world_exports);
var handler = async (query) => {
  const mistyped_words_string = query.queryStringParameters.input;
  const mistyped_words_array = mistyped_words_string.split(" ");
  let google_autocorrected_words = [];
  const googleCloudAPIKey = process.env.google_cloud_api_key;
  const googleSearchEngineID = process.env.google_search_engine_id;
  mistyped_words_array.forEach((word) => {
    const autocorrect = new Request(`https://www.googleapis.com/customsearch/v1?key=${googleCloudAPIKey}&cx=${googleSearchEngineID}&q=autocorrect of ${word} cyprus`);
    fetch(autocorrect).then((resultOfGoogleAutocorrect) => {
      return resultOfGoogleAutocorrect.json();
    }).then((correctedWord) => {
      if (Object.hasOwn(correctedWord, "spelling")) {
        google_autocorrected_words.push(correctedWord.spelling.correctedQuery);
      }
    });
  });
  console.log(googleCloudAPIKey);
  return {
    statusCode: 200,
    body: JSON.stringify({
      google_autocorrected_words
    })
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
//# sourceMappingURL=hello-world.js.map
