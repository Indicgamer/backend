const express = require('express');
const {addProdController,allProdOfUserController, prodAllController,} = require('../controller/prodController');


const router = express.Router();



router.post('/add',addProdController);
router.get("/all/:name",allProdOfUserController);
router.get("/all",prodAllController);



module.exports = router;