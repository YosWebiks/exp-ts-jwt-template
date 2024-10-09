import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/user'
import { userService } from '../services/userService'
import { Request, Response } from 'express'
import { Serializer } from '../serializers/serializers'
import TokenPayloadDto from '../types/tokenPayloadDto'

interface profileRequest extends Request {
    user?: any
}

export const AuthController = {
    /* register/create new user */
    registerUser: async (req: Request, res: Response) => {
        try {
            const user = req.body
            if (!user.email || !user.password) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Username and password are required.',
                })
            }
            const reg_user = await userService.createUser({
                name: user.name,
                email: user.email,
                password: user.password,
            })
            res.json({
                status: 'success',
                message: 'user created successfuly',
                data: Serializer.userSerializer(reg_user),
            })
        } catch (err: any) {
            res.status(500).json({ status: 'error', message: err.message })
        }
    },

    /* user login */
    loginUser: async (req: Request, res: Response) => {
        try {
            /* check user is exist with our system */
            const user = await User.findOne({
                email: req.body.email,
            })
            if (!user) {
                return res.status(400).send({
                    status: 'error',
                    message:
                        'No account is associated with the given email, please sign up',
                })
            }

            /* compare password */
            const isMatch = await bcrypt.compare(
                req.body.password,
                user.password
            )
            if (!isMatch) {
                return res
                    .status(400)
                    .send({ status: 'error', message: 'Invalid password' })
            }

            const tokenPayload: TokenPayloadDto = {
                _id: user._id.toString(),
                email: user.email,
                role: user.role,
            }

            //create token
            const token = jwt.sign(tokenPayload, process.env.JWTPASS!, {
                expiresIn: '1d',
            })
            res.json({
                status: 'success',
                data: { token, user: Serializer.userSerializer(user) },
            })
        } catch (err: any) {
            res.status(500).json({ status: 'error', message: err.message })
        }
    },

    /* get user profile */
    getUser: async (req: profileRequest, res: Response) => {
        const user = await User.findOne({
            email: req.user.email,
        })
        res.json({
            status: 'success',
            data: Serializer.userSerializer(user),
        })
    },
}
