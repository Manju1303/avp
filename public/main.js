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
    threshold: 0.15,
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

// WhatsApp Button
const waBtn = document.createElement('a');
waBtn.className = 'whatsapp-float';
waBtn.href = 'https://wa.me/919566566205';
waBtn.target = '_blank';
waBtn.innerHTML = '<i data-lucide="message-circle"></i><span>Chat with Us</span>';
document.body.appendChild(waBtn);

// Form Submission Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<i data-lucide="loader-2" class="animate-spin"></i> Sending...';
        btn.disabled = true;
        
        // Simulate sending
        setTimeout(() => {
            alert('Thank you! Your appointment request has been sent successfully. We will contact you shortly.');
            contactForm.reset();
            btn.innerHTML = originalText;
            btn.disabled = false;
            lucide.createIcons(); // Re-render icons in button
        }, 1500);
    });
}

// Mobile Menu Auto-close
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navLinks').classList.remove('open');
    });
});

