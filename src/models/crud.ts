import { Schema, model } from 'mongoose'

const crudSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'object name required'],
            unique: true,
        },
        description: {
            type: String,
            required: [true, 'object description required'],
        },
        image: String,
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)
const Crud = model('Crud', crudSchema)
export default Crud
