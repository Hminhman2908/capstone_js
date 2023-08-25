const items = document.querySelectorAll('.item');

items.forEach(item => {
    item.addEventListener('click', () => {
        const link = item.querySelector('a').getAttribute('href');
        window.location.href = link;
    });
});

