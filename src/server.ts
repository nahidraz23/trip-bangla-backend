import {Server} from 'http';
import mongoose from 'mongoose';
import app from './app';

let server : Server;

const startServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://nzamanraz_db_user:UN2pLOJfkGv1VRSq@cluster0.ett1nmy.mongodb.net/?appName=Cluster0')

        console.log('Connected to DB!!!');

        server = app.listen(5000, () => {
            console.log('Server is running!!!');
        })
    } catch (error) {
        console.log(error);
    }
}

startServer();