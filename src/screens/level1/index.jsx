import React from 'react';
import styled from 'styled-components';

import Box from '../../components/box';
import { getTerrainProperties } from '../../utils/levels';

import w1 from '../../assets/characters/sprites/warrior/w1.png';
import w2 from '../../assets/characters/sprites/warrior/w2.png';
import w3 from '../../assets/characters/sprites/warrior/w3.png';
import w4 from '../../assets/characters/sprites/warrior/w4.png';
import chest1 from '../../assets/chest/chest1.png';
import chest2 from '../../assets/chest/chest2.png';

const StyledRow = styled.div`
  display: flex;
`;

const StyledCharapter = styled.div`
  width: 75px;
  height: 75px;
  position: absolute;
  transform: ${({ positionY, positionX }) =>
    `translateY(${positionY}px) translateX(${positionX}px)`};
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${({ sprite }) => sprite});
  transition: 150ms;
`;

const StyledItem = styled.div`
  width: 105px;
  height: 105px;
  position: absolute;
  transform: translateX(630px) translateY(30px);
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${({ type }) => (type === 'chest' ? chest1 : null)});
`;

const level = [
  [
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false),
    getTerrainProperties('rock', true),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', true)
  ],
  [
    getTerrainProperties('rock', true),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false)
  ],
  [
    getTerrainProperties('rock', true),
    getTerrainProperties('rock', true),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false)
  ],
  [
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false)
  ],
  [
    getTerrainProperties('terrain', false),
    getTerrainProperties('rock', true),
    getTerrainProperties('rock', true),
    getTerrainProperties('rock', true),
    getTerrainProperties('rock', true)
  ]
];

class Level1 extends React.Component {
  levelmatrix = { x: 2, xLimit: 750, y: 4, yLimit: 825 };
  map = { 87: false, 83: false, 65: false, 68: false };

  constructor(props) {
    super(props);
    this.state = {
      positionY: 75,
      positionX: 75,
      matrixPositionX: 0,
      matrixPositionY: 0,
      sprite: w3
    };
  }

  isBlocked = (element) => element.blocked;

  getElementFromMatrix = (matrixPositionX, matrixPositionY) =>
    level[matrixPositionY][matrixPositionX];

  move = ({ keyCode }) => {
    const {
      positionY,
      positionX,
      matrixPositionY,
      matrixPositionX
    } = this.state;
    // if (keyCode in this.map) {
    //   this.map[keyCode] = true;
    //   if (this.map[83] && this.map[68]) {
    //     // FIRE EVENT
    //     console.log('s,d');
    //   }
    //   if (this.map[83]) {
    //     console.log('s');
    //   }
    // }
    // console.log(this.map);
    switch (keyCode) {
      // up W
      case 87:
        this.setState({ sprite: w4 });
        if (
          positionY - 150 > 0 &&
          !this.isBlocked(
            this.getElementFromMatrix(matrixPositionX, matrixPositionY - 1)
          )
        ) {
          this.setState({
            positionY: positionY - 150,
            matrixPositionY: matrixPositionY - 1
          });
        }
        break;
      // down S
      case 83:
        this.setState({ sprite: w1 });
        if (
          positionY + 150 < this.levelmatrix.yLimit &&
          !this.isBlocked(
            this.getElementFromMatrix(matrixPositionX, matrixPositionY + 1)
          )
        ) {
          this.setState({
            positionY: positionY + 150,
            matrixPositionY: matrixPositionY + 1
          });
        }
        break;
      // left A
      case 65:
        this.setState({ sprite: w2 });
        if (
          positionX - 150 > 0 &&
          !this.isBlocked(
            this.getElementFromMatrix(matrixPositionX - 1, matrixPositionY)
          )
        ) {
          this.setState({
            positionX: positionX - 150,
            matrixPositionX: matrixPositionX - 1
          });
        }
        break;
      // right D
      case 68:
        this.setState({ sprite: w3 });
        if (
          positionX + 150 < this.levelmatrix.xLimit &&
          !this.isBlocked(
            this.getElementFromMatrix(matrixPositionX + 1, matrixPositionY)
          )
        ) {
          this.setState({
            positionX: positionX + 150,
            matrixPositionX: matrixPositionX + 1
          });
        }
        break;
      default:
        break;
    }
  };

  // stopMove = (e) => {
  //   if (e.keyCode in this.map) {
  //     this.map[e.keyCode] = false;
  //   }
  // };

  componentDidMount() {
    document.addEventListener('keydown', this.move);
    // document.addEventListener('keyup', this.stopMove);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.move);
    // document.removeEventListener('keyup', this.stopMove);
  }

  render() {
    const { positionY, positionX, sprite } = this.state;
    return (
      <div>
        <StyledCharapter
          positionY={positionY - 35}
          positionX={positionX - 35}
          sprite={sprite}
        />
        <StyledItem type="chest" />
        {level.map((row, rowIndex) => (
          <StyledRow key={rowIndex}>
            {row.map((element, elementIndex) => (
              <Box type={element.type} key={elementIndex} />
            ))}
          </StyledRow>
        ))}
      </div>
    );
  }
}

export default Level1;
