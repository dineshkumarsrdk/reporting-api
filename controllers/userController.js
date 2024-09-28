import UserRepository from '../repositories/userRepository.js';
import jwt from 'jsonwebtoken';

export default class UserContoller {
    constructor() {
        this.userRepository = new UserRepository();
    }

    // to create new user
    createUser = (req, res) => {
        const { userName, password, email } = req.body;
        this.userRepository.createUser(userName, password, email, (status) => {
            if (status.success) {
                res.status(201).json({
                    success: true,
                    message: "User created successfully"
                });
            } else {
                res.status(400).json({ message: status.error.message, status: status.error.statusCode });
            }
        });
    }

    // to get a user by id
    getUserById = (req, res) => {
        const { id } = req.params;
        this.userRepository.getUserById(id, (status) => {
            if (status.success) {
                res.status(200).json({
                    success: true,
                    response: status.response
                });
            } else {
                res.status(400).json({ message: status.error.message, status: status.error.statusCode });
            }
        });
    }

    // to update user details by id
    updateUserDetails = (req, res) => {
        const { id } = req.params;
        const { userName, email } = req.body;
        this.userRepository.updateUserDetails(req, id, userName, email, (status) => {
            if (status.success) {
                res.status(200).json({
                    success: true,
                    message: "User updated successfully"
                });
            } else {
                res.status(400).json({ message: status.error.message, status: status.error.statusCode });
            }
        });
    }

    // to delete a user by id
    deleteUserById = (req, res) => {
        const { id } = req.params;
        this.userRepository.deleteUserById(req, id, (status) => {
            if (status.success) {
                res.status(200).json({
                    success: true,
                    message: "User deleted successfully"
                });
            } else {
                res.status(400).json({ message: status.error.message, status: status.error.statusCode });
            }
        });
    }

    // to login user
    loginUser(req, res) {
        const { userName, password } = req.body;
        this.userRepository.loginUser(userName, password, (status)=>{
            if (status.success) {
                const token = jwt.sign(
                    {
                        userName
                    },
                    'idu7863etaysdgceff7126009hgs',
                    {
                        expiresIn: '1h'
                    }
                );
                res.status(200).cookie('jsonwebtoken', token, {maxAge: 1*60*60*1000, httpOnly: true})
                    .json({
                        success: true,
                        message: "User loggedin successfully"
                    });
            } else {
                res.status(404).json({message: status.error.message, status: status.error.statusCode});
            }
        });
    }
}