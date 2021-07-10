const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.send('PRODUCT API Version 1');
});

router.use('/main-category', require('./category.routes'));

router.use((err, req, res) => {
  if (err)
    res.status(500).json({
      status: false,
      error: 'Something went wrong',
    });
});
module.exports = router;
