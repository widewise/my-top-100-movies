import * as React from "react";
import {FunctionComponent} from "react";
import styled from "styled-components";

interface IProps {
    value: string
}

const MovieTypePanel = styled.div`
  border: solid gray 1px;
  border-radius: 3px;
  margin: 0;
  padding: 0 5px;
  color: gray;
`;



export const MovieType: FunctionComponent<IProps> = ({value}: IProps) => (
  <MovieTypePanel>
      {value}
  </MovieTypePanel>
);