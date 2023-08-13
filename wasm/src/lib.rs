
use wasm_bindgen::prelude::*;

pub mod planets;



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

// struct Planet {
//     name: String,
//     distance_au: f64,
//     eccentricity: f64,
//     inclination_deg: f64,
// }
// static PLANETS_DATA: Vec<Planet> = vec![
//     Planet {
//         name: String::from("Mercury"),
//         distance_au: 0.387,
//         eccentricity: 0.21,
//         inclination_deg: 7.0,
//     },
//     Planet {
//         name: String::from("Venus"),
//         distance_au: 0.723,
//         eccentricity: 0.01,
//         inclination_deg: 3.39,
//     },
//     Planet {
//         name: String::from("Earth"),
//         distance_au: 1.0,
//         eccentricity: 0.02,
//         inclination_deg: 0.0,
//     },
//     Planet {
//         name: String::from("Mars"),
//         distance_au: 1.523,
//         eccentricity: 0.09,
//         inclination_deg: 1.85,
//     },
//     Planet {
//         name: String::from("Jupiter"),
//         distance_au: 5.2,
//         eccentricity: 0.05,
//         inclination_deg: 1.31,
//     },
//     Planet {
//         name: String::from("Saturn"),
//         distance_au: 9.58,
//         eccentricity: 0.06,
//         inclination_deg: 2.49,
//     },
//     Planet {
//         name: String::from("Uranus"),
//         distance_au: 19.29,
//         eccentricity: 0.05,
//         inclination_deg: 0.77,
//     },
//     Planet {
//         name: String::from("Neptune"),
//         distance_au: 30.25,
//         eccentricity: 0.01,
//         inclination_deg: 1.77,
//     },
//     Planet {
//         name: String::from("Pluto"),
//         distance_au: 39.51,
//         eccentricity: 0.25,
//         inclination_deg: 17.5,
//     },
// ];
// const PLANET_NAMES: Vec<String> = PLANETS_DATA.iter().map(|name| String::from(*name)).collect();
