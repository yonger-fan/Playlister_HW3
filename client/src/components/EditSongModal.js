import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function EditSongModal () {
    const { store } = useContext(GlobalStoreContext);
    let index = store.markEditSongIndex;

    function editSongCancel() {
        store.hideEditSongModal();
    }

    function editSongConfirm() {
        store.editMarkedSong(index);
        store.hideEditSongModal();
    }
       
        return (
            <div 
                class="modal" 
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='verify-delete-list-root'>
                        <div class="modal-north">
                            Edit Song
                        </div>
                        <div class="modal-center">
                        <div class="modal-center-content">
                        <table>
                            <tr>
                                <td>Title:</td>
                                <td><input type = "text" id = "tname" name = "text"/> </td>
                            </tr>
                            <tr>
                                <td>Artist:</td>
                                <td><input type = "text" id = "aname" name = "text"/></td>
                            </tr>
                            <tr>
                                <td>You Tube Id:</td>
                                <td><input type = "text" id = "yname" name = "text"/></td>
                            </tr>
                        </table>
                    </div>

                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                class="modal-button" 
                                onClick={editSongConfirm}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                class="modal-button" 
                                onClick={editSongCancel}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }

    export default EditSongModal;
