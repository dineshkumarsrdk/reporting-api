import db from '../config/dbconfig.js';
import csv from 'csv-parser';
import fs from 'fs';

export default class ReportRepository {
    // to store the csv file content in sqlite
    uploadcsv(filePath, cb) {
        fs.createReadStream(filePath).pipe(csv()).on('data', (row) => {
            // Inserting csv data into the table
            const sql = `INSERT INTO reports(
                    campaign_id,
                    campaign_name,
                    ad_group_id,
                    fsn_id,
                    product_name,
                    ad_spend,
                    views,
                    clicks,
                    direct_units,
                    indirect_units,
                    direct_revenue,
                    indirect_revenue
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            db.run(sql, [
                row["Campaign ID"],
                row["Campaign Name"],
                row["Ad Group ID"],
                row["FSN ID"],
                row["Product Name"],
                row["Ad Spend"],
                row["Views"],
                row["Clicks"],
                row["Direct Units"],
                row["Indirect Units"],
                row["Direct Revenue"],
                row["Indirect Revenue"],
            ], (err) => {
                if (err) {
                    return cb({
                        success: false,
                        error: { message: err, statusCode: 400 }
                    });
                }
            });
        })
            .on('end', () => {
                return cb({
                    success: true
                });
            });
    }

    getcsvdata(cb) {
        const records = [];
        const sql = `SELECT * FROM reports`;
        db.all(sql, (err, rows) => {
            if (err) {
                return cb({
                    success: false,
                    error: { message: err, statusCode: 400 }
                });
            }
            rows.forEach((row) => {
                records.push(row);
            });
            return cb({
                success: true,
                records: records
            });
        });
        // const sql = `DELETE FROM reports`;
        // db.run(sql, (err)=>{
        //     console.log(err);
        //     return cb({
        //         success: true
        //     });
        // });
    }

    // filter results by Campaign Name
    filterByCampaignName(filter, cb) {
        const sql = `SELECT * FROM reports WHERE campaign_name="${filter}"`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return cb({
                    success: false,
                    error: { message: err, statusCode: 400 }
                });
            }
            const records=[];
            rows.forEach((row) => {
                const stats = this.getStats(row, "Campaign Name", filter);
                records.push(stats);
            });
            return cb({
                success: true,
                records: records
            });
        });
    }

    // filter results by ad group id
    filterByadGroupID(filter, cb) {
        const sql = `SELECT * FROM reports WHERE ad_group_id="${filter}"`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return cb({
                    success: false,
                    error: { message: err, statusCode: 400 }
                });
            }
            const records=[];
            rows.forEach((row) => {
                const stats = this.getStats(row, "Ad Group ID", filter);
                records.push(stats);
            });
            return cb({
                success: true,
                records: records
            });
        });
    }

    // filter results by fsnID
    filterByfsnID(filter, cb) {
        const sql = `SELECT * FROM reports WHERE fsn_id="${filter}"`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return cb({
                    success: false,
                    error: { message: err, statusCode: 400 }
                });
            }
            const records=[];
            rows.forEach((row) => {
                const stats = this.getStats(row, "FSN ID", filter);
                records.push(stats);
            });
            return cb({
                success: true,
                records: records
            });
        });
    }

    // filter results by productName
    filterByproductName(filter, cb) {
        const sql = `SELECT * FROM reports WHERE product_name="${filter}"`;
        db.all(sql, [], (err, rows) => {
            if (err) {
                return cb({
                    success: false,
                    error: { message: err, statusCode: 400 }
                });
            }
            const records=[];
            rows.forEach((row) => {
                const stats = this.getStats(row, "Product Name", filter);
                records.push(stats);
            });
            return cb({
                success: true,
                records: records
            });
        });
    }

    // computing the stats
    getStats(row, mainKey, filter) {
        let CTR, totalRevenue, totalOrders, ROAS = 0;
        CTR = parseFloat(((row.clicks / row.views) * 100).toFixed(2));
        totalRevenue = row.direct_revenue + row.indirect_revenue;
        totalOrders = row.direct_units + row.indirect_units;
        ROAS = parseFloat((totalRevenue / row.ad_spend).toFixed(2));
        return {
            [mainKey]: filter,
            adSpend: row.ad_spend,
            views: row.views,
            clicks: row.clicks,
            CTR: CTR,
            totalRevenue: totalRevenue,
            totalOrders: totalOrders,
            ROAS: ROAS
        }
    }
}


// adSpend += row.ad_spend;
// views += row.views;
// clicks += row.clicks;
// directRevenue += row.direct_revenue;
// indirectRevenue += row.indirect_revenue;
// directUnits += row.direct_units;
// indirectUnits += row.indirect_units;