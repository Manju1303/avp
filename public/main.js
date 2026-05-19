// Toast notification helper (replaces alert() for better UX)
function showToast(message, type = 'success') {
    const existing = document.getElementById('amch-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'amch-toast';
    toast.style.cssText = `
        position: fixed; top: 20px; right: 20px; z-index: 99999;
        background: ${type === 'success' ? '#16a34a' : '#dc2626'};
        color: #fff; padding: 14px 20px; border-radius: 10px;
        font-family: Inter, sans-serif; font-size: 14px; font-weight: 500;
        max-width: 320px; box-shadow: 0 8px 30px rgba(0,0,0,0.2);
        transform: translateX(120%); transition: transform 0.35s ease;
        line-height: 1.5; cursor: pointer;
    `;
    toast.textContent = message;
    document.body.appendChild(toast);
    requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });
    const hide = () => { toast.style.transform = 'translateX(120%)'; setTimeout(() => toast.remove(), 350); };
    setTimeout(hide, 4000);
    toast.addEventListener('click', hide);
}

// Arockia Medical Centre, Emergency & Trauma Care - Main JS
// Optimized for performance, accessibility, and smooth user experience

document.addEventListener('DOMContentLoaded', () => {
    // 1. Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Header Scroll Effect
    const header = document.getElementById('header');
    const updateHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', updateHeader);
    updateHeader();

    // 3. Scroll-triggered animations (Reveal on Scroll)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll(
        '.speciality-card, .dept-card, .facility-card, .affordable-card, ' +
        '.emergency-card, .elderly-feature, .why-card, .info-item, .tech-item, .testimonial-card'
    );
    
    revealElements.forEach((el, index) => {
        // Stagger effect logic based on viewport width
        const cols = window.innerWidth > 992 ? 3 : (window.innerWidth > 600 ? 2 : 1);
        el.style.transitionDelay = `${(index % cols) * 0.1}s`;
        observer.observe(el);
    });

    // 4. Hero Slider Logic
    const slides = document.querySelectorAll('.hero .slide');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;
    let slideInterval;

    if (slides.length > 0) {
        // Create dots
        slides.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.className = `dot ${i === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        });

        const dots = document.querySelectorAll('.dot');

        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
            resetInterval();
        };

        const nextSlide = () => goToSlide(currentSlide + 1);

        const resetInterval = () => {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        };

        resetInterval();
    }

    // 5. Back to Top Logic
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.setAttribute('aria-label', 'Back to top');
    backToTop.innerHTML = '<i data-lucide="chevron-up"></i>';
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 800) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 6. Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const navOverlay = document.getElementById('navOverlay');

    if (mobileMenuBtn && navLinks && navOverlay) {
        const toggleMenu = () => {
            const isOpen = navLinks.classList.toggle('open');
            navOverlay.classList.toggle('open');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.setAttribute('data-lucide', isOpen ? 'x' : 'menu');
                if (window.lucide) lucide.createIcons({ root: mobileMenuBtn });
            }
        };

        mobileMenuBtn.addEventListener('click', toggleMenu);
        navOverlay.addEventListener('click', toggleMenu);

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('open')) toggleMenu();
            });
        });
    }

    // 7. Form Submission Handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            const formData = new FormData(contactForm);
            const phone = formData.get('Phone');
            const phoneRegex = /^[0-9]{10,15}$/;
            
            if (phone && !phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
                showToast('⚠️ Please enter a valid 10-digit phone number.', 'error'); return;
            }

            btn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Sending...';
            btn.disabled = true;
            if (window.lucide) lucide.createIcons({ root: btn });
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    showToast('✅ Thank you! Your appointment request has been sent successfully.', 'success');
                    contactForm.reset();
                } else {
                    showToast('❌ Submission failed. Please try again or call us directly.', 'error');
                }
            })
            .catch(() => showToast('❌ Network error. Please check your connection.', 'error'))
            .finally(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                if (window.lucide) lucide.createIcons({ root: btn });
            });
        });
    }

    // 8. ScrollSpy (Active Link Highlighting)
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

    // Initialize icons
    if (window.lucide) {
        lucide.createIcons();
    }
});
