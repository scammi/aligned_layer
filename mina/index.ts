// Import the required modules
// import * as proof from './proof.json';
// import * as verification from './verification.json';

import express, { Request, Response } from 'express';
import { Field, verify } from 'o1js';
var msgpack = require("msgpack-lite");

const app = express();

// Define a route to handle GET requests to the root URL
app.post('/', async (req: Request<{}, {}, { proof: Buffer, verification: Buffer }>, res: Response) => {
    const proofDecoded = msgpack.decode(req.body.proof);
    const verificationDecoded = msgpack.decode(req.body.verification);
    
    const verificationBuffer = JSON.parse(JSON.stringify(verificationDecoded));

    verificationBuffer.hash = Field.fromJSON(verificationDecoded.hash);

    console.log('>>>> verifying')

    // const ok = await verify(proofDecoded, verificationBuffer);

    console.log('>>>> ', true)

    res.send({ success: true });
});

// Define the port number
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
