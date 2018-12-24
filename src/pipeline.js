
function wrap(thingToWrap) {
  const items = [thingToWrap];

  async function call(event, context) {
    const next = async () => {
      const func = items.pop();
      return await func(event, context, next);
    };

    return await next();
  }

  function use(thingToUse) {
    items.push(thingToUse);
    return this;
  }

  call.use = use;

  return call;
}

module.exports = { wrap };
