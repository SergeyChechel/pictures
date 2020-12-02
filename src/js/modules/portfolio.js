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
        
        contents.forEach(block => {
            block.classList.add('animated', 'fadeIn');
            block.style.display = 'block';
            if(tab.classList[0] !== 'all' && tab.classList[0] !== block.classList[2]) {
                block.style.display = 'none';
            }
            if(tab.classList[0] === 'grandmother' || tab.classList[0] === 'granddad') {
                block.style.display = 'none';
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
