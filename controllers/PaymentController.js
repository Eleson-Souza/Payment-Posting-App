const Payment = require('../models/Payment');
const PaymentService = require('../services/PaymentService');
const xlsx = require('xlsx');
const uploadImageMiddleware = require('../middlewares/uploadImage');
const UploadService = require('../services/UploadService');

class PaymentController {

    async index(req, res) {
        
        let payments = await Payment.findAll();

        payments.forEach(pay => {
            pay.value = PaymentService.formatValue(pay.value);
            pay.tax = PaymentService.formatTax(pay.tax);
        });

        res.render('index', { payments });

    }
    
    create(req, res) {
        res.render('payment/create');
    }

    async createAction(req, res) {

        let { title, value, date_payment, tax, comments } = req.body;        
        let dataPay = { title, value, date_payment, tax, comments };

        let response = PaymentService.validate(dataPay);

        if(response.error.status == false) {

            await Payment.create(response.data);
            res.redirect('/');

        } else {
            res.json(response);
        }

    }

    async update(req, res) {
        const {id} = req.params;

        let payment = await Payment.findOne({ where: { id: id } });

        if(payment) {
            res.render('payment/update', { payment });
        } else {
            console.log('Pagamento inexistente!');
        }
    }

    async updateAction(req, res) {
        const {id} = req.params;
        const { title, value, date_payment, tax, comments } = req.body;
        let dataPay = { title, value, date_payment, tax, comments };

        try {

            // executando função que retorna os dados validados.
            let response = PaymentService.validate(dataPay);

            // verifica se o status de erro é falso ou verdadeiro e aplica as devidas ações.
            if(response.error.status == false) {
                await Payment.update({
                    ...response.data,
                    updatedAt: Date.now()
                }, { where: { id: id } });
    
                res.redirect('/');
            } else {
                res.json(response);
            }

        } catch(error) {
            console.log('Houve um erro ao atualizar: ' + error);
        }
    }

    async delete(req, res) {
        const {id} = req.body;

        try {

            await Payment.destroy({
                where: {
                    id: id
                }
            });
    
            res.redirect('/');

        } catch(error) {
            console.log('Erro ao deletar pagamento: ' + error);
        }
    }

    upload(req, res) {
        res.render('payment/upload');
    }

    uploadAction(req, res) {
        let filename = uploadImageMiddleware.filename.newFileName;

        // Gerando dados do excel para o formato Json.
        let data = UploadService.generateExcelByJson(filename);

        // percorrendo dados retornados e criando um vetor de objetos para salvar no banco.
        let payments = [];
        data.forEach((register, index) => {
            payments.push({
                title: register['Título'],
                value: register['Valor'],
                date_payment: register['Data do Lançamento'],
                comments: register['Observações']
            });
            
            let date = new Date(`${payments[index].date_payment}`);
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();

            payments[index].date_payment = year + '-' + ('0'+month).slice(-2) + '-' + ('0'+day).slice(-2);
        });
        
        // Inserindo dados no banco.
        payments.forEach(async (pay) => {

            await Payment.create({
                title: pay.title,
                value: pay.value,
                date_payment: pay.date_payment,
                tax: 5,
                comments: pay.comments
            });

        });

        res.redirect('/');
    }

}

module.exports = new PaymentController;