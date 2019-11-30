import React, { useEffect, useState } from 'react';
import { Levels } from '../../utils/levels';
import styled from 'styled-components';

import terrain from '../../assets/textures/terrain.jpg';
import rock from '../../assets/textures/rock.jpg';
import mf from '../../assets/characters/mf.png';

const StyledContainer = styled.div`
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: -1px 3px 5px 0px rgba(0, 0, 0, 0.75);
`;

const StyledRow = styled.div`
  display: flex;
`;

const StyledBox = styled.div`
  min-height: 100px;
  min-width: 100px;
  max-height: 100px;
  max-width: 100px;
  padding: 30px;
  background-image: url(${({ type }) => type === 'terrain' || type === 'character' ? terrain : rock});
`;

const StyledCharacter = styled.img`
  width: 80%;
`;

class Level1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      level: Levels.level1,
      coordinates: { x: 0, y: 0 }
    };

    this.move = this.move.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.move);
  }

  move({ keyCode }) {
    switch (keyCode) {
      // up
      case 87:
        this.setPosition('y', 'substract');
        break;
      // down
      case 83:
        this.setPosition('y', 'add');
        break;
      // left
      case 65:
        this.setPosition('x', 'substract');
        break;
      // right
      case 68:
        this.setPosition('x', 'add');
        break;
      default:
        break;
    }
  }

  setPosition(axis, action) {
    // add , substract
    const { level, coordinates } = this.state;
    const currentCoordinates = { ...coordinates };
    const currentLevel = [...level];
    currentLevel[currentCoordinates.y][currentCoordinates.x].type = 'terrain';
    if (action === 'add') {
      if (
        currentCoordinates[axis] + 1 <
          currentLevel[currentCoordinates[axis]].length &&
        axis === 'x'
      ) {
        currentCoordinates[axis]++;
      } else if (currentCoordinates[axis] + 1 < currentLevel.length && axis === 'y') {
        currentCoordinates[axis]++;
      }
    } else {
      if (axis === 'x') {
        currentCoordinates[axis] - 1 >= 0 && currentCoordinates[axis]--;
      } else {
        if (currentCoordinates[axis] - 1 >= 0) {
          currentCoordinates[axis]--;
        }
      }
    }
    currentLevel[currentCoordinates.y][currentCoordinates.x].type = 'character';
    this.setState({
      ...this.state,
      coordinates: currentCoordinates,
      level: currentLevel
    });
  }

  render() {
    const { level } = this.state;
    return (
      <>
        <StyledContainer>
          {level.map((row, indexRow) => (
            <StyledRow key={`row-${indexRow}`}>
              {row.map((element, indexElement) => (
                <StyledBox key={`element-${indexElement}`} type={element.type}>
                  {element.type === 'character' && <StyledCharacter src={mf} />}
                </StyledBox>
              ))}
            </StyledRow>
          ))}
        </StyledContainer>
      </>
    );
  }
}

export default Level1;
