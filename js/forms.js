document.addEventListener('DOMContentLoaded', function() {
    // Estimate Form Handler (Frontend + Backend Integration)
    const estimateForm = document.querySelector(".submission-form");
    const responseContainer = document.querySelector('.form-response-container');
    
    if (estimateForm && responseContainer) {
        estimateForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;

            // Show loading state
            submitBtn.textContent = "Sending...";
            submitBtn.disabled = true;
            clearResponse();

            // Get form data
            const data = {
                fullName: form.fullName.value.trim(),
                email: form.email.value.trim(),
                phone: form.phone.value.trim(),
                projectType: form.projectType.value,
                address: form.address.value.trim(),
                city: form.city.value.trim(),
                state: form.state.value,
                zipCode: form.zipCode.value.trim(),
                preferredContactTime: form.preferredContactTime.value,
                message: form.message.value.trim()
            };

            // Frontend validation
            const errors = [];
            if (!data.fullName) errors.push('Full name is required');
            if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                errors.push('Valid email is required');
            }
            if (!data.projectType) errors.push('Project type is required');
            if (!data.phone) errors.push('Phone number is required');
            
            if (errors.length > 0) {
                showResponse('error', errors);
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                return;
            }

            // Backend submission
            try {
                const response = await fetch("https://bay-area-cabinetry-backend.onrender.com/api/send-estimate", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.message || 'Failed to submit estimate');
                }

                // Success case
                form.reset();
                showResponse('success', ['Your estimate request has been submitted successfully!']);
            } catch (error) {
                console.error("Estimate submission error:", error);
                showResponse('error', [error.message || 'An error occurred while submitting the estimate']);
            } finally {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Contact Form Handler (kept separate as in original)
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const form = e.target;
            const submitButton = form.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.textContent;

            // Show loading state
            submitButton.textContent = "Sending...";
            submitButton.disabled = true;

            const data = {
                firstName: form.firstName.value.trim(),
                lastName: form.lastName.value.trim(),
                email: form.email.value.trim(),
                phone: form.phone.value.trim(),
                zipCode: form.zipCode.value.trim(),
                message: form.message.value.trim()
            };

            try {
                const response = await fetch("https://bay-area-cabinetry-backend.onrender.com/api/send-contact", {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                });

                const result = await response.json();
                
                if (!response.ok) {
                    throw new Error(result.message || 'Failed to submit contact form');
                }

                // Success case
                form.reset();
                showResponse('success', ['Your contact form has been submitted successfully!']);
            } catch (error) {
                console.error("Contact submission error:", error);
                showResponse('error', [error.message || 'An error occurred while submitting the contact form']);
            } finally {
                submitButton.textContent = originalButtonText;
                submitButton.disabled = false;
            }
        });
    }

    // Shared response functions
    function showResponse(type, messages) {
        clearResponse();
        
        const responseBox = document.createElement('div');
        responseBox.className = `response-box ${type}`;
        
        const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
        const title = type === 'success' ? 'Success!' : 'Please fix these issues:';
        
        responseBox.innerHTML = `
            <div class="response-content">
                <i class="fas ${icon}"></i>
                <div>
                    <h4>${title}</h4>
                    ${type === 'success' 
                        ? `<p>${messages[0]}</p>` 
                        : `<ul>${messages.map(m => `<li>${m}</li>`).join('')}</ul>`}
                </div>
                <button class="close-response" aria-label="Dismiss message">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        responseContainer.appendChild(responseBox);
        responseBox.querySelector('.close-response').addEventListener('click', clearResponse);
        if (type === 'success') setTimeout(clearResponse, 5000);
    }
    
    function clearResponse() {
        if (responseContainer) responseContainer.innerHTML = '';
    }
});


