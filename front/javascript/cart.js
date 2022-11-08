
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
    cart.find(item => {
        totalUnit += item.quantity
    })
    console.log(totalUnit, cart)

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
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)
    cart.splice(itemToDelete, 1)
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

    input.addEventListener("input", () => updatePriceAndQuantity(item.color, input.value, item))

    quantity.appendChild(input)
    settings.appendChild(quantity)
}

function updatePriceAndQuantity(color, newValue, item) {
    const itemToUpdate = cart.find((item) => item.color == color)
    console.log("voici l'item a mettre a jour", itemToUpdate) 
    itemToUpdate.quantity = Number(newValue)
    console.log("la nouvelle valeur est", newValue)
    item.quantity = itemToUpdate.quantity
    console.log("la quantité affiché est de", item.quantity)

    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
   // deleteDataFromCach(item)
}





function deleteDataFromCach(item) {
    const idcolor = item.id + item.color
    localStorage.removeItem(idcolor)
}

function saveNewDataToCache(item) {
    const idcolor = item.id + item.color
    const dataToSave = JSON.stringify(item)
    localStorage.setItem(idcolor, dataToSave)

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

function submitForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
        alert("Please select items to buy")
        return
    }
    if (isFormInvalid()) return
    if (isEmailInvalid()) return
    if (adressIsInValid()) return

    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => console.log(data))
}

function makeRequestBody() {
    let products = []
    cart.forEach((item) => {
        products.push(item.id)
    })

    const form = document.querySelector(".cart__order__form")
    const firstName = form.elements.firstName.value
    const lastName = form.elements.lastName.value
    const address = form.elements.address.value
    const city = form.elements.city.value
    const email = form.elements.email.value
    const body = {
        contact: {
            firstName: firstName,
            lastName: lastName,
            address: address,
            city: city,
            email: email
        },
        products: products         
    }
    return body
}

function getIdsFromCache() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        const id = key.split("-")[0]
        ids.push(id)
    }
    return ids
}

function isEmailInvalid() {
    const email = document.querySelector("#email").value
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (regex.test(email) === false) {
        alert("Please enter valid email")
        return true
    }
    return false
}

function isFormInvalid() {
    const form = document.querySelector(".cart__order__form")
    const inputs = form.querySelectorAll("input")
    inputs.forEach((input) => {
        if (input.value === "") {
            alert("Please fill all the fields")
            return true
        }
        return false
    })
}

