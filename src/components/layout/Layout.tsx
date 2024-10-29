import {
  ActionIcon,
  AppShell,
  Burger,
  Button,
  Container,
  Group,
  MantineColorScheme,
  Popover,
  Stack,
  Text,
  useMantineColorScheme,
  useMatches,
} from "@mantine/core";
import { useDisclosure, useMutationObserver } from "@mantine/hooks";
import {
  IconDeviceDesktop,
  IconMoon,
  IconSettings,
  IconSun,
} from "@tabler/icons-react";
import { useState } from "react";
import { Link, matchPath, Outlet, useLocation } from "react-router-dom";

import Logo from "@/assets/logo/GoodMehLogoInline.svg?react";
import { ViewModeControl } from "@/components/controls/ViewModeControl";

import { ColorSchemeControl } from "../controls/ColorSchemeControl";
import classes from "./Layout.module.scss";

const routes = [
  { path: "/", label: "Home" },
  { path: "/discover", label: "Discover" },
];

const NavLink: React.FC<{
  path: string;
  label: string;
  variant?: "mobile" | "desktop";
  toggleMenu?: () => void;
}> = ({ path, label, variant = "desktop", toggleMenu }) => {
  const { pathname } = useLocation();
  const isMatch = matchPath(path, pathname);
  return variant == "desktop" ? (
    <Button
      size="compact-md"
      variant={isMatch ? "light" : "subtle"}
      component={Link}
      to={path}
    >
      {label}
    </Button>
  ) : (
    <Button
      onClick={toggleMenu}
      variant={isMatch ? "light" : "subtle"}
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
  headerPortalRef: React.RefObject<HTMLDivElement>;
};

const AppHeader: React.FC<HeaderProps> = ({
  isMenuOpen,
  toggle,
  headerPortalRef,
}) => {
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
      <Group align="center">
        <Group gap={0} flex="1 0 0" wrap="nowrap">
          {isMobile && <Burger opened={isMenuOpen} onClick={toggle} />}
          <Link to="/" style={{ display: "contents" }}>
            <Logo height={40} />
          </Link>
        </Group>

        {!isMobile && (
          <div>
            {routes.map((route) => (
              <NavLink key={route.path} {...route} />
            ))}
          </div>
        )}

        <Group flex="1 0 0" justify="flex-end">
          {settings}
        </Group>
      </Group>
      <Container p={0} w="100%">
        <Group
          className={classes["header-portal"]}
          id="header-portal"
          wrap="nowrap"
          ref={headerPortalRef}
        ></Group>
      </Container>
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
          />
          {routes.map((route) => (
            <NavLink
              key={route.path}
              {...route}
              variant="mobile"
              toggleMenu={toggleMenu}
            />
          ))}
        </Stack>
        <ViewModeControl />
      </Stack>
    </AppShell.Navbar>
  );
};

export const HEADER_HEIGHT_EXPANDED = 104;
export const HEADER_HEIGHT_COLLAPSED = 64;

export const Layout: React.FC = () => {
  const [isMenuOpen, { toggle }] = useDisclosure();
  const [portalHasChildren, setPortalHasChildren] = useState(false);
  const headerPortalRef = useMutationObserver<HTMLDivElement>(
    (mutations) => {
      setPortalHasChildren(mutations[0].target.childNodes.length > 0);
    },
    {
      childList: true,
    },
  );

  return (
    <AppShell
      header={{ height: portalHasChildren ? 104 : 64 }}
      navbar={{
        width: 300,
        breakpoint: "xs",
        collapsed: { desktop: true, mobile: !isMenuOpen },
      }}
      padding={{ base: "md", xs: "lg", sm: "xl" }}
    >
      <AppHeader
        isMenuOpen={isMenuOpen}
        toggle={toggle}
        headerPortalRef={headerPortalRef}
      />
      <AppNavbar toggleMenu={toggle} />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
