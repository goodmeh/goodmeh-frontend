import { Group, Paper, Text, ThemeIcon, SimpleGrid, Container, Box } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import classes from './StatDisplay.module.css';

const data = [
  { title: 'Weighted No of Stars', value: '4.0 Stars', diff: -20 },
  { title: 'No. of Real Reviews', value: '420', diff: -69 },
];

export const StatDisplay: React.FC = () => {
  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="xl" radius="md" key={stat.title} style={{ height: '100%' }}>
        <Group justify="apart" style={{ height: '100%' }}>
          <div>
            <Text c="dimmed" tt="uppercase" fw={700} fz="lg" className={classes.label}>
              {stat.title}
            </Text>
            <Text fw={700} fz="9xl">
              {stat.value}
            </Text>
            <Text c="dimmed" fz="xl" mt="xl">
              <Text component="span" c={stat.diff > 0 ? 'teal' : 'red'} fw={700}>
                {stat.diff}%
              </Text>{' '}
              {stat.diff > 0 ? 'More' : 'Less'} than Google Reviews
            </Text>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            style={{
              color: stat.diff > 0 ? 'var(--mantine-color-teal-6)' : 'var(--mantine-color-red-6)',
            }}
            size={80}
            radius="md"
          >
            <DiffIcon size="3rem" stroke={1.5} />
          </ThemeIcon>
        </Group>
      </Paper>
    );
  });

  return (
    <Container size="md" py="xl">
      <Box maw={1000} mx="auto">
        <SimpleGrid cols={1}>{stats}</SimpleGrid>
      </Box>
    </Container>
  );
}