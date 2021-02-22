// =================================== //
// ============ VARIABLES ============ //
// =================================== //

const container = document.querySelector(".container");
const mainBox = document.querySelector(".main-box");
const createCardButton = document.querySelector("#create-credit-card");
const goBackButton = document.querySelector("#go-back");
const finalCreditCard = document.querySelector("#final-credit-card");
const socialButtons = document.querySelector("#social-buttons");

const cardName = document.querySelector("#card-name");
const cardNumber = document.querySelector("#card-number");
const cardExpiry = document.querySelector("#card-expiry");
const cardCVC = document.querySelector("#card-cvc");

const iconOK = document.querySelectorAll(".fa-check-circle");
const iconWRONG = document.querySelectorAll(".fa-times-circle");

const MIN_NAME_LENGTH = 3;

const MIN_TOTAL_CARD_NUMS = 16;

const MIN_TOTAL_EXPIRY_NUMS = 5;

const MAX_CVC_NUMS = 3;

const finalCardNumbers = document.querySelector("#final-card-numbers");
const finalCardExpiry = document.querySelector("#final-card-expiry");
const finalCardName = document.querySelector("#final-card-name");

// =================================== //
// ============ FUNCTIONS ============ //
// =================================== //

// This function verifies the user's card name input
const verifyCardName = () => {

    let nameWritten = cardName.value;
    let nameLength = nameWritten.length;

    if (nameLength === 0) {
        changeIconOpacity(0, false, false);
        return;
    }
    
    let invalidNameLength = (nameLength < MIN_NAME_LENGTH);

    changeIconOpacity(0, !invalidNameLength, invalidNameLength);
};

// This function verifies the user's card number input
// The card number format will be like xxxx-xxxx-xxxx-xxxx
const verifyCardNumber = () => {

    let numWritten = cardNumber.value;
    let numLength = numWritten.length;

    if (numLength === 0) {
        changeIconOpacity(1, false, false);
        return;
    }
    else if (isNaN(numWritten[numLength - 1])) {
        cardNumber.value = numWritten.slice(0, -1);
        return;
    }

    let cardNumberSections = numWritten.match(/\d{1,4}/g);

    if (cardNumberSections !== null) {
        numWritten = cardNumberSections.join('-');
    }

    cardNumber.value = numWritten;

    let invalidNumLength = numLength < MIN_TOTAL_CARD_NUMS;
    
    changeIconOpacity(1, !invalidNumLength, invalidNumLength);
};

// This function verifies the user's expiry date input
// The expiry date format will be like xx/xx
const verifyCardExpiry = () => {

    let numWritten = cardExpiry.value;
    let numLength = numWritten.length;

    if (numLength === 0) {
        changeIconOpacity(2, false, false);
        return;
    }
    else if (isNaN(numWritten[numLength - 1])) {
        cardExpiry.value = numWritten.slice(0, -1);
        return;
    }

    let cardExpirySections = numWritten.match(/\d{1,2}/g);

    if (cardExpirySections !== null) {
        numWritten = cardExpirySections.join('/');
    }

    cardExpiry.value = numWritten;

    let invalidNumLength = numLength < MIN_TOTAL_EXPIRY_NUMS;
        
    changeIconOpacity(2, !invalidNumLength, invalidNumLength);
};

// This function verifies the user's CVC number input
const verifyCVCNumber = () => {

    let numWritten = cardCVC.value;
    let numLength = numWritten.length;

    if (numLength === 0) {
        changeIconOpacity(3, false, false);
        return;
    }
    else if (isNaN(numWritten[numLength - 1])) {
        cardCVC.value = numWritten.slice(0, -1);
        return;
    }

    let invalidNumLength = numLength < MAX_CVC_NUMS;
        
    changeIconOpacity(3, !invalidNumLength, invalidNumLength);
};

// This function changes the opacity of the "ok" and "wrong" icons
const changeIconOpacity = (iconNumber, opacityOK, opacityWRONG) => {

    // Setting the respective icon opacity
    iconOK[iconNumber].style.opacity = opacityOK ? 1 : 0;
    iconWRONG[iconNumber].style.opacity = opacityWRONG ? 1 : 0;
}

// This function resets the user inputs from the creating card section
const resetCreditCardInputs = () => {

    cardName.value = "";
    cardNumber.value = "";
    cardExpiry.value = "";
    cardCVC.value = "";
};

const createCreditCard = () => {

    // Passing the card values to show them
    finalCardNumbers.textContent = cardNumber.value.replaceAll("-", " ");
    finalCardExpiry.textContent = "Expiry: " + cardExpiry.value;
    finalCardName.textContent = cardName.value;

    // Hidding the main inputs, labels and social buttons
    mainBox.style.display = "none";
    createCardButton.style.display = "none";
    socialButtons.style.display = "none";

    // Displaying the final credit card box with all the values
    finalCreditCard.style.display = "grid";
    goBackButton.style.display = "block";
};

const goBack = () => {

    // Hidding the wrong/ok input icons
    for (let i = 0; i < 4; i++) {
        changeIconOpacity(i, 0, 0);
    }

    // Resetting the inputs
    resetCreditCardInputs();

    // Hidding the final credit card box
    finalCreditCard.style.display = "none";
    goBackButton.style.display = "none";

    // Displaying the inputs, labels and social buttons
    mainBox.style.display = "block";
    createCardButton.style.display = "block";
    socialButtons.style.display = "flex";
}

// ================================ //
// ============ EVENTS ============ //
// ================================ //

window.onload = function() {
    
    // Cardholder name event verifier
    cardName.addEventListener("input", verifyCardName);

    // Card number event verifier
    cardNumber.addEventListener("input", verifyCardNumber);

    // Card expiry event verifier
    cardExpiry.addEventListener("input", verifyCardExpiry);    

    // Card cvc event verifier
    cardCVC.addEventListener("input", verifyCVCNumber);

    // Create card button
    createCardButton.addEventListener("click", () => {

        if (!cardName.value.length || !cardNumber.value.length || 
            !cardExpiry.value.length || !cardCVC.value.length) {
            
            alert("You need to complete every input field to proceed.");
            return;
        }

        createCreditCard();
    });

    // Go back button
    goBackButton.addEventListener("click", goBack);
};