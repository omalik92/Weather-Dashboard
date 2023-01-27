function average(arr) {
  var sum = 0;
  for (var i = 0; i < arr.length; i++) {
    sum += parseInt(arr[i], 10); //don't forget to add the base
  }

  var avg = sum / arr.length;
  return avg;
}

arr = [5, 6, 7, 8];

console.log(average(arr));
