const chi = require('../node-server/Distributions/Chi')


/** 
 * Tests for Chi Distribution Algorithms on NodeJS Server
 */

test('Chi P(X=x): for data degrees of freedom = 8, x= 4 ~= 0.14...  🍔', () => {
    expect(chi.Chi(8,4)).toBeCloseTo(0.14);
});

