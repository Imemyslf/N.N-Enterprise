import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./Pages/HomePage";
import { BillingList, AddBilling, SearchBilling } from "./Pages/Billing";
import { CompanyList, AddCompany } from "./Pages/Company";
import { AddMaterials, MaterialsList, SearchMaterial } from "./Pages/Materials";
import PageNotFound from "./Pages/PageNotFound";
import NavBar from "./NavBar";
import { Invoice } from "./Pages/Invoice";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <NavBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/company" element={<CompanyList />} />
            <Route path="/company-form" element={<AddCompany />} />
            <Route path="/materials" element={<MaterialsList />} />
            <Route path="/materials-form" element={<AddMaterials />} />
            <Route path="/billing" element={<BillingList />} />
            <Route path="/billing-form" element={<AddBilling />} />
            <Route path="/billings" element={<SearchBilling />} />
            <Route path="/billings/invoice" element={<Invoice />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
