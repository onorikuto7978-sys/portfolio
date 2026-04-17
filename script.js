document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------
    // Cursor Glow Animation
    // ----------------------------------------
    const cursorGlow = document.getElementById('cursor-glow');
    
    // カーソルが要素を追いかける処理
    document.addEventListener('mousemove', (e) => {
        // requestAnimationFrameを使用してスムーズにする
        requestAnimationFrame(() => {
            cursorGlow.style.left = e.clientX + 'px';
            cursorGlow.style.top = e.clientY + 'px';
        });
    });

    // ----------------------------------------
    // Scroll Animation using Intersection Observer
    // ----------------------------------------
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((element, index) => {
        // カードなどは出現タイミングをずらす（Stagger効果）
        if (element.classList.contains('card')) {
            element.style.transitionDelay = `${index * 0.15}s`;
        }
        observer.observe(element);
    });

    // ----------------------------------------
    // 3D Tilt Effect on Cards
    // ----------------------------------------
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = ((y - centerY) / centerY) * -8; // 最大8度の傾き
            const tiltY = ((x - centerX) / centerX) * 8;
            
            card.style.transform = `translateY(-10px) scale(1.02) perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            card.style.transition = 'transform 0.1s ease, box-shadow 0.4s ease'; // マウス追従は素早く
        });
        
        card.addEventListener('mouseleave', () => {
             card.style.transform = `translateY(0) scale(1) perspective(1000px) rotateX(0deg) rotateY(0deg)`;
             card.style.transition = 'transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)'; // 戻るときは滑らかに
        });
    });

    // ----------------------------------------
    // Parallax Scroll Effect
    // ----------------------------------------
    const bg1 = document.querySelector('.bg-gradient');
    const bg2 = document.querySelector('.bg-gradient-2');
    const heroContent = document.querySelector('.hero');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        // 背景の光をスクロールに合わせて動かす（視差効果）
        if (bg1) bg1.style.transform = `translate(${scrolled * 0.1}px, ${scrolled * 0.3}px)`;
        if (bg2) bg2.style.transform = `translate(${scrolled * -0.1}px, ${scrolled * -0.2}px)`;
        
        // ヒーローセクションをスクロールで微細にフェードと移動
        if (heroContent && scrolled < 600) {
            heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
            heroContent.style.opacity = 1 - (scrolled / 500);
        }
    });
});
