import { Table } from "@mantine/core";
import { useEffect, useState } from "react";

import { Place } from "@/types/data";

import { comparePlaces, MetricComparisonResult } from "../api/comparePlaces";

type Props = {
  place1: Place;
  place2: Place;
};

export const PlaceComparisonTable: React.FC<Props> = ({ place1, place2 }) => {
  const [data, setData] = useState<MetricComparisonResult[]>([]);
  useEffect(() => {
    comparePlaces(place1.id, place2.id).then(setData);
  }, [place1, place2]);

  const rows = data.map((row) => (
    <Table.Tr key={row.property}>
      <Table.Td w="150px" fw="bold">
        {row.property}
      </Table.Td>
      <Table.Td
        ta="center"
        {...(row.is_place_1_better === false
          ? { c: "red.5" }
          : row.is_place_1_better === null
            ? {}
            : { c: "green.5", fw: "bold" })}
      >
        {row.description_1}
      </Table.Td>
      <Table.Td
        ta="center"
        {...(row.is_place_1_better
          ? { c: "red.5" }
          : row.is_place_1_better === null
            ? {}
            : { c: "green.5", fw: "bold" })}
      >
        {row.description_2}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table striped withTableBorder withColumnBorders withRowBorders={false}>
      <Table.Thead>
        <Table.Tr fz="xxl">
          <Table.Th></Table.Th>
          <Table.Th ta="center">{place1.name}</Table.Th>
          <Table.Th ta="center">{place2.name}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody fz="lg">{rows}</Table.Tbody>
    </Table>
  );
};
