
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
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    displayTotalPrice()
    displayTotalQuantity()
}

function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    //const total = cart.reduce((total, item) => total + item.quantity, 0)
    //

    let totalUnit = 0
    cart.forEach(item => {
        totalUnit += item.quantity
    })
    totalQuantity.textContent = totalUnit
}

function displayTotalPrice() {
    let total = 0;
    const totalPrice = document.querySelector("#totalPrice")
    //const total = cart.reduce((total, item) => total + item.price * item.quantity, 0)
    cart.forEach(item => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })

    totalPrice.textContent = total

    /* const firstItem = cart [0]
 const firstItemTotalQuantity = firstItem.quantity * firstItem.price
 
 console.log(firstItemTotalQuantity)*/
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
    addDeleteToSettings(settings, item)
    return settings
}

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))

    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function deleteItem(item) {
    const itemToDelete = cart.find(product => product.id === item.id && product.color === item.color)
    cart.splice(itemToDelete, 1)
    console.log(itemToDelete)
displayTotalPrice()
displayTotalQuantity()
deleteDataFromCach(item)
deleteArticleFromPage(item)
}

function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    articleToDelete.remove()
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

    input.addEventListener("input", () => updatePriceAndQuantity(item.id, input.value, item))
    
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function updatePriceAndQuantity(id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.id === id)
    itemToUpdate.quantity = Number(newValue)
    item.quantity = itemToUpdate.quantity
    displayTotalQuantity()
    displayTotalPrice()
    // saveNewDataToCache(item)
    deleteDataFromCach(item)
}

function deleteDataFromCach(item) {
    const key = `${item.id}-${item.color}`
    localStorage.removeItem(key)
}

function saveNewDataToCache(item) {
    const dataToSave = JSON.stringify(item)
console.log(dataToSave)
localStorage.setItem(item.id, dataToSave)
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