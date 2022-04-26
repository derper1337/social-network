import './App.css';
import Content from './components/Content/Content';
import {BrowserRouter, HashRouter} from 'react-router-dom';
import HeaderContainer from "./components/Header/HeaderContainer";
import {connect} from "react-redux";
import {initThunkCreator} from "./Redux/app-reducer";
import Preloader from "./components/common/preloader/preloader";
import {useEffect} from "react";

const App = (props) => {

    useEffect(() => {
        props.initThunkCreator();
    }, []);

    if (!props.initialized) {
        return <Preloader/>
    } else return (
        <div className={"app-wrapper"}>
            <HashRouter>
                <HeaderContainer/>
                <Content/>
            </HashRouter>
        </div>
    );
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized,
})

export default connect(mapStateToProps, {initThunkCreator})(App);
