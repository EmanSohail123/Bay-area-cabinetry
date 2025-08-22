document.addEventListener('DOMContentLoaded', function () {
  // Modal functionality for all product types
  const modalTriggers = document.querySelectorAll('[data-modal]');
  const modals = document.querySelectorAll('.innovation-modal, .hdi-modal, .artisan-modal, .jk-modal');
  const closeButtons = document.querySelectorAll('.close-modal');

  // Open modal function
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      modal.classList.add('show');

      // Focus the close button for accessibility
      const closeBtn = modal.querySelector('.close-modal');
      if (closeBtn) {
        closeBtn.focus();
      }
    }
  }

  // Close all modals function
  function closeAllModals() {
    modals.forEach(modal => {
      modal.classList.remove('show');
    });
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  // Set up event listeners for modal triggers
  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', function (e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal');
      openModal(modalId);
    });
  });

  // Set up event listeners for close buttons
  closeButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.preventDefault();
      closeAllModals();
    });
  });

  // Close when clicking outside content
  modals.forEach(modal => {
    modal.addEventListener('click', function (e) {
      if (e.target === this) {
        closeAllModals();
      }
    });
  });

  // Close with ESC key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });

  // Handle J&K product cards differently on small screens
  document.querySelectorAll('.product-grid .product-card').forEach((card, index) => {
    if (!card.hasAttribute('data-modal')) {
      const isSmallScreen = () => window.innerWidth <= 768;
      const viewDetailsBtn = card.querySelector('.view-details-btn'); // Make sure your button has this class

      if (isSmallScreen()) {
        // On small screens: Flip only when "View Details" is clicked
        if (viewDetailsBtn) {
          viewDetailsBtn.addEventListener('click', function (e) {
            e.stopPropagation(); // Prevent triggering card click
            const modalId = `jkModal${index + 1}`;
            if (document.getElementById(modalId)) {
              openModal(modalId);
            }
          });
        }
      } else {
        // On large screens: Flip on card click
        card.addEventListener('click', function () {
          const modalId = `jkModal${index + 1}`;
          if (document.getElementById(modalId)) {
            openModal(modalId);
          }
        });
      }
    }
  });
});
