import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();

    if (store.isRunned){
    store.callKeyDown();
    }

    let canAddSong = store.currentList !== null;
    let canClose = store.currentList !== null;
    let canUndo = store.canUndo();
    let canRedo = store.canRedo();

    let enabledAddButtonClass = "playlister-button";
    let enabledUndoButtonClass = "playlister-button";
    let enabledRedoButtonClass = "playlister-button";
    let enabledCloseButtonClass = "playlister-button";

    if (!canAddSong) enabledAddButtonClass = "playlister-button-disabled";
    if (!canUndo) enabledUndoButtonClass = "playlister-button-disabled";
    if (!canRedo) enabledRedoButtonClass = "playlister-button-disabled";
    if (!canClose) enabledCloseButtonClass = "playlister-button-disabled";
    /*if (store.markListDeleteId !== 0) {
        enabledAddButtonClass = "playlister-button-disabled";
        enabledCloseButtonClass = "playlister-button-disabled";
    }*/


    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }

    function handleAddsong() {
        store.addAddSongTransaction();
        //store.addSong();
    }



    let editStatus = false;
    if (store.listNameEditActive) {
        editStatus = true;
    }
    return (
        <span id="edit-toolbar">
            <input
                type="button"
                id='add-song-button'
                disabled={!canAddSong}
                value="+"
                className={enabledAddButtonClass}
                onClick={handleAddsong}
            />
            <input
                type="button"
                id='undo-button'
                disabled={!canUndo}
                value="⟲"
                className={enabledUndoButtonClass}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={!canRedo}
                value="⟳"
                className={enabledRedoButtonClass}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={!canClose}
                value="&#x2715;"
                className={enabledCloseButtonClass}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;