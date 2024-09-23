import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef, 
} from 'mantine-react-table';

type TableEntry = {
  optionA: string;
  delta: string;
  optionB: string;
}

const data: TableEntry[] = [
  {
    optionA: '69',
    delta: 'B is better',
    optionB: '420'
  },
  {
    optionA: '69',
    delta: 'B is better',
    optionB: '420'
  },
];

export const PlaceComparisonTable: React.FC = () => {
  const columns = useMemo<MRT_ColumnDef<TableEntry>[]>(
    () => [
      {
        accessorKey: 'optionA', //simple recommended way to define a column
        header: 'Option A',
      },
      {
        accessorKey: 'delta', 
        header: 'Whats the difference?',
      },
      {
        accessorKey: 'optionB', 
        header: 'Option B',
      },
    ],
    [],
  );

  //pass table options to useMantineReactTable
  const table = useMantineReactTable({
    columns,
    data, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableColumnActions: false,
    enableColumnFilters: false,
    enablePagination: false,
    enableSorting: false,
    mantineTableProps: {
        highlightOnHover: false,
        withColumnBorders: true,
      },
  });

  //note: you can also pass table options as props directly to <MantineReactTable /> instead of using useMantineReactTable
  //but the useMantineReactTable hook will be the most recommended way to define table options
  return <MantineReactTable table={table} />;
}