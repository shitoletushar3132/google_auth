const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(() => console.log("database Connected")).catch((err) => console.log(err))
