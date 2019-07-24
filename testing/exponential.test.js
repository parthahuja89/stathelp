const expo = require('../node-server/Distributions/Exponential')

/** 
 * Tests for Exponential Distribution Algorithms on NodeJS Server
 */

test('Exponential P(X=x): for data 12,12 ~= 0.63                                                                                                 ...  🍔', () => {
    expect(expo.Exponential(12,12)).toBeCloseTo(0.63);
});

test('Exponential P(X=x): for data 1/11, 1/33 ~= 0.95                                                                                                ...  🍔', () => {
    expect(expo.Exponential(1/11, 1/33)).toBeCloseTo(0.95);
});
