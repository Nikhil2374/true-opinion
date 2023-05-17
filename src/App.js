import {
  BrowserRouter as Router,
  Routes ,
  Route
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"

//Importing pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Forms from "./pages/Forms"
import Fill from "./pages/Fill"
import Submissions from "./pages/Submissions"
import Edit from "./pages/Edit"

export default function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
          <div className="container main">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route path="/create" element={<Create/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/signup" element={<Signup/>} />
              <Route path="/forms" element={<Forms/>} />
              <Route path="/edit/:id" element={<Edit/>}/>
              <Route path="/fill/:id" element={<Fill/>} />
              <Route path="/submissions/:id" element={<Submissions/>} />
            </Routes>
          </div>
        </Router>
        <Footer />
    </div>
  )
}

