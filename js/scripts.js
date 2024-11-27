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

for(let i=0;i<pokemonList.length;i++){
    //document.write(pokemonList[i].name `(${pokemonList[i].height})`);
    if(pokemonList[i].height > 1){
        document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height}) - Wow, that's big! </p>`);    
    }else{
        document.write(`<p>${pokemonList[i].name} (height: ${pokemonList[i].height})</p>`);    
    }
    
}