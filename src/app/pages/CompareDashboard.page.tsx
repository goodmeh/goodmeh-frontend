import { PlaceSearch } from "@/components/ui/PlaceSearch";
import MantineTable from "@/components/ui/MantineTable";
import {
  SimpleGrid,
  Title
} from "@mantine/core";

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
      <MantineTable></MantineTable>
    </>
  );
};

export const Component = CompareDashboardPage;
Component.displayName = "CompareDashboardPage";
