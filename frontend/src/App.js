
import './App.css';
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Firstpage from './Components/Firstpage.jsx';
import Secondpage from './Components/Secondpage.jsx';
import Edit from './Components/Edit.jsx'
import Add from './Components/Add.jsx'
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Firstpage />} />
          <Route path="/second" element={<Secondpage />} />
          <Route path="/edit/:id" element={<Edit/>} />
          <Route path="/post" element={<Add/>}/>
        </Routes>
      </BrowserRouter>
       
      </header>
    </div>
  );
}

export default App;
