import mongoose from "mongoose"

async function connect(){
    await mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASS}@${process.env.MONGO_URL}/?retryWrites=true&w=majority`)
}

export default connect