const cart = []
let tmp = localStorage.getItem("kanap_cart")
const localCart = JSON.parse(tmp)

retrieveItemsFromCache()

const orderButton = document.querySelector("#order")
orderButton.addEventListener("click", (e) => submitForm(e))

// On crée une boucle pour chaque item afin d'ajouter les éléments. La methode forEach permet d’itérer sur les propriétés d’un tableau
//La méthode push() ajoute un ou plusieurs éléments à la fin d'un tableau et retourne la nouvelle taille du tableau.

function retrieveItemsFromCache() {
    Object.entries(localCart).forEach((item) => {
        cart.push(item[1])
    })
    for (let i = 0; i < cart.length; i++) {
        fetch(`http://localhost:3000/api/products/${cart[i].id}`)
            .then((response) => response.json())
            .then((res) => {
                cart[i].price = res.price
                displayItem(cart[i])
            })
    }
}

// On crée une fonction permettant d'afficher le contenu de la page. 
// Appenchild est une méthode JS qui ajoute l'élément HTML enfant à la fin d'un élément parent

async function displayItem(item) {
    const article = makeArticle(item)
    displayArticle(article)
    const imageDiv = makeImageDiv(item)
    article.appendChild(imageDiv)
    const cardItemContent = makeCartContent(item)
    article.appendChild(cardItemContent)
    displayTotalPrice()
    displayTotalQuantity()
}

// On affiche la quantité 
//La méthode find() renvoie la valeur du premier élément trouvé dans le tableau qui respecte la condition donnée par la fonction de test passée en argument. 
//Sinon, la valeur undefined est renvoyée.

function displayTotalQuantity() {
    const totalQuantity = document.querySelector("#totalQuantity")
    let totalUnit = 0
    cart.find(item => {
        totalUnit += item.quantity
    })
    console.log(totalUnit, cart)
    totalQuantity.textContent = totalUnit
}

// On affiche le prix

function displayTotalPrice() {
    let total = 0;
    const totalPrice = document.querySelector("#totalPrice")
    cart.forEach(item => {
        const totalUnitPrice = item.price * item.quantity
        total += totalUnitPrice
    })
    totalPrice.textContent = total
}

// On crée l'item 
//L'instruction return met fin à l'exécution d'une fonction et définit une valeur à renvoyer à la fonction appelante.

function makeCartContent(item) {
    const cardItemContent = document.createElement("div")
    cardItemContent.classList.add("cart__item__content")
    const description = makeDescription(item)
    const settings = makeSettings(item)
    cardItemContent.appendChild(description)
    cardItemContent.appendChild(settings)
    return cardItemContent
}

// On crée les parametres

function makeSettings(item) {
    const settings = document.createElement("div")
    settings.classList.add("cart__item__content__settings")
    addQuantityToSettings(settings, item)
    addDeleteToSettings(settings, item)
    return settings
}

// On affiche l'option supprimer

function addDeleteToSettings(settings, item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__content__settings__delete")
    div.addEventListener("click", () => deleteItem(item))
    const p = document.createElement("p")
    p.textContent = "Supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

// Cette fonction nous permet de supprimer un Item

function deleteItem(item) {
    const itemToDelete = cart.findIndex((product) => product.id === item.id && product.color === item.color)
    cart.splice(itemToDelete, 1)
    displayTotalPrice()
    displayTotalQuantity()
    deleteDataFromCach(item)
    deleteArticleFromPage(item)
}

// On supprime l'article de la page grace a la fonction remove()

function deleteArticleFromPage(item) {
    const articleToDelete = document.querySelector(
        `article[data-id="${item.id}"][data-color="${item.color}"]`
    )
    articleToDelete.remove()
}

// On créer une fonction permettant d'ajouter les quantités

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
    input.addEventListener("input", () => updatePriceAndQuantity(item.color, item.id, input.value, item))
    quantity.appendChild(input)
    settings.appendChild(quantity)
}

// Cette fonction permet de mettre le prix à jour selon la quantité

function updatePriceAndQuantity(color, id, newValue, item) {
    const itemToUpdate = cart.find((item) => item.color === color && item.id === id)
    console.log("voici l'item a mettre a jour", itemToUpdate)
    itemToUpdate.quantity = Number(newValue)
    console.log("la nouvelle valeur est", newValue)
    item.quantity = itemToUpdate.quantity
    console.log("la quantité affiché est de", item.quantity)
    displayTotalQuantity()
    displayTotalPrice()
    saveNewDataToCache(item)
}

// On supprime la data du cache

function deleteDataFromCach(item) {
    delete localCart[item.id + item.color]
    localStorage.setItem("kanap_cart", JSON.stringify(localCart))
}

// On enregistre la nouvelle data

function saveNewDataToCache(item) {
    delete item.price
    localCart[item.id + item.color] = item
    localStorage.setItem("kanap_cart",JSON.stringify(localCart))
}

// Cette fonction nous permet d'afficher la description du produit

