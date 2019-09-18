import React, { useState, useEffect } from "react";
import {
  Container as BootstrapContainer,
  FormGroup as BootstrapFormGroup,
  Input as BootstrapInput,
  Button as BootstrapButton
} from "reactstrap";
import styled from "styled-components";
import * as Palette from "./Palette";
import { connect } from "react-redux";
import * as actions from "./store/actions";

const Container = styled(BootstrapContainer)`
  background-image: linear-gradient(
    to right bottom,
    ${Palette.Secondary},
    ${Palette.AltSecondary}
  );
  display: grid;
  border-radius: 8px;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
  color: ${Palette.Text};
`;

const SnippetsContainer = styled(Container)`
  margin: auto;
  padding: 16px;
  height: 50vh;
`;

const SnippetDiv = styled(Container)`
  margin: auto;
  padding: 16px;
  display: grid;
  justify-content: center;
  margin-top: 8px;
  margin-bottom: 8px;
`;

const Code = styled.pre`
  background-color: black;
  color: white;
  padding: 8px;
  border-radius: 8px;
  box-shadow: 0 2rem 4rem rgba(0, 0, 0, 0.2);
`;

const Title = styled.span`
  margin: auto;
`;

const SnippetTitle = styled.h5`
  margin: auto;
  margin-bottom: 4px;
`;

const Button = styled(BootstrapButton)`
  :focus {
    outline: none;
  }
  background-image: linear-gradient(
    to right bottom,
    ${Palette.AltSecondary},
    ${Palette.Secondary}
  );
`;

const ToggleButton = styled(Button)`
  width: 300px;
  height: 48px;
  margin: auto;
`;

const SnippetButton = styled(Button)`
  width: 50vw;
  margin: auto;
`;

const SnippetViewer = props => {
  const [snippets, setSnippets] = useState([]);
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    fetch("https://lacy-ringer.glitch.me/snippets")
      .then(res => res.json())
      .then(data => setSnippets(data));
  }, [counter]);
  const handleDelete = async id => {
    await fetch(`https://lacy-ringer.glitch.me/snippet/delete/${id}`, {
      method: "POST"
    });
    setCounter(counter + 1);
  };
  const snippetsElements = snippets.map(snippet => (
    <SnippetDiv>
      <SnippetTitle>{snippet.title}</SnippetTitle>
      <Code>{snippet.body}</Code>
      <SnippetButton
        block
        data-id={snippet._id}
        onClick={e => handleDelete(e.target.dataset.id)}
      >
        Delete Snippet
      </SnippetButton>
    </SnippetDiv>
  ));
  return (
    <Container>
      <Title>
        Snippet App with MongoDB{" "}
        <span role="img" aria-label="none">
          🍃
        </span>
      </Title>
      <SnippetsContainer className="overflow-auto">
        {snippetsElements}
      </SnippetsContainer>
      <ToggleButton block onClick={() => props.onSwitch()}>
        Add Snippets
      </ToggleButton>
    </Container>
  );
};

const mapStateToProps = state => ({
  isViewing: state.viewRed.isViewing
});

const mapDispatchToProps = dispatch => {
  return { onSwitch: () => dispatch(actions.switchAction()) };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SnippetViewer);
