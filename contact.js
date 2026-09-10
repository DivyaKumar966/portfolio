/* =========================================
   EMAILJS CONFIGURATION
========================================= */

const PUBLIC_KEY = "S38F8Pe9NMvt4v-G7";

const SERVICE_ID = "service_kipl691";

const TEMPLATE_ID = "template_yafy0qe";


/* =========================================
   INITIALIZE EMAILJS
========================================= */

emailjs.init({
    publicKey: PUBLIC_KEY
});


/* =========================================
   GET FORM ELEMENTS
========================================= */

const contactForm =
    document.getElementById("contactForm");

const sendButton =
    document.getElementById("sendButton");

const buttonText =
    document.getElementById("buttonText");

const formMessage =
    document.getElementById("formMessage");


/* =========================================
   INPUT ELEMENTS
========================================= */

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
   CHECK FORM ELEMENTS
========================================= */

if (!contactForm) {

    console.error("Contact form not found!");

}


/* =========================================
   CLEAR ERRORS
========================================= */

function clearErrors() {

    if (nameError) {
        nameError.textContent = "";
    }

    if (emailError) {
        emailError.textContent = "";
    }

    if (subjectError) {
        subjectError.textContent = "";
    }

    if (messageError) {
        messageError.textContent = "";
    }

    if (formMessage) {
        formMessage.textContent = "";
        formMessage.className = "form-message";
    }

}


/* =========================================
   VALIDATE FORM
========================================= */

function validateForm() {

    clearErrors();

    let valid = true;


    /* -----------------------------------------
       NAME
    ----------------------------------------- */

    if (nameInput.value.trim() === "") {

        nameError.textContent =
            "Please enter your name.";

        valid = false;

    }


    /* -----------------------------------------
       EMAIL
    ----------------------------------------- */

    const emailPattern =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (emailInput.value.trim() === "") {

        emailError.textContent =
            "Please enter your email.";

        valid = false;

    }

    else if (
        !emailPattern.test(
            emailInput.value.trim()
        )
    ) {

        emailError.textContent =
            "Please enter a valid email.";

        valid = false;

    }


    /* -----------------------------------------
       SUBJECT
    ----------------------------------------- */

    if (subjectInput.value.trim() === "") {

        subjectError.textContent =
            "Please enter a subject.";

        valid = false;

    }


    /* -----------------------------------------
       MESSAGE
    ----------------------------------------- */

    if (messageInput.value.trim() === "") {

        messageError.textContent =
            "Please enter your message.";

        valid = false;

    }

    else if (
        messageInput.value.trim().length < 10
    ) {

        messageError.textContent =
            "Message should contain at least 10 characters.";

        valid = false;

    }


    return valid;

}


/* =========================================
   SEND EMAIL
========================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* -----------------------------------------
               VALIDATE
            ----------------------------------------- */

            if (!validateForm()) {

                return;

            }


            /* -----------------------------------------
               LOADING STATE
            ----------------------------------------- */

            sendButton.disabled = true;

            buttonText.textContent = "Sending...";

            formMessage.textContent = "";

            formMessage.className =
                "form-message";


            /* -----------------------------------------
               SEND EMAIL USING EMAILJS
            ----------------------------------------- */

            emailjs.sendForm(
                SERVICE_ID,
                TEMPLATE_ID,
                contactForm
            )


            /* =====================================
               SUCCESS
            ===================================== */

            .then(function (response) {

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


                /* Reset form */

                contactForm.reset();


                /* Reset button text after 3 seconds */

                setTimeout(function () {

                    buttonText.textContent =
                        "Send Message";

                }, 3000);

            })


            /* =====================================
               ERROR
            ===================================== */

            .catch(function (error) {

                console.error(
                    "EmailJS Error:",
                    error
                );

                console.error(
                    "Status:",
                    error.status
                );

                console.error(
                    "Text:",
                    error.text
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

            .finally(function () {

                sendButton.disabled = false;

            });

        }
    );

}