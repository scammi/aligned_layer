// Import the required modules
import * as proof from './proof.json';
import * as verification from './verification.json';
import express, { Request, Response } from 'express';
import { Field, verify } from 'o1js';

// Create an Express application
const app = express();

// Define a route to handle GET requests to the root URL
app.get('/', async (req: Request, res: Response) => {
    const proofBuffer = JSON.parse(JSON.stringify(proof));
    const verificationBuffer = JSON.parse(JSON.stringify(verification));

    verificationBuffer.hash = Field.fromJSON(verificationBuffer.hash);

    console.log('>>>> verifying')
    // const ok = await verify(proofBuffer, verificationBuffer);
    // console.log('>>>> ', ok)

    res.send({ success: true });
});

// Define the port number
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
