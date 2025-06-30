document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero-sec');

    if (!navbar || !hero) {
        console.warn('Navbar or hero element not found');
        return; 
    }

    function changeNavbarOnScroll() {
        const heroHeight = hero.offsetHeight;
        const scrollThreshold = heroHeight - 100;

        if (window.scrollY > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', changeNavbarOnScroll);
    changeNavbarOnScroll();
});
