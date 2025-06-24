// Main Variables
let theInput = document.querySelector(".get-repos input");
let getButton = document.querySelector(".get-button");
let reposData = document.querySelector(".show-data");

getButton.onclick = function () {
  getRepos();
};

// Get Repos Function
function getRepos() {
  if (theInput.value === "") {
    reposData.innerHTML = "<span>Please Write Github Username.</span>";
  } else {
    fetch(`https://api.github.com/users/${theInput.value}/repos`)
      .then((res) => {
      return res.json();
      })
      .then((repos) => {
        // Empty The Container
        reposData.innerHTML = '';

        // Loop On Repos
        repos.forEach(repo => {
          // Create The Main Div Element
          let mainDiv = document.createElement("div");

          // Create Repo Name Text
          let repoName = document.createTextNode(repo.name);

          // Append The Text To The Main Div
          mainDiv.appendChild(repoName);

          // Create Repo URL Anchor
          let theUrl = document.createElement('a');

          // Create Repo URL Text
          let theUrlText = document.createTextNode("Visit");

          // Append The URL Text To Anchor Tag
          theUrl.appendChild(theUrlText);

          // Add The Hypertext Reference "href"
          theUrl.href = `https://github.com/${theInput.value}/${repo.name}`;

          // Set Attribute Blank
          theUrl.setAttribute('target', "_blank");

          // Append The Anchor Tag To The Main Div
          mainDiv.appendChild(theUrl);

          // Create Stars Count Span 
          let starsSpan = document.createElement("span");

          // Create Stars Count Span Text
          let starsText = document.createTextNode(`Stars ${repo.stargazers_count}`);

          // Add Stars Count Span Text To Stars Span 
          starsSpan.appendChild(starsText);

          // Append Stars Span To The Main Div
          mainDiv.appendChild(starsSpan);

          // Add Class On Main Div
          mainDiv.className = 'repo-box';

          // Append The Main Div To Container
          reposData.appendChild(mainDiv);
        })
    })
  }
}