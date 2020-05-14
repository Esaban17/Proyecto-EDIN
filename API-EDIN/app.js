const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

//SETTINGS
app.set('port', process.env.PORT || 3000);

//MIDDLEWARES
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

//CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//RUTAS
require('./src/routes/DemoRoutes')(app);

app.listen(app.get('port'), () => {
    console.log(`Servidor Corriendo en el Puerto ${app.get('port')}`);
});







