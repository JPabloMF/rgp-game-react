import React from 'react';
import styled from 'styled-components';

import Box from '../../components/box';
import { getTerrainProperties } from '../../utils/levels';

import w1 from '../../assets/characters/sprites/warrior/w1.png';
import w2 from '../../assets/characters/sprites/warrior/w2.png';
import w3 from '../../assets/characters/sprites/warrior/w3.png';
import w4 from '../../assets/characters/sprites/warrior/w4.png';

const StyledRow = styled.div`
  display: flex;
`;

const StyledCharapter = styled.div`
  width: 70px;
  height: 70px;
  position: absolute;
  transform: ${({ positionY, positionX }) =>
    `translateY(${positionY}px) translateX(${positionX}px)`};
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${({ sprite }) => sprite});
  transition: 150ms;
`;

const level = [
  [
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('rock', null, true),
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', 'chestClose', true),
  ],
  [
    getTerrainProperties('rock', null, true),
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', null, false),
  ],
  [
    getTerrainProperties('rock', null, true),
    getTerrainProperties('rock', null, true),
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', null, false),
  ],
  [
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('terrain', null, false),
  ],
  [
    getTerrainProperties('terrain', null, false),
    getTerrainProperties('rock', null, true),
    getTerrainProperties('rock', null, true),
    getTerrainProperties('rock', null, true),
    getTerrainProperties('rock', null, true),
  ],
];

class Level1 extends React.Component {
  levelmatrix = { xLimit: 500, yLimit: 500 };
  map = { 87: false, 83: false, 65: false, 68: false };

  constructor(props) {
    super(props);
    this.state = {
      positionY: 50,
      positionX: 60,
      matrixPositionX: 0,
      matrixPositionY: 0,
      sprite: w3,
      level
    };
  }

  isBlocked = (element) => element.blocked;

  getElementFromMatrix = (matrixPositionX, matrixPositionY) =>
    level[matrixPositionY][matrixPositionX];

  isChest = (element) => element.object === 'chestClose';

  hasChest = (matrixPositionY, matrixPositionX) => {
    // left
    if (matrixPositionX - 1 >= 0) {
      const leftElement = level[matrixPositionY][matrixPositionX - 1];
      if (leftElement && this.isChest(leftElement)) {
        level[matrixPositionY][matrixPositionX - 1].object = 'chestOpen';
        this.setState({ sprite: w2 });
        // console.log('chest opened');
      }
    }
    // right
    if (matrixPositionX + 1 >= 0) {
      const rightElement = level[matrixPositionY][matrixPositionX + 1];
      if (rightElement && this.isChest(rightElement)) {
        level[matrixPositionY][matrixPositionX + 1].object = 'chestOpen';
        this.setState({ sprite: w3 });
        // console.log('chest opened');
      }
    }
    // up
    if (matrixPositionY - 1 >= 0) {
      const upElement = level[matrixPositionY - 1][matrixPositionX];
      if (upElement && this.isChest(upElement)) {
        level[matrixPositionY - 1][matrixPositionX].object = 'chestOpen';
        this.setState({ sprite: w4 });
        // console.log('chest opened');
      }
    }
    //down
    if (matrixPositionY + 1 >= 0) {
      const downElement = level[matrixPositionY + 1][matrixPositionX];
      if (downElement && this.isChest(downElement)) {
        level[matrixPositionY + 1][matrixPositionX].object = 'chestOpen';
        this.setState({ sprite: w1 });
        // console.log('chest opened');
      }
    }
  };

  move = ({ keyCode }) => {
    const {
      positionY,
      positionX,
      matrixPositionY,
      matrixPositionX,
    } = this.state;
    switch (keyCode) {
      // E
      case 69:
        this.hasChest(matrixPositionY, matrixPositionX);
        // console.log(this.getElementFromMatrix(matrixPositionX, matrixPositionY - 1))
        break;
      // up W
      case 87:
        this.setState({ sprite: w4 });
        if (
          positionY - 100 > 0 &&
          !this.isBlocked(
            this.getElementFromMatrix(matrixPositionX, matrixPositionY - 1)
          )
        ) {
          this.setState({
            positionY: positionY - 100,
            matrixPositionY: matrixPositionY - 1,
          });
        }
        break;
      // down S
      case 83:
        this.setState({ sprite: w1 });
        if (
          positionY + 100 < this.levelmatrix.yLimit &&
          !this.isBlocked(
            this.getElementFromMatrix(matrixPositionX, matrixPositionY + 1)
          )
        ) {
          this.setState({
            positionY: positionY + 100,
            matrixPositionY: matrixPositionY + 1,
          });
        }
        break;
      // left A
      case 65:
        this.setState({ sprite: w2 });
        if (
          positionX - 100 > 0 &&
          !this.isBlocked(
            this.getElementFromMatrix(matrixPositionX - 1, matrixPositionY)
          )
        ) {
          this.setState({
            positionX: positionX - 100,
            matrixPositionX: matrixPositionX - 1,
          });
        }
        break;
      // right D
      case 68:
        this.setState({ sprite: w3 });
        if (
          positionX + 100 < this.levelmatrix.xLimit &&
          !this.isBlocked(
            this.getElementFromMatrix(matrixPositionX + 1, matrixPositionY)
          )
        ) {
          this.setState({
            positionX: positionX + 100,
            matrixPositionX: matrixPositionX + 1,
          });
        }
        break;
      default:
        break;
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.move);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.move);
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
        {level.map((row, rowIndex) => (
          <StyledRow key={rowIndex}>
            {row.map((element, elementIndex) => (
              <Box
                type={element.type}
                object={element.object}
                key={elementIndex}
              />
            ))}
          </StyledRow>
        ))}
      </div>
    );
  }
}

export default Level1;
