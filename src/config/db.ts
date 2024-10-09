import { connect } from 'mongoose'
export const connectDB = async (): Promise<void> => {
    try {
        await connect(process.env.DATABASE_URL!)
        console.log('Successfully connected to the database')
    } catch (err) {
        console.log('Error connecting to the database')
        console.log(err)
        process.exit()
    }
}
