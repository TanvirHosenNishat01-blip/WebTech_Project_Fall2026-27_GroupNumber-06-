
//   LifeFlow - Admin Portal Common JavaScript
//   Handles shared form validation, UI interactions, and utility functions across admin pages.
 

document.addEventListener("DOMContentLoaded", function () {
    console.log("LifeFlow Admin Portal Initialized successfully.");

    // Universal Form Validation Helper
    const forms = document.querySelectorAll("form");
    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            let isValid = true;
            
            // Validate required text/email/password inputs
            const requiredInputs = form.querySelectorAll("input[required], select[required], textarea[required]");
            requiredInputs.forEach(input => {
                const errorElement = document.getElementById(input.id + "Error") || input.parentElement.querySelector(".error-msg");
                
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = "#dc2626";
                    if (errorElement) {
                        errorElement.textContent = "This field cannot be empty.";
                    }
                } else {
                    input.style.borderColor = "#cbd5e1";
                    if (errorElement) {
                        errorElement.textContent = "";
                    }
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert("Please fill in all required fields correctly before submitting.");
            }
        });
    });
});

/**
 * Confirmation prompt for deleting or suspending users/hospitals
 * @param {string} actionType - The action being performed (e.g., 'suspend', 'verify', 'delete')
 * @returns {boolean}
 */
function confirmAdminAction(actionType) {
    return confirm(`Are you sure you want to ${actionType} this entity? This action will be logged in the system audit trail.`);
}

/**
 * Utility function to toggle visibility of modal or panel elements
 * @param {string} elementId 
 */
function toggleElementVisibility(elementId) {
    const targetElement = document.getElementById(elementId);
    if (targetElement) {
        if (targetElement.style.display === "none" || targetElement.style.display === "") {
            targetElement.style.display = "block";
        } else {
            targetElement.style.display = "none";
        }
    }
}