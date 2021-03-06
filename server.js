const app = require("./app");
const config = request("./app/config");
const mongoose = require("mongoose");

mongoose.connect(config.db.uri)
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch((error) => {
        console.log("Cannot connect to the database!", error);
        process.exit();
    });

const PORT = config.app.port;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});