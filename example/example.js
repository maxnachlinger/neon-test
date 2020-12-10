const {fibonacci} = require('../lib');
const {jsFibonacci} = require('../benchmarks/js-fibonacci');

const test = (n) => {
    console.time(`js fib ${n}`);
    const jsResult = jsFibonacci(n);
    console.timeEnd(`js fib ${n}`);

    console.time(`wasm fib ${n}`);
    const wasmResult = fibonacci(n);
    console.timeEnd(`wasm fib ${n}`);
};

[100, 1000].forEach(test);
