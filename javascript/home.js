document.addEventListener('DOMContentLoaded', function() {
    // Shared smooth scroll for all 
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
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
            }
        });
    });

    // Slideshow 
    let slideIndex = 0;
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");
    let autoSlideTimer;

    function showSlides() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slideIndex++;
        if (slideIndex > slides.length) {slideIndex = 1}
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
        autoSlideTimer = setTimeout(showSlides, 5000); // Change image every 5 seconds
    }

    function currentSlide(n) {
        clearTimeout(autoSlideTimer);
        slideIndex = n;
        showSlidesNow();
        autoSlideTimer = setTimeout(showSlides, 5000);
    }

    function showSlidesNow() {
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        if (slideIndex > slides.length) {slideIndex = 1}
        if (slideIndex < 1) {slideIndex = slides.length}
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

    // Start automatic slideshow
    showSlides();
    window.currentSlide = currentSlide;

    // Fullscreen Modal Functionality
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.classList.add('modal');
    const modalImg = document.createElement('img');
    modalImg.classList.add('modal-content');
    modal.appendChild(modalImg);
    document.body.appendChild(modal);
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    modal.appendChild(closeBtn);

    Array.from(slides).forEach(slide => {
        const img = slide.querySelector('img');
        if (img) {
            img.style.cursor = 'pointer';
            img.addEventListener('click', function() {
                modal.style.display = 'block';
                modalImg.src = this.src;
            });
        }
    });

    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
        }
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

    // Hover effect for menu items (copied to menu.js as well)
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 25px rgba(217, 180, 65, 0.8)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6), inset 0 0 8px #d9b44133';
        });
    });

    // Hover effect for gallery images (copied to gallery.js as well)
    document.querySelectorAll('.gallery-grid img').forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.boxShadow = '0 0 15px rgba(194, 158, 13, 0.9)';
        });

        img.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none'; // Ensure it resets to default CSS shadow if any
        });
    });
});