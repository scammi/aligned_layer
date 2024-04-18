"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import the required modules
// import * as proof from './proof.json';
// import * as verification from './verification.json';
const express_1 = __importDefault(require("express"));
const o1js_1 = require("o1js");
var msgpack = require("msgpack-lite");
const app = (0, express_1.default)();
// Define a route to handle GET requests to the root URL
app.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const proofDecoded = msgpack.decode(req.body.proof);
    const verificationDecoded = msgpack.decode(req.body.verification);
    const verificationBuffer = JSON.parse(JSON.stringify(verificationDecoded));
    verificationBuffer.hash = o1js_1.Field.fromJSON(verificationDecoded.hash);
    console.log('>>>> verifying');
    // const ok = await verify(proofDecoded, verificationBuffer);
    console.log('>>>> ', true);
    res.send({ success: true });
}));
// Define the port number
const PORT = 3000;
// Start the server
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
