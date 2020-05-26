// 服务器

const ws = require('ws');
const host = "localhost";
const port = 9000;
const server = new ws.Server({
    host,
    port
});
let count = 1000;
let clients = [];
// 获取客户端进行编号，然后存储它，广播它的数据
server.on('connection',client =>{
    client.name = count++;
    clients[client.name] = client;
    // 获取数据
    client.on('message',msg=>{
        console.log(msg.toString())
        boradcast(client,msg);
    })
})

function boradcast(client,msg){
    for(let key in clients){
        clients[key].send(msg.toString())
    }
    
}

server.on('listening',()=>{
    console.log(`The server is runnung at:ws://${host}:${port}`)
})