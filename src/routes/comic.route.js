const express = require('express');
const router = express.Router();
const controller = require('../controllers/comic.controller');
const { multer } = require('../configs/firestore.configs');

router.post('/add/new', multer.any(), controller.addNew);

router.get('/add', controller.add);
router.get('/home', controller.home);
router.get('/api/home', controller.listComic);



module.exports = router;