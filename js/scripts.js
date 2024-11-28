let pokemonList = [
  {
    name: 'Charmeleon',
    height: 1.1,
    types: ['Dragon', 'Monster', 'Mountain']
  },
  {
    name: 'Bulbasaur',
    height: 0.7,
    types: ['Grass', 'Monster']
  },
  {
    name: 'Pikachu',
    height: 0.4,
    types: ['Fairy', 'Field']
  },
  {
    name: 'Wartortle',
    height: 1,
    types: ['Monster', 'Water 1']
  }
]

pokemonList.forEach(function (pokemon) {
  if (pokemon.height > 1) {
    document.write(
      `<p>${pokemon.name} (height: ${pokemon.height}) - Wow, that's big! </p>`
    )
  } else {
    document.write(`<p>${pokemon.name} (height: ${pokemon.height})</p>`)
  }
})
