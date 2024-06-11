document.addEventListener('DOMContentLoaded', () => {
     // Getting form data from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const fullName = decodeURIComponent(urlParams.get('fullName'));
    const email = decodeURIComponent(urlParams.get('email'));
    const firstName = fullName.split(' ')[0];

    // Get elements
    const confirmationMessage = document.getElementById('confirmationMessage');
    const otpForm = document.getElementById('otpForm');
    const otpInput = document.getElementById('otp');
    const validateOtpButton = document.getElementById('validateOtp');

    // Generate a 4-digit random OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log('Generated OTP:', otp); // Display the OTP in the console

    confirmationMessage.innerHTML = `Dear ${firstName},<br>Thank you for your inquiry. A 4 digit verification number has been sent to your email: ${email}, please enter it in the following box and submit for confirmation:`;

    let attempts = 0;
    const maxAttempts = 3;

    // Event listener for OTP validation
    validateOtpButton.addEventListener('click', () => {
        attempts++;
        if (parseInt(otpInput.value) === otp) {
            otpForm.innerHTML = 'Validation Successful!';
            setTimeout(() => {
                window.location.href = 'https://pixel6.co/'; 
            }, 4000);
        } else {
            if (attempts >= maxAttempts) {
                otpForm.innerHTML = 'Validation Failed!';
                setTimeout(() => {
                    window.location.href = '404.html';
                }, 4000);
            } else {
                // Incorrect OTP, prompt to try again
                alert(`Incorrect OTP. Remaining attempts: ${maxAttempts - attempts}`);
                otpInput.value = '';
            }
        }
    });
    });