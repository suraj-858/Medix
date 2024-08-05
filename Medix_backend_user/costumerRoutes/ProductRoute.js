const express = require('express')
const router = express.Router();
const productController = require('../Controllers/ProductController')
const multer = require('multer');
const verifyJWT = require('../Middleware/VerifyJwt');

const storage = multer.diskStorage({
    destination: './tmp/',
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now());
    },
  });

  const uploads = multer({ storage: storage });

router.post('/createProduct/:id', uploads.single('imageProduct'), productController.createProduct);

router.post('/updateProduct/:id',uploads.single('imageProduct'), productController.updateProduct);

router.get('/userProducts/:id',verifyJWT, productController.getCreatorsProducts);

router.get('/get_all_products', productController.getAllProducts);

router.get('/get_latest_products', productController.getLatestProducts)

router.get('/search_result', productController.searchProducts)

module.exports = router;