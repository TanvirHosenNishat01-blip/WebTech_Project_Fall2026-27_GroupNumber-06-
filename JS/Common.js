document.addEventListener("DOMContentLoaded", function () {
    console.log("LifeFlow Portal Initialized successfully.");
});

// Universal Form Validation on Button Click
function validateForm() {
    let isValid = true;
    
    // Find all required inputs across the current form
    const requiredInputs = document.querySelectorAll("input[required], select[required], textarea[required]");
    
    requiredInputs.forEach(input => {
        // Find the error element associated with this input
        const errorElement = document.getElementById(input.id + "Error") || input.parentElement.querySelector(".error-msg");
        
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = "#dc2626"; // Red border
            if (errorElement) {
                errorElement.textContent = "Please fill up"; // Show error text
            }
        } else {
            input.style.borderColor = "#cbd5e1"; // Normal border
            if (errorElement) {
                errorElement.textContent = ""; // Clear error text
            }
        }
    });

    if (!isValid) {
        alert("Please fill in all required fields correctly before submitting.");
    } else {
        alert("Validation successful!");
    }
}

// Confirmation prompt for deleting or managing entities
function confirmAdminAction(actionType) {
    return confirm(`Are you sure you want to ${actionType} this entity?`);
}

// Utility function to toggle visibility of elements
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