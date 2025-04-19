import express from 'express';
import {getBillDetails, serachBillByInvoiceNos, insertBill ,deleteByInvoiceNos, deleteAllBill,paidBillAmount} from '../controllers/billingController.js';

const router = express.Router();

router.get("/", getBillDetails, );
router.get("/insert",insertBill);
router.get("/invoice/search/:invoiceNos",serachBillByInvoiceNos);
router.put("/paid/:invoiceNos",paidBillAmount)
router.delete("/delete/:invoiceNos",deleteByInvoiceNos);
router.delete("/delete",deleteAllBill);

export default router;