const sizes = (imgSelector) => {

    const blocks = document.querySelectorAll(imgSelector);
  
    blocks.forEach(block => {

        let img, path, p;

        block.addEventListener('mouseenter', (e) => {
            p = e.target.querySelectorAll('p:not(.sizes-hit)');
            p.forEach(el => {
                el.style.display = 'none';
            });
            img = block.querySelector('img');
            img.classList.remove('animated', 'fadeOut');
            img.classList.add('animated', 'fadeIn');
            path = img.src;
            const split = path.split('.');
            const pathNew = split[0] + '-1' + '.' + split[1];
            img.src = pathNew;
        });

        block.addEventListener('mouseleave', () => {
            img.classList.remove('animated', 'fadeIn');
            p.forEach(el => {
                el.style.display = 'block';
            });
            img.src = path;
        });
    });

};

export default sizes;
