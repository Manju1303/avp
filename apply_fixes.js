const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Add global :focus-visible rules
const focusRule = `
/* Accessibility: Keyboard Focus */
a:focus-visible, button:focus-visible, input:focus-visible, textarea:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 3px;
  border-radius: 4px;
}
`;
if (!scss.includes('a:focus-visible')) {
    scss = scss.replace('/* - CSS Variables - */', '/* - CSS Variables - */' + focusRule);
}

// 2. Add aspect-ratio to prevent layout shift
scss = scss.replace(/\.facility-img \{\r?\n  position: relative;\r?\n  height: 200px !important;\r?\n  overflow: hidden;\r?\n\}/g, `.facility-img {
  position: relative;
  aspect-ratio: 4 / 3;
  width: 100%;
  overflow: hidden;
}`);

scss = scss.replace(/\.gallery-item img \{\r?\n  width: 100%;\r?\n  height: 100%;\r?\n  object-fit: cover;\r?\n  transition: transform 0\.5s ease;\r?\n\}/g, `.gallery-item img {
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 0.5s ease;
}`);

// 3. Tablet Gap: gallery-grid adjustments
scss = scss.replace(/@media \(max-width: 1200px\) \{\r?\n  \.gallery-grid \{\r?\n    grid-template-columns: repeat\(2, 1fr\);\r?\n  \}\r?\n\}/g, `@media (max-width: 1200px) {
  .gallery-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 992px) {
  .gallery-grid {
    gap: 12px;
  }
  .facility-grid, .specialities-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}`);

// 4. SCSS Refactoring Example: .facility-card
let oldFacility = `.facility-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-white);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);
}

.facility-card:hover {
  transform: translateY(-6px);
  box-shadow: var(--shadow-lg);
}

.facility-img {
  position: relative;
  aspect-ratio: 4 / 3;
  width: 100%;
  overflow: hidden;
}

.facility-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.facility-card:hover .facility-img img {
  transform: scale(1.06);
}

.facility-img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 40, 80, 0.7), transparent 50%);
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  padding: 16px;
  opacity: 0;
  transition: var(--transition);
}

.facility-card:hover .facility-img-overlay {
  opacity: 1;
}`;

let newFacility = `.facility-card {
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--bg-white);
  border: 1px solid var(--border);
  box-shadow: var(--shadow-sm);
  transition: var(--transition);

  &:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg);

    .facility-img img {
      transform: scale(1.06);
    }

    .facility-img-overlay {
      opacity: 1;
    }
  }

  .facility-img {
    position: relative;
    aspect-ratio: 4 / 3;
    width: 100%;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
  }

  .facility-img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 40, 80, 0.7), transparent 50%);
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    padding: 16px;
    opacity: 0;
    transition: var(--transition);
  }
}`;

scss = scss.replace(oldFacility.replace(/\n/g, '\r\n'), newFacility).replace(oldFacility, newFacility);

fs.writeFileSync('public/style.scss', scss);
console.log('Applied QA Fixes');
