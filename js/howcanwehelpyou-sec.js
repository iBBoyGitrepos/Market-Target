document.addEventListener('DOMContentLoaded', function () {
    const icons = document.querySelectorAll('.icon');
    const helps = document.querySelectorAll('.help');

    function setActive(index) {
        // Set active icon
        icons.forEach(i => i.classList.remove('active'));
        if (icons[index]) icons[index].classList.add('active');

        // Set active h3
        helps.forEach(h => h.classList.remove('active'));
        if (helps[index]) helps[index].classList.add('active');
    }

    // Click on icon
    icons.forEach((icon, index) => {
        icon.addEventListener('click', function () {
            setActive(index);
        });
    });

    // Click on h3
    helps.forEach((help, index) => {
        help.addEventListener('click', function () {
            setActive(index);
        });
    });
});
