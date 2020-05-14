'use strict';
const fs = require('fs');

module.exports = (app) => {
    app.get('/demo',(req,res) => {
        let operation;

        if(fs.existsSync('src/docs/operation.json')){
            fs.readFile('src/docs/operation.json', 'utf8', (err, jsonString) => {
                if (err) {
                    throw err;
                }
                operation = JSON.parse(jsonString);
                if(operation.response != undefined){
                    res.status(200).json({operation: operation,action:true});
                }else{
                    res.status(200).json({message: "Esperando Respuesta",action:false});
                }
            })
        }else{
            res.status(200).json({message: "No existe ninguna operacion"});
        }
    });

    app.post('/demo',(req,res) => {
        let operation = {
            number1: req.body.number1,
            sign: req.body.sign,
            number2: req.body.number2,
            result: req.body.result,
            response: req.body.response
        }

        let data = JSON.stringify(operation,null,2);
        fs.writeFile('src/docs/operation.json',data,(err) => {
            if (err) throw err;
            res.status(200).json({message: 'Operacion Realizada', operation: operation});
        }); 
    });

    app.post('/response',(req,res) => {
        let data;
        let operation;
        
        if(fs.existsSync('src/docs/operation.json')){
            fs.readFile('src/docs/operation.json', 'utf8', (err, jsonString) => {
                if (err) {
                    console.log(err);
                    return
                }
                operation = JSON.parse(jsonString);
                operation.response = req.body.response;
                data = JSON.stringify(operation,null,2);
                fs.writeFile('src/docs/operation.json',data,(err) => {
                    if (err) throw err;
                    res.status(200).json({operation: operation})
                }); 
            });
        }else{
            res.status(200).json({message: "No existe ninguna operacion"});
        }
    });

    app.get('/operation',(req,res) => {
        let operation;
        fs.readFile('src/docs/operation.json', 'utf8', (err, jsonString) => {
            if (err) {
                throw err;
            }
            operation = JSON.parse(jsonString);
            if(operation != undefined){
                res.status(200).json({operation: operation});
            }else{
                res.status(200).json({message: "No existe ninguna operacion"});
            }
        });
    });
}