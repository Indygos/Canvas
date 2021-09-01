import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

class CanvasExample extends React.Component {
  constructor(props) {
    super(props);
    this.canvas = React.createRef();
    this.time = 0;
  }
  draw() {
    const ctx = this.canvas.current.getContext("2d");
    const { size, rectanglesCount } = this.props;
    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = "rgba(100, 90, 250, 0.2)";
    ctx.save();
    ctx.translate(size / 2, size / 2);
    const maxRectSize = size / Math.sqrt(2);
    for (let i = 0; i < rectanglesCount; ++i) {
      const ratio = maxRectSize * (i + 1.0);
      const rectSize = ratio / rectanglesCount;
      const angle = ratio;
      ctx.save();
      ctx.rotate(angle + this.time);
      ctx.translate(-rectSize / 2, -rectSize / 2);
      ctx.fillRect(0, 0, rectSize, rectSize);
      ctx.restore();
    }
    ctx.restore();
  }
  update = () => {
    this.time += 0.02;
    this.draw();
    this.animationRequestId = window.requestAnimationFrame(this.update);
  };
  componentDidMount() {
    this.animationRequestId = window.requestAnimationFrame(this.update);
  }
  componentDidUpdate() {}
  componentWillUnmount() {
    window.cancelAnimationFrame(this.animationRequestId);
  }
  render() {
    const { size } = this.props;
    return (
      <canvas
        ref={this.canvas}
        style={{ border: "1px solid blue" }}
        width={size}
        height={size}
      />
    );
  }
}
class App extends React.Component {
  state = {
    rectanglesCount: 10
  };
  render() {
    return (
      <div className="App">
        <h1>Hello Canvas</h1>
        <button
          onClick={() =>
            this.setState((prevState) => ({
              rectanglesCount: prevState.rectanglesCount + 1
            }))
          }
        >
          +1
        </button>
        <button
          onClick={() =>
            this.setState((prevState) => ({
              rectanglesCount: prevState.rectanglesCount - 1
            }))
          }
        >
          -1
        </button>
        <br />
        <CanvasExample
          size={900}
          rectanglesCount={this.state.rectanglesCount}
        />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
