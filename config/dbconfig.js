import sqlite3 from 'sqlite3';
import path from 'path';

const db = new sqlite3.Database(path.resolve('database', 'test.db'), sqlite3.OPEN_READWRITE, (err)=>{
    if(err) return console.error(err.message);
});

db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    userName TEXT,
    password TEXT,
    email TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS reports(
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    campaign_id TEXT,
    campaign_name TEXT,
    ad_group_id TEXT,
    fsn_id TEXT,
    product_name TEXT,
    ad_spend INTEGER,
    views INTEGER,
    clicks INTEGER,
    direct_units INTEGER,
    indirect_units INTEGER,
    direct_revenue INTEGER,
    indirect_revenue INTEGER
)`);

export default db;