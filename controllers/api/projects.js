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

//Not sure if i need a findById() first with GET method before attempting PUT.
async function updateProject(req, res){
    const projectUpdated = await Project.findByIdAndUpdate(req.params.id, req.body, { returnDocument: "after" }
    )
    res.json(projectUpdated)
    
}


async function deleteProject(req, res){
    await Project.findByIdAndRemove(req.params.id)
}


module.exports = {create, listProjects, updateProject, deleteProject}