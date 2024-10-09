import { Request, Response } from 'express'
import { CrudService } from '../services/crudService'
import { Serializer } from '../serializers/serializers'
import AuthenticatedRequest from '../types/authenticatedRequest'
import AuthRequestDto from '../types/crudRequestDto'

interface userRequest extends Request {
    user?: any
}

export const getAllCrudObjs = async (req: Request, res: Response) => {
    try {
        const crudObjs = await CrudService.getAllCrudObjs()
        res.json({
            status: 'success',
            data: Serializer.crudsSerializer(crudObjs),
        })
    } catch (err: any) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}

export const createCrudObj = async (req: AuthenticatedRequest<AuthRequestDto>, res: Response) => {
    try {
        req.body!.author = req.user._id
        const crudObj = await CrudService.createCrudObj(req.body)
        res.json({
            status: 'success',
            message: 'blog created successfully.',
            data: Serializer.crudSerializer(crudObj),
        })
    } catch (err: any) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}

export const getCrudObjById = async (req: Request, res: Response) => {
    try {
        const blog = await CrudService.getCrudObjById(req.params.id)
        res.json({ status: 'success', data: Serializer.crudSerializer(blog) })
    } catch (err: any) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}

export const updateCrudObj = async (req: Request, res: Response) => {
    try {
        const crudObj = await CrudService.updateCrudObj(req.params.id, req.body)
        res.json({
            status: 'success',
            message: 'crud object updated successfully.',
            data: Serializer.crudSerializer(crudObj),
        })
    } catch (err: any) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}

export const deleteCrudObj = async (req: Request, res: Response) => {
    try {
        const blog = await CrudService.deleteCrudObj(req.params.id)
        res.json({
            status: 'success',
            message: 'crud object deleted successfully.',
        })
    } catch (err: any) {
        res.status(500).json({ status: 'error', message: err.message })
    }
}
