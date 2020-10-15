const modals = (state) => {
    
    let btnPressed = false;  
    function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
        const trigger = document.querySelectorAll(triggerSelector),
            modal = document.querySelector(modalSelector),
            close = document.querySelector(closeSelector),
            scroll = calcScroll();
        
        trigger.forEach(el => {
            el.addEventListener('click', (e) => {
                if(e.target) {
                    e.preventDefault();
                }
                btnPressed = true;
                if(destroy) {el.remove();}
                if(triggerSelector === '.popup_calc_btn') {
                    for (let key in state) {
                        delete state[key];
                    } 
                }
                if(triggerSelector === '.popup_calc_button') {
                    if(!validate(state, '.popup_calc')) {
                        addStatusMessage('.popup_calc_content', 'info');
                        return;
                    };
                }
                if(triggerSelector === '.popup_calc_profile_button') {
                    if(!validate(state, '.popup_calc_profile')) {
                        addStatusMessage('.popup_calc_profile_content', 'info');
                        return;
                    };
                }
                closeModal();
                modal.style.display = "block";
                document.body.style.marginRight = `${scroll}px`;
                document.body.style.overflow = "hidden";
            });
        });

        modal.addEventListener('click', (e) => {
            if(e.target == modal) {
                closeModal();
            }
        });

        close.addEventListener('click', () => {
            closeModal();
        });
    }

    function validate(state, modalSelector) {
        let flag = true;
        const st = JSON.stringify(state);
        if(st == '{}') {flag = false;}
        if(modalSelector == '.popup_calc') {
            const keys = Object.keys(state);
            if(!keys.includes('form') || !keys.includes('width') || !keys.includes('height')) {
                flag = false;
            }
        }
        if(modalSelector == '.popup_calc_profile') {
            const keys = Object.keys(state);
            if(!keys.includes('type') || !keys.includes('profile')) {
                flag = false;
            }
        }
        return flag;
    }

    function showModalByTime(triggerSelector, delay) {
        setTimeout(() => {
            let flag = false;
            const modals = document.querySelectorAll('[data-modal]');
            modals.forEach(el => {
                if(getComputedStyle(el).display !== 'none') {
                    flag = true;
                }
            });
            if(flag) {return}
            const event = new Event('click');
            document.querySelector(triggerSelector).dispatchEvent(event);
        }, delay);
    }

    function openByScroll(selector) {
        const html = document.documentElement;
        const body = document.querySelector('body');
        window.addEventListener('scroll', () => {
            if((html.scrollTop + window.innerHeight == body.scrollHeight) && !btnPressed) {
                const event = new Event('click');
                document.querySelector(selector).dispatchEvent(event);
            }
        });
    }

    bindModal('.button-design', '.popup-design', '.popup-design .popup-close');
    bindModal('.button-consultation', '.popup-consultation', '.popup-consultation .popup-close');
    bindModal('.fixed-gift', '.popup-gift', '.popup-gift .popup-close', true);
    // showModalByTime('.button-consultation', 5000);
    openByScroll('.fixed-gift');

};

export function calcScroll() {
    let div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';

    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;

}

export function closeModal(modalWindowSelector = "[data-modal]") {
    const windows = document.querySelectorAll(modalWindowSelector);
    windows.forEach(item => {
      item.style.display = 'none';
      item.classList.add('animated', 'fadeIn');  
    });

    document.body.style.marginRight = `0px`;
    document.body.style.overflow = "";
}

export default modals;