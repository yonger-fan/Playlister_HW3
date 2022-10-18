import './App.css';
import { React, useContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Banner, ListSelector, PlaylistCards, Statusbar, DeleteListModal, DeleteSongModal, EditSongModal } from './components'
import { GlobalStoreContext } from './store'
/*
    This is our application's top-level component.
    
    @author McKilla Gorilla
*/
const App = () => {
    const { store } = useContext(GlobalStoreContext);
    const ctrlPressed = false;

    const handleAppKeyDown = (keyEvent) => {
        let CTRL_KEY_CODE = "17";
        if (keyEvent.which === CTRL_KEY_CODE) {
            ctrlPressed = true;
        }
        else if (keyEvent.key.toLowerCase() === "z") {
            if (!ctrlPressed) {
                store.undo();
            }
        }
        else if (keyEvent.key.toLowerCase() === "y") {
            if (!ctrlPressed) {
                store.redo();
            }
        }
    }
    const handleAppKeyUp = (keyEvent) => {
        if (keyEvent.which === "17")
            ctrlPressed = false;
    }

    document.onkeydown = handleAppKeyDown;
    document.onkeyup = handleAppKeyUp;
    

    return (
        <Router>
            <Banner />
            <Switch>
                <Route path="/" exact component={ListSelector} />
                <Route path="/playlist/:id" exact component={PlaylistCards} />
            </Switch>
            <Statusbar />
            <DeleteListModal />
            <DeleteSongModal />
            <EditSongModal />
        </Router>
    )
}

export default App