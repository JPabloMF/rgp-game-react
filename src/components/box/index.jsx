import React, { Component } from 'react';
import styled from 'styled-components';

import terrain from '../../assets/textures/terrain.jpg';
import rock from '../../assets/textures/rock.jpg';
import chest1 from '../../assets/chest/chest1.png';
import chest2 from '../../assets/chest/chest2.png';

const StyledBox = styled.div`
  width: 100px;
  height: 100px;
  background-size: contain;
  background-position: center;
  background-image: url(${({ object }) =>
      object === 'chestClose'
        ? chest1
        : object === 'chestOpen'
        ? chest2
        : null}),
    url(${({ type }) =>
      type === 'terrain' || type === 'character' ? terrain : rock});
  background-repeat: no-repeat;
`;

class Box extends Component {
  render() {
    const { type, object } = this.props;
    return <StyledBox type={type} object={object} />;
  }
}

export default Box;
