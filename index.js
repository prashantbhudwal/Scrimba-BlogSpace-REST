import { renderBlog, renderNewPost } from "./render.js";
import url from "./url.js";

const $ = (id) => document.getElementById(id);

const element = {
  blogContainer: $("blog-container"),
  newPostBtn: $("new-post-btn"),
  modalOverlay: $("modal-overlay"),
  discardBtn: $("discard-btn"),
  publishBtn: $("publish-btn"),
};

const modalElements = {
  title: $("title"),
  body: $("content-area"),
};

const modalEvents = {
  openModal: () => {
    element.modalOverlay.style.display = "block";
  },
  closeModal: () => {
    element.modalOverlay.style.display = "none";
    modalElements.title.value = "";
    modalElements.body.value = "";
  },
};

element.newPostBtn.addEventListener("click", modalEvents.openModal);

element.discardBtn.addEventListener("click", modalEvents.closeModal);

const fetchPosts = function fetchPostsFromApi() {
  fetch(url.base + url.posts, { method: `GET` })
    .then((response) => response.json())
    .then((json) => {
      return renderBlog(json.slice(0, 50), element.blogContainer);
    });
};

fetchPosts();

element.publishBtn.addEventListener("click", (event) => {
  event.preventDefault();
  let draftDataObject = getDraftObject();
  publishDraft(draftDataObject);
  modalEvents.closeModal();
});

const getDraftDOMInputs = function () {
  const draftTitle = modalElements.title.value;
  const draftBody = modalElements.title.value;
  return { draftTitle, draftBody };
};

const getDraftObject = function getDraftObject() {
  const { draftTitle, draftBody } = getDraftDOMInputs();
  return {
    title: draftTitle,
    body: draftBody,
  };
};

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
      renderNewPost(json, element.blogContainer);
    });
};
