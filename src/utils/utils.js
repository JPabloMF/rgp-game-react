export const move = (keyCode, thiss) => {
  const { positionY, positionX } = thiss.state;
  switch (keyCode) {
    // up W
    case 87:
      if (positionY - 150 > 0) {
        thiss.setState({ positionY: positionY - 150 });
      }
      break;
    // down S
    case 83:
      console.log(positionY + 150);
      if (positionY + 150 < this.levelMatriz.xLimit) {
        thiss.setState({ positionY: positionY + 150 });
      }
      break;
    // left A
    case 65:
      if (positionX - 150 > 0) {
        thiss.setState({ positionX: positionX - 150 });
      }
      break;
    // right D
    case 68:
      if (positionX + 150 < this.levelMatriz.yLimit) {
        thiss.setState({ positionX: positionX + 150 });
      }
      break;
    default:
      break;
  }
};
