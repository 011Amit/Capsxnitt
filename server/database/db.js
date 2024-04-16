
import mongoose from 'mongoose';





const Connection = (URL)=>{
    
    mongoose.connect(URL)
    .then(console.log("db is connected successfully"))
    .catch((err)=>{
        console.log("Db is facing connection issue");
        console.log(err);
        process.exit(1);
    })
}
export default Connection;