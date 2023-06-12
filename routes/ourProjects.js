const express = require('express');
const { OurProjectModel, validateOurProject } = require('../models/ourProjectModel');
const { authAdmin } = require('../middlewares/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  let perPage = Number(req.query.perPage) || 12;
  let page = Number(req.query.page) || 1;
  let sort = req.query.sort || '_id';
  let reverse = req.query.reverse == 'true' ? -1 : 1;
  let search = req.query.s;
  let searchExp = new RegExp(search, 'i');
  try {
    const ourProject = await OurProjectModel.find({ name: searchExp })
      .limit(perPage)
      .skip(perPage * (page - 1))
      .sort({ [sort]: reverse });

    res.json(ourProject);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get('/:projectID', async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const ourProject = await OurProjectModel.findOne({ _id: projectID });

    res.json(ourProject);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post('/', authAdmin, async (req, res) => {
  const validBody = validateOurProject(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const ourProject = new OurProjectModel(req.body);
    await ourProject.save();

    res.status(201).json(ourProject);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

// TO DO
// router.post('/uploadImage', auth, async (req, res) => {
//     try {
//       upload(req, res, async (err) => {
//         if (err || !req.file) {
//           console.log('err :' + err);
//           return res.status(400).json({ err: 'only image' });
//         } else {
//           let updateData = await UserModel.updateOne({ _id: req.tokenData._id }, { img_url: 'usersImg/' + req.file.filename });
//           res.json(updateData);
//         }
//       });
//     } catch (err) {
//       console.log(err);
//       res.status(502).json(err);
//     }
//   });

module.exports = router;
