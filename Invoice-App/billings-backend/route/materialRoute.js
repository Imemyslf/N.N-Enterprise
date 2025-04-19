import express from "express";
import { searchMaterial, insertMaterial, updateMaterial, deleteMaterialByName, deleteAllMaterial, sortMaterial} from "../controllers/materialController.js";

const router = express.Router();

router.get("/search/:name",searchMaterial);
router.get("/sort",sortMaterial);
router.post("/insert",insertMaterial);
router.put("/update",updateMaterial);
router.delete("/delete/:name", deleteMaterialByName);
router.delete("/delete", deleteAllMaterial);

export default router;