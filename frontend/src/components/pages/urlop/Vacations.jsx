import { useState } from 'react';

function Urlop() {
  const [test, setTest] = useState(false);
  setTest(false);
  return (
    <div>
      {test ? <h1>hi</h1> : <h2>no</h2>}
      Urlop
    </div>
  );
}
export default Urlop;
