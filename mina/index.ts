import express, { Request, Response } from 'express';
import { Field, verify } from 'o1js';

const fs = require('fs');
const msgpack = require("msgpack-lite");

const app = express();

app.get('/', async (req: Request, res: Response) => {
    const proof = await fs.promises.readFile('./proofs/proof.bin');
    const verification = await fs.promises.readFile('./proofs/verification.bin');

    const proofDecoded = msgpack.decode(proof);
    const verificationDecoded = msgpack.decode(verification);
    
    const verificationBuffer = JSON.parse(JSON.stringify(verificationDecoded));
    verificationBuffer.hash = Field.fromJSON(verificationDecoded.hash);

    console.log('Verifying >>>>>>');

    const ok = await verify(proofDecoded, verificationBuffer);

    console.log('Verifying complete >>>>>>', ok);

    res.send({ success: ok });
});

app.get('/demo', async (req: Request, res: Response) => {
    console.log('Verifying >>>>>>');

    console.log('Verifying complete >>>>>>', true);
    res.send({ success: true });
});

// Define the port number
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
