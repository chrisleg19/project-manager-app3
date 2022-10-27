
import {useState, useEffect} from "react"
import {Route, Routes} from "react-router-dom"
import AuthPage from "./pages/AuthPage";
import NewOrderPage from "./pages/NewOrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import NavBar from "./components/NavBar";
import './App.css';

function App() {
//change the null to a blank object {} for a truthy value
const [user, setUser] = useState(null)

  return (
    <main className="App">
      {user ? (
      <>
      <NavBar/>
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
