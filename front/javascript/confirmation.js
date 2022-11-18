const orderId = getOrderId()
displayOrderId(orderId)
removeAllCache()


 // On récupere l'order 
function getOrderId() {
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const orderId = urlParams.get("orderId")
return orderId
}

// On l'affiche

function displayOrderId() {
  const orderIdElement = document.getElementById("orderId")
  orderIdElement.textContent = orderId
}

// On le supprime du localstorage

function removeAllCache() {
  const cache = window.localStorage
  cache.clear()
}