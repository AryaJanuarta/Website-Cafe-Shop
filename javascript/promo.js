document.addEventListener('DOMContentLoaded', function() {
    // Shared smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('nav').offsetHeight; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset - 20;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Sticky navigation bar
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > nav.offsetTop) {
                nav.classList.add('scrolled-nav');
            } else {
                nav.classList.remove('scrolled-nav');
            }
        });
    }

    // Animation on scroll for elements
    const animasiElements = document.querySelectorAll('section, .menu-item, .event-item, .gallery-grid img');
    
    animasiElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animasiElements.forEach(element => {
        observer.observe(element);
    });

    // Expand/Collapse Promo Details
    const toggleButtons = document.querySelectorAll('.toggle-promo-btn');

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            const promoItem = this.closest('.event-item');
            const promoDetails = promoItem.querySelector('.promo-details');
            
            if (promoDetails.classList.contains('expanded')) {
                promoDetails.classList.remove('expanded');
                this.textContent = 'See Details';
            } else {
                promoDetails.classList.add('expanded');
                this.textContent = 'Show Less';
            }
        });
    });
// Fullscreen overlay setup
  const overlay = document.createElement('div');
  overlay.classList.add('fullscreen-overlay');
  overlay.innerHTML = '<img src="" alt="Fullscreen">';
  document.body.appendChild(overlay);

  overlay.addEventListener('click', () => {
    overlay.style.display = 'none';
  });

  document.querySelectorAll('.promo-thumb').forEach(img => {
    img.addEventListener('click', () => {
      overlay.querySelector('img').src = img.src;
      overlay.style.display = 'flex';
    });
  });
});