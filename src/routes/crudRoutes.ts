import express, { NextFunction } from 'express'
import {
    getAllCrudObjs,
    createCrudObj,
    getCrudObjById,
    updateCrudObj,
    deleteCrudObj,
} from '../controllers/crudController'
import { verifyUser } from '../middleware/auth'

const crudRouter = express.Router()

crudRouter
    .route('/')
    .get(getAllCrudObjs)
    .post(verifyUser as NextFunction, createCrudObj as any)

crudRouter
    .route('/:id')
    .get(getCrudObjById)
    .put(verifyUser as NextFunction, updateCrudObj)
    .delete(verifyUser as NextFunction, deleteCrudObj)
export default crudRouter
