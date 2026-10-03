/**
 * KIRUTHIKA S | PORTFOLIO JAVASCRIPT ENGINE
 * Robust, lightweight, interactive scripts for luxury portfolio UX
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Copyright Year
  const yearElements = document.querySelectorAll('.dynamic-year');
  const currentYear = new Date().getFullYear();
  yearElements.forEach(el => {
    el.textContent = currentYear;
  });

  // 2. Sticky Navbar Blur & Shrink on Scroll
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // 3. Mobile Navigation Menu Toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
      navToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      }
    });
  }

  // 4. Active Navigation Link Spy on Scroll
  const sections = document.querySelectorAll('section[id]');
  if (sections.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else if (link.getAttribute('href').startsWith('#')) {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));
  }

  // 5. Contact Form Validation & Real Submission Handler
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('userName')?.value.trim();
      const email = document.getElementById('userEmail')?.value.trim();
      const subject = document.getElementById('userSubject')?.value.trim() || 'Portfolio Inquiry';
      const message = document.getElementById('userMessage')?.value.trim();

      // Basic validation
      if (!name || !email || !message) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please fill out all required fields (Name, Email, and Message).';
        formStatus.style.display = 'block';
        return;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.style.display = 'block';
        return;
      }

      // Validated: Prepare client mailto action to guarantee genuine dispatch
      const mailtoUrl = `mailto:kiruthika.it25@gmail.com?subject=${encodeURIComponent(subject + ' - via Portfolio from ' + name)}&body=${encodeURIComponent("Sender Name: " + name + "\nSender Email: " + email + "\n\nMessage:\n" + message)}`;

      formStatus.className = 'form-status success';
      formStatus.innerHTML = `<strong>Inquiry validated!</strong> Opening your email client to dispatch to Kiruthika S.<br><small>(If email client does not open automatically, <a href="${mailtoUrl}" style="text-decoration:underline;color:#DFBD69;">click here to launch email</a> or connect on LinkedIn).</small>`;
      formStatus.style.display = 'block';

      // Trigger mail client safely
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 1200);
    });
  }

  // 6. Resume Modal Controller
  const openResumeBtn = document.getElementById('openResumeModal');
  const resumeModal = document.getElementById('resumeModal');
  const closeResumeBtn = document.getElementById('closeResumeModal');

  if (openResumeBtn && resumeModal) {
    openResumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      resumeModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeResumeBtn && resumeModal) {
    closeResumeBtn.addEventListener('click', () => {
      resumeModal.classList.remove('active');
      document.body.style.overflow = '';
    });

    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 7. Lightbox Gallery Controller (for Project Detail Pages)
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  if (galleryItems.length > 0 && lightboxModal && lightboxImg) {
    let currentIndex = 0;
    const galleryData = Array.from(galleryItems).map(item => ({
      src: item.getAttribute('data-img') || item.querySelector('img')?.src,
      title: item.getAttribute('data-title') || item.querySelector('.gallery-caption')?.textContent || 'Screenshot Preview'
    }));

    function showLightbox(index) {
      if (index < 0) index = galleryData.length - 1;
      if (index >= galleryData.length) index = 0;
      currentIndex = index;

      lightboxImg.src = galleryData[currentIndex].src;
      if (lightboxTitle) {
        lightboxTitle.textContent = galleryData[currentIndex].title;
      }
      lightboxModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    galleryItems.forEach((item, idx) => {
      item.addEventListener('click', () => showLightbox(idx));
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxPrev) lightboxPrev.addEventListener('click', (e) => { e.stopPropagation(); showLightbox(currentIndex - 1); });
    if (lightboxNext) lightboxNext.addEventListener('click', (e) => { e.stopPropagation(); showLightbox(currentIndex + 1); });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
      if (lightboxModal.classList.contains('active')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') showLightbox(currentIndex - 1);
        if (e.key === 'ArrowRight') showLightbox(currentIndex + 1);
      }
      if (resumeModal && resumeModal.classList.contains('active') && e.key === 'Escape') {
        resumeModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }

  // 8. Interactive Table of Contents (TOC) for Project Detail Pages
  const tocLinks = document.querySelectorAll('.toc-link');
  if (tocLinks.length > 0) {
    const detailSections = document.querySelectorAll('.detail-section');
    const tocObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const secId = entry.target.getAttribute('id');
          tocLinks.forEach(link => {
            if (link.getAttribute('href') === `#${secId}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { rootMargin: '-10% 0px -80% 0px' });

    detailSections.forEach(s => tocObserver.observe(s));
  }

  // 9. Typewriter Effect for Hero Rotating Titles
  const typedRoleElement = document.getElementById('typedRole');
  const dynamicArticleElement = document.getElementById('dynamicArticle');

  if (typedRoleElement) {
    const roles = [
      { title: "Aspiring Software Engineer", article: "an" },
      { title: "Java Programmer", article: "a" },
      { title: "Frontend Developer", article: "a" },
      { title: "Backend Developer", article: "a" },
      { title: "Web Developer", article: "a" },
      { title: "Problem Solver", article: "a" },
      { title: "Technology Enthusiast", article: "a" }
    ];

    let currentRoleIndex = 0;
    let currentCharIndex = roles[0].title.length;
    let isDeleting = true;
    const typingSpeed = 90;
    const deletingSpeed = 45;
    const pauseDuration = 2200;

    function typeWriterLoop() {
      const currentObj = roles[currentRoleIndex];
      const fullText = currentObj.title;

      if (isDeleting) {
        typedRoleElement.textContent = fullText.substring(0, currentCharIndex - 1);
        currentCharIndex--;

        if (currentCharIndex <= 0) {
          isDeleting = false;
          currentRoleIndex = (currentRoleIndex + 1) % roles.length;
          if (dynamicArticleElement) {
            dynamicArticleElement.textContent = roles[currentRoleIndex].article;
          }
          setTimeout(typeWriterLoop, 450);
          return;
        }

        setTimeout(typeWriterLoop, deletingSpeed);
      } else {
        typedRoleElement.textContent = fullText.substring(0, currentCharIndex + 1);
        currentCharIndex++;

        if (currentCharIndex === fullText.length) {
          isDeleting = true;
          setTimeout(typeWriterLoop, pauseDuration);
          return;
        }

        setTimeout(typeWriterLoop, typingSpeed);
      }
    }

    // Begin typing cycle after initial display pause
    setTimeout(typeWriterLoop, pauseDuration);
  }
});
