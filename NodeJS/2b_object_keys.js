// 2b Object Keys
var carObject = {
    make: 'Porsche',
    model: '944',
    year: '1986',
    mileage: '190000',
    exteriorColour: 'red',
    interiorColor: 'black'
}

// Printout of keys
console.log(Object.keys(carObject));
console.log('');

// Printout of keys that start with a vowel
Object.keys(carObject).forEach(
    element => {
        if (startsWithVowel(element)) {
            console.log(element);
        }
    }
);

function startsWithVowel(string) {
    var firstChar = string.charAt(0).toLowerCase();
    if (firstChar == 'a' || firstChar == 'e'|| firstChar == 'i' || firstChar == 'o' || firstChar == 'u') {
        return true;
    }
    return false;
}