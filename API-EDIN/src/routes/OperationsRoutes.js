const Operations = require('../models/OperationsModel');

module.exports = (app) => {
    app.get('/Operations',(req,res) => {
        Operations.getAll().then(results => {
            if(typeof results !== 'undefined' && results.length > 0){
                res.status(200).json(results);
            }else{
                res.status(204).json({message: 'No Content'}); 
            }
        },(err) => {
            console.log(err);
            res.status(500).json(err);
        });
    });

    app.post('/Operations',(req,res) => {
        const Operation = {
            number1: req.body.number1,
            sign: req.body.sign,
            number2: req.body.number2,
            answer: req.body.answer
        }

        Operations.operate(Operation).then(results => {
            console.log(results);
            if (typeof results !== 'undefined' && results.length > 0) {
                res.status(200).json({message: 'Operacion Realizada', resultados: results});
            }else{
                res.status(204).json({message: 'No Content'}); 
            }
        },(err) => {
            console.log(err)
            res.status(500).json(err);
        });
    });
}