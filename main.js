/**
 * Codecontenu Portfolio — Main JavaScript
 * Production-ready, lightweight, no dependencies
 */

document.addEventListener('DOMContentLoaded', () => {
  // Header scroll effect
  const header = document.getElementById('header');
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerHeight = header ? header.offsetHeight : 0;
        const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Terminal prompt interaction
  const prompts = document.querySelectorAll('.prompt-item');
  prompts.forEach(item => {
    item.addEventListener('click', () => {
      prompts.forEach(p => p.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('opacity-100', 'translate-y-0');
        entry.target.classList.remove('opacity-0', 'translate-y-8');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply initial state and observe sections
  document.querySelectorAll('section > div').forEach((el, index) => {
    if (index === 0) return; // Skip hero
    el.classList.add('opacity-0', 'translate-y-8', 'transition-all', 'duration-700', 'ease-out');
    observer.observe(el);
  });
});
