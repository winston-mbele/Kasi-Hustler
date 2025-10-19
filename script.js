// Utility: rAF-coalesced scroll listener
function onScroll(callback) {
  let ticking = false;
  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          callback();
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );
}

// 1) Navbar: sticky scrolled state + active link highlighting
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  const handle = () => {
    // Scrolled shadow/class
    if (window.scrollY > 50) navbar?.classList.add('scrolled');
    else navbar?.classList.remove('scrolled');

    // Active link highlight
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute('id') || '';
      }
    });
    navLinks.forEach((link) => {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === `#${current}`) link.classList.add('active');
    });
  };

  // Run once and on scroll
  handle();
  onScroll(handle);
}

// 2) IntersectionObserver-based reveal animations
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          // Stagger animation for grid items
          if (
            entry.target.classList.contains('providers-grid') ||
            entry.target.classList.contains('categories-grid') ||
            entry.target.classList.contains('stories-grid')
          ) {
            const items = entry.target.children;
            Array.from(items).forEach((item, index) => {
              setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
              }, index * 100);
            });
          }
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  const animatedElements = document.querySelectorAll(
    `.section-header,
     .provider-card,
     .step,
     .category-card,
     .story-card,
     .providers-grid,
     .categories-grid,
     .stories-grid`
  );

  animatedElements.forEach((el) => {
    el.classList.add('fade-in');
    observer.observe(el);
  });

  // Initial state for grid items
  document
    .querySelectorAll('.provider-card, .category-card, .story-card')
    .forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(30px)';
      item.style.transition = 'all 0.6s ease-out';
    });
}

// 3) Search and quick filtering on the homepage
function initSearchFunctionality() {
  const searchBtn = document.querySelector('.search-btn');
  const searchInput = document.querySelector('.search-input');
  const locationInput = document.querySelector('.location-input');
  const popularTags = document.querySelectorAll('.tag');
  const providersSection = document.querySelector('.featured-providers');
  const providersGrid = document.querySelector('.providers-grid');
  let resultsBanner = null;

  if (!searchBtn || !searchInput || !providersGrid) return;

  const handleSearch = () => {
    const term = searchInput.value.trim().toLowerCase();
    const loc = (locationInput?.value || '').trim().toLowerCase();
    const cards = Array.from(providersGrid.querySelectorAll('.provider-card'));

    // Loading state
    const original = searchBtn.innerHTML;
    searchBtn.innerHTML = '<div class="loading"></div> Searching...';
    searchBtn.disabled = true;

    let visibleCount = 0;
    cards.forEach((card) => {
      const name = card.querySelector('.provider-info h3')?.textContent.toLowerCase() || '';
      const service = card.querySelector('.provider-service')?.textContent.toLowerCase() || '';
      const locationTxt = card.querySelector('.provider-location')?.textContent.toLowerCase() || '';
      
      const termMatch = !term || [name, service].some((v) => v.includes(term));
      const locMatch = !loc || locationTxt.includes(loc);
      const show = termMatch && locMatch;
      card.style.display = show ? '' : 'none';
      if (show) visibleCount += 1;
    });

    // Banner
    if (!resultsBanner) {
      resultsBanner = document.createElement('div');
      resultsBanner.id = 'search-results';
      resultsBanner.style.cssText =
        'margin:0 0 16px; padding:12px 14px; border-radius:10px; background:#eef5ef; color:#1f5d3e; border:1px solid rgba(46,204,113,.25); font-weight:600;';
      providersSection?.querySelector('.container')?.insertBefore(resultsBanner, providersGrid);
    }
    const parts = [];
    if (term) parts.push(`“${term}”`);
    if (loc) parts.push(`in “${loc}”`);
    resultsBanner.innerHTML =
      visibleCount > 0
        ? `Found ${visibleCount} result${visibleCount === 1 ? '' : 's'} ${parts.length ? 'for ' + parts.join(' ') : ''}`
        : `No results ${parts.length ? 'for ' + parts.join(' ') : ''}. Try different keywords.`;

    // Restore button + scroll to results
    setTimeout(() => {
      searchBtn.innerHTML = original;
      searchBtn.disabled = false;
    }, 300);
    providersSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Click and Enter key
  searchBtn.addEventListener('click', handleSearch);
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });
  locationInput?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
  });

  // Tag shortcuts
  popularTags.forEach((tag) => {
    tag.addEventListener('click', () => {
      if (!searchInput) return;
      searchInput.value = tag.textContent.trim();
      handleSearch();
    });
  });
}

// 4) Lazy loading images (supports images with data-src)
function initLazyLoading() {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.onerror = () => {
          img.onerror = null;
          // Simple placeholder if image fails
          const svg =
            '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#9ca3af" font-family="Arial" font-size="20">Image not available</text></svg>';
          img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
        };
        if (img.dataset && img.dataset.src) {
          img.src = img.dataset.src;
        }
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  const lazyImages = document.querySelectorAll('img[data-src]');
  lazyImages.forEach((img) => imageObserver.observe(img));
}

// 5) Mobile menu / hamburger toggle
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }
}

// 6) Theme Toggle
function initThemeToggle() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        // Apply saved theme on page load
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }

        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            let theme = 'light';
            if (document.body.classList.contains('dark-mode')) {
                theme = 'dark';
                themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
            } else {
                themeToggle.innerHTML = '<i class="fa-solid fa-moon"></i>';
            }
            localStorage.setItem('theme', theme);
        });
    }
}

// 7) Language Switcher to prompt browser translation
function initLanguageSwitcher() {
    const langButton = document.querySelector('.language-btn');
    const langDropdown = document.querySelector('.language-dropdown');
    const chevronIcon = langButton?.querySelector('.chevron-icon');
    const currentLangSpan = document.getElementById('current-lang');
    const langOptions = document.querySelectorAll('.language-option');

    if (!langButton || !langDropdown) return;

    // Toggle dropdown
    langButton.addEventListener('click', (event) => {
        event.stopPropagation();
        langDropdown.classList.toggle('active');
        chevronIcon?.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    window.addEventListener('click', () => {
        langDropdown.classList.remove('active');
        chevronIcon?.classList.remove('active');
    });

    // Handle language selection
    langOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const langCode = this.dataset.lang;
            const langShort = this.textContent.match(/\(([^)]+)\)/)[1];

            // Set the lang attribute on the HTML tag. This signals to the browser
            // that the page content is in a different language, which should 
            // trigger the browser's built-in translation prompt.
            document.documentElement.lang = langCode;
            
            // Update button text and save preference for consistent UI
            if (currentLangSpan) currentLangSpan.textContent = langShort;
            localStorage.setItem('preferredLanguage', langCode);
            localStorage.setItem('preferredLanguageShort', langShort);

            // Close dropdown
            langDropdown.classList.remove('active');
            chevronIcon?.classList.remove('active');
            
            console.log(`Page language set to '${langCode}'. Your browser should now offer to translate if your browser's language is different.`);
        });
    });

    // On page load, apply the saved language preference to the HTML tag and button
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang) {
        document.documentElement.lang = savedLang;
        const savedLangShort = localStorage.getItem('preferredLanguageShort');
        if (savedLangShort && currentLangSpan) {
            currentLangSpan.textContent = savedLangShort;
        }
    } else {
        // Ensure default is set if no preference is saved
        document.documentElement.lang = 'en';
    }
}


// Init all once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavbar();
    initScrollAnimations();
    initSearchFunctionality();
    initLazyLoading();
    initThemeToggle();
    initLanguageSwitcher();
});

