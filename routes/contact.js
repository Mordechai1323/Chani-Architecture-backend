const express = require('express');
const { validateContact } = require('../models/contact');
const { newCustomerInquiry } = require('../middlewares/sendEmail');
const router = express.Router();

router.post('/', async (req, res) => {
  const validBody = validateContact(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    newCustomerInquiry(req.body);
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

module.exports = router;
