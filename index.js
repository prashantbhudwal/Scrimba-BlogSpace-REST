import getPostHtml from "./getPostHtml.js";
import url from "./url.js";

const $ = (id) => document.getElementById(id);

const element = {
  blogContainer: $("blog-container"),
  newPostBtn: $("new-post-btn"),
  modalOverlay: $("modal-overlay"),
  discardBtn: $("discard-btn"),
  publishBtn: $("publish-btn"),
};

const modalEvents = {
  openModal: () => {
    element.modalOverlay.style.display = "block";
  },
  closeModal: () => {
    element.modalOverlay.style.display = "none";
  },
};

element.newPostBtn.addEventListener("click", modalEvents.openModal);

element.discardBtn.addEventListener("click", modalEvents.closeModal);

const getDraftDOMInputs = function () {
  const draftTitle = document.getElementById("title").value;
  const draftBody = document.getElementById("content-area").value;
  return { draftTitle, draftBody };
};

const getDraftObject = function getDraftObject() {
  const { draftTitle, draftBody } = getDraftDOMInputs();
  return {
    title: draftTitle,
    body: draftBody,
  };
};

element.publishBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let draftDataObject = getDraftObject();
  publishDraft(draftDataObject);
  modalEvents.closeModal();
});

const renderBlog = (blogArray) => {
  blogArray.forEach((item) => {
    const postHtml = getPostHtml(item);
    element.blogContainer.innerHTML += postHtml;
  });
};

const renderNewPost = function renderNewPost(newPostJson) {
  const newPostHtml = getPostHtml(newPostJson);
  element.blogContainer.insertAdjacentHTML("afterbegin", newPostHtml);
};

const fetchPosts = function fetchPostsFromApi() {
  fetch(url.base + url.posts, { method: `GET` })
    .then((response) => response.json())
    .then((json) => {
      return renderBlog(json.slice(0, 50));
    });
};

fetchPosts();

const publishDraft = (draftDataObject) => {
  const options = {
    method: "POST",
    body: JSON.stringify(draftDataObject),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url.base + url.todos, options)
    .then((response) => response.json())
    .then((json) => {
      renderNewPost(json);
    });
};
