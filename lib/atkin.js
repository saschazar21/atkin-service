/**
 * Original source code taken from: https://gist.github.com/kramtark/277c0657530572e92c48
 */

function sieveOfAtkin(end) {
  const limit = end || 10000000;
  const limitSqrt = Math.sqrt(limit);
  const sieve = [];
  let n;

  // prime start from 2, and 3
  sieve[2] = true;
  sieve[3] = true;

  for (let x = 1; x <= limitSqrt; x += 1) {
    const xx = x * x; // x*x;
    for (let y = 1; y <= limitSqrt; y += 1) {
      const yy = y * y; // y*y;
      if (xx + yy >= limit) {
        break;
      }
      // first quadratic using m = 12 and r in R1 = {r : 1, 5}
      n = (4 * xx) + (yy);
      if (n <= limit && (n % 12 === 1 || n % 12 === 5)) {
        sieve[n] = !sieve[n];
      }
      // second quadratic using m = 12 and r in R2 = {r : 7}
      n = (3 * xx) + (yy);
      if (n <= limit && (n % 12 === 7)) {
        sieve[n] = !sieve[n];
      }
      // third quadratic using m = 12 and r in R3 = {r : 11}
      n = (3 * xx) - (yy);
      if (x > y && n <= limit && (n % 12 === 11)) {
        sieve[n] = !sieve[n];
      }
    }
  }

  // false each primes multiples
  for (n = 5; n <= limitSqrt; n += 1) {
    if (sieve[n]) {
      const x = n * n;
      for (let i = x; i <= limit; i += x) {
        sieve[i] = false;
      }
    }
  }

  // primes values are the one which sieve[x] = true
  // return sieve;

  // return a preformatted array
  const numbers = sieve.map((entry, index) => {
    const prime = entry === true ? index : null;
    return prime;
  });
  return numbers.filter(entry => entry !== null);
}

// primes = sieveOfAtkin(5000);

/**
 * Exports sieve of atkin
 */
module.exports = sieveOfAtkin;

/**
 * If environment variable is set to true, listen for message from the parent process,
 * parameter limit was previously checked for !isNaN and > 3.
 */
if (process.env.USE_CHILDPROCESS === 'true') {
  process.on('message', limit => process.send(sieveOfAtkin(limit)));
}
