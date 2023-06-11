const indexR = require("./index");
const usersR = require("./users");
const ourProjectsR = require("./ourProjects");
const projectsR = require("./projects");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/ourProjects", ourProjectsR);
  app.use("/projects", projectsR);

  app.use("*", (req, res) => {
    res.status(404).json({ msg: "endpoint not found , 404", error: 404 });
  });
};
