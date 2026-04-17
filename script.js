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
    fadeElements.forEach(element => {
        observer.observe(element);
    });
});
