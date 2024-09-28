import express from 'express';
import ReportContoller from '../controllers/reportController.js';
import { uploadFile } from '../middlewares/fileUpload.js';

const reportRouter = express.Router();

const reportContoller = new ReportContoller();

// upload a csv file
reportRouter.post('/upload-csv', uploadFile.single('report'), (req, res) => {
    reportContoller.uploadcsv(req, res);
});
// get uploaded csv data from db
reportRouter.get('/getcsv', (req, res) => {
    reportContoller.getcsvdata(req, res);
});
// filter results by CampaignName
reportRouter.post('/campaign', (req, res) => {
    reportContoller.filterByCampaignName(req, res);
});
// filter results by adGroupID
reportRouter.post('/adGroupID', (req, res) => {
    reportContoller.filterByadGroupID(req, res);
});
// filter results by fsnID
reportRouter.post('/fsnID', (req, res) => {
    reportContoller.filterByfsnID(req, res);
});
// filter results by productName
reportRouter.post('/productName', (req, res) => {
    reportContoller.filterByproductName(req, res);
});

export default reportRouter;