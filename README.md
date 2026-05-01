# Arockia Medical Centre, Emergency & Trauma Care

A premium, fast, and secure multi-speciality hospital website built for **Arockia Medical Centre** located in Kavindapadi, Erode. This project is optimized for performance, accessibility, and high-traffic conditions.

## 🏥 About the Project
This website serves as the digital front for Arockia Medical Centre, providing 24/7 emergency information, appointment booking, and details about specialized medical services including Orthopedics, General Medicine, Pediatrics, and Diabetic Care.

## 🚀 Key Features
- **Modern Responsive Design**: Fully optimized for Desktop, Tablet, and Mobile.
- **PWA Ready**: Can be installed on mobile devices for offline access and app-like experience.
- **Floating Emergency Button**: Instant access to emergency services for mobile users.
- **Optimized Performance**: High-speed loading using modern CSS and a specialized Service Worker caching strategy.
- **Secure**: Implements Content Security Policy (CSP) and secure headers for patient data protection.
- **Cloudflare Optimized**: Includes native `_headers` and `_redirects` for Cloudflare Pages deployment.

## 🛠️ Tech Stack
- **Frontend**: HTML5, Vanilla CSS3 (Custom Design System), JavaScript (ES6).
- **Icons**: Lucide Icons.
- **Form Handling**: FormSubmit (Third-party serverless integration).
- **Hosting**: Cloudflare Pages (Unlimited Bandwidth).

## 📂 Project Structure
```text
/
├── public/                # All website assets (Root directory for deployment)
│   ├── images/            # Organized hospital and facility images
│   ├── index.html         # Main website structure
│   ├── style.css          # Premium design system & responsive styles
│   ├── main.js            # Interactivity & form handling logic
│   ├── sw.js              # Service Worker for PWA & Offline support
│   ├── manifest.json      # PWA App configuration
│   ├── _headers           # Cloudflare Security & Caching headers
│   └── _redirects         # Cloudflare SPA Routing rules
├── .gitignore             # Standard git ignore file
└── README.md              # Project documentation (this file)
```

## 🌐 Deployment Instructions
To deploy this website to **Cloudflare Pages**:
1. Connect your GitHub repository to Cloudflare.
2. Select the `avp` repository.
3. Set the **Build output directory** to `public`.
4. Leave the **Build command** empty.
5. Click **Save and Deploy**.

---
© 2026 Arockia Medical Centre, Kavindapadi. All rights reserved.
