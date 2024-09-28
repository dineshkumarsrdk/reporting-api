import ReportRepository from '../repositories/reportRepository.js';
import path from 'path';

export default class ReportContoller {
    constructor() {
        this.reportRepository = new ReportRepository();
    }

    // to upload csv file
    uploadcsv = (req, res) => {
        const filePath = path.resolve('uploads', req.file.filename);
        this.reportRepository.uploadcsv(filePath, (status) => {
            if (status.success) {
                res.status(200).json({
                    success: true,
                    message: "File uploaded successfully"
                });
            } else {
                res.status(400).json({ message: status.error.message, status: status.error.statusCode });
            }
        });
    }

    // to get uploaded csv data from db
    getcsvdata = (req, res) => {
        this.reportRepository.getcsvdata((status) => {
            if (status.success) {
                res.status(200).json({
                    success: true,
                    data: status.records
                });
            } else {
                res.status(400).json({ message: status.error.message, status: status.error.statusCode });
            }
        });
    }

    // filter results by Campaign Name
    filterByCampaignName = (req, res) => {
        const {campaignName} = req.query;
        this.reportRepository.filterByCampaignName(campaignName, (status) => {
            if (status.success) {
                res.status(200).json({
                    success: true,
                    data: status.records,
                    status: 200
                });
            } else {
                res.status(400).json({ message: status.error.message, status: status.error.statusCode });
            }
        });
    }

    // filter results by ad group id
    filterByadGroupID = (req, res) => {
        const {adGroupID} = req.query;
        this.reportRepository.filterByadGroupID(adGroupID, (status) => {
            if (status.success) {
                res.status(200).json({
                    success: true,
                    data: status.records,
                    status: 200
                });
            } else {
                res.status(400).json({ message: status.error.message, status: status.error.statusCode });
            }
        });
    }

    // filter results by fsnID
    filterByfsnID = (req, res) => {
        const {fsnID} = req.query;
        this.reportRepository.filterByfsnID(fsnID, (status) => {
            if (status.success) {
                res.status(200).json({
                    success: true,
                    data: status.records,
                    status: 200
                });
            } else {
                res.status(400).json({ message: status.error.message, status: status.error.statusCode });
            }
        });
    }

    // filter results by productName
    filterByproductName = (req, res) => {
        const {productName} = req.query;
        this.reportRepository.filterByproductName(productName, (status) => {
            if (status.success) {
                res.status(200).json({
                    success: true,
                    data: status.records,
                    status: 200
                });
            } else {
                res.status(400).json({ message: status.error.message, status: status.error.statusCode });
            }
        });
    }
}