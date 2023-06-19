const indexR = require("./index");
const usersR = require("./users");
const ourProjectsR = require("./ourProjects");
const projectsR = require("./projects");
const productsR = require("./products");
const contactR = require("./contact");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/ourProjects", ourProjectsR);
  app.use("/projects", projectsR);
  app.use("/products", productsR);
  app.use("/contact", contactR);

  app.use("*", (req, res) => {
    res.status(404).json({ msg: "endpoint not found , 404", error: 404 });
  });
};
