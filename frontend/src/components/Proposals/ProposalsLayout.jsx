import { Outlet } from 'react-router-dom';
import './Proposals.css';
import ProposalsAppBar from './ProposalsAppBar';

export function ProposalsLayout() {
  return (
    <div className="proposalsLayoutContainer">
      <ProposalsAppBar />
      <Outlet />
    </div>
  );
}
