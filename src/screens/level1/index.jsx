import React from 'react';
import styled from 'styled-components';

import { getTerrainProperties } from '../../utils/levels';
import terrain from '../../assets/textures/terrain.jpg';
import rock from '../../assets/textures/rock.jpg';
import mf from '../../assets/characters/mf.png';

const StyledRow = styled.div`
  display: flex;
`;

const StyledBox = styled.div`
  width: 150px;
  height: 150px;
  background-size: contain;
  background-image: url(${({ type }) =>
    type === 'terrain' || type === 'character' ? terrain : rock});
`;

const StyledCharapter = styled.div`
  width: 75px;
  height: 75px;
  position: absolute;
  transform: ${({ positionY, positionX }) =>
    `translateY(${positionY}px) translateX(${positionX}px)`};
  background-size: contain;
  background-repeat: no-repeat;
  background-image: url(${mf});
  transition: 100ms;
`;

const level = [
  [
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false),
    getTerrainProperties('rock', true)
  ],
  [
    getTerrainProperties('rock', true),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false)
  ],
  [
    getTerrainProperties('rock', true),
    getTerrainProperties('rock', true),
    getTerrainProperties('terrain', false)
  ],
  [
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false),
    getTerrainProperties('terrain', false)
  ],
  [
    getTerrainProperties('terrain', false),
    getTerrainProperties('rock', true),
    getTerrainProperties('rock', true)
  ]
];

class Level1 extends React.Component {
  levelMatriz = { x: 3, xLimit: 450, y: 5, yLimit: 825 };

  constructor(props) {
    super(props);
    this.state = {
      positionY: 75,
      positionX: 75
    };
  }

  move = ({ keyCode }) => {
    const { positionY, positionX } = this.state;
    switch (keyCode) {
      // up W
      case 87:
        if (positionY - 150 > 0) {
          this.setState({ positionY: positionY - 150 });
        }
        break;
      // down S
      case 83:
        if (positionY + 150 < this.levelMatriz.yLimit) {
          this.setState({ positionY: positionY + 150 });
        }
        break;
      // left A
      case 65:
        if (positionX - 150 > 0) {
          this.setState({ positionX: positionX - 150 });
        }
        break;
      // right D
      case 68:
        if (positionX + 150 < this.levelMatriz.xLimit) {
          this.setState({ positionX: positionX + 150 });
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
    const { positionY, positionX } = this.state;
    return (
      <div>
        <StyledCharapter
          positionY={positionY - 35}
          positionX={positionX - 35}
        />
        {level.map((row, rowIndex) => (
          <StyledRow key={rowIndex}>
            {row.map((element, elementIndex) => (
              <StyledBox type={element.type} key={elementIndex} />
            ))}
          </StyledRow>
        ))}
      </div>
    );
  }
}

export default Level1;
