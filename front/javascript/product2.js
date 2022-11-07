const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
const id = urlParams.get("id")
if (id != null) {
    let itemPrice = 0
    let imgUrl, altText, articleName
}


fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((res) => displayData(res))

function displayData(content) {
    const { altTxt, colors, description, imageUrl, name, price} = content
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

function makeImage(imageUrl, altTxt) {
    const image = document.createElement("img")
    image.src = imageUrl
    image.alt = altTxt
    const parent = document.querySelector(".item__img")
    if (parent != null) parent.appendChild(image)
}


function makeTitle(name) {
    const h1 = document.querySelector("#title")
    if (h1 != null) h1.textContent = name
}

function makePrice(price) {
    const p = document.querySelector("#price")
    if (price != null) p.textContent = price
}


function makeDescription(description) {
    const p = document.querySelector("#description")
    if (p != null) p.textContent = description
}

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


function saveCart(color, quantity,) {
    
    let product = localStorage.getItem(id + color)
    product = JSON.parse(product)

    if (product == null || color !== product.color) {
        const data = {
            id: id,
            color: color,
            quantity: Number(quantity),
            price: itemPrice,
            imageUrl: imgUrl,
            altTxt: altText,
            name: articleName,
        }

        localStorage.setItem(id + color, JSON.stringify(data))
    }  else {
   
       let newQuantity = Number(product.quantity) + Number(quantity)
        const data = {
            id: id,
            color: color,
            quantity: Number(newQuantity),
            price: itemPrice,
            imageUrl: imgUrl,
            altTxt: altText,
            name: articleName,
        }

        localStorage.setItem(id + color, JSON.stringify(data))
    }

}