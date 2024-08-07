import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';
import PropTypes from 'prop-types';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

// MainNav.propTypes = {};
function MainNav() {
  return (
    <nav>
      <NavList>
        <MainNavItem to="/dashboard" label="Home">
          <HiOutlineHome />
        </MainNavItem>
        <MainNavItem to="/bookings" label="Bookings">
          <HiOutlineCalendarDays />
        </MainNavItem>
        <MainNavItem to="/cabins" label="Cabins">
          <HiOutlineHomeModern />
        </MainNavItem>
        <MainNavItem to="/users" label="Users">
          <HiOutlineUsers />
        </MainNavItem>
        <MainNavItem to="/settings" label="Settings">
          <HiOutlineCog6Tooth />
        </MainNavItem>
      </NavList>
    </nav>
  );
}

MainNavItem.propTypes = {
  to: PropTypes.string,
  label: PropTypes.string,
  children: PropTypes.any,
};
function MainNavItem({ to, label, children }) {
  return (
    <li>
      <StyledNavLink to={to}>
        {children}
        <span>{label}</span>
      </StyledNavLink>
    </li>
  );
}

export default MainNav;
