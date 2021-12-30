import server from './server/index';

const PORT = 4000;

server.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);  
})