import {postData} from '../services/requests';
import {closeModal} from './modals';
import {calcSum} from './calc';

const forms = () => {
    const form = document.querySelectorAll('form'),
          upload = document.querySelectorAll('[name="upload"]');
    let error = false;
    
    const message = {
        prevent: 'Для расчета необходимо выбрать размер и материал картины',
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...',
        spinner: 'assets/img/spinner.gif',
        ok: 'assets/img/ok.png',
        fail: 'assets/img/fail.png'
    };

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };
    
    upload.forEach(item => {
        item.addEventListener('input', () => {
            let dots;
            const arr = item.files[0].name.split('.');

            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            item.previousElementSibling.textContent = name;
        });
    });

    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(item);
            let statusMessage = document.createElement('div');
            let statusImg = document.createElement('img');
            let textMessage = document.createElement('div');

            if(item.classList.contains('calc_form')) {
                if (JSON.stringify(calcSum) === '{}') {
                    error = true;
                    const price = document.querySelector('.calc-price');
                    price.classList.remove('fadeOut');
                    price.classList.add('animated', 'fadeIn');
                    price.textContent = message.prevent;
                    price.style.display = 'block';
                    setTimeout(() => {
                        price.classList.remove('fadeIn');
                        price.classList.add('fadeOut');
                        setTimeout(() => {
                            price.style.display = ''
                        }, 500);
                    }, 5000);
                } else {
                    for(let key in calcSum) {
                        formData.append(key, calcSum[key]);
                    }
                    item.classList.add('animated', 'fadeOutUp');
                }
            }


            if (!error) {
                statusMessage.classList.add('status');
                item.parentNode.appendChild(statusMessage);
                
                statusImg.setAttribute('src', message.spinner);
                statusImg.classList.add('animated', 'fadeInUp');
                statusMessage.appendChild(statusImg);
    
                textMessage.textContent = message.loading;
                statusMessage.appendChild(textMessage);
            
                let api;
                item.closest('.popup-design') || item.classList.contains('calc_form') ? api = path.designer : api = path.question;

                postData(api, formData)
                .then(res => {
                    console.log(res);

                        statusImg.setAttribute('src', message.ok);
                        textMessage.textContent = message.success;
 
                    
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail);
                    textMessage.textContent = message.failure;
                })
            
            
                
            
            }


            setTimeout(() => {
                statusMessage.remove();
                item.style.display = 'block';
                item.classList.remove('fadeOutUp');
                item.classList.add('fadeInUp');
                closeModal();
                clearInputs();
            }, 5000);

            
   
           
        });
    });
};

export function clearInputs() {
    const selectOpts = document.querySelectorAll('select option');
    selectOpts.forEach(option => {
        if(option.value == "") {
            option.selected = true;
        }
    });
    
    const inputs = document.querySelectorAll('input');
    inputs.forEach(item => {
        item.value = '';
    });
    const upload = document.querySelectorAll('[name="upload"]');
    upload.forEach(item => {
        item.previousElementSibling.classList.add('animated', 'fadeIn');
        item.previousElementSibling.textContent = "Файл не выбран";
    });
};

export default forms;