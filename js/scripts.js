var pokemonRepository = (function () {
  let pokemonList = [
    {
      name: "Charmeleon",
      height: 1.1,
      types: ["Dragon", "Monster", "Mountain"],
    },
    {
      name: "Bulbasaur",
      height: 0.7,
      types: ["Grass", "Monster"],
    },
    {
      name: "Pikachu",
      height: 0.4,
      types: ["Fairy", "Field"],
    },
    {
      name: "Wartortle",
      height: 1,
      types: ["Monster", "Water 1"],
    },
  ];

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
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "types" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("Incorrect type of pokemon.");
    }
  }

  /****************************************************************/
  // Show pokemon details
  /****************************************************************/
  function showDetails(pokemon) {
    console.log(pokemon.name);
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

  return {
    getAll: getAll,
    add: add,
    filterByName: filterByName,
    addListItem: addListItem,
  };
})();

/****************************************************************/
/* Display name and height of each pokemon */
/****************************************************************/
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
  /*if (pokemon.height > 1) {
    document.write(
      `<p>${pokemon.name} (height: ${pokemon.height}) - Wow, that's big! </p>`
    );
  } else {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})</p>`);
  }*/
});

/* Filter by name */
/*var searchResult = pokemonRepository.filterByName("Pikachu");
document.write(
  `<p>Filter By Name:</p><p>${searchResult[0].name} ,height: ${searchResult[0].height}, types=${searchResult[0].types}</p>`
);*/
