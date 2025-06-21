document.addEventListener('DOMContentLoaded', function() {
    // Shared smooth scroll for all anchor links (ensure this is in all JS files if using relative links)
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

    // Filter Menu by Category
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            this.classList.add('active');

            const category = this.dataset.category;

            menuItems.forEach(item => {
                const itemCategory = item.dataset.category;
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block'; // Or 'grid' or 'flex' depending on parent layout
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Hover Animation for Menu Items
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 25px rgba(217, 180, 65, 0.8), inset 0 0 14px #d9b44155';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.6), inset 0 0 8px #d9b44133';
        });
    });

     // ========== PERFECTED FEATURE: CLEAR TEXT WITH HOVER REVEAL ==========
    const menuItemImages = {
        'Ergigante Dark Roast*BEST*': 'asset/nergigante dark roast landscape.png',
        'Velkhana Frost Latte': 'asset/velkhana frost latte landscape.png',
        'Magnamalo Infernal Shake': 'asset/magnamalo infernal shake landscape.png',
        'Palico Espresso Shot': 'asset/palico esspreso shot landscape.png',
        'Nargacuga Night Brew': 'asset/Nargacuga night brew landscape.png',
        'Aknosom Vanilla Cloud': 'asset/Aknossom vanilla cloud landscape.png',
        'Rathalos Inferno Wings*BEST*': 'asset/rathalos inferno wings landscape.png',
        'Nargacuga Shadow Sashimi': 'asset/kulu ya ku egg benedict landscape.png',
        'Felynes Paw Pancake*BEST*': 'asset/Felynes Paw Pancake landscape.png',
        'Kirin Thunder Cheesecake': 'asset/Kirin thunder cheesecake landscape.png'
    };

    document.querySelectorAll('.menu-item').forEach(item => {
        const itemName = item.querySelector('h3').textContent;
        const imgSrc = menuItemImages[itemName] || 'asset/menu/default-coffee.jpg';
        
        // Create image element (hidden by default)
        const imgElement = document.createElement('img');
        imgElement.src = imgSrc;
        imgElement.alt = itemName + ' image';
        imgElement.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
            opacity: 0;
            z-index: -1;
            border-radius: 12px;
            transition: all 0.4s ease;
            filter: brightness(0.8);
            transform: scale(1.05);
        `;
        
        // Solid overlay for clear text by default
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(59, 54, 46, 0.85);
            border-radius: 12px;
            z-index: -1;
            transition: all 0.4s ease;
        `;
        
        // Style adjustments
        item.style.position = 'relative';
        item.style.overflow = 'hidden';
        item.style.zIndex = '1';
        
        // Enhance text visibility
        item.querySelector('h3').style.textShadow = '0 2px 4px rgba(0,0,0,0.8)';
        item.querySelector('p').style.textShadow = '0 1px 3px rgba(0,0,0,0.7)';
        item.querySelector('.price').style.textShadow = '0 1px 3px rgba(0,0,0,0.9)';
        
        // Append elements
        item.prepend(imgElement);
        item.appendChild(overlay);
        
        // Hover effects - reveal image
        item.addEventListener('mouseenter', () => {
            imgElement.style.opacity = '0.8';
            imgElement.style.filter = 'brightness(0.9)';
            imgElement.style.transform = 'scale(1)';
            overlay.style.background = 'rgba(59, 54, 46, 0.4)';
        });
        
        item.addEventListener('mouseleave', () => {
            imgElement.style.opacity = '0';
            imgElement.style.filter = 'brightness(0.8)';
            imgElement.style.transform = 'scale(1.05)';
            overlay.style.background = 'rgba(59, 54, 46, 0.85)';
        });
    });
});