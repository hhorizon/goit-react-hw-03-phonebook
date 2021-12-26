import styled from 'styled-components';

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;

// ---styles---
const StyledContainer = styled.div`
  width: 800px;
  margin: 0 auto;
`;
