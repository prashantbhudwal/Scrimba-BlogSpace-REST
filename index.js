const log = (prompt = "Testing Testing") => console.log(prompt);
const $ = (id) => document.getElementById(id);

const element = {
  blogContainer: $("blog-container"),
  newPostBtn: $("new-post-btn"),
  modalOverlay: $("modal-overlay"),
  discardBtn: $("discard-btn"),
  publishBtn: $("publish-btn"),
  title: $("title"),
  content: $("content-area"),
};

const url = {
  base: "https://apis.scrimba.com/jsonplaceholder",
  posts: "/posts",
  todos: "/todos",
};

element.newPostBtn.addEventListener(
  "click",
  () => (element.modalOverlay.style.display = "block")
);

element.discardBtn.addEventListener(
  "click",
  () => (element.modalOverlay.style.display = "none")
);

element.publishBtn.addEventListener("click", (event) => {
  event.preventDefault();

  let draftData = {
    title: element.title.value,
    content: element.content.value,
  };
  publish(draftData);
});

const renderBlog = (blogArray) => {
  blogArray.forEach((item) => {
    const postHtml = `<div class = "post-card">
                      <h1>${item.title.slice(0, 40)}</h1>
                      <p>${item.body.slice(0, 300)}</p>
                      </div>
                        `;

    element.blogContainer.innerHTML += postHtml;
  });
};

fetch(url.base + url.posts, { method: `GET` })
  .then((response) => response.json())
  .then((json) => {
    return renderBlog(json.slice(0, 50));
  });

const publish = (draftData) => {
  fetch(url.base + url.todos, {
    method: `POST`,
    body: JSON.stringify(draftData),
  })
    .then((response) => response.json())
    .then((json) => log(json));
};
