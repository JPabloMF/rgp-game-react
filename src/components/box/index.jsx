import React, { Component } from 'react';
import styled from 'styled-components';

import terrain from '../../assets/textures/terrain.jpg';
import rock from '../../assets/textures/rock.jpg';

const StyledBox = styled.div`
  width: 150px;
  height: 150px;
  background-size: contain;
  background-image: url(${({ type }) =>
    type === 'terrain' || type === 'character' ? terrain : rock});
  /* border: 1px solid red; */
`;

class Box extends Component {
  render() {
    return <StyledBox type={this.props.type} />;
  }
}

export default Box;
