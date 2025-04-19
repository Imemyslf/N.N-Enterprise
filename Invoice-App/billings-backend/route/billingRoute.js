import express from 'express';
import {serachBillByInvoiceNos, insertBill ,deleteByInvoiceNos, deleteAllBill} from '../controllers/billingController.js';
import { paidBillAmount } from '../controllers/billingController.js';

const router = express.Router();

router.get("/insert",insertBill);
router.get("/invoice/search/:invoiceNos",serachBillByInvoiceNos);
router.put("/paid/:invoiceNos",paidBillAmount)
router.delete("/delete/:invoiceNos",deleteByInvoiceNos);
router.delete("/delete",deleteAllBill);

export default router;