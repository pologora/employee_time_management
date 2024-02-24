import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { getAllProposalsByStatus } from '../../api/proposalsApi';
import { PendingProposalsTable } from './PendingProposalsTable';

export function Proposals() {
  const {
    data, isLoading, isError, error,
  } = useQuery({
    queryFn: () => getAllProposalsByStatus('pending'),
    queryKey: ['pendingProposals'],
  });

  if (isError) {
    return <div className="error">{error.message}</div>;
  }

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <div>
      <PendingProposalsTable data={data?.data} />
    </div>
  );
}
