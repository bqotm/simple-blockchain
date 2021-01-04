const EC = require('elliptic').ec; //a class
const SHA256=require('crypto-js/sha256');
const { v1: uuidv1 } = require('uuid'); //function
const ec=new EC('secp256k1');

class ChainUtil{
    static genKeyPair(){
        return ec.genKeyPair();
    }

    static id(){
        return uuidv1();
    }

    static hash(data){
        return SHA256(JSON.stringify(data)).toString();
    }

    static verifySignature(publicKey,signature,dataHash){
        return ec.keyFromPublic(publicKey,'hex').verify(dataHash,signature);
    }

}

module.exports=ChainUtil;