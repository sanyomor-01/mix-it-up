//The user will enter a cocktail. Get a cocktail name, photo, and instructions.


const button = document.querySelector('button')
let leftBtn = document.querySelector('#left')
let rightBtn = document.querySelector('#right')

let cocktailDrinks = []
let cocktailDrinksIndex = 0
let autoslide;


document.querySelector('#drinkImg').src = `./img/m-s-meeuwesen-QYWYnzvPTAQ-unsplash.jpg`
rightBtn.style.display = 'none'
leftBtn.style.display = 'none'

button.addEventListener('click', getDrink)

function getDrink() {
    let drink = document.querySelector('input').value

    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
        .then(res => res.json()) // parse response as JSON
        .then(data => {


            //use clearInterval because I want to acheive autoslide carousel effect
            clearInterval(autoslide)

            cocktailDrinks = data.drinks
            cocktailDrinksIndex = 0

            reRenderUI()

            if (cocktailDrinks.length > 1) {
                leftBtn.style.display = 'block'
                rightBtn.style.display = 'block'
            }

            //automatic rotation of drinks in carousel using setInterval

            autoslide = setInterval(() => {
                cocktailDrinksIndex++
                if (cocktailDrinksIndex >= cocktailDrinks.length) {
                    cocktailDrinksIndex = 0
                }

                reRenderUI()

            }, 6000)

        })
        .catch(err => {
            console.log(`error ${err} `)
        })
}

function reRenderUI() {
    if (cocktailDrinks.length > 0) {

        let drink = cocktailDrinks[cocktailDrinksIndex]
        let img = document.querySelector('#drinkImg')
        let name = document.querySelector('#drinkName')
        let instructions = document.querySelector('#instructions')



        name.innerText = drink.strDrink;
        img.src = `${drink.strDrinkThumb}`;
        instructions.innerText = drink.strInstructions;

    }

}

rightBtn.addEventListener('click', () => {
    if (cocktailDrinksIndex < cocktailDrinks.length - 1) {
        cocktailDrinksIndex++
        reRenderUI()
    }
})

leftBtn.addEventListener('click', () => {
    if (cocktailDrinksIndex > 0) {
        cocktailDrinksIndex--
        reRenderUI()
    }
})