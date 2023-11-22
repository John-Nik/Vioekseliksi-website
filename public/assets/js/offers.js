const test = new Request('/assets/js/offers.json');

const test2 = fetch(test).then((response) => response.json());

console.log(Object.entries(test2));