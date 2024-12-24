var pokemonRepository = (function () {
  let pokemonList = [];
  let abilitiesList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";

  /****************************************************************/
  // Return list of all pokemons from pokemonRepository
  /****************************************************************/
  function getAll() {
    return pokemonList;
  }

  /****************************************************************/
  // Return list of all abilities of selected pokemon
  /****************************************************************/
  function getAllAbilities() {
    return abilitiesList;
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
  // Add a all abilities to the list
  /****************************************************************/
  function addAbilities(title) {
    abilitiesList.push(title);
  }

  /****************************************************************/
  // Get pokemon details
  /****************************************************************/
  async function loadAbilityList(detailsUrl) {
    return fetch(detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        console.log(json);
        json.abilities.forEach(function (item) {
          let ability = {
            name: item.ability.name,
          };
          addAbilities(ability);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(title, height, weight, img, detailsUrl) {
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

    let heightWeightElement = document.createElement("p");
    heightWeightElement.innerHTML =
      "<p>Height: " + height + "ft, Weight: " + weight + " lbs</p>";

    // Abilities Section
    loadAbilityList(detailsUrl);
    let divAbility = document.createElement("div");
    let test = getAllAbilities();
    console.log("test = ", test.name);
    /*for (let i = 0; i < arrAbilities.length; i++) {
      console.log(arrAbilities[i]);
      allAbilities = allAbilities + arrAbilities[i];
    }
    divAbility.innerHTML = "<p>Abilities: " + allAbilities + "</p>";*/

    bodyDiv.append(imageElement);
    bodyDiv.append(heightWeightElement);
    //bodyDiv.append(divAbility);
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
      showModal(
        pokemon.name,
        pokemon.height,
        pokemon.weight,
        pokemon.imageUrl,
        pokemon.detailsUrl
      );
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
    let blockButtonElement = document.createElement("div");
    blockButtonElement.classList.add("d-grid");
    blockButtonElement.classList.add("gap-2");
    blockButtonElement.classList.add("col-6");
    blockButtonElement.classList.add("mx-auto");
    let listElement = document.querySelector(".list-group");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.classList.add("border-0");
    listItem.classList.add("text-center");
    let button = document.createElement("button");
    let name = "<p>" + pokemon.name + "</p>";
    button.innerHTML = name;
    button.classList.add("pokemonButton");
    button.classList.add("btn");
    button.classList.add("btn-outline-dark");
    button.classList.add("shadow-lg");
    button.setAttribute("type", "button");
    button.setAttribute("style", "border:double");
    button.setAttribute("data-toggle", "button");
    button.setAttribute("data-bs-toggle", "modal");
    button.setAttribute("data-bs-target", "#pokeDetails");
    addEventListener(button, pokemon);
    listItem.append(button);
    //blockButtonElement.append(listElement);
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

  async function loadList() {
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
        item.weight = details.weight;
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
    addAbilities: addAbilities,
    filterByName: filterByName,
    addListItem: addListItem,
    loadList: loadList,
    loadAbilityList: loadAbilityList,
    loadDetails: loadDetails,
    showModal: showModal,
    getAllAbilities: getAllAbilities,
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
