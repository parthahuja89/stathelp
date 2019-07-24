const bio = require('../node-server/Distributions/Bionomial')

/** 
 * Tests for Bionomial Distribution Algorithms on NodeJS Server
 */

//P(X=x) tests 🍔
test('Bionomial P(X=x): for data 0.8,4,1 ~= 0.0256...  🍔', () => {
    expect(bio.bionomial(0.8,4,1)).toBeCloseTo(0.0256);
});


test('Bionomial P(X=x): for data 0.8, 200,150 ~= 0.0148...  🍔', () => {
    expect(bio.bionomial(0.8,200,150)).toBeCloseTo(0.0148);
});

test('Bionomial P(X=x): for data 0.5, 200,150 < 0.000001...  🍔', () => {
    expect(bio.bionomial(0.5,200,150)).toBeLessThan(0.000001);
});

test('Bionomial P(X=x): for data 0.5, 300,150 ~= 0.0460...  🍔', () => {
    expect(bio.bionomial(0.5,300,150)).toBeCloseTo(0.0460);
});

//P(X<x) tests 🍞
test('Bionomial P(X<x): for data 0.8,4,1 ~= 0.0016...  🍞', () => {
    expect(bio.bionomial_lt(0.8,4,1)).toBeCloseTo(0.0016);
});


test('Bionomial P(X<x): for data 0.8, 200,150 ~= 0.0344...  🍞', () => {
    expect(bio.bionomial_lt(0.8,200,150)).toBeCloseTo(0.0344);
});

test('Bionomial P(X<x): for data 0.5, 200,150 > 0.99...  🍞', () => {
    expect(bio.bionomial_lt(0.5,200,150)).toBeGreaterThan(0.999999);
});

test('Bionomial P(X<x): for data 0.5, 300,150 ~= 0.476...  🍞', () => {
    expect(bio.bionomial_lt(0.5,300,150)).toBeCloseTo(0.476);
});

//P(X<x) tests 🍞
test('Bionomial P(X<=x): for data 0.8,4,1 ~= 0.0016...  🍞', () => {
    expect(bio.bionomial_lt_eq(0.8,4,1)).toBeCloseTo(0.02720);
});


test('Bionomial P(X<x): for data 0.8, 200,150 ~= 0.049...  🍞', () => {
    expect(bio.bionomial_lt_eq(0.8,200,150)).toBeCloseTo(0.049);
});

test('Bionomial P(X<x): for data 0.5, 200,150 > 0.99...  🍞', () => {
    expect(bio.bionomial_lt_eq(0.5,200,150)).toBeGreaterThan(0.999999);
});

test('Bionomial P(X<x): for data 0.5, 300,150 ~= 0.476...  🍞', () => {
    expect(bio.bionomial_lt_eq(0.5,300,150)).toBeCloseTo(0.523);
});
 




