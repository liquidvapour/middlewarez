const { expect } = require('chai');

const { wrap } = require('./pipeline');

const innerHandler = () => Promise.resolve({ status: 200 });
const justCallNextMiddleware = (_event, _context, next) => next();

describe('pipeline', () => {
  describe('when told to run', () => {
    it('should work', async () => {
      const pipeline = wrap(innerHandler).use(justCallNextMiddleware);
      const result = await pipeline({}, {});
      expect(result).to.deep.equal({ status: 200 });
    });
  });
});
