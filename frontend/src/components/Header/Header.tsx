import styled from "styled-components";

export function Header() {
  return <HeaderContainer>Тут будет голова сайта хе хе хе</HeaderContainer>;
}

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.595) 6.67%,
    rgba(0, 0, 0, 0.579) 13.33%,
    rgba(0, 0, 0, 0.551) 20%,
    rgba(0, 0, 0, 0.512) 26.67%,
    rgba(0, 0, 0, 0.461) 33.33%,
    rgba(0, 0, 0, 0.401) 40%,
    rgba(0, 0, 0, 0.334) 46.67%,
    rgba(0, 0, 0, 0.266) 53.33%,
    rgba(0, 0, 0, 0.199) 60%,
    rgba(0, 0, 0, 0.139) 66.67%,
    rgba(0, 0, 0, 0.088) 73.33%,
    rgba(0, 0, 0, 0.049) 80%,
    rgba(0, 0, 0, 0.021) 86.67%,
    rgba(0, 0, 0, 0.005) 93.33%,
    transparent
  );
  transition: all 0.5s ease;
`;
