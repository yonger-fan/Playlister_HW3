import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'

function DeleteListModal () {
        const { store } = useContext(GlobalStoreContext);
        let markeDeletion = store.markDeletion;
        let id = store.markListDeleteId;
        let name = "";
        if (markeDeletion) {
            name = markeDeletion.name;
        }
        store.history = useHistory();

        function handleCancel() {
            store.hideDeleteListModal();
        }

        function handleConfirm() {
            store.delete(id);
            store.hideDeleteListModal();
        }


        return (
            <div 
                class="modal" 
                id="delete-list-modal" 
                data-animation="slideInOutLeft">
                    <div class="modal-dialog" id='verify-delete-list-root'>
                        <div class="modal-north">
                            Delete playlist?
                        </div>
                        <div class="modal-center">
                            <div class="modal-center-content">
                                Are you sure you wish to permanently delete the <span> {name} </span> playlist?
                            </div>
                        </div>
                        <div class="modal-south">
                            <input type="button" 
                                id="delete-list-confirm-button" 
                                class="modal-button" 
                                onClick = {handleConfirm}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-list-cancel-button" 
                                class="modal-button" 
                                onClick = {handleCancel}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
    }

    export default DeleteListModal;
