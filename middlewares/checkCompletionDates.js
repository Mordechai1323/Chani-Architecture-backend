const { ProjectModel } = require('../models/projectModel');
const { UserModel } = require('../models/userModel');
const { remainderProjects } = require('./sendEmail');

exports.checkCompletionDates = async () => {
  const currentDate = new Date();

  const reminderDate = new Date(currentDate);
  reminderDate.setDate(reminderDate.getDate() + 3);

  const projectsToRemind = await ProjectModel.find({ completion_date: { $lte: reminderDate } });

  projectsToRemind.forEach(async (project) => {
    const user = await UserModel.findOne({ _id: project.user_id });
    remainderProjects(user.email, project.project_name);
  });
};
