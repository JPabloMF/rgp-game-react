import React, { useRef, useEffect } from 'react';
import ReactDOMServer from 'react-dom/server';
import styled from 'styled-components';
import w1 from '../../assets/characters/sprites/warrior/w1.png';

const StyledCanvas = styled.canvas`
  border: 1px solid red;
`;

const LevelTest = () => {
  let canvasRef = useRef(null);
  let context = null;

  const component = (context, width, height, color, x, y) => {
    // let ctx = context;
    // console.log(ctx);
    // ctx.fillStyle = color;
    // ctx.fillRect(x, y, width, height);
    const update = function() {
      let ctx = context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    };
  };

  const start = () => {
    const context = canvasRef.current.getContext('2d');
    canvasRef = component(context, 30, 30, 'red', 10, 10);
  };

  const clear = () => {
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  const updateGameArea = () => {
    clear();
  };

  useEffect(() => {
    console.log(canvasRef.current);
    start();
  }, []);

  return (
    <div>
      {/* <canvas ref="canvas" width={640} height={425} /> */}
      <StyledCanvas ref={canvasRef} width={600} height={400} />
    </div>
  );
};

// class LevelTest extends Component {
//   // componentDidMount() {
//   //   const canvas = this.refs.canvas;
//   //   const ctx = canvas.getContext('2d');
//   //   img.onload = () => {
//   //     ctx.drawImage(img, 0, 0)
//   //     ctx.font = "40px Courier"
//   //     ctx.fillText(this.props.text, 210, 75)
//   //   };
//   // }
//   render() {
//     return (
//       <div>
//         <canvas ref="canvas" width={640} height={425} />
//       </div>
//     );
//   }
// }

export default LevelTest;
