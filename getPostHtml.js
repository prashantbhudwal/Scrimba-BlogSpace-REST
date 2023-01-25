export default function getPostHtmlFromJson(post) {
  const title = post.title.length < 50 ? post.title : post.title.slice(0, 40);
  const body = post.body.length < 300 ? post.body : post.body.slice(0, 300);
  return `<div class = "post-card">
                      <h1>${title}</h1>
                      <p>${body}</p>
                      </div>
                        `;
}
