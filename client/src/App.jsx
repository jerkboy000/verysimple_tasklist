import React from "react";
import { Button, Navbar, Container } from "react-bootstrap";

const App = () => {
  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">React Bootstrap</Navbar.Brand>
        <Button variant="outline-light">Button</Button>
      </Navbar>
      <p>This is a React Bootstrap application.</p>
    </Container>
  );
};

export default App;
