import { Request } from 'express'
import TokenPayloadDto from './tokenPayloadDto'

export default interface AuthenticatedRequest<BodyType = undefined>
    extends Request {
    user: TokenPayloadDto
    body: BodyType | undefined
}
