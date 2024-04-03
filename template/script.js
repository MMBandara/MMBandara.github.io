const navLinks = document.querySelectorAll('.menu ul li a');


navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
        event.preventDefault();
        
        navLinks.forEach(link => {
            link.classList.remove('active');
        });

        this.classList.add('active');
    });
});

