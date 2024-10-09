import Crud from '../models/crud'

export const CrudService = {
    getAllCrudObjs: async () => {
        return await Crud.find()
    },

    createCrudObj: async (blog: any) => {
        return await Crud.create(blog)
    },
    getCrudObjById: async (id: any) => {
        return await Crud.findById(id)
    },

    updateCrudObj: async (id: any, blog: any) => {
        return await Crud.findByIdAndUpdate(id, blog)
    },

    deleteCrudObj: async (id: any) => {
        return await Crud.findByIdAndDelete(id)
    },
}
