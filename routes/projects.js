const express = require('express');
const { ProjectModel, validateProject, validateTask, validateEditStatus } = require('../models/projectModel');
const { authAdmin, auth } = require('../middlewares/auth');
const { UserModel } = require('../models/userModel');
const { upload } = require('../middlewares/uploadFiles');
const fs = require('fs');
const { sendEmail, informationUpdated } = require('../middlewares/sendEmail');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const projects = await ProjectModel.find({ client_id: req.tokenData._id });
    if (!projects) return res.sendStatus(400);
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get('/project/:projectID', auth, async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const projects = await ProjectModel.findOne({ _id: projectID });
    if (!projects) return res.sendStatus(400);
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.get('/myProjects', authAdmin, async (req, res) => {
  try {
    const projects = await ProjectModel.find({ user_id: req.tokenData._id });
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post('/', authAdmin, async (req, res) => {
  const validBody = validateProject(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const project = new ProjectModel(req.body);
    if (req.body.client_email) {
      const user = await UserModel.findOne({ email: req.body.client_email });
      if (!user) return res.status(401).json({ err: 'client not found' });
      project.client_id = user._id;
    }
    project.user_id = req.tokenData._id;
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post('/task/:projectID', authAdmin, async (req, res) => {
  const validBody = validateTask(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const projectID = req.params.projectID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.status(401).json({ err: 'project not found' });
    project.tasks.push({
      name: req.body.name,
      status: { name: '', style: 'rgb(121, 126, 147)' },
    });
    await project.save();

    res.sendStatus(201);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put('/:projectID', authAdmin, async (req, res) => {
  const validBody = validateProject(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const projectID = req.params.projectID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (project.client_email !== req.body.client_email) {
      const user = await UserModel.findOne({ email: req.body.client_email });
      if (!user) return res.status(401).json({ err: 'client not found' });
      project.client_id = user._id;
      await project.save();
    }
    const update = await ProjectModel.updateOne({ _id: projectID }, req.body);

    res.json(update);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

// TO DO change email
router.put('/status/:projectID', authAdmin, async (req, res) => {
  const validBody = validateEditStatus(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const projectID = req.params.projectID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.status(401).json({ err: 'project not found' });
    project.status.name = req.body.name;
    project.status.style = req.body.style;
    await project.save();

    if (project.client_email) informationUpdated(project.client_email);

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put('/task', authAdmin, async (req, res) => {
  const validBody = validateEditStatus(req.body);
  if (validBody.error) {
    return res.status(400).json(validBody.error.details);
  }
  try {
    const projectID = req.query.projectID;
    const taskID = req.query.taskID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.status(401).json({ err: 'project not found' });
    const task = project.tasks.find((task) => task._id == taskID);
    if (!task) return res.status(401).json({ err: 'task not found' });
    task.status.name = req.body.name;
    task.status.style = req.body.style;
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.put('/changeIsOpen/:projectID', authAdmin, async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.status(401).json({ err: 'project not found' });
    project.is_open = !project.is_open;
    await project.save();

    res.status(201).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.delete('/project/:projectID', authAdmin, async (req, res) => {
  try {
    const projectID = req.params.projectID;
    let project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.sendStatus(401);
    if (project.file) {
      const filePath = 'public/' + project.file;
      await fs.promises.unlink(filePath);
    }
    const deleted = await ProjectModel.deleteOne({ _id: projectID });

    res.status(200).json(deleted);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.delete('/task', authAdmin, async (req, res) => {
  try {
    const projectID = req.query.projectID;
    const taskID = req.query.taskID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.status(400).json({ err: 'project not found' });
    project.tasks.splice(project.tasks.indexOf({ _id: taskID }, 1));
    await project.save();

    res.status(200).json(project);
  } catch (err) {
    console.log(err);
    res.status(502).json({ err });
  }
});

router.post('/uploadFile/:projectID', authAdmin, async (req, res) => {
  try {
    const projectID = req.params.projectID;
    upload(req, res, async (err) => {
      if (err || !req.file) {
        console.log('err :' + err);
        return res.status(400).json({ err: 'Error: jpeg|jpg|png|gif|pdf only!' });
      } else {
        let updateData = await ProjectModel.updateOne({ _id: projectID }, { file: 'files/' + req.file.filename });
        res.json(updateData);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
});

router.post('/editFile/:projectID', authAdmin, async (req, res) => {
  try {
    const projectID = req.params.projectID;
    const project = await ProjectModel.findOne({ _id: projectID });
    if (!project.file) return res.status(400).json({ err: 'No File found' });
    const filePath = 'public/' + project.file;
    await fs.promises.unlink(filePath);
    upload(req, res, async (err) => {
      if (err || !req.file) {
        return res.status(400).json({ err: 'only File' });
      } else {
        let updateData = await ProjectModel.updateOne({ _id: projectID }, { file: 'file/' + req.file.filename });
        res.json(updateData);
      }
    });
  } catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
});

router.delete('/deleteFile/:projectID', authAdmin, async (req, res) => {
  try {
    const projectID = req.params.projectID;
    let project = await ProjectModel.findOne({ _id: projectID });
    if (!project) return res.sendStatus(401);
    if (!project.file) return res.status(400).json({ err: 'No image found' });
    const filePath = 'public/' + project.file;
    await fs.promises.unlink(filePath);
    user.file = null;
    await project.save();
    res.sendStatus(200);
  } catch (err) {
    console.log(err);
    res.status(502).json(err);
  }
});

module.exports = router;
