const portfolio = (tabs, contentItem) => {

    const tbs = document.querySelectorAll(tabs),
          contents = document.querySelectorAll(contentItem);

    tbs.forEach(tab => {
        tab.addEventListener('click', () => {
            activate(tab);
        });
    });

    function showTabContent(tab) {
        const portfolioNo = document.querySelector('.portfolio-no');
        portfolioNo.classList.add('animated', 'fadeIn');
        portfolioNo.style.display = 'none';
        contents.forEach(el => {
            el.classList.add('animated', 'fadeIn');
            el.style.display = 'block';
            if(tab.classList[0] !== 'all' && tab.classList[0] !== el.classList[2]) {
                el.style.display = 'none';
            }
            if(tab.classList[0] === 'grandmother' || tab.classList[0] === 'granddad') {
                el.style.display = 'none';
                portfolioNo.style.display = 'block';
            }
        });
    }
    
    function activate(tb) {
        tbs.forEach(tab => {
            tab.classList.remove('active');
        });
        tb.classList.add('active');
        showTabContent(tb);
    }

};

export default portfolio;
