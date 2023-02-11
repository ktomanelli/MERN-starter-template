import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "./Components/Login";
import ProtectedRoute from "./Components/ProtectedRoute";
import Signup from "./Components/Signup";
import Error from "./Pages/Error";
import Home from './Pages/Home';

function App() {
  return <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/error" element={<Error/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
          {/* <Route path="/login/:oAuthStateToken" element={<Login/>}/> */}
        {/* </Route> */}
        <Route path="/" element={<ProtectedRoute>
            <Home/>
          </ProtectedRoute>
        }/>
      </Routes>
    </div>
  </Router>
}

export default App;
