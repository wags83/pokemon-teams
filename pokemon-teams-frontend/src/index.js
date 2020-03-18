const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', () =>{
    getTrainerData()
})

function makeTrainerCard(trainer) {
    const trainerCard = document.createElement('div')
    trainerCard.className = 'card'
    trainerCard.dataset.id = trainer.id
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
        result.forEach(element => {
            makeTrainerCard(element)
        });
    })
}

function addPokemon() {
    const trainerCard = document.querySelector('.card')
    const pokemonLI = document.createElement('li')

}

