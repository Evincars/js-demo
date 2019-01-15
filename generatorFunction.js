(function() {
  console.log(gen.next().value); // 0
  console.log(gen.next().value); // 1
  console.log(gen.next().value); // 2
  console.log(gen.next().value); // 3

  const returnedNext = gen.next() // { value: 4, done: false }
  
  // The next() method returns an object with two properties done and value. 
  // You can also provide a parameter to the next method to send a value to the generator.
});

function* gen(initialValue) {
  const index = initialValue;

  while (index < index + 1) {
    yield index++;
  }
}