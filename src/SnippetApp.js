import React, { useState } from "react";
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

const Title = styled.span`
  margin: auto;
`;

const FormGroup = styled(BootstrapFormGroup)`
  display: grid;
  padding: 32px;
  height: 300px;
`;
const Input = styled(BootstrapInput)`
  margin: auto;
`;

const TextArea = styled(Input)`
  height: 100px;
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

const SnippetApp = props => {
  const [title, setTitle] = useState();
  const [body, setBody] = useState();
  const [response, setResponse] = useState();
  const handleSubmit = async () => {
    const res = await fetch("https://lacy-ringer.glitch.me/snippet", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title, body })
    });
    const json = await res.json();
    setResponse(json);
  };
  return (
    <Container>
      <Title>
        Snippet App with MongoDB{" "}
        <span role="img" aria-label="none">
          🍃
        </span>
      </Title>
      <FormGroup>
        <Input
          type="text"
          onChange={e => setTitle(e.target.value)}
          placeholder="Snippet Title"
          name="title"
        />
        <TextArea
          type="textarea"
          onChange={e => setBody(e.target.value)}
          placeholder="Body"
          name="body"
        />
        <Button block onClick={() => handleSubmit()}>
          Submit
        </Button>
      </FormGroup>
      <Container>
        <pre>{JSON.stringify(response)}</pre>
      </Container>
      <ToggleButton block onClick={() => props.onSwitch()}>
        View Snippets
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
)(SnippetApp);
