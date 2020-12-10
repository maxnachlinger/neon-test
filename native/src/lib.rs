use neon::prelude::*;
use neon::register_module;

fn fibonacci_internal(n: usize) -> u64 {
    let mut x : u64 = 1;
    let mut y : u64 = 1;
    let mut temp : u64;

    for _ in 1..n {
        temp = x;
        x = x+y;
        y = temp
    }

    y
}

fn fibonacci(mut cx: FunctionContext) -> JsResult<JsNumber> {
    let n = cx.argument::<JsNumber>(0)?.value() as usize;
    Ok(cx.number(fibonacci_internal(n) as f64))
}

register_module!(mut m, {
    m.export_function("fibonacci", fibonacci)
});

#[cfg(test)]
mod tests {
    use wasm_bindgen_test::*;
    use super::*;

    #[test]
    fn fibonacci_test() {
        let result = fibonacci_internal(50);
        assert_eq!(result, 12586269025);
    }
}
