import styled, { keyframes } from 'styled-components';
import logo from '../../assets/acelera_dev.png';

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 1000;
`;

const Logo = styled.img`
  width: 150px;
  height: auto;
  margin-bottom: 10px;
`;

const raceByAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const RaceByContainer = styled.div`
  --uib-size: 150px;
  --uib-speed: 1.4s;
  --uib-color: #2A97B2;
  --uib-line-weight: 5px;

  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--uib-line-weight);
  width: var(--uib-size);
  border-radius: calc(var(--uib-line-weight) / 2);
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--uib-color);
    opacity: 0.1;
  }

  &:after {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: calc(var(--uib-line-weight) / 2);
    background-color: var(--uib-color);
    animation: ${raceByAnimation} var(--uib-speed) ease-in-out infinite;
    transform: translateX(-100%);
  }
`;

const Loading = () => {
  return (
    <LoadingContainer>
      <Logo src={logo} alt="Acelera Dev Logo" />
      <RaceByContainer />
    </LoadingContainer>
  );
};

export default Loading;
