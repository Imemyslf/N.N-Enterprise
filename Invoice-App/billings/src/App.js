import { BrowserRouter, Routes, Route }from "react-router-dom";
import './App.css';
import HomePage from './Pages/HomePage';
import  Billing  from './Pages/Billing';
import AddCompany from './Pages/AddCompany';
import AddMaterials from './Pages/AddMaterials';
import MaterialsList from './Pages/MaterialsList';
import PageNotFound from './Pages/PageNotFound';
import NavBar from './NavBar';

function App() {
  return (
    <>    
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element = { <HomePage /> }/>
            <Route path="/billing" element = { <Billing /> }/>
            <Route path="/company" element = { <AddCompany /> }/>
            <Route path="/materials" element = { <AddMaterials /> }/>
            <Route path="/materials/:materialId" element = { <MaterialsList /> }/>
            <Route path="*" element = { <PageNotFound /> }/>
          </Routes>
        </div>          
      </BrowserRouter>
    </>
  );
}

export default App;
