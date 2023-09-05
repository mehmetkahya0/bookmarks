document.addEventListener("DOMContentLoaded", function () {
  displayBookmarks(); // Call this function when the page loads
});

function addBookmark() {
  const siteName = document.getElementById("siteName").value;
  const siteURL = document.getElementById("siteURL").value;
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  const siteDate = currentDate;

  if (!siteName || !siteURL) {
    alert("Lütfen tüm alanları doldurun.");
    return;
  }

  const bookmark = {
    name: siteName,
    url: siteURL,
    date: siteDate,
  };

  saveBookmark(bookmark);

  displayBookmarks();
  document.getElementById("siteName").value = "";
  document.getElementById("siteURL").value = "";
}

function saveBookmark(bookmark) {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function displayBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  const bookmarksContainer = document.getElementById("bookmarks");
  bookmarksContainer.innerHTML = "";

  bookmarks.forEach((bookmark) => {
    const bookmarkDiv = document.createElement("div");
    bookmarkDiv.classList.add("bookmark");
    bookmarkDiv.innerHTML = `
            <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
            <button onclick="deleteBookmark('${bookmark.url}')" class="delete" style="right:0; position:absolute; margin-right: 120px">Delete</button>
            <a style="right:0; position:absolute; margin-right: 20px">${bookmark.date}</a>
        `;
    bookmarksContainer.appendChild(bookmarkDiv);
  });
}

function deleteBookmark(url) {
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks = bookmarks.filter((bookmark) => bookmark.url !== url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  displayBookmarks();
}
