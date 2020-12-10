'use strict';

const jsFibonacci = (n) => {
    let [a, b] = [0, 1];
    while (--n > 0) {
        [a, b] = [b, a + b];
    }
    return b;
}

module.exports = { jsFibonacci };
