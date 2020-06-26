class PaymentService {
    validate(data) {
        let { title, value, date_payment, tax, comments } = data
        value = parseFloat(value.replace(',', '.'));
        
        let errors = {};
        let countErr = 0;

        // validação de título
        if(!title) {

            errors.title_msg = 'O campo título é de preenchimento obrigatório!';
            countErr++;

        } else if(!(title.length >= 5 && title.length <= 100)) {

            errors.title_msg = 'Título inválido, ele deve conter entre 5 e 100 caracteres!';
            countErr++;

        }

        // validação do valor
        if(!value) {

            errors.value_msg = 'O campo valor é de preenchimento obrigatório!';
            countErr++;

        } else if(isNaN(value)) {

            errors.value_msg = 'Valor inválido, ele deve ser um número!';
            countErr++;

        }

        // validação da data
        if(!date_payment) {
            errors.date_msg = 'O campo data é de prenchimento obrigatório!';
            countErr++;
        }

        // retornando erros ou dados em um objeto.
        if(countErr > 0) {
            return { ...errors, error: {status: true} };
        } else {
            date_payment = this.formatDateYmd(date_payment);

            value = (value * (1 + (Number(tax)/100))).toFixed(2);

            return { 
                data: {
                    title, 
                    value: Number(value), 
                    date_payment, 
                    tax, 
                    comments, 
                },
                error: {
                    status: false 
                }
            };

        }
    }

    // convertendo data no formato YYYY-MM-DD
    formatDateYmd(date) {        
        let day = date.split('/')[0];
        let month = date.split('/')[1];
        let year = date.split('/')[2];

        return year + '-' + ("0"+month).slice(-2) + '-' + ("0"+day).slice(-2);
    }

    // convertendo data no formato DD-MM-YYYY
    formatDateDmy(date) {
        let day = date.split('-')[2];
        let month = date.split('-')[1];
        let year = date.split('-')[0];
        
        return (("0"+day).slice(-2) + '-' + ("0"+month).slice(-2) + '-' + year).toString();
    }

    formatValue(value) {
        return `R$ ${value.replace('.', ',')}`;
    }

    formatTax(tax) {
        return `${(tax).toString().replace('.', ',')}%`;
    }
    
}

module.exports = new PaymentService;