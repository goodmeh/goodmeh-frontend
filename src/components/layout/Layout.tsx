import logo from "@/assets/logo/GoodMehLogo.png";
import { faMoon, faSliders, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  ActionIcon,
  Anchor,
  AppShell,
  MantineColorScheme,
  Space,
  useMantineColorScheme,
} from "@mantine/core";
import { Link, Outlet } from "react-router-dom";
import classes from "./Layout.module.scss";

export const Layout: React.FC = () => {
  const { colorScheme, setColorScheme } = useMantineColorScheme();
  const toggleColorScheme = () => {
    const schemes: MantineColorScheme[] = ["light", "dark", "auto"];
    const currentIndex = schemes.indexOf(colorScheme);
    const next = schemes[(currentIndex + 1) % schemes.length];
    setColorScheme(next);
  };

  return (
    <AppShell header={{ height: 60 }} padding="xl">
      <AppShell.Header className={classes.Layout__AppBar}>
        <Link to="/">
          <img src={logo} alt="GoodMeh Logo" height={50} />
        </Link>
        <Space w="md" />
        <Anchor component={Link} to="/">
          <b>Consumer</b>
        </Anchor>
        <Space w="md" />
        <Anchor component={Link} to="/">
          <b>Business</b>
        </Anchor>
        <Space flex={1} />
        <ActionIcon onClick={toggleColorScheme}>
          <FontAwesomeIcon
            icon={
              colorScheme == "light"
                ? faSun
                : colorScheme == "dark"
                  ? faMoon
                  : faSliders
            }
          />
        </ActionIcon>
      </AppShell.Header>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
