CREATE DATABASE Edin_DB;

USE Edin_DB;

CREATE TABLE Operations(
	idOperation INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    number1 INT,
    sign VARCHAR(1),
    number2 INT,
    result INT,
    answer INT
);

DELIMITER //
CREATE PROCEDURE SP_Operate(
_number1 INT,
_sign VARCHAR(1),
_number2 INT,
_answer BOOL
)
BEGIN
	IF _sign = "+" THEN
		SET @result = (SELECT _number1 + _number2);
		INSERT INTO Operations(number1,sign,number2,result,answer) VALUES (_number1,_sign,_number2,@result,_answer);
		SET @idOperation = LAST_INSERT_ID();
		SELECT * FROM Operations WHERE idOperation = @idOperation;
	ELSEIF _sign = "-" THEN
		SET @result = (SELECT _number1 - _number2);
		INSERT INTO Operations(number1,sign,number2,result,answer) VALUES (_number1,_sign,_number2,@result,_answer);
		SET @idOperation = LAST_INSERT_ID();
		SELECT * FROM Operations WHERE idOperation = @idOperation;
	ELSEIF _sign = "*" THEN
		SET @result = (SELECT _number1 * _number2);
		INSERT INTO Operations(number1,sign,number2,result,answer) VALUES (_number1,_sign,_number2,@result,_answer);
		SET @idOperation = LAST_INSERT_ID();
		SELECT * FROM Operations WHERE idOperation = @idOperation;
	ELSEIF _sign = "/" THEN    
		SET @result = (SELECT _number1 / _number2);
		INSERT INTO Operations(number1,sign,number2,result,answer) VALUES (_number1,_sign,_number2,@result,_answer);
		SET @idOperation = LAST_INSERT_ID();
		SELECT * FROM Operations WHERE idOperation = @idOperation;        
	END IF;
 END//
DELIMITER ;
