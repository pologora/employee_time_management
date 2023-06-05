export default function calculateCorpusChristi(easterMonday) {
  const parts = easterMonday.split('-');
  const easter = new Date(parts[0], parts[1] - 1, parts[2]);
  easter.setDate(easter.getDate() + 59); // add 59 days to get Corpus Christi

  // format the date as MM-DD
  const formattedDate = `${`0${easter.getMonth() + 1}`.slice(
    -2,
  )}-${`0${easter.getDate()}`.slice(-2)}`;

  return formattedDate;
}
