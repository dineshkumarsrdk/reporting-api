import { compareHashedPassword, hashPassword } from '../util/passwordEncrption.js';
import db from '../config/dbconfig.js';

export default class UserRepository {
    // to create a new user
    createUser(userName, password, email, cb) {
        this.isUserAlreadyCreated(userName, email, async (err, userData) => {
            if (err) {
                return cb({
                    success: false,
                    error: { message: err, statusCode: 400 }
                });
            }
            if (userData) {
                return cb({
                    success: false,
                    error: { message: "User already exists, please login to continue", statusCode: 400 }
                });
            } else {
                const hashedPassword = await hashPassword(password);
                const sql = `INSERT INTO users(userName, password, email) VALUES (?,?,?)`;
                db.run(sql, [userName, hashedPassword, email], (err) => {
                    if (err) console.error(err);
                });
                return cb({
                    success: true
                });
            }
        });
    }

    // to check if the same username or email is already registered
    isUserAlreadyCreated(userName, email, callback) {
        const sql = `SELECT * FROM users WHERE userName = ? OR email = ?`;
        db.get(sql, [userName, email], (err, row) => {
            if (err) {
                return callback(err, null);
            }
            callback(null, row);
        });
    }

    // to get a user by id
    getUserById(id, cb) {
        const sql = `SELECT id, userName, email FROM users WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                return cb({
                    success: false,
                    error: { message: err, statusCode: 400 }
                });
            }
            if (row) {
                return cb({
                    success: true,
                    response: row
                });
            } else {
                return cb({
                    success: false,
                    error: { message: "User does not exists", statusCode: 400 }
                });
            }
        });
    }

    // to update user details by id
    updateUserDetails(req, id, userName, email, cb) {
        this.isUserAlreadyCreated(userName, email, async (err, userData) => {
            if (err) {
                return cb({
                    success: false,
                    error: { message: err, statusCode: 400 }
                });
            }
            // to ensure that the user can update only their account
            if(userData.userName!=req.userName){
                return cb({
                    success: false,
                    error: { message: "Cannot update other users", statusCode: 401 }
                });
            }
            if (userData) {
                return cb({
                    success: false,
                    error: { message: "Username or email id already in use, please try using different username or email id", statusCode: 400 }
                });
            } else {
                const sql = `UPDATE users SET userName = ?, email = ? WHERE id = ?`;
                db.run(sql, [userName, email, id], (err) => {
                    if (err) {
                        return cb({
                            success: false,
                            error: { message: err, statusCode: 400 }
                        });
                    }
                    return cb({
                        success: true
                    });
                });
            }
        });
    }

    // to delete a user by id
    deleteUserById(req, id, cb) {
        const sql = `SELECT id, userName FROM users WHERE id = ?`;
        db.get(sql, [id], (err, row) => {
            if (err) {
                return cb({
                    success: false,
                    error: { message: err, statusCode: 400 }
                });
            }
            // to ensure that the user can delete only their account
            if(row.userName!=req.userName){
                return cb({
                    success: false,
                    error: { message: "Cannot delete other users", statusCode: 401 }
                });
            }
            if (row) {
                const sql = `DELETE FROM users WHERE id = ?`;
                db.run(sql, [id], (err) => {
                    if (err) {
                        return cb({
                            success: false,
                            error: { message: err, statusCode: 400 }
                        });
                    }
                    return cb({
                        success: true
                    });
                });
            } else {
                return cb({
                    success: false,
                    error: { message: "User does not exists", statusCode: 400 }
                });
            }
        });
    }

    // to login user
    loginUser = (userName, password, cb) => {
        const sql = `SELECT userName, password FROM users WHERE userName = ?`;
        db.get(sql, [userName], async(err, row) => {
            if (err) {
                return cb({
                    success: false,
                    error: { message: err, statusCode: 400 }
                });
            }
            if(row){
                if(await compareHashedPassword(password, row.password)){
                    return cb({
                        success: true
                    });
                } else {
                    return cb({
                        success: false,
                        error: { message: 'Invalid credentials', statusCode: 401 }
                    });
                }
            } else {
                return cb({
                    success: false,
                    error: { message: "User does not exists", statusCode: 404 }
                });
            }
        });
    }
}