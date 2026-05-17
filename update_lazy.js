const fs = require('fs');
let html = fs.readFileSync('public/index.html', 'utf8');

// Replace lines missing loading="lazy" for specific images
html = html.replace(/<img width="800" height="600" src="images\/facility\/modern-operation-theatre\.jpg" alt="24\/7 Advanced Operation Theatre">/g, '<img width="800" height="600" src="images/facility/modern-operation-theatre.jpg" alt="24/7 Advanced Operation Theatre" loading="lazy">');
html = html.replace(/<img width="800" height="600" src="images\/facility\/arockia-laboratory-interior-new\.jpg" alt="In-house Automated Lab - Arockia Medical Centre Kavindapadi">/g, '<img width="800" height="600" src="images/facility/arockia-laboratory-interior-new.jpg" alt="In-house Automated Lab - Arockia Medical Centre Kavindapadi" loading="lazy">');
html = html.replace(/<img width="800" height="600" src="images\/facility\/arockia-xray-room-new\.jpg" alt="Digital X-Ray & Diagnostics - Best Orthopedic in Erode">/g, '<img width="800" height="600" src="images/facility/arockia-xray-room-new.jpg" alt="Digital X-Ray & Diagnostics - Best Orthopedic in Erode" loading="lazy">');
html = html.replace(/<img width="800" height="600" src="images\/facility\/arockia-emergency-ward-new\.jpg" alt="Emergency Ward">/g, '<img width="800" height="600" src="images/facility/arockia-emergency-ward-new.jpg" alt="Emergency Ward" loading="lazy">');
html = html.replace(/<img width="800" height="600" src="images\/facility\/arockia-day-care-ward-new\.jpg" alt="Inpatient Ward">/g, '<img width="800" height="600" src="images/facility/arockia-day-care-ward-new.jpg" alt="Inpatient Ward" loading="lazy">');
html = html.replace(/<img width="800" height="600" src="images\/facility\/arockia-day-care-ward-new\.jpg" alt="Arockia Medical Centre Care Ward">/g, '<img width="800" height="600" src="images/facility/arockia-day-care-ward-new.jpg" alt="Arockia Medical Centre Care Ward" loading="lazy">');
html = html.replace(/<img width="800" height="600" src="images\/building\/arockia-hospital-building-front\.jpeg" alt="Arockia Medical Centre - Best 24\/7 Emergency Hospital in Appakudal and Kavindapadi Erode">/g, '<img width="800" height="600" src="images/building/arockia-hospital-building-front.jpeg" alt="Arockia Medical Centre - Best 24/7 Emergency Hospital in Appakudal and Kavindapadi Erode" loading="lazy">');

fs.writeFileSync('public/index.html', html);
console.log('Updated index.html with lazy loading attributes.');
