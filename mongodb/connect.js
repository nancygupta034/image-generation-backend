import mongoose from 'mongoose';

const connectDb = (url) => {
    mongoose.set('strictQuery', true);

    mongoose.connect(url).then(() => console.log("Mongodb connected")).catch((err) => {
        console.log("mongodb error => ", err);
    })
}

export default connectDb;