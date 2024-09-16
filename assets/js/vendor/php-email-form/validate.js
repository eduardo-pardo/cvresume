(function () {
  "use strict";

  // Select all forms with the class 'php-email-form'
  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevent default form submission

      let thisForm = this;

      // Display loading indicator
      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      // Gather form data
      let formData = new FormData(thisForm);

      // Submit form using Fetch API
      fetch(thisForm.getAttribute('action'), {
        method: 'POST',
        headers: { 'Accept': 'application/json' }, // Expecting JSON response
        body: formData
      })
      .then(response => response.json()) // Parse response as JSON
      .then(data => {
        thisForm.querySelector('.loading').classList.remove('d-block'); // Remove loading indicator

        if (data.ok) { // Check if the response indicates success
          thisForm.querySelector('.sent-message').classList.add('d-block'); // Show success message
          thisForm.reset(); // Reset the form
        } else {
          // Handle error response
          let errorMessage = data.error || 'Form submission failed!';
          displayError(thisForm, errorMessage);
        }
      })
      .catch((error) => {
        displayError(thisForm, 'There was a problem submitting the form.');
      });
    });
  });

  function displayError(thisForm, error) {
    // Display error message
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();