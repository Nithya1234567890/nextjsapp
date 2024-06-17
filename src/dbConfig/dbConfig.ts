import mongoose from "mongoose";

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!);
        const connection=mongoose.connection;
        connection.on('connected',()=>{
            console.log('MongoDB connected Successfully');
        })
        connection.on('error',(er)=>{
            console.log("error occured while connecting:",er);
        })
    }
    catch(error){
        console.log("something goes wrong");
        console.log(error);
    }
}