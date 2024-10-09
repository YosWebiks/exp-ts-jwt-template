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
/**
 * A Crud
 * @typedef {object} Crud
 * @property {string} name.required - The name
 * @property {string} description - The description
 * @property {string} author - The authour - mongo ObjectId
 */

/**
 * GET /api/v1/crud/
 * @summary Get list of all the crud-objects
 * @tags crud
 * @return {array<Crud>} 200 - success response - application/json
 */
crudRouter.get('/', getAllCrudObjs)

/**
 * POST /api/v1/crud/
 * @summary Add a crud-object
 * @tags crud
 * @param {Crud} request.body.required - songs info - application/json
 * @return {array<Crud>} 200 - success response - application/json
 */
crudRouter.post('/', verifyUser as NextFunction, createCrudObj as any)

crudRouter
    .route('/:id')
    .get(getCrudObjById)
    .put(verifyUser as NextFunction, updateCrudObj)
    .delete(verifyUser as NextFunction, deleteCrudObj)
export default crudRouter
