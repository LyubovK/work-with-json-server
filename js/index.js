const container = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

const renderPosts = async (term) => {
  let url = 'http://localhost:3000/posts?_sort=likes';
  if (term) {
    url += `&q=${term}`;
  }

  const res = await fetch(url);
  const posts = await res.json();
  //   console.log(posts);

  let template = '';
  posts.map((post) => {
    template += `
        <div class="post">
            <h2>${post.title}</h2>
            <p><small>${post.likes} likes</small></p>
            <p>${post.body.slice(0, 200)}</p>
            <a href="/detail.html?id=${post.id}">read more...</a>
        </div>
    `;
  });
  container.innerHTML = template;
  //   return posts;
};

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();

  renderPosts(searchForm.term.value.trim());
});

window.addEventListener('DOMContentLoaded', (e) => renderPosts());
