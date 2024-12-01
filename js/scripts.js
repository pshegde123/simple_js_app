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

  /****************************************************************/
  // Show pokemon details
  /****************************************************************/
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
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

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
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
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
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

  function showLoadingMessage() {}
  return {
    getAll: getAll,
    add: add,
    filterByName: filterByName,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

/****************************************************************/
/* Display name and height of each pokemon */
/****************************************************************/
window.addEventListener("load", () => {
  const loader = document.querySelector(".center");
  pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });
  loader.classList.add("loader-hidden");
});
