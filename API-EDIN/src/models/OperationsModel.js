var pool = require('../db/connection');

let operationsModel = {};

operationsModel.operate = (Operation) => {
    console.log(Operation);
    return new Promise((resolve,reject) => {
        pool.getConnection((err,connection) => {
            if (err) {
                console.log(err);
            } else {
                const sql = "CALL SP_Operate(?,?,?,?)";

                connection.query(sql,[Operation.number1,Operation.sign,Operation.number2,Operation.answer],(err,results) => {
                    if(err){
                        return reject(err);
                    }else{
                        return resolve(results[0]);
                    }
                })
            }
            connection.release();
        })
    });
}

operationsModel.getAll = () => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                console.log(err);
            } else {
                connection.query('SELECT * FROM Operations',
                    (err, results) => {
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(results);
                        }
                    });
            }
            connection.release();
        });
    })
}

module.exports = operationsModel;