var pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  /****************************************************************/
  // Return list of all pokemons from pokemonRepository
  /****************************************************************/
  function getAll() {
    return pokemonList;
  }

  /****************************************************************/
  // Search given pokemon name and return the related pokemon object
  /****************************************************************/
  function filterByName(searchPokemonName) {
    var result = pokemonList.filter((pokemon) => {
      return pokemon.name === "Pikachu";
    });
    return result;
  }

  /****************************************************************/
  // Add a new pokemon to the pokemonRepository
  /****************************************************************/
  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function showModal(title, height, img) {
    let modalDialog = document.querySelector(".modal-dialog");
    let modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-content");
    modalContainer.setAttribute("id", title);
    modalContainer.setAttribute("style", "text-align:center");
    let headerDiv = document.createElement("div");
    headerDiv.classList.add("modal-header");
    headerDiv.classList.add("bg-warning");

    let modalTitle = document.createElement("h1");
    modalTitle.classList.add("modal-title");
    modalTitle.classList.add("fs-5");
    modalTitle.setAttribute("id", "modalLabel");
    modalTitle.innerHTML = "<span>" + title + "</span>";
    headerDiv.append(modalTitle);

    let titleCloseButton = document.createElement("button");
    titleCloseButton.classList.add("btn-close");
    titleCloseButton.setAttribute("type", "button");
    titleCloseButton.setAttribute("data-bs-dismiss", "modal");
    titleCloseButton.setAttribute("onclick", "hideModal()");
    titleCloseButton.setAttribute("aria-label", "Close");
    headerDiv.append(titleCloseButton);

    // Append modal header
    modalContainer.append(headerDiv);

    //Append modal body
    let bodyDiv = document.createElement("div");
    bodyDiv.classList.add("modal-body");
    let imageDiv = document.createElement("div");
    let imageElement = document.createElement("img");
    imageElement.setAttribute("src", img);

    let heightElement = document.createElement("p");
    heightElement.innerHTML = "<p>Height:" + height + "</p>";

    bodyDiv.append(imageElement);
    bodyDiv.append(heightElement);
    modalContainer.append(bodyDiv);

    //Append modal footer
    let footerDiv = document.createElement("div");
    footerDiv.classList.add("modal-footer");
    let closeButton = document.createElement("button");
    let saveButton = document.createElement("button");
    closeButton.classList.add("btn");
    closeButton.classList.add("btn-secondary");
    closeButton.setAttribute("type", "button");
    closeButton.setAttribute("data-bs-dismiss", "modal");
    closeButton.setAttribute("onclick", "hideModal()");
    closeButton.innerHTML = "<span>Close</span>";

    saveButton.classList.add("btn");
    saveButton.classList.add("btn-primary");
    saveButton.innerHTML = "<span>Save Changes</span>";

    modalDialog.append(modalContainer);

    modalContainer.append(footerDiv);
    footerDiv.append(closeButton);
    footerDiv.append(saveButton);
  }
  /****************************************************************/
  // Show pokemon details
  /****************************************************************/
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name, pokemon.height, pokemon.imageUrl);
    });
  }

  /****************************************************************/
  // Add onClick() event listener to the element.
  // For onClick() event reponse, show the pokemon details
  /****************************************************************/
  function addEventListener(element, pokemon) {
    element.addEventListener("click", function () {
      showDetails(pokemon);
    });
  }

  /****************************************************************/
  // Create an unordered list of all pokemons and append it to DOM
  /****************************************************************/
  function addListItem(pokemon) {
    let listElement = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add("border-0");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn");
    button.classList.add("btn-primary");
    button.setAttribute("type", "button");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#pokeDetails");
    addEventListener(button, pokemon);
    listItem.append(button);
    listElement.append(listItem);
  }

  /****************************************************************/
  // Until API data loading is complete show message Loading API data
  /****************************************************************/
  function showLoadingMessage() {
    const container = document.querySelector(".container");
    const loader = document.createElement("div");
    loader.classList.add("loader");
    loader.innerHTML = "<p>Loading API data..........</p>";
    container.appendChild(loader);
  }

  /****************************************************************/
  // Once API data is loaded remove the loading message
  /****************************************************************/
  function hideLoadingMessage() {
    const parent = document.querySelector(".container");
    const child = document.querySelector(".loader");
    parent.removeChild(child);
  }

  function loadList() {
    //showLoadingMessage();
    return fetch(apiUrl)
      .then(function (response) {
        //hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    //showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        //hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  /*document.body.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector(".modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });*/

  return {
    getAll: getAll,
    add: add,
    filterByName: filterByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    //hideModal: hideModal,
    //showLoadingMessage: showLoadingMessage,
    //hideLoadingMessage: hideLoadingMessage,
  };
})();

window.hideModal = function () {
  const parent = document.querySelector(".modal-dialog");
  const child = document.querySelector(".modal-content");
  parent.removeChild(child);
};
/****************************************************************/
/* Display name and height of each pokemon */
/****************************************************************/
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
