import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that deletes a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class RemoveSong_Transaction extends jsTPS_Transaction {
    constructor(store, stack1,stack2,index, song) {
        super();
        this.store = store;
        this.index = index;
        this.song = song;
        this.stack1 = stack1;
        this.stack2 = stack2;
    }

    doTransaction() {
        this.stack1.push(this.song);
        this.stack2.push(this.index);
        this.store.remove(this.index);
    }
    
    undoTransaction() {
        this.store.createSong(this.stack1,this.stack2);
    }
}