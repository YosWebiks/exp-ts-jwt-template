import User from '../models/user'

export const userService = {
    getAllUsers: async () => {
        return await User.find()
    },

    createUser: async (user: any) => {
        return await User.create(user)
    },
    getUserById: async (id: string) => {
        return await User.findById(id)
    },

    updateUser: async (id: string, user: any) => {
        return await User.findByIdAndUpdate(id, user)
    },

    deleteUser: async (id: string) => {
        return await User.findByIdAndDelete(id)
    },
}
