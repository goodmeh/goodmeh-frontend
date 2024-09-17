import { PlaceSearch } from "@/components/ui/PlaceSearch";
import { Place } from "@/types/data";
import {
  SimpleGrid,
  Table,
  Title
} from "@mantine/core";
import { useState } from "react";


export const CompareDashboardPage: React.FC = () => {
  
  return (
    <>
      <Title>Compare Dashboard</Title>
      <SimpleGrid
        cols={2}
        style={{
          borderRadius: "var(--mantine-radius-md)",
          height: "auto",
        }}
      >
        <PlaceSearch></PlaceSearch>
        <PlaceSearch></PlaceSearch>

      </SimpleGrid>
      <Table horizontalSpacing="md" verticalSpacing="md">
        <Table.Thead>
          <Table.Tr>
            <Table.Th align="center">Business A </Table.Th>
            <Table.Th>Comparison Score</Table.Th>
            <Table.Th>Business B</Table.Th>
          </Table.Tr>
        </Table.Thead>
      </Table>
    </>
  );
};

export const Component = CompareDashboardPage;
Component.displayName = "CompareDashboardPage";
