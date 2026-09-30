// function to handle 'name' input box
const handleNameClick = (event) => {
    event.preventDefault();
    const input = document.getElementById("name");
    const data = "Abhishek";
    input.value = data;
};
// function to handle 'email' input box
const handleEmailClick = (event) => {
    event.preventDefault();
    const input = document.getElementById("email");
    const data = "abhishek.yadav@happiestminds.com";
    input.value = data;
};
// function to handle 'message' input box
const handleMessageClick = (event) => {
    event.preventDefault();
    const input = document.getElementById("message");
    const data = "You are awesome 😍";
    input.value = data;
};
// function to handle 'submit' inputField
const handleSubmit = (event) => {
    event.preventDefault();
    alert("Form submitted, THANK YOU 😍😍");
    document.getElementById("basicForm").reset();
};
// toggleMode is used to toggle Dark Mode
const toggleMode = () => {
    document.body.style.backgroundColor = "rgb(16, 33, 48)";
    document.body.style.color = "white";
    const elements = document.querySelectorAll(".inputField");
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.backgroundColor = "black";
        elements[i].style.color = "white";
    }
    document.getElementById("mode").innerHTML = "Dark mode on";
};
// goToPage is used to go to provided URL page
function goToPage(pageURL) {
    window.location.href = pageURL;
}
// Functions used in Exception Handling webpage
// divide is used to divide the dividend by divisor
function divide() {
    var dividend = parseFloat(document.getElementById("dividend").value);
    var divisor = parseFloat(document.getElementById("divisor").value);
    try {
        if (isNaN(dividend) || isNaN(divisor)) {
            throw new Error("Please enter valid numeric values.");
        }
        if (divisor === 0) {
            throw new Error("Division by zero is not allowed.");
        }
        var result = dividend / divisor;
        document.getElementById("result").innerHTML = "Result: " + result;
    } 
    catch (error) {
        document.getElementById("result").innerHTML = "An error occurred: " + error.message;
    }
}


