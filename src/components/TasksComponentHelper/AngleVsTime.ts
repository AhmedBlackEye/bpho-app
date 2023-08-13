export function angle_vs_time(t, P, ecc, theta0) {
  // Angle step for Simpson's rule
  const dtheta = 1 / 1000;

  // Number of orbits
  const N = Math.ceil(t[t.length - 1] / P);

  // Define array of polar angles for orbits
  const theta = [];
  for (let i = 0; i < 2 * Math.PI * N + theta0; i += dtheta) {
    theta.push(i);
  }

  // Evaluate integrand of time integral
  const f = theta.map((angle) => Math.pow(1 - ecc * Math.cos(angle), -2));

  // Define Simpson rule coefficients c = [1, 4, 2, 4, 2, 4, ...1]
  const L = theta.length;
  const isodd = Array.from({ length: L - 2 }, (_, i) =>
    (i + 1) % 2 === 1 ? 4 : 2
  );
  const c = [1, ...isodd, 1];

  // Calculate array of times
  const tt = c.reduce(
    (acc, coeff, i) => {
      const integral =
        P *
        Math.pow(1 - ecc ** 2, 3 / 2) *
        (1 / (2 * Math.PI)) *
        dtheta *
        (1 / 3) *
        coeff *
        f[i];
      acc.push(acc[acc.length - 1] + integral);
      return acc;
    },
    [0]
  );

  // Interpolate the polar angles for the eccentric orbit at the circular orbit times
  const interp_func = (function () {
    const tIndex = (time) => {
      for (let i = 1; i < tt.length; i++) {
        if (tt[i] >= time) {
          return i - 1;
        }
      }
      return tt.length - 2;
    };
    return (time) => {
      const index = tIndex(time);
      const t1 = tt[index];
      const t2 = tt[index + 1];
      const theta1 = theta[index];
      const theta2 = theta[index + 1];
      const slope = (theta2 - theta1) / (t2 - t1);
      return theta1 + slope * (time - t1);
    };
  })();

  const theta_interpolated = t.map((time) => interp_func(time));

  return theta_interpolated;
}
