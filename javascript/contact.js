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
    const animasiElements = document.querySelectorAll('section, .menu-item, .event-item, .gallery-grid img, .reservation-form-container, .location-info');
    
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


    // Form Reservation Validation
    const reservationForm = document.getElementById('reservationForm');
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const date = document.getElementById('date');
            const time = document.getElementById('time');
            const guests = document.getElementById('guests');
            const tel = document.getElementById('tel');

            let isValid = true;

            // Simple validation example
            if (name.value.trim() === '') {
                alert('Please enter your name.');
                name.focus();
                isValid = false;
            } else if (email.value.trim() === '' || !email.value.includes('@')) {
                alert('Please enter a valid email address.');
                email.focus();
                isValid = false;
            } else if (date.value.trim() === '') {
                alert('Please select a reservation date.');
                date.focus();
                isValid = false;
            } else if (time.value.trim() === '') {
                alert('Please select a reservation time.');
                time.focus();
                isValid = false;
            } else if (parseInt(guests.value) < 1 || parseInt(guests.value) > 20) {
                alert('Number of guests must be between 1 and 20.');
                guests.focus();
                isValid = false;
            } else if (tel.value.trim() !== '' && !tel.value.match(/^[0-9]{10,15}$/)) {
                alert('Please enter a valid phone number (10-15 digits).');
                tel.focus();
                isValid = false;
            }

            if (isValid) {
                // If all validations pass, you can process the form data
                alert('Reservation submitted successfully! We will contact you shortly.');
                console.log('Reservation Details:', {
                    name: name.value,
                    email: email.value,
                    tel: tel.value,
                    date: date.value,
                    time: time.value,
                    guests: guests.value,
                    message: document.getElementById('message').value
                });
                reservationForm.reset(); // Clear the form
            }
        });
    }
});