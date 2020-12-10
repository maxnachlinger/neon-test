'use strict';

const Benchmark = require('benchmark');
const {jsFibonacci} = require('./js-fibonacci.js');
const {fibonacci} = require('../lib');

const suite = Benchmark.Suite({
    onError(...args) {
        console.log('ERROR!', ...args);
    },
});

const results = [];

suite
    .add('js fib 100', function () {
        jsFibonacci(100);
    })
    .add('neon fib 100', function () {
        fibonacci(100);
    })
    .add('js fib 1000', function () {
        jsFibonacci(1000);
    })
    .add('neon fib 1000', function () {
        fibonacci(1000);
    })
    .on('cycle', function (event) {
        results.push(event.target);
    })
    .on('complete', function () {
        console.log(`### Fibonacci Benchmarks
| | ops/sec | # of runs |
| :---------- | ----------: | ----------: |`);

        results.forEach((result) => {
            const {
                name,
                hz,
                stats: {sample},
            } = result;
            const ops = Math.round(hz).toLocaleString('en-US');
            const runs = sample.length;
            console.log(`| ${name} | ${ops} | ${runs} |`);
        });
    })
    .run({async: true});
