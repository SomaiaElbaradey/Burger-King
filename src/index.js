import ReactDOM  from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import App from './app';

import './style.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/@fortawesome/fontawesome-free/css/all.css";

ReactDOM.render(
    <BrowserRouter>
        <App className="App"/>
    </BrowserRouter>
 , document.querySelector('#root'));
