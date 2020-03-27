import React, { useEffect, useState, Fragment } from 'react';
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
  background-image: url(${({ type }) =>
    type === 'terrain' || type === 'character' ? terrain : rock});
`;

const StyledCharacter = styled.img`
  width: 80%;
`;

const Level1 = () => {
  const [level, setLevel] = useState(Levels.level1);
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });

  const setPosition = (axis, action) => {
    // add , substract
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
      } else if (
        currentCoordinates[axis] + 1 < currentLevel.length &&
        axis === 'y'
      ) {
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
    // this.setState({
    //   ...this.state,
    //   coordinates: currentCoordinates,
    //   level: currentLevel
    // });
    setLevel(currentLevel);
    setCoordinates(currentCoordinates);
  };

  const move = ({ keyCode }) => {
    switch (keyCode) {
      // up
      case 87:
        console.log('test')
        setPosition('y', 'substract');
        break;
      // down
      case 83:
        console.log('test')
        setPosition('y', 'add');
        break;
      // left
      case 65:
        console.log('test')
        setPosition('x', 'substract');
        break;
      // right
      case 68:
        console.log('test')
        setPosition('x', 'add');
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', move);
    return () => {
      document.removeEventListener('keydown', move);
    };
  }, []);

  return (
    <Fragment>
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
    </Fragment>
  );
};

export default Level1;
