// 1 Copying Arrays
var array1 = ['dog', 'cat', 'fish'];
var array2 = array1; // Direct copy
var array3 = array1.slice(); // Old way
var array4 = [...array1]; // New way?

// Printing arrays
console.log("Array 1: " + array1);
console.log("Array 2: " + array2);
console.log("Array 3: " + array3);
console.log("Array 4: " + array4);

// Altering array
console.log("Adding racoon to array 1");
array1.push('racoon');

// Printing arrays
console.log("Array 1: " + array1);
console.log("Array 2: " + array2);
console.log("Array 3: " + array3);
console.log("Array 4: " + array4);