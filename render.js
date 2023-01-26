function getPostHtml(post) {
  const title = post.title.length < 50 ? post.title : post.title.slice(0, 40);
  const body = post.body.length < 300 ? post.body : post.body.slice(0, 300);
  return `<div class = "post-card">
                      <h1>${title}</h1>
                      <p>${body}</p>
                      </div>
                        `;
}

function renderBlog(blogArray, blogContainer) {
  blogArray.forEach((item) => {
    const postHtml = getPostHtml(item);
    blogContainer.innerHTML += postHtml;
  });
}

const renderNewPost = function renderNewPost(newPostJson, blogContainer) {
  const newPostHtml = getPostHtml(newPostJson);
  blogContainer.insertAdjacentHTML("afterbegin", newPostHtml);
};

export { renderBlog, renderNewPost };
