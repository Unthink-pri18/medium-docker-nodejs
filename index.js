const express = require("express");

const app = express();
const PORT = process.env.PORT || 4000;


app.get('/', (req, res) => {
	res.send("Hello Final Test!");
})

app.listen(PORT, () => console.log("App listening at port " + PORT));
