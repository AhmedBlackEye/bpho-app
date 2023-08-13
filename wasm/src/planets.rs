use ndarray::Array;
use wasm_bindgen::prelude::*;
use js_sys::{Array as JsArray, Reflect};
use std::collections::HashMap;

const NUM_POINTS: usize = 1000;

pub struct Planet {
    name: &'static str,
    distance: f64,
    eccentricity: f64,
}

pub fn get_planets_data() -> [(&'static str, Planet); 9] {
    [
        ("Mercury", Planet { name: "Mercury", distance: 0.387, eccentricity: 0.21 }),
        ("Venus", Planet { name: "Venus", distance: 0.723, eccentricity: 0.01 }),
        ("Earth", Planet { name: "Earth", distance: 1.0, eccentricity: 0.02 }),
        ("Mars", Planet { name: "Mars", distance: 1.523, eccentricity: 0.09 }),
        ("Jupiter", Planet { name: "Jupiter", distance: 5.2, eccentricity: 0.05 }),
        ("Saturn", Planet { name: "Saturn", distance: 9.58, eccentricity: 0.06 }),
        ("Uranus", Planet { name: "Uranus", distance: 19.29, eccentricity: 0.05 }),
        ("Neptune", Planet { name: "Neptune", distance: 30.25, eccentricity: 0.01 }),
        ("Pluto", Planet { name: "Pluto", distance: 39.51, eccentricity: 0.25 }),
    ]
}

fn calculate_radius(eccentricity: f64, a: f64) -> Vec<f64> {
    let theta = Array::linspace(0.0, 2.0 * std::f64::consts::PI, NUM_POINTS);
    let cos_theta = theta.map(|&x| f64::cos(x));
    let r = a * (1.0 - eccentricity.powi(2)) / (1.0 - eccentricity * &cos_theta);
    r.to_vec()
}

#[wasm_bindgen(js_name = getPlanetsRadiusLookupTable)]
pub fn get_planets_radius_lookup_table(planets_names: js_sys::Array) -> js_sys::Object {
    let planets_data = get_planets_data();
    let planets_map: HashMap<&str, &Planet> = planets_data.iter().map(|(name, planet)| (*name, planet)).collect();
    
    let js_object = js_sys::Object::new();

    for js_value in planets_names.iter() {
        if let Some(js_string) = js_value.as_string() {
            if let Some(planet) = planets_map.get(js_string.as_str()) {
                let radius_data = calculate_radius(planet.eccentricity, planet.distance);
                let js_array: JsArray = radius_data.into_iter().map(JsValue::from_f64).collect();
                Reflect::set(&js_object, &JsValue::from_str(planet.name), &js_array).unwrap();
            }
        }
    }

    js_object
}
