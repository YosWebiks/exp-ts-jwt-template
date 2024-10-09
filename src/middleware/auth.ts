import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import TokenPayloadDto from '../types/tokenPayloadDto'
import AuthenticatedRequest from '../types/authenticatedRequest'

export const verifyUser = (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
) => {
    if (!req.headers.authorization) {
        return res
            .status(401)
            .json({ status: 'error', message: 'Unauthorized request' })
    }
    const token = req.headers['authorization']
    if (!token) {
        return res
            .status(401)
            .json({
                status: 'error',
                message: 'Access denied. No token provided.',
            })
    }
    try {
        const decoded: TokenPayloadDto = jwt.verify(token, process.env.JWTPASS!) as TokenPayloadDto
        req.user = decoded
        next()
    } catch (err) {
        res.status(400).json({ status: 'error', message: 'Invalid token.' })
    }
}
