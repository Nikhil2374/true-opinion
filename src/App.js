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

export default function App() {
  return (
    <div className="App">
        <Router>
          <Navbar />
            <Routes>
              <Route exact path="/" component={Home} />
              <Route path="/create" component={Create} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/forms" component={Forms} />
              <Route path="/fill/:id" component={Fill} />
              <Route path="/submissions/:id" component={Submissions} />
            </Routes>
          
        </Router>
        <Footer />
    </div>
  );
}
//<div className="container main"></div>
