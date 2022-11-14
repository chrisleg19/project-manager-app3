const express = require("express")
const router = express.Router()
const projectsCtrl = require('../../controllers/api/projects');

router.post("/", projectsCtrl.create)

router.get("/", projectsCtrl.listProjects)

router.put("/:id", projectsCtrl.updateProject)


module.exports = router;