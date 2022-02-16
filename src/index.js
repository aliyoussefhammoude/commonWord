import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import LocalUpload from './components/LocalUpload';
// import FirebaseUpload from './components/FirebaseUpload';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>

    {/* select the FirebaseUpload component here instead of the LocalUpload */}
    <LocalUpload />
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
