const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { wrap } = require('./pipeline');

chai.use(chaiAsPromised);
const { expect } = chai;

const innerHandler = () => Promise.resolve({ status: 200 });
const justCallNextMiddleware = (_event, _context, next) => next();

describe('pipeline', () => {
  describe('when told to run', () => {
    it('should work', async () => {
      const pipeline = wrap(innerHandler).use(justCallNextMiddleware);
      const result = await pipeline({}, {});
      expect(result).to.deep.equal({ status: 200 });
    });

    it('should pass event to the wrapped handler', async () => {
      const passedEvent = {};
      const pipeline = wrap((event) => { expect(event).to.equal(passedEvent); });

      await pipeline(passedEvent);
    });

    it('should pass context to the wrapped handler', async () => {
      const passedContext = {};
      const pipeline = wrap((_, context) => { expect(context).to.equal(passedContext); });

      await pipeline(null, passedContext);
    });
  });

  describe('when error is thrown in the pipeline', () => {
    it('should pass error up the pipe', async () => {
      const errorMessage = 'test failure';
      const failurePipelineNode = async () => { throw new Error(errorMessage); };
      const pipeline = wrap(failurePipelineNode);

      await expect(pipeline(null, null)).to.be.rejectedWith(errorMessage);
    });
  });
});
