import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteSongModal () {
    const { store } = useContext(GlobalStoreContext);
    let index = store.markSongDeleteIndex;
    let list = store.markListDeletion;
    let name = "";
    if (list) {
        name = list.songs[index].title;
    }
    store.history = useHistory();

    function CancelDelete() {
        store.hideDeleteSongModal();
    }

    function ConfirmDelete() {
        store.remove(index);
        store.hideDeleteSongModal();
    }
    
        return (
            <div 
                class="modal" 
                id="delete-song-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-dialog" id='verify-remove-song-root'>
                        <div class="modal-north">
                            Remove Song?
                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                                Are you aure you wish to permanently remove <span>{name}</span> form the playlist?
                            </div>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="delete-song-confirm-button" 
                                class="modal-button" 
                                value='Confirm'
                                onClick={ConfirmDelete}
                                 />
                            <input type="button" 
                                id="delete-song-cancel-button" 
                                class="modal-button" 
                                onClick={CancelDelete}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }

export default DeleteSongModal;