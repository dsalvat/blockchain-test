import Blockchain from "../blockchain";
import validate from "./validate";

describe('validate', () => {
    let blockchain;

    beforeEach(() => {
        blockchain = new Blockchain();
    });

    it('validates a valid chain', () =>{
       blockchain.addBlock('bl0ck-1');
       blockchain.addBlock('bl0ck-2');

       expect(validate(blockchain.blocks)).toBe(true);
    });

    it('invalidates chain with a corrupt genesis block', () => {
        blockchain.blocks[0].data = 'b4d d4t4';

        expect(() => {
           validate(blockchain.blocks);
        }).toThrowError('Invalid Genesis block');

    });

    it('invalidates chain with a corrupt previousHash within a block', () => {
       blockchain.addBlock('bl4ck-1');
       blockchain.blocks[1].previousHash = 'h4ck';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Invalid previous Hash');

    });

    it('invalidates chain with a corrupt hash within a block', () => {
        blockchain.addBlock('bl4ck-1');
        blockchain.blocks[1].hash = 'h4ck';

        expect(() => {
            validate(blockchain.blocks);
        }).toThrowError('Invalid hash.');

    });

});
