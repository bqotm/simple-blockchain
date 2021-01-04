const ChainUtil = require('../chain-util');

const{DIFF, MINE_RATE}=require('../config');

class Block{
    constructor(timestamp, lastHash, hash, data, nonce, difficulty){
        this.timestamp=timestamp;
        this.lastHash=lastHash;
        this.hash=hash;
        this.data=data;
        this.nonce=nonce;
        this.difficulty=difficulty;

    }

    toString(){
      return 'block\n'+
        '  Timestamp    : '+this.timestamp+
        '\n  Last Hash  : '+this.lastHash+
        '\n  Hash       : '+this.hash+
        '\n  Data       : '+this.data+
        '\n  nonce      : '+this.nonce+
        '\n  difficulty : '+this.difficulty;
        
    }

    static genesis(){
        return new this('Genesis time', '--', 'f1r57qs88xv6',[],0,DIFF);
    }

    static mineBlock(lastBlock, data){
        let hash,timestamp;
        const lastHash=lastBlock.hash;
        let{ difficulty }=lastBlock;
        let nonce=0;
        do{
            nonce++;
            timestamp=Date.now();
            difficulty=Block.adjustDifficulty(lastBlock, timestamp);
            hash=Block.hash(timestamp,lastHash,data,nonce,difficulty);
        }while(hash.substring(0,difficulty)!=='0'.repeat(difficulty));
       
        return new this(timestamp,lastHash,hash,data,nonce,difficulty);
    }

    static hash(timestamp,lastHash,data,nonce,difficulty){
        return ChainUtil.hash(timestamp+lastHash+data+nonce+difficulty).toString();
    }

    static blockHash(block){
        const{timestamp, lastHash, data, nonce, difficulty}=block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty }=lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty + 1 : difficulty - 1;
        return difficulty;
    }
}

module.exports=Block;