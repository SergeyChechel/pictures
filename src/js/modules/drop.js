import {postData} from '../services/requests';

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

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');
            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.textContent = name;
            if (input.id === 'dropsend') {
                postData('assets/server.php', input.files)
                .then(res => {
                    console.log(res);
                })
                .catch(() => {
                    console.log('Ошибко');
                })
                .finally(() => {
                    console.log('Finally');
                });
            }
        });
        
    });
};

export default drop; 