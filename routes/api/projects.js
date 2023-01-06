const express = require("express")
const router = express.Router()
const projectsCtrl = require('../../controllers/api/projects');

router.post("/", projectsCtrl.create)

router.get("/", projectsCtrl.listProjects)

router.put("/:id", projectsCtrl.updateDeliverable)

router.put("/:id", projectsCtrl.updateProject)


router.delete("/:id", projectsCtrl.deleteProject)


module.exports = router;