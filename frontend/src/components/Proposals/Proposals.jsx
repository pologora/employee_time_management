import { useQuery } from '@tanstack/react-query';
import { CircularProgress } from '@mui/material';
import { ProposalsList } from './ProposalsList';
import { getAllProposalsByStatus } from '../../api/proposalsApi';

const columns = [
  { field: 'name', headerName: 'Imię i nazwicko', width: 200 },
  {
    field: 'duration', headerName: 'Czas trwania', width: 100,
  },
  {
    field: 'fromTo',
    headerName: 'Od-Do',
    width: 180,
    headerAlign: 'center',
  },
  { field: 'type', headerName: 'Typ', width: 150 },
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
];

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
      <ProposalsList data={data?.data} columns={columns} />
    </div>
  );
}
