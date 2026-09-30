//----------------Functions used in Asynchronous webpage----------------
// returns a Promise that represents the asynchronous operation
async function simulateAsyncOperation() {
  return new Promise((resolve, reject) => {
    // Inside the setTimeout() function, a delay of 2000 milliseconds
    // (2 seconds) is set to simulate an asynchronous operation.
    setTimeout(() => {
      // Simulating an exception during the asynchronous operation
      try {
        // Generate a random number between 0 and 1
        const randomNumber = Math.random();
        console.log(randomNumber);
        if (randomNumber < 0.5) {
          throw new Error(
            "An error occurred during the asynchronous operation.",
          );
        }
        // If no error occurs, the resolve() function is called
        // with the success message.
        resolve("Asynchronous operation completed successfully.");
      } catch (error) {
        // If an error occurs, the reject() function is called
        // with the error object.
        reject(error);
      }
    }, 2000);
  });
}
async function performAsyncOperation() {
  try {
    // await keyword is used to pause the code execution until
    // the simulateAsyncOperation() function completes.
    const result = await simulateAsyncOperation();
    // The resolved value from simulateAsyncOperation()
    // is assigned to the result variable.
    console.log(result);
    document.getElementById("output").innerHTML = result;
  } catch (error) {
    console.error("An error occurred:", error);
    document.getElementById("output").innerHTML =
      "An error occurred: " + error.message;
  } finally {
    console.log("Async operation completed.");
  }
}
