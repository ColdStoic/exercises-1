// 3a Data Manipulation
var _ = require('lodash'); // Loading lodash

var array1 = [1, 2, 3, 4];
var array2 = [8, 7, 6, 5, 4, 3, 2, 1, 0];
var cars = [
  {make: 'Porsche', model: '944',  year: 1986},
  {make: 'Mini', model: 'Cooper',  year: 1975},
  {make: 'Mazda', model: 'Miata',  year: 1989}
];

// i Loaddash - last, nth, join, difference, find, sort etc. 
console.log(_.sum(array1)); // sums the array of numbers
console.log(_.last(array1)); // returns the last element in the array
console.log(_.nth(array1, [n=2])); // returns the nth item in the array
console.log(_.join(array1, '_')); // returns a string of array elements joined by a specified seperator

console.log(_.difference(array1, array2)); // returns the elements that differ from arg1 in relation to arg2
console.log(_.difference(array2, array1));

console.log(_.find(cars, {make: 'Porsche', year: 1986})); // finds element in array that matches criteria
console.log(_.sortBy(cars, ['year'])); // sorts array by specified key
console.log(_.sortBy(array2));

// ii Underscore – each, map, reduce etc
_.forEach(array2, function(value) { // print all even numbers
    if (evenNumbers(value)) {
        console.log(value);
    }
});

function evenNumbers(value) {
    if (value % 2 == 0) {
        return true;
    }
    return false
}

console.log(_.map(array1, calcFactoral)); // applies the function to each element of the array
function calcFactoral(value) {
    var result = value;
    for (i = (value - 1); i > 0; i--) {
        result = result * i;
    }
    return result;
}

console.log( // multiplies all values in array
    _.reduce(array1, function(result, value) {
        return (result * value);
    }, 1)
);