import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { CircularProgress, Pagination } from '@mui/material';
import { getAllProposalsPagination } from '../../api/proposalsApi';
import { AllProposalsTable } from './AllProposalsTable';

const startPage = 1;

export function AllProposals() {
  const [page, setPage] = useState(startPage);

  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryFn: () => getAllProposalsPagination(page),
    queryKey: ['proposals', page],
  });

  console.log(data);
  const itemsPerPage = 25;
  const minPage = 1;
  const pagesQuantity = Math.ceil((data?.vacationsSize || minPage) / itemsPerPage) || minPage;

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
      <AllProposalsTable data={data?.data} />
      <div className="proposalsPaginationContainer">
        {pagesQuantity > minPage && (
        <Pagination count={pagesQuantity} page={page} onChange={handlePageChange} />
        )}
      </div>
    </div>
  );
}
