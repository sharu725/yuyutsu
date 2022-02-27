import getPath from "$lib/utils/getPath";

export const get = async ({ url }) => {
  const modules = import.meta.glob("../../posts/*.{md,svx,svelte.md}");
  const postPromises = [];
  const limit = Number(url.searchParams.get("limit") ?? Infinity);

  if (Number.isNaN(limit)) {
    return {
      status: 400,
    };
  }

  for (let [path, resolver] of Object.entries(modules)) {
    const slug = getPath(path);
    const promise = resolver().then((post) => ({
      slug,
      ...post.metadata,
    }));

    postPromises.push(promise);
  }

  const posts = await Promise.all(postPromises);
  const publishedPosts = posts
    .filter((post) => post.published !== false)
    .slice(0, limit);

  publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return {
    body: publishedPosts.slice(0, limit),
  };
};
