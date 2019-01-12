const Mutation = {
  async createItem(parent, args, context, info) {
    const item = await context.db.mutation.createItem({
      data: {
        ...args
      }
    }, info);

    return item;
  },
  async updateItem(parent, args, context, info) {
    const newData = { ...args };
    // ID is always immutable
    delete newData.id;
    const item = context.db.mutation.updateItem({
      data: newData,
      where: {
        id: args.id,
      },
    }, info);

    return item;
  }
};

module.exports = Mutation;
