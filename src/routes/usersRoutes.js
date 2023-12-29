const {Router} = require('express')
const router = Router()

const {getUserById, probarConexion} = require('../controller/usersController')

router.get('/user', probarConexion)
router.post('/login', getUserById)

//RECORDAR QUE NECESITAS EXPORTAR LAS RUTAS PARA TENERLAS VISIBLES P/ AL SERVIDOR 
module.exports = router