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
    let modalContainer = document.querySelector(".modal-container");
    modalContainer.innerText = "";
    let modal = document.createElement("div");
    modal.classList.add("modal");
    let closeButtonElement = document.createElement("button");

    closeButtonElement.classList.add("modal-close");
    closeButtonElement.innerText = "Close";
    closeButtonElement.addEventListener("click", hideModal);

    let pokemonName = document.createElement("h1");
    pokemonName.innerText = title;
    let pokemonHeight = document.createElement("p");
    pokemonHeight.innerText = "Height:" + height;
    let pokemonImage = document.createElement("img");

    pokemonImage.setAttribute("src", img);
    pokemonImage.setAttribute("width", "100vw");
    pokemonImage.setAttribute("height", "100vh");

    modal.appendChild(closeButtonElement);
    modal.appendChild(pokemonName);
    modal.appendChild(pokemonHeight);
    modal.appendChild(pokemonImage);
    modalContainer.appendChild(modal);

    modalContainer.classList.add("is-visible");

    modalContainer.addEventListener("click", (e) => {
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    });
  }
  function hideModal() {
    let modalContainer = document.querySelector(".modal-container");
    modalContainer.classList.remove("is-visible");
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
    let listElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("primary");
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

  document.body.addEventListener("keydown", (e) => {
    let modalContainer = document.querySelector(".modal-container");
    if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
      hideModal();
    }
  });

  return {
    getAll: getAll,
    add: add,
    filterByName: filterByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
    hideModal: hideModal,
    //showLoadingMessage: showLoadingMessage,
    //hideLoadingMessage: hideLoadingMessage,
  };
})();

/****************************************************************/
/* Display name and height of each pokemon */
/****************************************************************/
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
