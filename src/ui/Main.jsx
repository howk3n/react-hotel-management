import PropTypes from "prop-types";
import styled from "styled-components";
Main.propTypes = {
  children: PropTypes.any,
};

const StyledAppLayout = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow: scroll;
`;

function Main({ children }) {
  return <StyledAppLayout>{children}</StyledAppLayout>;
}

export default Main;
