import React, { Component, Fragment } from 'react';

import './App.css';
import { Header } from "./partials/Haeder";
import { Footer } from "./partials/Footer";
import { Main } from "./main/MainPage";

class App extends Component {
  render() {
    return (
      <Fragment>
          <div id="wrap">
          <Header />
          <Main />
          </div>
          
        <Footer />
      </Fragment>
    );
  }
}

export default App;
