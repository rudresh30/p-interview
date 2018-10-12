const express = require("express");
const user = require("./routes/user");
const bodyParser = require("body-parser");

const app = express();

const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send(`get on main url`);
})

app.use('/user', user);


app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
});