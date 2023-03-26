import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { enGB } from 'date-fns/locale';
import {
  Autocomplete,
  Box,
  Button,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import useAxios from '../../../../hooks/useAxios';
import baseUrl from '../../../../options/baseUrl';

const styleChoosedOptions = {
  marginLeft: 2,
  fontWeight: 'bold',
};

function SelectOptions({ handleAllAgencjaGenerate }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSnti, setIsSnti] = useState(false);
  const [activeEmployee, setActiveEmployee] = useState(null);
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(null);
  const { get, error } = useAxios();
  const isAcceptButton = startDate && endDate;

  const getEmployeesNames = async () => {
    const url = `${baseUrl}/employee/short`;
    const data = await get(url);
    if (!error) {
      setEmployees(data);
    }
  };

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const handleClearState = () => {
    setStartDate(null);
    setEndDate(null);
    setActiveEmployee(null);
  };

  const handleGenerateRaport = () => {
    const start = startDate.toISOString();
    const end = endDate.toISOString();
    if (!isSnti && !activeEmployee) {
      handleAllAgencjaGenerate(start, end);
    }
  };

  useEffect(() => {
    if (employees) {
      let filtered;
      if (isSnti) {
        filtered = employees.filter((employee) => employee.isSnti);
      } else {
        filtered = employees.filter((employee) => !employee.isSnti);
      }
      setFilteredEmployees(filtered);
    }
    setActiveEmployee(null);
  }, [isSnti, employees]);

  useEffect(() => {
    getEmployeesNames();
  }, []);

  const propsAutocompl = {
    options: filteredEmployees,
    getOptionLabel: (option) => `${option.name} ${option.surname}`,
  };

  return (
    <div>
      <Box sx={{ margin: 3 }}>
        <Typography sx={{}}>
          Zakres dat:
          {' '}
          <Typography component="span" sx={styleChoosedOptions}>
            {startDate?.toLocaleDateString()}
            {' - '}
            {endDate?.toLocaleDateString()}
          </Typography>
        </Typography>
        <Typography>
          Wybrani pracownicy:
          {' '}
          <Typography component="span" sx={styleChoosedOptions}>
            {isSnti ? 'SNTI' : 'Agencja'}
          </Typography>
        </Typography>
        <Typography>
          Pracownik:
          {' '}
          <Typography component="span" sx={styleChoosedOptions}>
            {activeEmployee
              ? `${activeEmployee.name} ${activeEmployee.surname}`
              : 'Wszyscy'}
          </Typography>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 10 }}>
        <Box>
          <DatePicker
            selected={startDate}
            onChange={onChange}
            startDate={startDate}
            endDate={endDate}
            selectsRange
            inline
            locale={enGB}
          />
        </Box>
        <Box>
          <Autocomplete
            value={activeEmployee}
            onChange={(e, value) => {
              setActiveEmployee(value);
            }}
            {...propsAutocompl}
            disablePortal
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Wybierz pracownika" />
            )}
          />
          <RadioGroup
            sx={{ marginTop: 4 }}
            row
            aria-label="employee-type"
            defaultValue={isSnti ? 'SNTI' : 'Agencja'}
            value={isSnti ? 'SNTI' : 'Agencja'}
            onChange={(e) => setIsSnti(e.target.value === 'SNTI')}
          >
            <FormControlLabel value="SNTI" control={<Radio />} label="SNTI" />
            <FormControlLabel
              value="Agencja"
              control={<Radio />}
              label="Agencja"
            />
          </RadioGroup>
        </Box>
      </Box>
      <Box sx={{ marginTop: 4, display: 'flex', gap: 4 }}>
        <Button
          variant="outlined"
          onClick={handleGenerateRaport}
          disabled={!isAcceptButton}
        >
          Generuj raport
        </Button>
        <Button color="error" variant="outlined" onClick={handleClearState}>
          Wyczyść
        </Button>
      </Box>
    </div>
  );
}
export default SelectOptions;
