const checkTextInputs = (selector) => {

    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {

        input.addEventListener('keypress', (e) => {
            if(e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }
        });

        input.addEventListener('change', () => {
            const val = input.value;
            for(let i = 0; i < val.length; i++) {
                const flag = val[i].match(/[а-яё0-9]/ig);
                // let flag = (/[а-яё0-9]/ig).test(sym);
                if(!flag) {
                    input.value = '';
                    break;
                }
            }
        });
    });
};

export default checkTextInputs;

