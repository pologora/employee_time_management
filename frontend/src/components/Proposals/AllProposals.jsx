import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Pagination } from '@mui/material';
import { ProposalsList } from './ProposalsList';
import { getAllProposalsPagination } from '../../api/proposalsApi';

const columns = [
  { field: 'name', headerName: 'Imię i nazwicko', width: 200 },
  { field: 'duration', headerName: 'Czas trwania', width: 150 },
  { field: 'status', headerName: 'Status', width: 120 },
  { field: 'type', headerName: 'Typ', width: 150 },
  {
    field: 'fromTo',
    headerName: 'Od-Do',
    width: 180,
  },
  {
    field: 'createdAt',
    headerName: 'Utworzony',
    width: 150,
  },
  {
    field: 'actionButton',
    headerName: 'Akcja',
    width: 100,
  },
  {
    field: 'info',
    headerName: 'Informacje',
    width: 50,
  },
  {
    field: 'id',
    headerName: 'id',
    width: 0,
  },
  {
    field: 'color',
    headerName: 'color',
    width: 0,
  },
  {
    field: 'fullTitle',
    headerName: 'fullTitle',
    width: 0,

  },
];

const startPage = 1;

export function AllProposals() {
  const [page, setPage] = useState(startPage);

  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryFn: () => getAllProposalsPagination(page),
    queryKey: ['proposals', page],
  });

  const itemsPerPage = 25;
  const minPage = 1;
  const pagesCount = Math.floor((data?.data.length || minPage) / itemsPerPage) || minPage;

  const handlePageChange = (_, value) => {
    setPage(value);
  };

  if (isError) {
    return <div className="error">{error.message}</div>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <ProposalsList data={data?.data} select={false} columns={columns} />
      <div className="proposalsPaginationContainer">
        {pagesCount > minPage && (
        <Pagination count={pagesCount} page={page} onChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}
