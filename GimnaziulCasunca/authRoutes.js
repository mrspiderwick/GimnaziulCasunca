const Router = require('express')
const router = new Router()
const controller = require('./authController')

router.post('/registration', controller.registration)
router.post('/login', controller.login)
router.get('/users', controller.getUsers)
router.post('/newstud', controller.addstudent)
// router.post('/modstud/:idnp', controller.modifystudent)
router.get('/elevi', controller.getElevi)
router.get('/elev/:idnp', controller.getElev)
router.put('/modstud/:idnp', controller.postElev)
router.delete('/delstud/:idnp', controller.deleteElev)


module.exports = router