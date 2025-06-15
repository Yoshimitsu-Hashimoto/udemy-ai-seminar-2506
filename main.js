document.addEventListener('DOMContentLoaded', function() {
  'use strict';

  // ヘッダースクロール処理
  const header = document.querySelector('.site-header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 50) {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
      header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop;
  });

  // モバイルメニューの処理
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.menu');

  menuToggle.addEventListener('click', function() {
    menu.classList.toggle('active');
    menuToggle.classList.toggle('active');

    const spans = menuToggle.querySelectorAll('span');
    if (menuToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // メニューアイテムをクリックしたときにモバイルメニューを閉じる
  const menuItems = document.querySelectorAll('.menu a');
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      if (window.innerWidth <= 768) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
        
        const spans = menuToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  });

  // スムーススクロール
  const scrollLinks = document.querySelectorAll('a[href^="#"]');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offsetTop = targetElement.offsetTop;
        window.scrollTo({
          top: offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // お問い合わせフォームの検証
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 簡易的なフォーム検証
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value;
      const message = document.getElementById('message').value;
      
      let isValid = true;
      
      // 各フィールドの検証
      if (!name) {
        showError('name', 'お名前を入力してください');
        isValid = false;
      } else {
        clearError('name');
      }
      
      if (!email) {
        showError('email', 'メールアドレスを入力してください');
        isValid = false;
      } else if (!isValidEmail(email)) {
        showError('email', '有効なメールアドレスを入力してください');
        isValid = false;
      } else {
        clearError('email');
      }
      
      if (!subject) {
        showError('subject', '件名を入力してください');
        isValid = false;
      } else {
        clearError('subject');
      }
      
      if (!message) {
        showError('message', 'メッセージを入力してください');
        isValid = false;
      } else {
        clearError('message');
      }
      
      // フォームが有効な場合の送信処理
      if (isValid) {
        // 通常はここでフォームデータをサーバーに送信します
        // 今回はモックのアラートを表示
        alert('お問い合わせありがとうございます。メッセージが送信されました。');
        contactForm.reset();
      }
    });
  }

  // ヘルパー関数: メールアドレスの検証
  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // ヘルパー関数: エラーメッセージの表示
  function showError(inputId, message) {
    const input = document.getElementById(inputId);
    const errorElement = document.createElement('div');
    
    // 既存のエラーメッセージを削除
    clearError(inputId);
    
    errorElement.className = 'error-message';
    errorElement.style.color = 'var(--error-color)';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    errorElement.textContent = message;
    
    input.style.borderColor = 'var(--error-color)';
    input.parentNode.appendChild(errorElement);
  }

  // ヘルパー関数: エラーメッセージの削除
  function clearError(inputId) {
    const input = document.getElementById(inputId);
    const parent = input.parentNode;
    const errorElement = parent.querySelector('.error-message');
    
    if (errorElement) {
      parent.removeChild(errorElement);
    }
    
    input.style.borderColor = '';
  }

  // スクロールアニメーション
  const animatedElements = document.querySelectorAll('.service-item, .about-content, .contact-container');
  animatedElements.forEach(element => {
    element.classList.add('fade-in');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach(element => {
    observer.observe(element);
  });
});