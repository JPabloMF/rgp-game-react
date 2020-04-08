import React, { Component } from 'react';
import styled from 'styled-components';

import terrain from '../../assets/textures/terrain.jpg';
import rock from '../../assets/textures/rock.jpg';
import chest1 from '../../assets/chest/chest1.png';

const StyledBox = styled.div`
  border: 1px solid red;
  width: 100px;
  height: 100px;
  background-size: contain;
  background-position: center;
  background-image: url(${({ object }) => (object ? chest1 : null)}),
    url(${({ type }) =>
      type === 'terrain' || type === 'character' ? terrain : rock});
  background-repeat: no-repeat;
  /* border: 1px solid red; */
`;

class Box extends Component {
  render() {
    const { type, object } = this.props;
    return <StyledBox type={type} object={object} />;
  }
}

export default Box;
