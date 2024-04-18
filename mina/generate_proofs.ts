import fs from 'fs';
import msgpack from 'msgpack-lite';

import { SelfProof, Field, ZkProgram, verify } from 'o1js';

const AddOne = ZkProgram({
  name: "add-one-example",
  publicInput: Field,

  methods: {
    baseCase: {
      privateInputs: [],

      method(publicInput: Field) {
        publicInput.assertEquals(Field(0));
      },
    },

    step: {
      privateInputs: [SelfProof],

      method(publicInput: Field, earlierProof: SelfProof<Field, void>) {
        earlierProof.verify();
        earlierProof.publicInput.add(1).assertEquals(publicInput);
      },
    },
  },
});

// Generate verification key
const { verificationKey } = await AddOne.compile();

const verificationBufffer = JSON.parse(JSON.stringify(verificationKey))

// Cast Field hash to number
verificationBufffer.hash = verificationKey.hash.toJSON();

// Encode into msg-pack
const verificationEncoded = msgpack.encode(verificationBufffer);
fs.writeFileSync('verification.bin', verificationEncoded);

// Execute program
const proof = await AddOne.baseCase(Field(0));
const proof1 = await AddOne.step(Field(1), proof);
const proof2 = await AddOne.step(Field(2), proof1);

console.log(proof2.toJSON());

// Convert proof object to msg pack 
const proofEncoded = msgpack.encode(proof2.toJSON());
fs.writeFileSync('proof.bin', proofEncoded)

// Verify proof
const ok = await verify(proof2.toJSON(), verificationKey);

console.log('Verification >>>> ', ok);