const mask = function(selector) {
  
    function createMask(event) {
        let matrix = '+7 (___) ___ __ __',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');

        if(def.length >= val.length) {
            val = def;
        }
        this.value = matrix.replace(/./g, (sym) => {
            return /[_\d]/.test(sym) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : sym;
        });

        if (event.type === 'blur') {
            if (this.value.length == 2) {
                this.value = '';
            }
        } else {
            setCursorPosition(this.value.length, this);
        }
    }

    let setCursorPosition = (pos, elem) => {
        elem.focus();
        if(elem.setSelectionRange) {
            elem.setSelectionRange(pos, pos);
        } else if(elem.createTextRange) {
            let range = elem.createTextRange();
            range.collapse(true);
            range.moveStart('caracter', pos);
            range.moveEnd('caracter', pos);
            range.select();
        }
    };

    let inputs = document.querySelectorAll(selector);

    inputs.forEach(function(input) {
        input.addEventListener('input', createMask);
        input.addEventListener('focus', createMask);
        input.addEventListener('blur', createMask);
    });

}

export default mask;

