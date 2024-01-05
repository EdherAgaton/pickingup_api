const {Router} = require('express')
const router = Router()

const { updateCortes, viewCortes, postDeposito } = require('../controller/gerenteController')

router.post('/gerente/cortes/ver', viewCortes)
router.post('/gerente/cortes/modificar', updateCortes)
router.post('/gerente/cortes/deposito', postDeposito)

module.exports = router




