const Router = require('express')
const router = new Router()
const cityController = require('../controllers/cityController')
const checkRole = require('../middleware/checkRoleMiddleware')
const {body} = require('express-validator')

router.post('/', checkRole('ADMIN'), body('name').isString(), cityController.create)
router.put('/:id', checkRole('ADMIN'), body('name').isString(), cityController.update)
router.delete('/:id', checkRole('ADMIN'), cityController.delete)

router.get('/', cityController.getAll)


module.exports = router
