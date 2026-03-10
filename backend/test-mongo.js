const mongoose = require('mongoose');
const uri = "mongodb+srv://sarim3478_db_user:2TM94KEuCe4Dbs3E@algoverse.ccfbxss.mongodb.net/";
mongoose.connect(uri).then(() => {
    console.log("Connected to MongoDB successfully!");
    process.exit(0);
}).catch(err => {
    console.error("MongoDB Connection failed:", err.message);
    process.exit(1);
});
