import { useMemo } from 'react';
import {
  MantineReactTable,
  useMantineReactTable,
  type MRT_ColumnDef, //if using TypeScript (optional, but recommended)
} from 'mantine-react-table';

//If using TypeScript, define the shape of your data (optional, but recommended)
interface Compare {
  optionA: string;
  delta: string;
  optionB: string;
}

//mock data - strongly typed if you are using TypeScript (optional, but recommended)
const data: Compare[] = [
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

export default function App() {
  //column definitions - strongly typed if you are using TypeScript (optional, but recommended)
  const columns = useMemo<MRT_ColumnDef<Compare>[]>(
    () => [
      {
        accessorKey: 'optionA', //simple recommended way to define a column
        header: 'Option A',
      },
      {
        accessorKey: 'delta', //simple recommended way to define a column
        header: 'Whats the difference?',
      },
      {
        accessorKey: 'optionB', //simple recommended way to define a column
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