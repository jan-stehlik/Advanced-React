const { forwardTo } = require('prisma-binding');

const Query = {
  async items(parent, args, context, info) {
    const items = await context.db.query.items();
    return items;
  },
  item: forwardTo('db'),
  // async item(parent, args, context, info) {
  //   const item = await context.db.query.item();
  //   return item;
  // },
};

module.exports = Query;
