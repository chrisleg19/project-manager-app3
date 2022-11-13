const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const deliverable = new Schema({
    deliverableName: {type: String},
    deliverableBody: {type: String},
    estimatedCost: {type: Number},
    actualCost: {type: Number},
    estimatedTime: {type: Number},
    actualTime: {type: Number}
})

const constraint = new Schema ({
    constraintName:{type: String},
    constraintBody: {type: String},
    showStopper: {type: Boolean}
})


const projectSchema = new Schema({
    title: {type: String, required: true, unique: true},
    client: {type: String, required: true},
    budget: {type: Number, required: true},
    targetDate: {type: Date, required: true},
    deliverables: [deliverable],
    constraints: [constraint]
    
})

module.exports = mongoose.model("Project", projectSchema)