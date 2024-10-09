import express, { NextFunction } from 'express'
import { AuthController } from '../controllers/authController'
import { UserController } from '../controllers/userController'
import { verifyUser } from '../middleware/auth'

const userRouter = express.Router()

userRouter.post('/register', AuthController.registerUser as any)
userRouter.post('/login', AuthController.loginUser as any)
userRouter.get('/profile', verifyUser as NextFunction, AuthController.getUser)
userRouter.get('/list', verifyUser as NextFunction, UserController.getAllUsers)

export default userRouter
