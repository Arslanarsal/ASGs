import express from "express";
import os from "os";
import cluster from "cluster";


const numCpu = os.cpus().length;
// console.log(`Number of CPUs: ${numCpu}`);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



if (cluster.isPrimary) {
    console.log("Process pid", process.pid);
    for (let i = 0; i < 3; i++) {
        cluster.fork();
    }

    cluster.on("exit" ,( worker , code , signal )=>{
        // console.log(`worker ${worker.process.pid} died`);
        cluster.fork();
    })
} else {
    while(true){}
}




// app.listen(3000, () => {
//   console.log(`Server is running on port 3000 on ${os.hostname()}`);
// });