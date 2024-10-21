import {
  ActionIcon,
  Anchor,
  AppShell,
  Burger,
  Button,
  MantineColorScheme,
  Space,
  Stack,
  useMantineColorScheme,
  useMatches,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconDeviceDesktop, IconMoon, IconSun } from "@tabler/icons-react";
import { Link, matchPath, Outlet, useLocation } from "react-router-dom";

import logo from "@/assets/logo/GoodMehLogo.png";
import { ViewModeControl } from "@/features/Home/components/ViewModeControl";

import classes from "./Layout.module.scss";

const NavLink: React.FC<{
  path: string;
  label: string;
  variant?: "button" | "link";
  toggleMenu?: () => void;
}> = ({ path, label, variant = "link", toggleMenu }) => {
  const { pathname } = useLocation();
  const isMatch = matchPath(path, pathname);
  return variant == "link" ? (
    <Anchor component={Link} to={path} underline={isMatch ? "always" : "hover"}>
      <b>{label}</b>
    </Anchor>
  ) : (
    <Button
      onClick={toggleMenu}
      variant={isMatch ? "filled" : "subtle"}
      component={Link}
      to={path}
    >
      {label}
    </Button>
  );
};

type HeaderProps = {
  isMenuOpen: boolean;
  toggle: () => void;
};

const AppHeader: React.FC<HeaderProps> = ({ isMenuOpen, toggle }) => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const toggleColorScheme = () => {
    const schemes: MantineColorScheme[] = ["light", "dark", "auto"];
    const currentIndex = schemes.indexOf(colorScheme);
    const next = schemes[(currentIndex + 1) % schemes.length];
    setColorScheme(next);
  };
  const isMobile = useMatches({ base: true, xs: false });

  return (
    <AppShell.Header className={classes.Layout__AppBar}>
      {isMobile && <Burger opened={isMenuOpen} onClick={toggle} />}
      <Link to="/">
        <img src={logo} alt="GoodMeh Logo" height={50} />
      </Link>
      {!isMobile && (
        <>
          <Space w="md" />

          <NavLink path="/discover" label="Discover" />
        </>
      )}

      <Space flex={1} />

      {!isMobile && (
        <>
          <ViewModeControl />
          <Space w="md" />
        </>
      )}
      <ActionIcon onClick={toggleColorScheme}>
        {colorScheme == "light" ? (
          <IconSun />
        ) : colorScheme == "dark" ? (
          <IconMoon />
        ) : (
          <IconDeviceDesktop />
        )}
      </ActionIcon>
    </AppShell.Header>
  );
};

const AppNavbar: React.FC<{ toggleMenu: () => void }> = ({ toggleMenu }) => {
  return (
    <AppShell.Navbar p="md">
      <Stack justify="space-between" h="100%">
        <Stack>
          <NavLink
            path="/"
            label="Home"
            variant="button"
            toggleMenu={toggleMenu}
          />
          <NavLink
            path="/discover"
            label="Discover"
            variant="button"
            toggleMenu={toggleMenu}
          />
        </Stack>
        <ViewModeControl />
      </Stack>
    </AppShell.Navbar>
  );
};

export const Layout: React.FC = () => {
  const [isMenuOpen, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "xs",
        collapsed: { desktop: true, mobile: !isMenuOpen },
      }}
      padding={{ base: "md", xs: "lg", sm: "xl" }}
    >
      <AppHeader isMenuOpen={isMenuOpen} toggle={toggle} />
      <AppNavbar toggleMenu={toggle} />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
