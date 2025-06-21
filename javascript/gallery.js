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

    // Gallery Image Hover Effect
    document.querySelectorAll('.gallery-grid img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.08)';
            this.style.boxShadow = '0 0 10px 4px #c29e0dee';
        });
        
        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none'; // Reset to default CSS shadow
        });
    });

    // Modal Pop-up for Gallery Images
    const modal = document.getElementById("myModal");
    const modalImg = document.getElementById("img01");
    const captionText = document.getElementById("caption");
    const galleryImages = document.querySelectorAll(".gallery-grid img");
    const span = document.getElementsByClassName("close")[0];

    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.src;
            captionText.innerHTML = this.alt;
        });
    });

    // When the user clicks on <span> (x), close the modal
    if (span) {
      span.onclick = function() { 
        modal.style.display = "none";
      }
    }

    // Close modal when clicking outside the image
    if (modal) {
        modal.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }

    // Allow closing with escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
    });
});