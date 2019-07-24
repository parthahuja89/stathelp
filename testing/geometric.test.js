const geo = require('../node-server/Distributions/Geometric')

/** 
 * Tests for Exponential Distribution Algorithms on NodeJS Server
 */

test('Geometric P(X=x): for data 0.6,1 ~= 0.6                                                                                               ...  🍔', () => {
    expect(geo.Geometric(0.6, 1)).toBeCloseTo(0.6);
});

