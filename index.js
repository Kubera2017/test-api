const express = require('express');
const http = require('http');
const logger = require ("morgan");

const app = express();
app.use(logger("dev"));

const port = 3333;

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD");
    next();
});

const timeoutFunc = async () => {
    const timeout = 30000;
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
}

app.use("/test", async (req, res, next) => {
    await timeoutFunc();
    res.json({data: "OK"});
});


server = http.createServer(app);
const onListening = () => {
    console.log(`http://localhost:${port}/test`);
}
const onError = (error) => {
    console.log(error);
    process.exit(1);
}
server.on('error', onError);
server.on('listening', onListening);

server.listen(port);
