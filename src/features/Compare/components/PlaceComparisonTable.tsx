import {
  Group,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconHelp } from "@tabler/icons-react";
import { useEffect, useState } from "react";

import { useViewMode } from "@/hooks/useViewMode";
import { Place } from "@/types/data";

import { comparePlaces, MetricComparisonResult } from "../api/comparePlaces";

type Props = {
  place1: Place;
  place2: Place;
};

export const PlaceComparisonTable: React.FC<Props> = ({ place1, place2 }) => {
  const [data, setData] = useState<MetricComparisonResult[]>([]);
  const { viewMode } = useViewMode();
  const audienceLabel = viewMode === "consumer" ? "casual" : "biz";
  useEffect(() => {
    comparePlaces(place1.id, place2.id).then(setData);
  }, [place1, place2]);
  const getColour = (
    isPlace1Better: boolean | null,
    place: 1 | 2,
    shade: number,
  ) => {
    if (isPlace1Better === null) {
      return;
    }
    return isPlace1Better == (place == 1) ? `green.${shade}` : `red.${shade}`;
  };

  const rows = data.map((row) => (
    <Table.Tr key={row.property.formal}>
      <Table.Td colSpan={2}>
        <Stack align="center" p="md">
          <Group align="center" gap="xs">
            <Text fz="xl" fw={700}>
              {row.property[audienceLabel]}{" "}
            </Text>
            <Tooltip label="Lorem ipsum dolor sit amet.">
              <IconHelp size={20} />
            </Tooltip>
          </Group>
          <SimpleGrid cols={2} spacing={0} w="100%" maw={700}>
            <Text c={getColour(row.is_place_1_better, 1, 7) ?? "dimmed"}>
              {row.metric_1.description[audienceLabel]}
            </Text>
            <Text c={getColour(row.is_place_1_better, 2, 7) ?? "dimmed"}>
              {row.metric_2.description[audienceLabel]}
            </Text>
            <Progress
              radius={0}
              value={row.metric_1.normalized_score}
              size="xl"
              style={{ transform: "rotateY(180deg)" }}
              color={getColour(row.is_place_1_better, 1, 8)}
            />
            <Progress
              radius={0}
              value={row.metric_2.normalized_score}
              size="xl"
              color={getColour(row.is_place_1_better, 2, 8)}
            />
          </SimpleGrid>
        </Stack>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Table withTableBorder stickyHeader stickyHeaderOffset={60}>
      <Table.Thead>
        <Table.Tr fz="xxl">
          <Table.Th ta="center">{place1.name}</Table.Th>
          <Table.Th ta="center">{place2.name}</Table.Th>
        </Table.Tr>
      </Table.Thead>
      <Table.Tbody ta="center" fz="lg">
        {rows}
      </Table.Tbody>
    </Table>
  );
};
