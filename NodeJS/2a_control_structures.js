// 2a Control Structures
var array = ['dog', 'cat', 'fish'];

// For loop
console.log("List of all pets owned: ");
for (i = 0; i < array.length; i++) {
    console.log((i+1) + '.' + array[i]);
}
console.log('');

// If else
console.log("Was your second pet a dog?");
if (array[1] == 'dog') {
    console.log("Your second pet was a dog");
} else {
    console.log("Your second pet was not a dog");
}
console.log('');

// For Each
console.log("List of all pets strings in reverse: ");
array.forEach(
    element => (
        console.log((i+1) + '.' + element.split('').reverse().join('') )
    )
);
