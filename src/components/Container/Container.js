import styled from 'styled-components';

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;

// ---styles---
const StyledContainer = styled.div`
  margin-left: 100px;
`;
