import React from "react";
import SnippetApp from "./SnippetApp";
import SnippetViewer from "./SnippetViewer";
import { connect } from "react-redux";

const App = props => {
  return props.isViewing ? <SnippetViewer /> : <SnippetApp />;
};

const mapStateToProps = state => ({
  isViewing: state.viewRed.isViewing
});

export default connect(mapStateToProps)(App);
