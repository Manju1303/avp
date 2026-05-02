// Arockia Medical Centre, Emergency & Trauma Care

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.05,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll(
    '.speciality-card, .dept-card, .facility-card, .affordable-card, ' +
    '.emergency-card, .elderly-feature, .why-card, .info-item, .tech-item, .testimonial-card'
).forEach((el, index) => {
    el.style.transitionDelay = `${(index % 3) * 0.1}s`; // Stagger effect
    observer.observe(el);
});

// Back to Top Logic
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '<i data-lucide="chevron-up"></i>';
document.body.appendChild(backToTop);

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Initialize icons for any dynamically added elements
if (window.lucide) {
    lucide.createIcons();
}

// Form Submission Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        const formData = new FormData(contactForm);
        
        // Advanced Client-side Validation
        const phone = formData.get('Phone');
        const email = formData.get('email');
        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        btn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Sending...';
        btn.disabled = true;
        
        // Send data using fetch to the form's action URL
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Thank you! Your appointment request has been sent successfully. We will contact you shortly.');
                contactForm.reset();
            } else {
                alert('Oops! There was a problem submitting your form. Please try again.');
            }
        })
        .catch(error => {
            alert('Oops! There was a problem submitting your form. Please check your connection.');
        })
        .finally(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
            if (window.lucide) {
                lucide.createIcons({ root: btn });
            }
        });
    });
}

