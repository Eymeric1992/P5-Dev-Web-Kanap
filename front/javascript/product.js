
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get('id');
if (id != null) {
  let nom;
  let imagUrl, altTexte;
}


async function recupereProduit(idProduit) {
  const response = await fetch(`http://localhost:3000/api/products/${idProduit}`)
  const canape = await afficherProduit.json()


function afficherProduit(detailProduct) {

  const {altTxt, colors, description, imageUrl, name, price  , _id} = detailProduct
  makeImage (imageUrl, altTxt)
}

 function makeImage (imageUrl, altTxt) {
  const image = document.createElement("img")
  image.src = imageUrl
  image.alt = altTxt
const parent = document.querySelector(".item_img")
if (parent != null) parent.appendChild(image)
 }

 
//ici, nous allons récupérer les id des canapés pour afficher sur chaque page le détail du produit correspond
// Récupération de l'url
 /*recupereProduit(canapeId)

//appel à l'api pour récupérer les données nécessaires pour afficher les produits
async function recupereProduit(idProduit) {
  const response = await fetch(`http://localhost:3000/api/products/${idProduit}`)
  const canape = await response.json()

  afficherProduit(canape)

}

//affichage des détails lié au produit dans la page
    let image = document.createElement("img");
  image.src = detailProduct.imageUrl;
  image.alt = detailProduct.altTxt;


  let img = document.querySelector(".item__img");
  img.appendChild(image)

  let title = document.getElementById("title");
  title.textContent = detailProduct.name;

  let price = document.getElementById("price");
  price.textContent = detailProduct.price;

  let descritpion = document.getElementById("description");
  descritpion.textContent = detailProduct.description;

 

  //Récupération du tableau lié aux couleurs, puis création d'une boucle pour créer les options de couleur dans la page
  let optionColor = document.getElementById("colors");
  let colors = detailProduct.colors;
  colors.forEach(option => {
    let color = document.createElement("option");
    color.value = option
    color.textContent = option
    optionColor.appendChild(color)
  });
}


let addToCart = document.querySelector("#addToCart")
addToCart.addEventListener('click', function (e) {
  const color = document.querySelector("#colors").value
  const quantity = document.querySelector("#quantity").value
if (color == null || color === "" || quantity < 1 || quantity == null){
  alert ("Veuillez selectionner une couleur et une quantité")
  return
}

const data = {
  id : canapeId,
  color : color,
  quantity: Number(quantity),
}
localStorage.setItem(canapeId, JSON.stringify(data))
window.location.href = "cart.html"
})
  localStorage.setItem("myObj",  JSON.stringify(addToCart))
  console.log(localStorage)

*/