use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn simpsons_rule(a: f64, b: f64, n: usize) -> f64 {
    let h = (b - a) / n as f64;
    let mut sum = (a.sin() + b.sin()) / 2.0;

    for i in 1..n {
        let x = a + i as f64 * h;
        sum += if i % 2 == 0 { 2.0 * x.sin() } else { 4.0 * x.sin() };
    }

    h / 3.0 * sum
}
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_simpsons_rule() {
        let a = 0.0; // Lower bound of the interval
        let b = std::f64::consts::PI; // Upper bound of the interval (pi)
        let n = 100; // Number of subintervals
    
        let integral = simpsons_rule(a, b, n);
        println!("Approximate integral: {}", integral);
    }
}