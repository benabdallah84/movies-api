const express = require('express');
const router = express.Router();
const controller = require('../controllers/watchListController');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
/* GET home page. */
router.post('/', [auth.check,admin.check], controller.add);
router.delete('/:id',[auth.check,admin.check], controller.delete);
router.get('/', [auth.check,admin.check], controller.list);

module.exports = router;