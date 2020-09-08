const createResolver = (resolver) => {
  const baseResolver = resolver;
  baseResolver.createResolver = (childResolver) => {
    const newResolver = async (_, args, context, info) => {
      await resolver(_, args, context, info);
      return childResolver(_, args, context, info);
    };
    return createResolver(newResolver);
  };
  return baseResolver;
};

const requiresAuth = createResolver((_, args, { user }) => {
  if (!user || !user.id) {
    throw new Error("Not authenticated");
  }
});

export default requiresAuth;
