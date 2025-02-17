import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction';
import CreateSong_Transaction from '../transactions/CreateSong_Transaction';
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction';
import UpdateSong_Transaction from '../transactions/UpdataSong_Transaction';
export const GlobalStoreContext = createContext({});
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    ADD_NEW_SONG: "ADD_NEW_SONG",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    LIST_FOR_DELETION:"LIST_FOR_DELETION",
    MARK_SONG_FOR_DELETION: "MARK_SONG_FOR_DELETION",
    DELETE_SONG:"DELETE_SONG",
    DRAG_LIST:"DRAG_LIST",
    MARK_SONG_FOR_EDITION: "MARK_SONG_FOR_EDITION",
    EDIT_SONG: "EDIT_SONG",
    HIDE_DELETE_MODAL: "HIDE_LIST_MODAL",
    SET_STATE: "SET_STATE",
    HIDE_MODAL: "HIDE_MODAL",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        listNameActive: false,
        markDeletion: null,
        markListDeletion: null,
        markListDeleteId: 0,
        markSongDeleteIndex: 0,
        markEditSongIndex: 0,
        markListEdit : null,
        oldTitle : null,
        oldArtist: null,
        oldYouTubeId: null,
        isRunned : false,
        isEdition : false,
        isDeleting : false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false
                })
            }

            // CREATE A NEW LIST
            case GlobalStoreActionType.ADD_NEW_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                })
            }

            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markDeletion: payload.playlist,
                   //markListDeleteId: payload.playlist._id,
                    isDeleting : payload.isDeleting
                });
            }

            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markSongDeleteIndex: payload.markListDeleteIndex,
                    markListDeletion: payload.markListDeletion,
                    isEdition: payload.isEdition
                });
            }

            // PREPARE TO Edit A LIST
            case GlobalStoreActionType.MARK_SONG_FOR_EDITION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markEditSongIndex: payload.markEditSongIndex,
                    markListEdit: payload.markListEdit,
                    oldTitle : payload.oldTitle,
                    oldArtist: payload.oldArtist,
                    oldYouTubeId: payload.oldYouTubeId,
                    isEdition: payload.isEdition
                });
            }

            // PREPARE TO Edit A LIST
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markEditSongIndex: 0,
                    markListEdit: null,
                    isEdition: payload.isEdition
                });
            }

            // PREPARE TO Edit A LIST
            case GlobalStoreActionType.HIDE_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markEditSongIndex: 0,
                    markListEdit: null,
                    isEdition: payload.isEdition
                });
            }

            // PREPARE TO Edit A LIST
            case GlobalStoreActionType.HIDE_DELETE_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markEditSongIndex: 0,
                    isDeleting: payload.isDeleting
                });
            }

            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.DELETE_SONG: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListDeletion: null,
                    markListDeleteIndex: 0,
                    isEdition: payload.isEdition
                });
            }

            case GlobalStoreActionType.LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    markListDeletion: null,
                    markListDeleteId: 0,
                    isDeleting : payload.isDeleting
                });
            }

            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: false
                });
            }

            case GlobalStoreActionType.DRAG_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload.playlist,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                });
            }

            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    listNameActive: true
                });
            }

            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_STATE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    isRunned : payload.isRunned,
                    markEditSongIndex: payload.markEditSongIndex
                });
            }

            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    async function getListPairs() {
                        response = await api.getPlaylistPairs();
                        if (response.data.success) {
                            let pairsArray = response.data.idNamePairs;
                            storeReducer({
                                type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                payload: {
                                    idNamePairs: pairsArray,
                                    playlist: playlist
                                }
                            });
                        }
                    }
                    getListPairs(playlist);
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        tps.clearAllTransactions();
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
    }

    store.createNewList = function () {
        async function asyncCreateNewList() {
            let newName = "Untitled";

            let newList = {
                name: newName,
                songs: []
            }
            let response = await api.createPlaylist(newList);
            if (response.data.success) {
                let playlist = response.data.playlist;
                let id = playlist._id;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.CREATE_NEW_LIST,
                        payload: {
                            playlist: playlist
                        }
                    });
                }
                store.setCurrentList(id);
            }
        }
        asyncCreateNewList();
    }

    store.addAddSongTransaction = function () {
        let transaction = new CreateSong_Transaction(store, store.currentList.songs.length);
        tps.addTransaction(transaction);
    }

    store.addSong = function () {
        async function asyncAddNewSong() {
         
            let newName = "Untitled";
            let newArtist = "Undefined";
            let newId = "dQw4w9WgXcQ";
            let id = store.currentList._id;

            let newSong = {
                title : newName,
                artist : newArtist,
                youTubeId : newId
            }

            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                let len = playlist.songs.length;
                playlist.songs[len] = newSong;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(id, playlist);
                    //playlist = response.data.playlist;
                    if (response.data.success) {
                        storeReducer({
                            type: GlobalStoreActionType.ADD_NEW_SONG,
                            payload: {
                                playlist: playlist
                            }
                        });
                    }
                }
                updateList(playlist);
            }
        }
        asyncAddNewSong();
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        tps.clearAllTransactions();
        asyncLoadIdNamePairs();
    }

    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        tps.clearAllTransactions();
        asyncSetCurrentList(id);
    }

    store.deleteList = function(id) {
        store.showDeleteListModal();
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                        payload: {
                        playlist : playlist,
                        isDeleting: true
                        }
                    })
                }
            }
        }
        asyncSetCurrentList(id)
    }

    store.deleteSong = function(index) {
        store.showDeleteSongModal();
        async function asyncSetCurrentList() {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
                        payload: {
                        markListDeleteIndex: index,
                        markListDeletion : playlist,
                        isEdition:true
                        }
                    })
                }
            }
        }
        asyncSetCurrentList()
    }

    store.remove = function(index) {
        async function asyncSetCurrentList(index) {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.songs.splice(index, 1);
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(store.currentList._id, playlist);
                    //playlist = response.data.playlist;
                    if (response.data.success) {
                        storeReducer({
                            type: GlobalStoreActionType.DELETE_SONG,
                            payload: {
                                playlist: playlist,
                                isEdition:false
                            }
                        });
                    }
                }
                updateList(playlist);
            }
        }
        asyncSetCurrentList(index)
    }

    store.createSong = function (stack1,stack2) {
        let list = store.currentList;
        let arr = [];
        let index = stack2.pop();
        let data = stack1.pop();
        let j = 0;
        for (let i = 0 ; i <= list.songs.length;i++){
            if (i === index){
                arr[i] = data;
            } else {
            arr[i] = list.songs[j];
            j++;
            }
        }   
        async function updateList(list) {
            let response = await api.updatePlaylistById(store.currentList._id, list);
            let playlist = response.data.playlist;
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.ADD_NEW_SONG,
                    payload: {
                        playlist: playlist
                    }
                });
            }
        }
        updateList(list);
    }

    store.delete = function(id) {
        async function asyncDeleteList(id) {
            let response = await api.deletePlaylistById(id);
            let playlist = response.data.playlist;
            if (response.data.success) {
                async function getListPairs() {
                    response = await api.getPlaylistPairs();
                    if (response.data.success) {
                        let pairsArray = response.data.idNamePairs;
                        storeReducer({
                            type: GlobalStoreActionType.LIST_FOR_DELETION,
                            payload: {
                               idNamePairs: pairsArray,
                               playlist: playlist,
                               isDeleting: false
                            }
                        })
                    }
                }
                getListPairs()
            }
        }
        asyncDeleteList(id)
    }

    store.editSong = function (index, song) {
        let t = song.title;
        let a = song.artist;
        let y = song.youTubeId;
        store.showEditSongModal(t,a,y);
        async function asyncSetCurrentSong() {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.MARK_SONG_FOR_EDITION,
                        payload: {
                        markEditSongIndex: index,
                        markListEdit : playlist,
                        oldTitle : t,
                        oldArtist: a,
                        oldYouTubeId: y,
                        isEdition : true
                        }
                    })
                }
            }
        }
        asyncSetCurrentSong()

    }

    store.editMarkedSong = function(index) {
        let newTitle = document.getElementById("tname").value; //new value
        let newArtist = document.getElementById("aname").value; //new value
        let newYouTubeId= document.getElementById("yname").value; //new value
        store.addEditSongTransaction(store.oldTitle,store.oldArtist,store.oldYouTubeId,
            newTitle,newArtist,newYouTubeId,index);
        //this.hideEditSongModal();
    }

    store.edit = function(title,artist,youTubeId,index) {
        async function asyncEditSong(index) {
            let response = await api.getPlaylistById(store.currentList._id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.songs[index].title = title;
                playlist.songs[index].artist = artist;
                playlist.songs[index].youTubeId = youTubeId;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        let playlist = response.data.playlist;
                        storeReducer({
                            type: GlobalStoreActionType.EDIT_SONG,
                            payload: {
                                playlist: playlist,
                                isEdition : false
                            }
                        });
                    }
                }
                updateList(playlist);
            }
        }
        asyncEditSong(index);

    }

    store.moveSong = function (start, end){
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }
        async function updateList(list) {
            let response = await api.updatePlaylistById(list._id, list);
            list = response.data.playlist;
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.DRAG_LIST,
                    payload: {
                        playlist: list
                            }
                });
            }
        }
        updateList(list);
    }

    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.addRemoveSongTransaction = function (index) {
        let stack1 = [];
        let stack2 = [];
        let song = store.currentList.songs[index]
        let transaction = new RemoveSong_Transaction(store, stack1,stack2, index, song);
        tps.addTransaction(transaction);
    }

    store.addEditSongTransaction = function (oldTitle,oldArtist,oldSongId,newTitle,newArtist,newSongId,index) {
        let transaction = new UpdateSong_Transaction(store, oldTitle,oldArtist,oldSongId,newTitle,newArtist,newSongId,index);
        tps.addTransaction(transaction);
    }


    store.showDeleteListModal = function () {
        let modal = document.getElementById("delete-list-modal");
        modal.classList.add("is-visible");
    }

    store.hideDeleteListModal = function (){
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODAL,
            payload: {
                isDeleting: false
            }
        });
        let modal = document.getElementById("delete-list-modal");
        modal.classList.remove("is-visible");
    }

    store.showDeleteSongModal = function () {
        let modal = document.getElementById("delete-song-modal");
        modal.classList.add("is-visible");
    }
    // THIS FUNCTION IS FOR HIDING THE MODAL
    store.hideDeleteSongModal =  function (){
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODAL,
            payload: {
                isEdition: false
            }
        });
        let modal = document.getElementById("delete-song-modal");
        modal.classList.remove("is-visible");
    }

    store.showEditSongModal = function (t,a,y){
        let modal = document.getElementById("edit-song-modal");
        document.getElementById("tname").value = t;
        document.getElementById("aname").value = a;
        document.getElementById("yname").value = y;
        modal.classList.add("is-visible");
    }

    store.hideEditSongModal = function (){
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODAL,
            payload: {
                isEdition: false
            }
        });
        let modal = document.getElementById("edit-song-modal");
        modal.classList.remove("is-visible");
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        if (tps.hasTransactionToUndo()){
            tps.undoTransaction();
        }
    }
    store.redo = function () {
        if (tps.hasTransactionToRedo()){
            tps.doTransaction();
        }
    }

    store.canUndo = function () {
        return tps.hasTransactionToUndo();
    }

    store.canRedo = function () {
        return tps.hasTransactionToRedo();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setlistNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }


    /*store.handleKeyDown = function () {
        document.addEventListener("keydown",(event) => {
            let canUndo = tps.hasTransactionToUndo();
            let canRedo = tps.hasTransactionToRedo();
                  if ((event.ctrlKey || event.metaKey) && event.key === "z" && canUndo){
                      store.undo();
                  } else if ((event.ctrlKey || event.metaKey) && event.key === "y" && canRedo){
                      store.redo();
                  }
        }) 
    } */

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}