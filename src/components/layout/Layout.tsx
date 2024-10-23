import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Group,
  MantineColorScheme,
  Popover,
  Space,
  Stack,
  Text,
  useMantineColorScheme,
  useMatches,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconDeviceDesktop,
  IconHome,
  IconMoon,
  IconSearch,
  IconSettings,
  IconSun,
} from "@tabler/icons-react";
import { Link, matchPath, Outlet, useLocation } from "react-router-dom";

import logo from "@/assets/logo/GoodMehLogo.png";
import { ViewModeControl } from "@/components/controls/ViewModeControl";

import { ColorSchemeControl } from "../controls/ColorSchemeControl";
import classes from "./Layout.module.scss";

const NavLink: React.FC<{
  path: string;
  label: string;
  variant?: "mobile" | "desktop";
  icon?: React.ReactNode;
  toggleMenu?: () => void;
}> = ({ path, label, variant = "desktop", icon, toggleMenu }) => {
  const { pathname } = useLocation();
  const isMatch = matchPath(path, pathname);
  return variant == "desktop" ? (
    <Button
      size="md"
      px={4}
      variant={isMatch ? "filled" : "subtle"}
      component={Link}
      to={path}
    >
      <div>
        {icon}
        <Text size="xs" lh={0.5}>
          {label}
        </Text>
      </div>
    </Button>
  ) : (
    <Button
      onClick={toggleMenu}
      variant={isMatch ? "filled" : "subtle"}
      component={Link}
      to={path}
      leftSection={icon}
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
  const settings = useMatches({
    base: (
      <Popover floatingStrategy="fixed">
        <Popover.Target>
          <ActionIcon>
            <IconSettings />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          <Stack>
            <Stack gap={0}>
              <Text>I am a</Text>
              <ViewModeControl />
            </Stack>

            <Stack gap={0}>
              <Text>Color scheme</Text>
              <ColorSchemeControl />
            </Stack>
          </Stack>
        </Popover.Dropdown>
      </Popover>
    ),
    md: (
      <>
        <ViewModeControl />
        <Space w="md" />
        <ActionIcon onClick={toggleColorScheme}>
          {colorScheme == "light" ? (
            <IconSun />
          ) : colorScheme == "dark" ? (
            <IconMoon />
          ) : (
            <IconDeviceDesktop />
          )}
        </ActionIcon>
      </>
    ),
  });

  return (
    <AppShell.Header className={classes.Layout__AppBar}>
      {isMobile && <Burger opened={isMenuOpen} onClick={toggle} />}
      <Link to="/" style={{ display: "contents" }}>
        <img src={logo} alt="GoodMeh Logo" height={40} />
      </Link>
      {!isMobile && (
        <>
          <Space w="md" />

          <NavLink path="/discover" label="Discover" icon={<IconSearch />} />
        </>
      )}

      <Group className={classes["header-portal"]} id="header-portal"></Group>

      {settings}
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
            variant="mobile"
            toggleMenu={toggleMenu}
            icon={<IconHome />}
          />
          <NavLink
            path="/discover"
            label="Discover"
            variant="mobile"
            toggleMenu={toggleMenu}
            icon={<IconSearch />}
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
