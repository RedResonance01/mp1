/* Your JS here. */
console.log('Hello World!')

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initCarousel();
    initModal();
});

function initNavbar() {
    const navBar = document.querySelector('.nav-bar-container');
    const navLinks = Array.from(document.querySelectorAll('.nav-menu a.links'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter((section) => section !== null);

    const SCROLL_THRESHOLD = 40;

    const setActiveLink = () => {
        const navHeight = navBar.getBoundingClientRect().height;
        const scrolledToBottom =
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

        let currentIndex = 0;
        sections.forEach((section, index) => {
            if (section.getBoundingClientRect().top - navHeight <= 1) {
                currentIndex = index;
            }
        });

        if (scrolledToBottom) {
            currentIndex = sections.length - 1;
        }

        navLinks.forEach((link, index) => {
            link.classList.toggle('active', index === currentIndex);
        });
    };

    const onScroll = () => {
        navBar.classList.toggle('scrolled', window.scrollY > SCROLL_THRESHOLD);
        setActiveLink();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}

function initCarousel() {
    const track = document.getElementById('carousel-track');
    if (!track) return;

    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    const dotsContainer = document.getElementById('carousel-dots');

    let currentSlide = 0;

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.classList.add('dot');
        dot.type = 'button';
        dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    function goToSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
    }

    prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));

    goToSlide(0);
}

function initModal() {
    const overlay = document.getElementById('info-modal-overlay');
    const openBtn = document.getElementById('learn-more-btn');
    const closeBtn = document.getElementById('info-modal-close');
    if (!overlay || !openBtn || !closeBtn) return;

    const openModal = () => overlay.classList.add('open');
    const closeModal = () => overlay.classList.remove('open');

    openBtn.addEventListener('click', openModal);
    closeBtn.addEventListener('click', closeModal);

    overlay.addEventListener('click', (event) => {
        if (event.target === overlay) closeModal();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') closeModal();
    });
}
