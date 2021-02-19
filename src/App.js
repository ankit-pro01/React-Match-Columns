import './App.css';
import { DndProvider } from "react-dnd";
import {HTML5Backend } from "react-dnd-html5-backend";
import Container from './Components/Container';
import { TouchBackend } from 'react-dnd-touch-backend'

const isTouchDevice = () => {
  if ("ontouchstart" in window) {
    return true;
  }
  return false;
};

function App() {
  const backendForDND = isTouchDevice() ? TouchBackend : HTML5Backend;
  return (
    <div className="App">
      <DndProvider backend = {backendForDND}>
        <Container />
      </DndProvider>
    </div>
  );
}

export default App;
