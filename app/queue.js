import { Worker, Queue } from 'bullmq';
import IORedis from 'ioredis';

console.log(process.env.REDIS_HOST, process.env.REDIS_PORT);

const connection = new IORedis({ 
  port: process.env.REDIS_PORT,
  host: process.env.REDIS_HOST, 
  maxRetriesPerRequest: null 
});

const myFirstWorker = new Worker('installedQueue', async job => {
  console.log('job.data', job.data);
}, {
  connection,
});

const installedQueue = new Queue('installedQueue', { connection: IORedis });

export default installedQueue;