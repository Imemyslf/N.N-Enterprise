import express from "express";
import { searchCompany, companyInsert, deleteCompanyByName, deleteAllCompany, sortCompany, updateCompany } from "../controllers/companyController.js";

const router = express.Router();

router.get("/search/:name",searchCompany);
router.get("/sort",sortCompany);
router.post("/insert",companyInsert);
router.put("/update",updateCompany);
router.delete("/delete/:name",deleteCompanyByName);
router.delete("/delete",deleteAllCompany);


export default router;