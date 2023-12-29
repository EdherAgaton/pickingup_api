const express = require('express')
const app = express()

//middleware 

app.use(express.json());
app.use(express.urlencoded({extended : true  }));




//
app.use(require('./routes/usersRoutes'))
app.use(require('./routes/gerentesRoutes'))

app.listen(3000);
console.log('Servidor en el puerto 3000');