function makeDescription(item) {
    const description = document.createElement("div")
    description.classList.add("card__item__description") // L'utilisation de classList est une alternative à la propriété element.className qui renvoie une chaine composée de la liste des classes, séparées par des espaces.
    const h2 = document.createElement("h2")
    h2.textContent = item.name
    const p = document.createElement("p")
    p.textContent = item.color
    const p2 = document.createElement("p")
    p2.textContent = item.price + "€"
    description.appendChild(h2)
    description.appendChild(p)
    description.appendChild(p2)
    return description
}

// On affiche le produit

function displayArticle(article) {
    document.querySelector("#cart__items").appendChild(article)
}

// On crée l'article

function makeArticle(item) {
    const article = document.createElement("article")
    article.classList.add("card__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}

// On crée l'image

function makeImageDiv(item) {
    const div = document.createElement("div")
    div.classList.add("cart__item__img")
    const image = document.createElement("img")
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}

// On créer une fonction pour le formulaire, avec ce qui va se passer a l'evenement
// La méthode POST écrit les paramètres URL dans la requête HTTP pour le serveur.(Avec la méthode GET, les données à envoyer au serveur sont écrites directement dans l’URL.)
// Les paramètres ne sont donc pas visibles pour les utilisateurs et la portée des requêtes POST est illimitée.

function submitForm(e) {
    e.preventDefault()
    if (cart.length === 0) {
        alert("Veuillez selectionner au moins un article")
        return
    }
    if (isFormInvalid()) return
    if (isEmailInvalid()) return
   if (isAdressPostInvalid()) return
   if (isCityInvalid()) return
   if (isFirstNameInvalid()) return
   if (isLastNameInvalid()) return

    const body = makeRequestBody()
    fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
            "Content-type": "application/json"
        }
    })
        .then((res) => res.json())
        .then((data) => {
            const orderId = data.orderId
            window.location.href = "confirmation.html" + "?orderId=" + orderId
        })
        .catch((err) => console.error(err))
}

// On crée une fonction si l'email est invalide avec l'utilisation d'expression régulière

function isEmailInvalid() {
    const email = document.querySelector("#email").value
    const regex = /^[A-Za-z0-9+_.-]+@(.+)$/
    if (regex.test(email) === false) {
        alert("Veuillez rentrer une addresse mail existante")
        return true
    }
    return false
}

// On crée une fonction si le formulaire est incomplet

function isFormInvalid() {
    const form = document.querySelector(".cart__order__form")
    for (let inputs of form) {
        if (inputs.value === "") {
            alert("le formulaire n'est pas rempli entierement")
            return true
        }
    }
}

// On crée une fonction pour voir si l'adresse postale est valide

function isAdressPostInvalid() {
    const adressPost = document.querySelector("#address").value
    const regex = /^[0-9]{1,3} [a-z A-Z - ' é,è,à,á,ã,â,ä,æ,ç,ê,ë,ì,í,î,ï,ñ,ò,ó,õ,ô,ö,œ,ù,ú,û,ü,ÿ]{3,35}$/
    if (regex.test(adressPost) === false) {
        alert("Veuillez rentrer une adresse postale valide")
        return true
    }
    return false
}

// On crée une fonction pour voir si l'adresse postale est valide

function isCityInvalid() {
    const city = document.querySelector("#city").value
    const regex = /^[a-z A-Z - ' é,è,à,á,ã,â,ä,æ,ç,ê,ë,ì,í,î,ï,ñ,ò,ó,õ,ô,ö,œ,ù,ú,û,ü,ÿ]{2,45}$/
    if (regex.test(city) === false) {
        alert("Veuillez rentrer une ville valide")
        return true
    }
    return false
}

// On crée une fonction pour voir si le prénom est valide

function isFirstNameInvalid() {
    const firstName = document.querySelector("#firstName").value
    const regex = /^[a-z A-Z - ' é,è,à,á,ã,â,ä,æ,ç,ê,ë,ì,í,î,ï,ñ,ò,ó,õ,ô,ö,œ,ù,ú,û,ü,ÿ]{2,25}$/
    if (regex.test(firstName) === false) {
        alert("Veuillez rentrer votre prénom correctement")
        return true
    }
    return false
}

// On crée une fonction pour voir si le nom est valide

function isLastNameInvalid() {
    const lastName = document.querySelector("#lastName").value
    const regex = /^[a-z A-Z - ' é,è,à,á,ã,â,ä,æ,ç,ê,ë,ì,í,î,ï,ñ,ò,ó,õ,ô,ö,œ,ù,ú,û,ü,ÿ]{2,25}$/
    if (regex.test(lastName) === false) {
        alert("Veuillez rentrer votre nom correctement")
        return true
    }
    return false
}

// On recupère les informations envoyées /^[a-z A-Z]{2,25}$/

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

// On récupere les ids du cache

function getIdsFromCache() {
    const numberOfProducts = localStorage.length
    const ids = []
    for (let i = 0; i < numberOfProducts; i++) {
        const key = localStorage.key(i)
        const id = key
        ids.push(id)
    }
    return ids
}

