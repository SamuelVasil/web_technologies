function loadCSSForResolution() {
    let screenWidth = window.innerWidth;
    let cssFile;
  
    if (screenWidth <= 700) {
      cssFile = 'styles/styles-700.css';
    } else if (screenWidth <= 900) {
      cssFile = 'styles/styles-900.css';
    } else if (screenWidth <= 1300) {
      cssFile = 'styles/styles-1300.css';
    } else {
      cssFile = 'styles/styles-1600.css';
    }
  
    let link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = cssFile;
    document.head.appendChild(link);
  }
  
  
  loadCSSForResolution();
  window.addEventListener('resize', loadCSSForResolution);
  