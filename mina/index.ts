// Import the required modules
import express, { Request, Response } from 'express';

// Create an Express application
const app = express();

// Define a route to handle GET requests to the root URL
app.get('/', (req: Request, res: Response) => {
    res.send({ name: 'Santiago' });
});

// Define the port number
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});