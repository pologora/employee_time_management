import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import FormDialog from './UpdateFieldAlert';

export function UserDetailFieldWithUpdate({
  value, title, update, name,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEditClick = () => {
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
      <FormDialog
        open={isOpen}
        setOpen={setIsOpen}
        update={update}
        value={value}
        title={title}
        name={name}
      />
      )}
      <Box>
        <div className="userDetailFieldsContainer">
          <Typography variant="body1" component="span" marginRight={2}>
            {title}
            {': '}
          </Typography>
          <Button onClick={handleEditClick}>zmień</Button>
          <Typography className="bold" component="span" fontWeight={700}>{value}</Typography>
        </div>
      </Box>
    </>
  );
}
