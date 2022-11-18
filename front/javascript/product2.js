const queryString = window.location.search // On récupere l'id sous forme de chaines de caractères
const urlParams = new URLSearchParams(queryString) // On "parse" la chaine de caractère
const id = urlParams.get("id") // Puis on utilise la methode get pour afficher la valeur associée
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName
}

fetch(`http://localhost:3000/api/products/${id}`) // Methode fetch pour fournir l'interface de l'api
    .then((response) => response.json())
    .then((res) => displayData(res))

 // On affiche le contenu du data

function displayData(content) {
    const { altTxt, colors, description, imageUrl, name, price } = content
    makeImage(imageUrl, altTxt)
    makeTitle(name)
    makePrice(price)
    itemPrice = price
    imgUrl = imageUrl
    altText = altTxt
    articleName = name
    makeDescription(description)
    makeColors(colors)
}

// On crée l'image

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}

// On crée le titre

function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

// On crée le prix

function makePrice(price) {
    const p = document.querySelector("#price")
    if (price != null) p.textContent = price
}

// On crée la description

function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

// On crée l'option de couleur

function makeColors(colors) {
    const select = document.querySelector("#colors")
    if (select != null) {
        colors.forEach((color) => {
            const option = document.createElement("option")
            option.value = color
            option.textContent = color
            select.appendChild(option)
        })
    }
}

// On crée l'evenement "ajouter au panier" puis on la sauvegarde grace a saveCart() puis ca nous envoie sur une autre page grace a window.location.href

let addToCart = document.querySelector("#addToCart")
addToCart.addEventListener('click', function (e) {
    const color = document.querySelector("#colors").value
    const quantity = document.querySelector("#quantity").value
    if (color == null || color === "" || quantity < 1 || quantity == null) {
        alert("Veuillez selectionner une couleur et une quantité")
        return
    }
    saveCart(color, quantity)
    window.location.href = "cart.html"
})

// On crée la fonction qui va nous permettre d'enregistrer dans le localstorage

function saveCart(color, quantity,) {
    let cart = localStorage.getItem('kanap_cart') // La méthode getItem() de l'interface Storage renvoie la valeur associée à la clé passée en paramètre.
    cart = JSON.parse(cart)
    if (cart != null) {
        if (id + color in cart) {
            let product = cart[id + color]
            let newQuantity = Number(product.quantity) + Number(quantity)
            const data = {
                id: id,
                color: color,
               quantity: Number(newQuantity),
                //price: itemPrice,
                imageUrl: imgUrl,
                altTxt: altText,
                name: articleName,
            }
            cart[id + color] = data
            localStorage.setItem('kanap_cart', JSON.stringify(cart)) // La méthode setItem() de l'interface Storage, lorsque lui sont passées le duo clé-valeur, les ajoute à l'emplacement de stockage, sinon elle met à jour la valeur si la clé existe déjà
        } else {
            const data = {
                id: id,
                color: color,
                quantity: Number(quantity),
              //  price: itemPrice,
                imageUrl: imgUrl,
                altTxt: altText,
                name: articleName,
            }
            cart[id + color] = data
            localStorage.setItem('kanap_cart', JSON.stringify(cart))
        }
    }
    else {
        const data = {
            id: id,
            color: color,
            quantity: Number(quantity),
          //  price: itemPrice,
            imageUrl: imgUrl,
            altTxt: altText,
            name: articleName,
        }
        let newCart = {}
        newCart[id + color] = data
        localStorage.setItem('kanap_cart', JSON.stringify(newCart))
    }
}
