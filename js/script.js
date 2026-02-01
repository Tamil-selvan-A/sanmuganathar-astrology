document.addEventListener('DOMContentLoaded', () => {
    // --- Language Toggle Logic ---
    const langToggleBtn = document.getElementById('lang-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-en][data-ta]');
    let currentLang = localStorage.getItem('lang') || 'ta'; // Default to Tamil

    function updateLanguage(lang) {
        document.documentElement.lang = lang;
        elementsToTranslate.forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });

        // Update Button Text
        if (lang === 'ta') {
            langToggleBtn.textContent = 'English';
        } else {
            langToggleBtn.textContent = 'தமிழ்';
        }

        // Font Adjustment
        if (lang === 'ta') {
            document.body.style.fontFamily = "'Mukta Malar', sans-serif";
        } else {
            document.body.style.fontFamily = "'Poppins', sans-serif";
        }

        localStorage.setItem('lang', lang);
        currentLang = lang;
    }

    // Initialize Language
    updateLanguage(currentLang);

    // Toggle Handler
    langToggleBtn.addEventListener('click', () => {
        const newLang = currentLang === 'ta' ? 'en' : 'ta';
        updateLanguage(newLang);
    });

    // --- Mobile Menu Logic ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const nav = document.querySelector('.nav');

    mobileMenuBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileMenuBtn.classList.toggle('is-active');
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            mobileMenuBtn.classList.remove('is-active');
        });
    });


    // --- Hero Slider Logic ---
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 4000; // 4 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    setInterval(nextSlide, slideInterval);



    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animates only once
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => {
        observer.observe(el);
    });
});