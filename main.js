(function () {
  'use strict';

  const header = document.getElementById('header');
  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  menuToggle.addEventListener('click', function () {
    mobileNav.classList.toggle('open');
    const icon = menuToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');
  });
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileNav.classList.remove('open');
      const icon = menuToggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
    });
  });

  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach(function (el) {
    const delay = parseInt(el.dataset.delay || '0', 10);
    setTimeout(function () {
      el.classList.add('visible');
    }, 100 + delay);
  });

  document.querySelectorAll('.btn-cart').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const name = btn.dataset.name;
      console.log('Добавлено: ' + name);
      btn.textContent = 'Добавлено';
      setTimeout(function () {
        btn.textContent = 'В корзину';
      }, 1500);
    });
  });

  const track = document.getElementById('reviewsTrack');
  const slides = track.querySelectorAll('.review-slide');
  const dotsContainer = document.getElementById('reviewsDots');
  let currentIndex = 0;
  const total = slides.length;

  slides.forEach(function (_, i) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', function () { goTo(i); });
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('span');

  function goTo(index) {
    currentIndex = (index + total) % total;
    track.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
    dots.forEach(function (d, i) {
      d.classList.toggle('active', i === currentIndex);
    });
  }

  document.getElementById('reviewPrev').addEventListener('click', function () {
    goTo(currentIndex - 1);
  });

  document.getElementById('reviewNext').addEventListener('click', function () {
    goTo(currentIndex + 1);
  });

  document.getElementById('subscribeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const input = e.target.querySelector('input');
    console.log('Подписка: ' + input.value);
    input.value = '';
    input.placeholder = 'Спасибо за подписку!';
    setTimeout(function () {
      input.placeholder = 'Ваш email';
    }, 3000);
  });

  let autoTimer = setInterval(function () {
    goTo(currentIndex + 1);
  }, 8000);

  document.querySelector('.reviews-wrapper').addEventListener('mouseenter', function () {
    clearInterval(autoTimer);
  });

  document.querySelector('.reviews-wrapper').addEventListener('mouseleave', function () {
    autoTimer = setInterval(function () {
      goTo(currentIndex + 1);
    }, 8000);
  });
})();
