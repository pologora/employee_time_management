import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './Proposals.css';

const pages = [{ title: 'Oczekujące', path: '/proposals' }, { title: 'Wszystko', path: '/proposals/all' }];

function ProposalsNavBar() {
  return (
    <nav>
      {pages.map((item) => (
        <Button key={item.title}>
          <Link
            className="custom-link"
            to={item.path}
          >
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}
export default ProposalsNavBar;
