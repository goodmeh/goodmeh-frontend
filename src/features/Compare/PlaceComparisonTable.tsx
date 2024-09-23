import { Table, Text } from "@mantine/core";

const data = [
  {
    property: "Price",
    optionA: "$$$",
    optionB: "$$$$$",
    winner: 0,
  },
  {
    property: "Quality",
    optionA: "7/10",
    optionB: "9/10",
    winner: 1,
  },
  {
    property: "Accuracy",
    optionA: "4",
    optionB: "6",
    winner: 1,
  },
  {
    property: "Popularity",
    optionA: "Very",
    optionB: "Not Really",
    winner: 0,
  },
  {
    property: "Instagrammable",
    optionA: "Influencer Level",
    optionB: "Bruh dont even bother",
    winner: 0,
  },
];

type Props = {
  place1Name: string;
  place2Name: string;
};

export const PlaceComparisonTable: React.FC<Props> = ({
  place1Name,
  place2Name,
}) => {
  const rows = data.map((row) => (
    <Table.Tr key={row.property}>
      <Table.Td w="200px" fw="bold">
        {row.property}
      </Table.Td>
      <Table.Td
        ta="center"
        {...(row.winner === 1 ? { c: "red.5" } : { c: "green.5", fw: "bold" })}
      >
        {row.optionA}
      </Table.Td>
      <Table.Td
        ta="center"
        {...(row.winner === 0 ? { c: "red.5" } : { c: "green.5", fw: "bold" })}
      >
        {row.optionB}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped withTableBorder withColumnBorders withRowBorders={false}>
      <Table.Thead>
        <Table.Tr fz="xxl">
          <Table.Th>Property</Table.Th>
          <Table.Th ta="center">{place1Name}</Table.Th>
          <Table.Th ta="center">{place2Name}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody fz="lg">{rows}</Table.Tbody>
    </Table>
  );
};
