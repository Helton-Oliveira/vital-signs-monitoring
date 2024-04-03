import express from 'express';
import { Server } from 'socket.io';
import url from 'url'
import path from 'path';
import http from 'http';

const app = express()
const PORT = process.env.PORT || 8080;

const actualPath = url.fileURLToPath(import.meta.url);
const publicDiretory = path.join(actualPath, '../', 'public');

app.use(express.static(publicDiretory));

const serverHTTP = http.createServer(app);

serverHTTP.listen(PORT, () => {
    console.log(`server listen in ${PORT}`)
})

const io = new Server(serverHTTP);

export default io;