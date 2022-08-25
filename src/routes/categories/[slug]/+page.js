export const load = async ({ parent, params }) => {
  const { slug } = params;
  const { posts } = await parent();
  const title = slug;
  const filteredPosts = posts.filter((post) => {
    return post.categories.includes(slug);
  });

  return {
    posts: filteredPosts,
    title,
  };
};
