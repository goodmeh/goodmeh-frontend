import { AppShell } from "@mantine/core";
import React from "react";
import { Outlet } from "react-router-dom";

export const Layout: React.FC = () => {
  return (
    <AppShell>
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};
