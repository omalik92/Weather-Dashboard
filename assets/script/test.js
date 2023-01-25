function getMode(array) {
  // count amount of occurences of each number

  // create object
  const obj = {};
  // loop over array
  array.forEach((number) => {
    // for each number in array,
    // if it doesn't already exist as a key on the
    // object, create one and set its value to 1.
    if (!obj[number]) {
      obj[number] = 1;
    } else {
      // if it already exists as key on the object,
      // increment its corresponding value.
      obj[number] += 1;
    }
  });

  // return object key with highest value.
  let highestValue = 0;
  let highestValueKey = -Infinity;

  for (let key in obj) {
    const value = obj[key];
    if (value > highestValue) {
      highestValue = value;
      highestValueKey = key;
      console.log(highestValueKey);
    }
  }

  // convert key back to number
  return highestValueKey;
}

arr = ["01d", "01d", "04d", "10n", "10n"];

mode = getMode(arr);

console.log(mode);
