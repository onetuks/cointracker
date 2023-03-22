import { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: block;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const Overview = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  span {
    font-size: 15px;
  }
`;

interface IProp {
  price?: number;
}

function Calculator({ price }: IProp) {
  return (
    <Wrapper>
      <Overview>
        <h3>Calculator</h3>
      </Overview>
      {price === undefined ? "Loading Price Info..." : (
        <>
            <Overview>
                <span>{`₿ 1 => $ ${price.toFixed(3)}`} </span>
            </Overview>
            <Overview>
                <span>{`$ 1 => ₿ ${(1 / price!).toFixed(5)}`} </span>
                <span></span>
            </Overview>
        </>
      )}
    </Wrapper>
  );
}
export default Calculator;
