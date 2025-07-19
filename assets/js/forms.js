// =============================================================================
// FORM ENHANCEMENTS - Progressive Disclosure & Validation
// =============================================================================

// Progressive form enhancement
function initializeProgressiveForm() {
    const companyInput = document.getElementById('company');
    const teamSizeGroup = document.getElementById('team-size-group');
    const ticketsGroup = document.getElementById('tickets-group');

    if (!companyInput || !teamSizeGroup || !ticketsGroup) return;

    companyInput.addEventListener('input', function() {
        if (this.value.trim().length > 0) {
            setTimeout(() => {
                teamSizeGroup.classList.remove('hidden');
                teamSizeGroup.classList.add('show');
            }, 300);
            
            setTimeout(() => {
                ticketsGroup.classList.remove('hidden');
                ticketsGroup.classList.add('show');
            }, 600);
        } else {
            teamSizeGroup.classList.add('hidden');
            teamSizeGroup.classList.remove('show');
            ticketsGroup.classList.add('hidden');
            ticketsGroup.classList.remove('show');
        }
    });
}

// Real-time form validation
function initializeFormValidation() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        // Validation on blur (when user leaves field)
        input.addEventListener('blur', function() {
            validateField(this);
        });

        // Real-time validation on input for better UX
        input.addEventListener('input', function() {
            const formGroup = this.closest('.form-group');
            
            // If field was previously invalid, check if it's now valid
            if (formGroup.classList.contains('invalid') && this.checkValidity()) {
                formGroup.classList.remove('invalid');
                formGroup.classList.add('valid');
            }
        });

        // Clear validation on focus for better UX
        input.addEventListener('focus', function() {
            const formGroup = this.closest('.form-group');
            formGroup.classList.remove('invalid');
        });
    });
}

// Validate individual field
function validateField(input) {
    const formGroup = input.closest('.form-group');
    const value = input.value.trim();
    
    // Skip validation for hidden fields
    if (formGroup.classList.contains('hidden')) return;
    
    if (input.checkValidity() && value !== '') {
        formGroup.classList.add('valid');
        formGroup.classList.remove('invalid');
    } else if (value !== '') {
        formGroup.classList.add('invalid');
        formGroup.classList.remove('valid');
    } else {
        formGroup.classList.remove('valid', 'invalid');
    }
}

// Form submission handling
function initializeFormSubmission() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        // Validate all fields before submission
        const formInputs = this.querySelectorAll('.form-input[required]');
        let isValid = true;
        
        formInputs.forEach(input => {
            validateField(input);
            if (!input.checkValidity() || input.value.trim() === '') {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            showFormError('Please fill in all required fields correctly.');
            return;
        }
        
        // Show success state
        showFormSuccess();
    });
}

// Show form error message
function showFormError(message) {
    const submitButton = document.getElementById('submit-btn');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = message;
    submitButton.style.background = '#ef4444';
    submitButton.classList.add('shake');
    
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
        submitButton.classList.remove('shake');
    }, 3000);
}

// Show form success state
function showFormSuccess() {
    const submitButton = document.getElementById('submit-btn');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Message Sent! ✓';
    submitButton.style.background = '#10b981';
    
    setTimeout(() => {
        submitButton.textContent = originalText;
        submitButton.style.background = '';
    }, 3000);
}

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Auto-resize textarea
function initializeTextareaResize() {
    const textareas = document.querySelectorAll('textarea');
    
    textareas.forEach(textarea => {
        // Auto-resize on input
        textarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
        
        // Set initial height
        textarea.style.height = 'auto';
        textarea.style.height = (textarea.scrollHeight) + 'px';
    });
}

// Form field focus effects
function initializeFormFocusEffects() {
    const formInputs = document.querySelectorAll('.form-input');
    
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.closest('.form-group').classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            this.closest('.form-group').classList.remove('focused');
        });
    });
}

// Initialize all form functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeProgressiveForm();
    initializeFormValidation();
    initializeFormSubmission();
    initializeTextareaResize();
    initializeFormFocusEffects();
    
    console.log('📝 Form enhancements initialized');
});