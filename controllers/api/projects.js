const Project = require ("../../models/projects")

async function create(req, res){
    try {
        
        const project = await Project.create(req.body)
        console.log(req.body)
        res.json(project)

    } catch (error) {
        res.status(400).json(error)
    }
}

async function listProjects(req, res){
    const projects = await Project.find({})

    res.json(projects)

    console.log(projects)
}





module.exports = {create, listProjects}