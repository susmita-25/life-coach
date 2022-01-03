import { BrowserRouter as Router,Routes, Route, Link,Switch } from 'react-router-dom';
import './App.css';
import Login from './login';
import FadeMenu from './Models/events';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Router>
           <div className="App">
           <Routes>
                 <Route exact path='/' element={< Login />}></Route>
                 <Route exact path='/FadeMenu' element={< FadeMenu />}></Route>
                 {/* <Route exact path='/contact' element={< Contact />}></Route> */}
          </Routes>
          </div>
       </Router>
      </header>
    </div>
  );
}

export default App;
