import {postData} from '../services/requests';
import {clearInputs} from './forms';


const drop = () => {

    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.cssText = `
            border: 5px solid yellow;
            background: rgba(178, 80, 188, 0.8);
        `;
    }
    function unhighlight(item) {
        item.closest('.file_upload').style.cssText += `
            border: none;
            background: rgba(0, 0, 0, 0);
        `;
    }

    ['dragenter','dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave','drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    let mes;

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
            
            if (input.id === 'dropsend') {
                const file = new FormData();
                file.append('file', input.files[0]);
                postData('assets/server.php', file)
                    .then(res => {
                        const dropemail = document.querySelector('.dropemail');
                        mes = document.createElement('p');

                        const config = {
                            attributes: true,
                            childList: true,
                            subtree: true
                        }; 
                        const observer = new MutationObserver(callback);

                        mes.classList.remove('fadeOut');
                        mes.classList.add('animated', 'fadeIn');
                        mes.style.marginTop = '20px';
                        mes.textContent = `Ваше фото ${name} отправлено. Ждем дальнейших инструкций на email адресс выше. Спасибо!`;
                        dropemail.insertAdjacentElement('afterend', mes);
                        setTimeout(() => {
                            mes.classList.remove('fadeIn');
                            mes.classList.add('fadeOut');
                            observer.observe(mes, config);
                            mes.style.opacity = 0;
                            

                        }, 7000);
                    })
                    .catch((e) => {
                        console.log(e);
                    })
                    .finally(() => {});
            }
        });
        
    });

    const callback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // console.log('A child node has been added or removed.');
            } else if (mutation.type === 'attributes') {
                // console.log('The ' + mutation.attributeName + ' attribute was modified.');
                setTimeout(() => {
                    mes.style.display = 'none';
                    clearInputs();
                }, 1000); 
            }
        }
    };

};


export default drop; 