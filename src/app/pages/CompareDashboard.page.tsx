import { Title, TextInput, Table, SimpleGrid } from "@mantine/core";

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
        <TextInput
          size="md"
          radius="md"
          label="Option A"
          description="Search for the first option"
          placeholder="Input business name"
        />
        <TextInput
          size="md"
          radius="md"
          label="Option B"
          description="Search for the second option"
          placeholder="Input business name"
        />
      </SimpleGrid>
      <Table 
      horizontalSpacing="md" 
      verticalSpacing="md"
      
      >
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
