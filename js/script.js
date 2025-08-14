document.addEventListener('DOMContentLoaded', function() {
    // Immediately show critical elements
    const forceShowElements = () => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.opacity = '1';
            const h1 = hero.querySelector('h1');
            const p = hero.querySelector('p');
            const btn = hero.querySelector('.btn');
            if (h1) h1.style.opacity = '1';
            if (p) p.style.opacity = '1';
            if (btn) btn.style.opacity = '1';
        }
        
        const about = document.querySelector('.about');
        if (about) {
            about.style.display = 'block';
            about.style.opacity = '1';
            about.style.visibility = 'visible';
        }
    };
    
    // Run immediately and again after short delay
    forceShowElements();
    setTimeout(forceShowElements, 100);

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
        
        // Toggle hamburger to X
        const spans = this.querySelectorAll('span');
        if (this.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                const spans = hamburger.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');
        
        // Add slight delay before closing
        let closeTimer;
        
        dropdown.addEventListener('mouseenter', () => {
            clearTimeout(closeTimer);
            content.style.display = 'block';
            setTimeout(() => {
                content.style.opacity = '1';
                content.style.visibility = 'visible';
            }, 10);
        });
        
        dropdown.addEventListener('mouseleave', () => {
            closeTimer = setTimeout(() => {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                setTimeout(() => {
                    content.style.display = 'none';
                }, 300);
            }, 200);
        });
        
        // Keep open when hovering dropdown content
        content.addEventListener('mouseenter', () => {
            clearTimeout(closeTimer);
        });
        
        content.addEventListener('mouseleave', () => {
            closeTimer = setTimeout(() => {
                content.style.opacity = '0';
                content.style.visibility = 'hidden';
                setTimeout(() => {
                    content.style.display = 'none';
                }, 300);
            }, 200);
        });
    });

    // Tab functionality
    document.querySelectorAll('.tab-text').forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            document.querySelectorAll('.tab-text').forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
        });
    });

    // Initialize with first tab active if not already set
    if (!document.querySelector('.tab-text.active') && document.querySelector('.tab-text')) {
        document.querySelector('.tab-text').click();
    }


    // Scroll animations
    const sections = document.querySelectorAll('.image-text-section');
    
    function checkVisibility() {
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const delay = index * 200;
            
            if (rect.top < window.innerHeight * 0.8) {
                setTimeout(() => {
                    section.classList.add('visible');
                }, delay);
            }
        });
    }
    
    // Initial check
    checkVisibility();
    
    window.addEventListener('scroll', checkVisibility);
});

// Design Studio Image Swapping Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all the element cards and the active design container
    const elementCards = document.querySelectorAll('.element-card');
    const activeDesign = document.getElementById('active-design');
    
    // Add click event to each card
    elementCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get the image source from the clicked card
            const imgSrc = this.querySelector('img').src;
            
            // Update the active design image
            activeDesign.src = imgSrc;
            
            // Optional: Add active class to highlight selected card
            elementCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Optional: Initialize with first card active
    if (elementCards.length > 0) {
        elementCards[0].click();
    }
});




document.addEventListener('DOMContentLoaded', function() {
    // Initialize contact form
    const contactForm = document.querySelector('.contact-form');
    const responseContainer = document.createElement('div');
    responseContainer.className = 'form-response-container';
    contactForm.parentNode.insertBefore(responseContainer, contactForm.nextSibling);

    // Initialize map
    function initMap() {
        const location = { lat: 38.4288, lng: -122.8976 }; // Example coordinates
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 14,
            center: location,
            styles: [
                {
                    featureType: "poi",
                    stylers: [{ visibility: "off" }]
                }
            ]
        });
        
        new google.maps.Marker({
            position: location,
            map: map,
            title: "Our Location"
        });
    }

    // Load Google Maps API
    function loadMapScript() {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
        script.defer = true;
        script.async = true;
        document.head.appendChild(script);
    }

    // Form submission handler
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Get form elements (simplified without phone/zip validation)
            const formElements = {
                firstName: contactForm.querySelector('input[placeholder="First Name"]'),
                lastName: contactForm.querySelector('input[placeholder="Last Name"]'),
                email: contactForm.querySelector('input[type="email"]'),
                message: contactForm.querySelector('textarea')
            };
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            clearResponse();
            
            // Validate form (simplified)
            const errors = [];
            
            if (!formElements.firstName.value.trim()) {
                errors.push('First name is required');
                formElements.firstName.classList.add('error-field');
            } else {
                formElements.firstName.classList.remove('error-field');
            }
            
            if (!formElements.lastName.value.trim()) {
                errors.push('Last name is required');
                formElements.lastName.classList.add('error-field');
            } else {
                formElements.lastName.classList.remove('error-field');
            }
            
            if (!formElements.email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formElements.email.value)) {
                errors.push('Valid email is required');
                formElements.email.classList.add('error-field');
            } else {
                formElements.email.classList.remove('error-field');
            }
            
            if (!formElements.message.value.trim()) {
                errors.push('Message is required');
                formElements.message.classList.add('error-field');
            } else {
                formElements.message.classList.remove('error-field');
            }
            
            if (errors.length > 0) {
                showResponse('error', errors);
            } else {
                try {
                    // Simulate API call
                    await new Promise(resolve => setTimeout(resolve, 1500));
                    
                    // Prepare form data (still collects all fields but only validates required ones)
                    const formData = {
                        firstName: formElements.firstName.value.trim(),
                        lastName: formElements.lastName.value.trim(),
                        email: formElements.email.value.trim(),
                        phone: contactForm.querySelector('input[type="tel"]')?.value.trim() || '',
                        zip: contactForm.querySelector('.zip-input')?.value.trim() || '',
                        message: formElements.message.value.trim(),
                        timestamp: new Date().toISOString()
                    };
                    
                    console.log('Form data submitted:', formData);
                    
                    showResponse('success', ['Thank you! Your message has been sent successfully.']);
                    contactForm.reset();
                } catch (error) {
                    console.error('Submission error:', error);
                    showResponse('error', ['Submission failed. Please try again.']);
                }
            }
            
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        });
    }
    
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
        
        if (type === 'success') {
            setTimeout(clearResponse, 5000);
        }
    }
    
    function clearResponse() {
        responseContainer.innerHTML = '';
    }

    // Load the map
    loadMapScript();
});


document.addEventListener('DOMContentLoaded', function() {
  // Only run on pages with the floating form
  if (document.querySelector('.floating-submission-form')) {
    // Create container structure
    const mainContent = document.querySelector('.main-content'); // Adjust this selector
    if (mainContent) {
      mainContent.classList.add('main-content-with-form');
      
      // Wrap existing content
      const contentWrapper = document.createElement('div');
      contentWrapper.className = 'page-content';
      while (mainContent.firstChild) {
        contentWrapper.appendChild(mainContent.firstChild);
      }
      mainContent.appendChild(contentWrapper);
      
      // Move form into position
      const form = document.querySelector('.floating-submission-form');
      mainContent.prepend(form); // For mobile (form first)
      
      // Desktop layout adjustment
      if (window.innerWidth > 1024) {
        mainContent.appendChild(form);
      }
      
      // Handle window resize
      window.addEventListener('resize', function() {
        if (window.innerWidth > 1024) {
          mainContent.appendChild(form);
        } else {
          mainContent.prepend(form);
        }
      });
    }
  }
});