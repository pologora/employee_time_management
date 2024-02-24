import {
  blue, grey, red, teal,
} from '@mui/material/colors';
import vacationTypes from '../options/vacationTypes';
import { vacationsProposalsStatusTypes } from '../options/proposalsTypes';

export const getProposalStatus = (status) => {
  const rejectedColorShade = 800;
  const acceptedColorShade = 800;
  const pendingColorShade = 800;

  const options = { color: '', title: '', fullTitle: '' };
  switch (status) {
    case vacationsProposalsStatusTypes.pending:
      options.color = teal[pendingColorShade];
      options.title = 'do akcept.';
      options.fullTitle = 'Do akceptacji';
      break;
    case vacationsProposalsStatusTypes.approved:
      options.color = blue[acceptedColorShade];
      options.title = 'zaakcept.';
      options.fullTitle = 'Zaakceptowany';
      break;
    case vacationsProposalsStatusTypes.rejected:
      options.color = red[rejectedColorShade];
      options.title = 'odrzucony';
      options.fullTitle = 'Odrzucony';
      break;

    default:
      options.color = grey[pendingColorShade];
      options.title = 'do akcept.';
      break;
  }
  return options;
};

export const getDayStringFromUtcFullDate = (date) => {
  const dayExstractFromUtcStartIndex = 0;
  const dayExstractFromUtcEndIndex = 10;

  return date.slice(dayExstractFromUtcStartIndex, dayExstractFromUtcEndIndex);
};

export const getRowColorByVacationType = (type) => {
  const color = vacationTypes.find((item) => item.label === type)?.color;
  return color || vacationTypes.find((item) => item.label === 'inne').color;
};
