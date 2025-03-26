import React, { useMemo, useState } from "react";

const findPrimes = (limit) => {
  console.log("Calculating primes...");
  let primes = [];
  for (let i = 2; i <= limit; i++) {
    if (primes.every(p => i % p !== 0)) primes.push(i);
  }
  return primes;
};

const ExpensiveComponent = ({ limit }) => {
  const primes = useMemo(() => findPrimes(limit), [limit]);
  return (
    <div>
      <h2>Prime Numbers up to {limit}:</h2>
      <p>{primes.join(", ")}</p>
    </div>
  );
};

const ParentComponent = () => {
  const [limit, setLimit] = useState(50);

  return (
    <div>
      <input type="number" value={limit} onChange={(e) => setLimit(Number(e.target.value))} />
      <ExpensiveComponent limit={limit} />
    </div>
  );
};

export default ParentComponent;
