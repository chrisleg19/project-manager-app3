import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { getUser } from "./utilities/users-service";
import AuthPage from "./pages/AuthPage";
import NewProjectPage from "./pages/NewProjectPage";
import ProjectsPage from "./pages/ProjectsPage";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { listProjects } from "./utilities/projects-service";
import "./App.css";

function App() {
  //change the null to a blank object {} for a truthy value...(testing at the beginning of build)
  //after creating token and getUser(), import and use it as initial state
  const [user, setUser] = useState(getUser());
  const [projects, setProjects] = useState([]);
  const[deliverable, setDeliverable] = useState({
    deliverableName: "",
    deliverableBody: "",
    estimatedCost: "",
    actualCost: "",
    estimatedTime: "",
    actualTime: "",
})
const[constraint, setConstraint] = useState({
  constraintName: "",
  constraintBody: "",
  showStopper: false
})


  useEffect(() => {
    showProjects();
  }, []);

  const showProjects = async () => {
    const projectsList = await listProjects();
    setProjects([...projectsList]);
    return projects;
  };

  return (
    <main className="App">
      {user ? (
        <>
          <NavBar user={user} setUser={setUser} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects/new" element={<NewProjectPage deliverable = {deliverable} setDeliverable ={setDeliverable} constraint = {constraint} setConstraint = {setConstraint}/>} />
            <Route path="/projects" element={<ProjectsPage projects={projects} deliverable = {deliverable} setDeliverable ={setDeliverable} constraint = {constraint} setConstraint = {setConstraint}/>}/>
          </Routes>
        </>) : (<AuthPage setUser={setUser} />
      )}
    </main>
  );
}

export default App;
