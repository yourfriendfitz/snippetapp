import React from "react";
import ReactDOM from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import App from "./App";
import styled from "styled-components";
import * as Palette from "./Palette";
import * as serviceWorker from "./serviceWorker";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import viewReducer from "./store/viewing";

const rootReducer = combineReducers({
  viewRed: viewReducer
});

const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const Container = styled.div`
  background-image: linear-gradient(
    to right bottom,
    ${Palette.Primary},
    ${Palette.AltPrimary}
  );
  display: grid;
  height: 100vh;
  padding: 32px;
`;

ReactDOM.render(
  <Container>
    <Provider store={store}>
      <App />
    </Provider>
  </Container>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
