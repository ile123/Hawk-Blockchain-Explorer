import mongoose from 'mongoose';

export const connectToDatabase = async (uri: string) => {
    try {
        await mongoose.connect(uri);
        console.log('Connected to the database');
    } catch (error) {
        console.error(error);
    }
};