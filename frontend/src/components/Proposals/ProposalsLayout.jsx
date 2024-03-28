import { Outlet } from 'react-router-dom';
import './Proposals.css';
import ProposalsNavBar from './ProposalsNavBar';

export function ProposalsLayout() {
  return (
    <div className="proposalsLayoutContainer">
      <ProposalsNavBar />
      <Outlet />
    </div>
  );
}
