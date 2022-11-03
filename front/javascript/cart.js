
const cart = []

retrieveItemsFromCache()
cart.forEach((item) => displayItem(item))

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

function retrieveItemsFromCache() {
    const numberOfItems = localStorage.length
    for (let i = 0; i < numberOfItems; i++) {
        const item = localStorage.getItem(localStorage.key(i)) || ""
        const itemObject = JSON.parse(item)
        cart.push(itemObject)
    }
}

function displayItem(item) {
    const article = makeArticle(item)
    displayArticle(article)
    console.log(article)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)

}

/*function makeCardItemContent(item) {
    const div = document.createElement("div")
    div.classList.add("card__item__content")

}*/

function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")
    const description = makeDescription(item)
    const settings = makeSettings(item)
    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
    //cardItemContent.appendChild(settings)
}

function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    addQuantityToSettings(settings, item)
    return settings
}

function addQuantityToSettings(settings, item) {
    const quantity = document.createElement("div")
    quantity.classList.add("cart__item__content__settings__quantity")
    const p = document.createElement("p")
    p.textContent = "Qté :"
    quantity.appendChild(p)
    const input = document.createElement("input")
    input.type = "number"
    input.classList.add("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    settings.appendChild(input)
}

function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("card__item__description")

    const h2 = document.createElement("h2")
    h2.textContent = item.name

    const p = document.createElement("p")
    p.textContent = item.color

    const p2 = document.createElement("p")
    p2.textContent = item.price + "€"

    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)


    //div.appendChild(description)
    //return div
    return description


}

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

function makeArticle(item) {
    const article = document.createElement("article")
    console.log(article)
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}
function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")

    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}