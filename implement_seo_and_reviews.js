const fs = require('fs');

// 1. Update public/index.html
let html = fs.readFileSync('public/index.html', 'utf8');

// Replace canonical links and OG URLs to the correct primary domain
html = html.replace(/https:\/\/arockiamedicalcentre\.pages\.dev\//g, 'https://arockiamedicalcentre.in/');

// Update Title, Meta Description, and Meta Keywords with the exact major SEO keywords
const targetTitle = '<title>Arockia Medical Centre | 24/7 Emergency & Orthopedic Hospital in Kavindapadi</title>';
html = html.replace(/<title>.*<\/title>/, targetTitle);

const targetDescription = '<meta name="description" content="Arockia Medical Centre is the top-rated hospital in Kavindapadi, Erode. Specialized in 24/7 Emergency & Trauma support, Snakebite & Poisoning treatment, Orthopedic Care, Bone & Joint fracture treatment, Joint pain & Arthritis management, Bone & Spine treatment, and specialized Diabetes & Wound Care. Serves Appakudal, Bhavani, Gobi & Erode.">';
html = html.replace(/<meta name="description" content=".*">/, targetDescription);

const targetKeywords = '<meta name="keywords" content="24/7 Trauma & Emergency support, Snakebite & Poisoning treatment, Orthopedic Care Kavindapadi, Bone & Joint, Fracture treatment & trauma care, Joint pain & arthritis management, Bone and spine treatment, Diabetes & Wound Care, Kavindapadi hospital, best hospital Erode, hospital in Gobi, orthopedic doctor Bhavani, gynecologist Gobi, multi-speciality hospital Bhavani">';
html = html.replace(/<meta name="keywords" content=".*">/, targetKeywords);

// Inject the beautiful static Google Reviews 5-Star Badge into the testimonials section
const googleBadge = `
                <!-- Google Reviews Trust Badge -->
                <div class="google-reviews-badge">
                    <div class="google-badge-logo">
                        <svg viewBox="0 0 24 24" width="20" height="20">
                            <path fill="#EA4335" d="M12 5.04c1.7 0 3.2.6 4.4 1.7l3.3-3.3C17.7 1.4 15 0 12 0 7.3 0 3.3 2.7 1.3 6.6l3.9 3c1-3 3.8-4.6 6.8-4.6z"/>
                            <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5c-.3 1.5-1.1 2.8-2.4 3.6l3.7 2.9c2.2-2 3.7-5 3.7-8.6z"/>
                            <path fill="#FBBC05" d="M5.2 14.4c-.2-.7-.4-1.5-.4-2.4s.2-1.7.4-2.4l-3.9-3C.5 8.2 0 10 0 12s.5 3.8 1.3 5.4l3.9-3z"/>
                            <path fill="#34A853" d="M12 24c3.2 0 6-1 8-2.9l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.8-1.6-6.8-4.6l-3.9 3C3.3 21.3 7.3 24 12 24z"/>
                        </svg>
                        <span>Google Reviews</span>
                    </div>
                    <div class="google-badge-rating">
                        <span class="rating-number">5.0</span>
                        <div class="rating-stars">
                            <i data-lucide="star"></i>
                            <i data-lucide="star"></i>
                            <i data-lucide="star"></i>
                            <i data-lucide="star"></i>
                            <i data-lucide="star"></i>
                        </div>
                        <span class="rating-count">Based on 5-Star Patient Reviews on Google Maps</span>
                    </div>
                    <a href="https://www.google.com/search?q=Arockia+Medical+Centre+Kavindapadi" target="_blank" class="google-badge-btn">
                        <i data-lucide="external-link"></i> View Location & Reviews
                    </a>
                </div>
`;

// Insert the badge inside #testimonials .container
html = html.replace(`<div class="testimonials-slider">`, `${googleBadge}\n                <div class="testimonials-slider">`);

fs.writeFileSync('public/index.html', html);
console.log('index.html SEO metadata and Google Reviews widget updated successfully.');

// 2. Add Google Reviews widget styles to public/style.scss
let scss = fs.readFileSync('public/style.scss', 'utf8');

const reviewsStyles = `
/* Google Reviews Trust Badge Styles */
.google-reviews-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  background: var(--bg-white);
  border: 1px solid var(--border);
  padding: 14px 24px;
  border-radius: var(--radius-lg);
  max-width: 720px;
  margin: 0 auto 40px auto;
  box-shadow: var(--shadow-sm);
  z-index: 10;
  position: relative;
}

.google-badge-logo {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 800;
  color: var(--text);
  font-size: 14px;
}

.google-badge-rating {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.rating-number {
  font-size: 18px;
  font-weight: 800;
  color: var(--text);
}

.rating-stars {
  display: flex;
  gap: 2px;
}

.rating-stars svg, .rating-stars i {
  width: 16px !important;
  height: 16px !important;
  fill: #FBBC05 !important;
  color: #FBBC05 !important;
}

.rating-count {
  font-size: 12px;
  color: var(--text-muted);
  font-weight: 500;
}

.google-badge-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  font-weight: 700;
  color: var(--primary);
  background: var(--primary-light);
  padding: 6px 12px;
  border-radius: var(--radius);
  transition: var(--transition);
}

.google-badge-btn:hover {
  background: var(--primary);
  color: #fff !important;
}

.google-badge-btn svg, .google-badge-btn i {
  width: 12px !important;
  height: 12px !important;
}

@media (max-width: 768px) {
  .google-reviews-badge {
    flex-direction: column;
    text-align: center;
    gap: 12px;
    padding: 16px;
  }
  .google-badge-rating {
    flex-direction: column;
    gap: 4px;
  }
}
`;

// Append review widget styles
scss = scss + '\n' + reviewsStyles;
fs.writeFileSync('public/style.scss', scss);
console.log('SCSS reviews widget styles appended successfully.');
