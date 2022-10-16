import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * UpdateSong_Transaction
 * 
 * This class represents a transaction that updates a song
 * in the playlist. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class UpdateSong_Transaction extends jsTPS_Transaction {
    constructor(store, preTitle,preArtist,preSongId,newTitle,newArtist,newSongId,index) {
        super();
        this.store = store;
        this.preTitle = preTitle;
        this.preArtist = preArtist;
        this.preSongId = preSongId;
        this.newTitle = newTitle;
        this.newArtist = newArtist;
        this.newSongId = newSongId;
        this.index = index;
    }

    doTransaction() {
        this.store.edit(this.newTitle,this.newArtist,this.newSongId,this.index);
    }
    
    undoTransaction() {
        this.store.edit(this.preTitle,this.preArtist,this.preSongId,this.index);
    }
}