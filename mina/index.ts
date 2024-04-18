import express, { Request, Response } from 'express';
import { Field, verify } from 'o1js';

const fs = require('fs');
const msgpack = require("msgpack-lite");

const app = express();

// Define a route to handle GET requests to the root URL
app.get('/', async (req: Request, res: Response) => {
    const proof = await fs.promises.readFile('./proofs/proof.bin');
    const verification = await fs.promises.readFile('./proofs/verification.bin');

    const proofDecoded = msgpack.decode(proof);
    const verificationDecoded = msgpack.decode(verification);
    
    const verificationBuffer = JSON.parse(JSON.stringify(verificationDecoded));
    verificationBuffer.hash = Field.fromJSON(verificationDecoded.hash);

    console.log('>>>> verifying', verificationBuffer, proofDecoded)
    const ok = await verify(proofDecoded, verificationBuffer);

    res.send({ success: true });
});

// Define the port number
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
