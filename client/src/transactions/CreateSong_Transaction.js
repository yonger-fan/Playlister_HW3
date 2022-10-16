import jsTPS_Transaction from "../common/jsTPS.js"
/**
 * CreateSong_Transaction
 * 
 * This class represents a transaction that creates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class CreateSong_Transaction extends jsTPS_Transaction {
    constructor(store, length) {
        super();
        this.store = store;
        this.length = length;
    }

    doTransaction() {
        this.store.addSong();
    }
    
    undoTransaction() {
        this.store.remove(this.length);
    }
}