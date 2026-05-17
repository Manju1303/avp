const fs = require('fs');
let scss = fs.readFileSync('public/style.scss', 'utf8');

// 1. Add padding-bottom to body on mobile
if (scss.includes('@media (max-width: 768px) {\r\n  .hero {') || scss.includes('@media (max-width: 768px) {\n  .hero {')) {
    scss = scss.replace(/@media \(max-width: 768px\) \{\r?\n  \.hero \{/g, "@media (max-width: 768px) {\n  body {\n    padding-bottom: 56px;\n  }\n\n  .hero {");
}

// 2. Fix whatsapp-float
let waOld = `@media (max-width: 768px) {
  .whatsapp-float span {
    display: none;
  }

  .whatsapp-float {
    padding: 12px;
    border-radius: 50%;
    bottom: 20px;
    left: 20px;
  }

  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 44px !important;
    height: 44px !important;
  }
}`;

let waNew = `@media (max-width: 768px) {
  .whatsapp-float span {
    display: inline-block !important;
  }
  .whatsapp-float {
    padding: 14px 10px;
    border-radius: 0;
    bottom: 0;
    left: 0;
    width: 50%;
    justify-content: center;
    box-shadow: none;
    border-right: 1px solid rgba(255,255,255,0.2);
    z-index: 1001;
  }
  .back-to-top {
    bottom: 76px;
    right: 20px;
    width: 44px !important;
    height: 44px !important;
  }
}`;
scss = scss.replace(waOld.replace(/\n/g, '\r\n'), waNew).replace(waOld, waNew);


// 3. Fix emergency-fab
let emOld = `@media (max-width: 768px) {
  .mobile-emergency-fab {
    display: flex;
  }

  /* Adjust back-to-top position to avoid overlap */
  .back-to-top {
    bottom: 90px;
    right: 20px;
  }

  .whatsapp-float {
    bottom: 20px;
    left: 20px;
    padding: 12px;
  }
}`;

let emNew = `@media (max-width: 768px) {
  .mobile-emergency-fab {
    display: flex;
    padding: 14px 10px;
    border-radius: 0;
    bottom: 0;
    right: 0;
    width: 50%;
    justify-content: center;
    box-shadow: none;
    animation: none;
    z-index: 1001;
  }
}`;
scss = scss.replace(emOld.replace(/\n/g, '\r\n'), emNew).replace(emOld, emNew);

fs.writeFileSync('public/style.scss', scss);
console.log('Mobile buttons updated');
