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

  function getAll() {
    return pokemonList;
  }

  function filterByName(searchPokemonName) {
    var result = pokemonList.filter((pokemon) => {
      return pokemon.name === "Pikachu";
    });
    //console.log("result = ", result);
    return result;
  }

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

  return {
    getAll: getAll,
    add: add,
    filterByName: filterByName,
  };
})();

/* Show name & height of each pokemon */
pokemonRepository.getAll().forEach(function (pokemon) {
  if (pokemon.height > 1) {
    document.write(
      `<p>${pokemon.name} (height: ${pokemon.height}) - Wow, that's big! </p>`
    );
  } else {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})</p>`);
  }
});

/* Filter by name */
var searchResult = pokemonRepository.filterByName("Pikachu");
document.write(
  `<p>Filter By Name:</p><p>${searchResult[0].name} ,height: ${searchResult[0].height}, types=${searchResult[0].types}</p>`
);
