

const { wrap } = require('../src/pipeline');

async function heart(event, context) {
  console.log('in the middle Cirel');
  console.log(`event: ${JSON.stringify(event)}`);
  console.log(`context ${JSON.stringify(context)}`);

  return { statusCode: 200 };
}

async function first(event, context, next) {
  console.log('do this first');
  const result = await next();
  console.log('do this after');
  return result;
}

async function second(event, context, next) {
  console.log('do this before second');
  const result = await next();
  console.log('do this after second');
  return result;
}

const chain = wrap(heart).use(second).use(first);

(async () => {
  const result = await chain({ verb: 'GET' }, { day: 'monday' });
  console.log(result);
})();
