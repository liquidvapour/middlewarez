
function wrap(thingToWrap) {
  const items = [thingToWrap];

  function call(event, context) {
    const next = () => {
      const func = items.pop();
      return func(event, context, next);
    };

    return next();
  }

  function use(thingToUse) {
    items.push(thingToUse);
    return this;
  }

  call.use = use;

  return call;
}

module.exports = { wrap };
