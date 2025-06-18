import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
let server: Server;
const port = 5000

async function main(){
  try {
    mongoose.connect('mongodb+srv://todoapp:todoapp@cluster0.gamza.mongodb.net/advance-note-app?retryWrites=true&w=majority&appName=Cluster0');
    console.log("Connect to Mongodb Using Mongoose")
    server = app.listen(port, () => {
    console.log(` app listening on port ${port}`);
  });
  } catch (error) {
    console.log(error)
  }
    
}
main()