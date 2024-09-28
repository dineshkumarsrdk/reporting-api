import express from 'express';
import UserContoller from '../controllers/userController.js';
import { auth } from '../middlewares/authMiddleware.js';

const userRouter = express.Router();

const userContoller = new UserContoller();

// create new user
userRouter.post('/', (req, res) => {
    userContoller.createUser(req, res);
});
// user login route
userRouter.post('/login', (req, res) => {
    userContoller.loginUser(req, res);
});

userRouter.get('/:id', auth, (req, res) => {
    userContoller.getUserById(req, res);
});
userRouter.put('/:id', auth, (req, res) => {
    userContoller.updateUserDetails(req, res);
});
userRouter.delete('/:id', auth, (req, res) => {
    userContoller.deleteUserById(req, res);
});


export default userRouter;