const express = require("express");
const cors = require("cors");
const { APP_BASE_URL } = require("./constants");

const PORT = 5678;

const app = express();

app.use(cors({ origin: APP_BASE_URL, credentials: true }));
app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send(err.stack);
});

app.use("/api", require("./routes"));

const server = app.listen(PORT, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log(server.address());
    console.log("Listening at http://%s:%s", host, port);
});
