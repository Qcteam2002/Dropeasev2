import Queue from 'bull';

// Create a new queue
const installAppQueue = new Queue('installAppQueue', {
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});

// Define a job processor
installAppQueue.process(async (job) => {
  console.log('Hello Processing job:', job.id);
  // Add your job processing logic here
});

export default installAppQueue;