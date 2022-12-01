import styled, { css } from "styled-components";

const TrafficLight = styled.View`
  border-radius: 50px;
  width: 4px;
  height: 5px;
  padding: 5px;

  ${(props) =>
    props.available &&
    css`
      background: #afec1a;
    `}

  ${(props) =>
    props.limited &&
    css`
      background: #ffe033;
    `}

    ${(props) =>
    props.unavailable &&
    css`
      background: #ec241a;
    `}
`;

export default TrafficLight;
