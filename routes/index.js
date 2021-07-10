const express = require('express');

const router = express.Router();
router.get('/', (req, res) => {
  res.send('TODO API Version 1');
});

router.use('/todo', require('./todo.routes'));

router.use((err, req, res) => {
  if (err)
    res.status(500).json({
      status: false,
      error: 'Something went wrong',
    });
});
module.exports = router;
