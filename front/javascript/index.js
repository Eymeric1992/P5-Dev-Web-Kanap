let kanapData = [];
//Ici nous utilisons la méthode Fetch pour aller chercher les données (les canapés) à l'API et les afficher sur la page d'accueil
const  getProduits = async () => {
  await fetch('http://localhost:3000/api/products')
    .then((res) => res.json())
    .then((produits) => {
      kanapData = produits;
    });
};

//La fonction suivante nous permet d'afficher l'ensemble de produits sur la page d'accueil.
//Nous avons ajouté des balises dans le DOM grâce à inner.HTML
const kanapDisplay = async () => {
  await getProduits();
  console.log(kanapData)
  //Nous avons utilisé la méthode map pour faire une itération à travers les données.
  document.getElementById('items').innerHTML = kanapData
    .map(
      (kanap) => `<a href="./product.html?id=${kanap._id}">
   <article>
      <img src="${kanap.imageUrl}" alt="${kanap.name}"/>
      <h3 class="productName">${kanap.name}</h3>
      <p class="productDescription">${kanap.description}</p>
    </article>
  </a>`
    )
    .join(''); // La méthode join() crée et renvoie une nouvelle chaîne de caractères en concaténant tous les éléments d'un tableau
};

kanapDisplay();