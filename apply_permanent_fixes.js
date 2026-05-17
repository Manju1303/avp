const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Fix .container to have width: 100% globally (prevents flex items squishing)
scss = scss.replace(`.container {
  max-width: var(--container-w);
  margin: 0 auto;
  padding: 0 24px;
}`, `.container {
  max-width: var(--container-w);
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}`);

scss = scss.replace(`.container {
  max-width: var(--container-w);\r\n  margin: 0 auto;\r\n  padding: 0 24px;\r\n}`, `.container {
  max-width: var(--container-w);
  margin: 0 auto;
  padding: 0 24px;
  width: 100%;
}`);

// 2. Reduce default desktop .nav-links gap and margins slightly for a safer fit
scss = scss.replace(`.nav-links {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
  margin-right: 20px;
}`, `.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  margin-right: 16px;
}`);

scss = scss.replace(`.nav-links {
  display: flex;\r\n  align-items: center;\r\n  gap: 8px;\r\n  margin-left: auto;\r\n  margin-right: 20px;\r\n}`, `.nav-links {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-left: auto;
  margin-right: 16px;
}`);

// 3. Reduce default desktop .nav-links a size and padding
scss = scss.replace(`.nav-links a {
  font-size: 13.5px;
  font-weight: 500;
  color: var(--text-muted);
  padding: 6px 10px;
  border-radius: 6px;
  transition: var(--transition);
  white-space: nowrap;
  display: block;
  position: relative;
}`, `.nav-links a {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  padding: 5px 8px;
  border-radius: 6px;
  transition: var(--transition);
  white-space: nowrap;
  display: block;
  position: relative;
}`);

scss = scss.replace(`.nav-links a {
  font-size: 13.5px;\r\n  font-weight: 500;\r\n  color: var(--text-muted);\r\n  padding: 6px 10px;\r\n  border-radius: 6px;\r\n  transition: var(--transition);\r\n  white-space: nowrap;\r\n  display: block;\r\n  position: relative;\r\n}`, `.nav-links a {
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  padding: 5px 8px;
  border-radius: 6px;
  transition: var(--transition);
  white-space: nowrap;
  display: block;
  position: relative;
}`);

// 4. Update the desktop intermediate query to use max-width: 1400px (handles laptop scales elegantly)
const oldQueryBlock = `@media (min-width: 1301px) and (max-width: 1440px) {
  .nav-links {
    gap: 4px !important;
    margin-right: 12px !important;
  }
  .nav-links a {
    padding: 4px 6px !important;
    font-size: 12.5px !important;
  }
  .nav-btn {
    padding: 10px 16px !important;
    font-size: 13px !important;
  }
}`;

const newQueryBlock = `@media (max-width: 1400px) {
  .nav-links {
    gap: 3px !important;
    margin-right: 8px !important;
  }
  .nav-links a {
    padding: 4px 6px !important;
    font-size: 12px !important;
  }
  .nav-btn {
    padding: 8px 14px !important;
    font-size: 13px !important;
  }
}`;

scss = scss.replace(oldQueryBlock, newQueryBlock);
scss = scss.replace(oldQueryBlock.replace(/\n/g, '\r\n'), newQueryBlock);

// 5. Hide the extra hero paragraphs on mobile to save valuable viewport space and prevent overlapping
scss = scss.replace(`  .hero-content p {
    font-size: 15px;
    margin-bottom: 16px;
    line-height: 1.6;
    display: block !important;
    opacity: 0.9;
    max-width: 700px !important;
    margin: 0 auto 16px auto;
  }

  .hero-content p+p {
    display: block !important;
    opacity: 0.85;
  }`, `  .hero-content p {
    font-size: 15px;
    margin-bottom: 16px;
    line-height: 1.6;
    opacity: 0.9;
    max-width: 700px !important;
    margin: 0 auto 16px auto;
  }

  .hero-content p+p {
    display: none !important;
    opacity: 0.85;
  }`);

scss = scss.replace(`  .hero-content p {\r\n    font-size: 15px;\r\n    margin-bottom: 16px;\r\n    line-height: 1.6;\r\n    display: block !important;\r\n    opacity: 0.9;\r\n    max-width: 700px !important;\r\n    margin: 0 auto 16px auto;\r\n  }\r\n\r\n  .hero-content p+p {\r\n    display: block !important;\r\n    opacity: 0.85;\r\n  }`, `  .hero-content p {
    font-size: 15px;
    margin-bottom: 16px;
    line-height: 1.6;
    opacity: 0.9;
    max-width: 700px !important;
    margin: 0 auto 16px auto;
  }

  .hero-content p+p {
    display: none !important;
    opacity: 0.85;
  }`);

fs.writeFileSync('public/style.scss', scss);
console.log('Permanent visual layout fixes applied successfully to public/style.scss');
