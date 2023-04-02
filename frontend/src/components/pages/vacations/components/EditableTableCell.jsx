import { TableCell, TextField } from '@mui/material';
import { useState } from 'react';

export default function EditableTableCell({
  value,
  onValueChange,
  employeeId,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleClick = () => {
    if (!isEditing) {
      setIsEditing(true);
    }
  };

  const handleBlur = () => {
    setIsEditing(false);
    onValueChange(inputValue, employeeId);
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <TableCell align="center" onClick={handleClick}>
      {isEditing ? (
        <TextField
          value={inputValue}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          fullWidth
          type="number"
        />
      ) : (
        value
      )}
    </TableCell>
  );
}
