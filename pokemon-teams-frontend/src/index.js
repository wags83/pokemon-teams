const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () =>{
    getTrainerData()

    document.addEventListener('click', event => {
        if (event.target.className === 'release') {
            releasePokemon(event)
        }
        if (event.target.className === 'add-pokemon-button') {
            console.log(event.target)
            addPokemon(event)
        }
    })
})

function makeTrainerCard(trainer) {
    const trainerCard = document.createElement('div')
    trainerCard.className = 'card'
    trainerCard.dataset.id = trainer.id
    trainerCard.id = trainer.id
    trainerCard.innerHTML = `
    <p>${trainer.name}</p>
    <button data-trainer-id=${trainer.id} class="add-pokemon-button">Add Pokemon</button>
    <ul>
    </ul>`
    document.body.append(trainerCard)
}

function getTrainerData() {
    fetch(TRAINERS_URL)
    .then(response => {
        return response.json()
    })
    .then(result => {
        console.log(result)
        result.forEach(trainer => {
            makeTrainerCard(trainer)
        })
        result.forEach(element => {
            console.log(element.pokemons)
            element.pokemons.forEach(pokemon => {
                makePokemonLI(pokemon)
            })
        })

    })
}

function makePokemonLI(pokemon) {
    let trainerCard = document.getElementById(`${pokemon.trainer_id}`)
    const pokemonLI = document.createElement('li')
    pokemonLI.innerHTML = `
    ${pokemon.nickname}<button class="release" data-id=${pokemon.id}>Release</button>`
    trainerCard.append(pokemonLI)
}

function releasePokemon(event) {
    pokemonID = event.target.dataset.id
    console.log(event.target)
    const configObject = {
        method: 'DELETE',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        }
    }
    fetch(`http://localhost:3000/pokemons/${pokemonID}`, configObject)
    .then(response => {
        response.json()
    })
    .then(result => {
        console.log(result)
        event.target.parentNode.remove()
    })
}

function addPokemon(event) {
    const pokemonID2 = getRandomInt(23)
    fetch(`http://localhost:3000/pokemons/${pokemonID2}`)
    .then(response => response.json())
    .then(result => {
        const trainerCard2 = event.target.parentNode
        const pokemonLI2 = document.createElement('li')
        pokemonLI2.innerHTML = `
        ${result.nickname}<button class="release" data-id=${result.id}>Release</button>`
        trainerCard2.append(pokemonLI2)
    })
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }