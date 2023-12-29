const {Router} = require('express')
const router = Router()

const { updateCortes, viewCortes } = require('../controller/gerenteController')

router.post('/gerente/cortes/ver', viewCortes)
router.post('/gerente/cortes/modificar', updateCortes)

module.exports = router




