const express = require('express')
const router = express.Router();
const productController = require('../Controllers/ProductController')
const multer = require('multer');
const verifyJWT = require('../Middleware/VerifyJwt');

const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now());
    },
  });

  const uploads = multer({ storage: storage });

router.post('/createProduct/:id', uploads.single('imageProduct'), productController.createProduct);

router.post('/updateProduct/:id',uploads.single('imageProduct'), productController.updateProduct);

router.get('/userProducts/:id',verifyJWT, productController.getCreatorsProducts);

router.get('/get_all_products', productController.getAllProducts);

module.exports = router;