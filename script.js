//Here i am Getting form and input elements
const loanForm = document.getElementById('loanForm');
const fullNameInput = document.getElementById('fullName');
const emailInput = document.getElementById('email');
const panInput = document.getElementById('pan');
const loanAmountInput = document.getElementById('loanAmount');
const estimatedEMIElement = document.getElementById('estimatedEMI');

// Adding Event listener for form submission
loanForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Validate form fields
    if (validateForm()) {
        // Create form data object
        const formData = {
            fullName: fullNameInput.value,
            email: emailInput.value,
            pan: panInput.value,
            loanAmount: loanAmountInput.value
        };

    
        window.location.href = `confirm.html?fullName=${encodeURIComponent(formData.fullName)}&email=${encodeURIComponent(formData.email)}`;
    }
});

// Function to validate all form fields
function validateForm() {
    const isFullNameValid = validateFullName();
    const isEmailValid = validateEmail();
    const isPANValid = validatePAN();
    const isLoanAmountValid = validateLoanAmount();

    return isFullNameValid && isEmailValid && isPANValid && isLoanAmountValid;
}

// fullname validation logic
function validateFullName() {
    const fullNameValue = fullNameInput.value.trim();
    const fullNameError = document.getElementById('fullNameError');

    const words = fullNameValue.split(' ');

    if (words.length < 2) {
        fullNameError.textContent = 'Full name should have at least two words.';
        return false;
    }

    for (const word of words) {
        if (word.length < 4) {
            fullNameError.textContent = 'Each word in the full name should be at least 4 characters long.';
            return false;
        }
    }

    fullNameError.textContent = '';
    return true;
}


// Email validation logic
function validateEmail() {
    const emailValue = emailInput.value.trim();
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
        emailError.textContent = 'Please enter a valid email address.';
        return false;
    }

    emailError.textContent = '';
    return true;
}


// PAN validation logic
function validatePAN() {
    const panValue = panInput.value.trim();
    const panError = document.getElementById('panError');
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (!panRegex.test(panValue)) {
        panError.textContent = 'PAN must be in the format ABCDE1234F.';
        return false;
    }

    panError.textContent = '';
    return true;
}


//loan amount validation logic
function validateLoanAmount() {
    const loanAmountValue = loanAmountInput.value.trim();
    const loanAmountError = document.getElementById('loanAmountError');

    if (loanAmountValue === '') {
        loanAmountError.textContent = 'Loan amount is required.';
        estimatedEMIElement.textContent = '';
        return false;
    }

    if (isNaN(loanAmountValue) || loanAmountValue < 1 || loanAmountValue > 999999999) {
        loanAmountError.textContent = 'Loan amount should be a numeric value with a maximum of 9 digits.';
        estimatedEMIElement.textContent = '';
        return false;
    }

    loanAmountError.textContent = '';
    calculateEstimatedEMI(loanAmountValue);
    return true;
}

//EMI calculation logic
function calculateEstimatedEMI(principal) {
    const interestRate = 0.085; // 8.5% interest rate
    const tenure = 15; // 15 years
    const monthlyInterestRate = interestRate / 12;
    const numMonths = tenure * 12;
    const emi = (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numMonths)) / (Math.pow(1 + monthlyInterestRate, numMonths) - 1);
    estimatedEMIElement.textContent = `Estimated EMI: ₹${emi.toFixed(2)}`;
}