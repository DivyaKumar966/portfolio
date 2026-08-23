/* =========================================
   EMAILJS CONFIGURATION
========================================= */

/*
    IMPORTANT:

    Replace these 3 values with your
    EmailJS dashboard values.
*/

const PUBLIC_KEY = "YOUR_PUBLIC_KEY";

const SERVICE_ID = "YOUR_SERVICE_ID";

const TEMPLATE_ID = "YOUR_TEMPLATE_ID";


/* =========================================
   INITIALIZE EMAILJS
========================================= */

emailjs.init({

    publicKey: PUBLIC_KEY

});


/* =========================================
   GET ELEMENTS
========================================= */

const contactForm =
    document.getElementById("contactForm");

const sendButton =
    document.getElementById("sendButton");

const buttonText =
    document.getElementById("buttonText");

const formMessage =
    document.getElementById("formMessage");

const nameInput =
    document.getElementById("name");

const emailInput =
    document.getElementById("email");

const subjectInput =
    document.getElementById("subject");

const messageInput =
    document.getElementById("message");


/* =========================================
   ERROR ELEMENTS
========================================= */

const nameError =
    document.getElementById("nameError");

const emailError =
    document.getElementById("emailError");

const subjectError =
    document.getElementById("subjectError");

const messageError =
    document.getElementById("messageError");


/* =========================================
   CLEAR ERRORS
========================================= */

function clearErrors() {

    nameError.textContent = "";

    emailError.textContent = "";

    subjectError.textContent = "";

    messageError.textContent = "";

    formMessage.textContent = "";

    formMessage.className = "form-message";

}


/* =========================================
   VALIDATE FORM
========================================= */

function validateForm() {

    clearErrors();

    let valid = true;


    /* NAME */

    if (nameInput.value.trim() === "") {

        nameError.textContent =
            "Please enter your name.";

        valid = false;

    }


    /* EMAIL */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (emailInput.value.trim() === "") {

        emailError.textContent =
            "Please enter your email.";

        valid = false;

    }

    else if (!emailPattern.test(emailInput.value.trim())) {

        emailError.textContent =
            "Please enter a valid email.";

        valid = false;

    }


    /* SUBJECT */

    if (subjectInput.value.trim() === "") {

        subjectError.textContent =
            "Please enter a subject.";

        valid = false;

    }


    /* MESSAGE */

    if (messageInput.value.trim() === "") {

        messageError.textContent =
            "Please enter your message.";

        valid = false;

    }

    else if (messageInput.value.trim().length < 10) {

        messageError.textContent =
            "Message should contain at least 10 characters.";

        valid = false;

    }


    return valid;

}


/* =========================================
   SEND EMAIL
========================================= */

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();


    /* VALIDATE */

    if (!validateForm()) {

        return;

    }


    /* LOADING */

    sendButton.disabled = true;

    buttonText.textContent = "Sending...";

    formMessage.textContent = "";


    /*
        sendForm automatically takes the
        name, email, subject and message
        fields from the form.
    */

    emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        contactForm
    )


    /* =====================================
       SUCCESS
    ===================================== */

    .then(function(response) {

        console.log(
            "Email sent successfully:",
            response.status,
            response.text
        );


        formMessage.textContent =
            "Message sent successfully! Thank you.";

        formMessage.className =
            "form-message success";


        buttonText.textContent =
            "Message Sent ✓";


        contactForm.reset();


        /* Reset button after 3 seconds */

        setTimeout(function() {

            buttonText.textContent =
                "Send Message";

        }, 3000);

    })


    /* =====================================
       ERROR
    ===================================== */

    .catch(function(error) {

        console.error(
            "EmailJS Error:",
            error
        );


        formMessage.textContent =
            "Message could not be sent. Please try again.";

        formMessage.className =
            "form-message error";


        buttonText.textContent =
            "Send Message";

    })


    /* =====================================
       FINALLY
    ===================================== */

    .finally(function() {

        sendButton.disabled = false;

    });

});