import { Route, Routes } from 'react-router-dom';
import { ProposalsLayout } from './ProposalsLayout';
import { Proposals } from './Proposals';
import { ProposalDetail } from './ProposalDetail';
import { AllProposals } from './AllProposals';

export function ProposalsRoutes() {
  return (
    <Routes>
      <Route element={<ProposalsLayout />}>
        <Route index element={<Proposals />} />
        <Route element={<AllProposals />} path="all" />
        <Route element={<ProposalDetail />} path=":id" />
      </Route>
    </Routes>
  );
}
