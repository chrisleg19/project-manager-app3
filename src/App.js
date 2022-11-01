
import {useState, useEffect} from "react"
import {Route, Routes} from "react-router-dom"
import {getUser} from "./utilities/users-service"
import AuthPage from "./pages/AuthPage";
import NewOrderPage from "./pages/NewOrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import NavBar from "./components/NavBar";
import './App.css';

function App() {
//change the null to a blank object {} for a truthy value...(testing at the beginning of build)
//after creating token and getUser(), import and use it as initial state
const [user, setUser] = useState(getUser())

  return (
    <main className="App">
      {user ? (
      <>
      <NavBar user={user} />
      <Routes>
        <Route path="/orders/new" element={<NewOrderPage/>}/>
        <Route path="/orders" element={<OrderHistoryPage/>}/>
      </Routes> 
      </> )
      : 
      <AuthPage/>}
      
    </main>
  );
}

export default App;
