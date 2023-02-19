const express = require('express');
const router = express.Router();
const controller = require('../controllers/movieControllers');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
/* GET home page. */
router.post('/', [auth.check,admin.check], controller.create);
router.put('/:id',[auth.check,admin.check], controller.update);
router.delete('/:id', [auth.check,admin.check], controller.delete);

router.get('/', [auth.check], controller.list);
router.get('/:id', [auth.check], controller.find);
router.get('/:id/reviews', [auth.check], controller.reviews);
router.post('/:id/reviews', [auth.check], controller.addReview);


module.exports = router;