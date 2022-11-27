const valores = window.location.search;
const urlParams = new URLSearchParams(valores);
let cantidad = urlParams.get('cantidad');
const options = {
    method: "GET",
};
let url = "https://fakestoreapi.com/products";
let card = document.getElementById('card');
let cardImage = document.getElementById('cardImage');
let cardText = document.getElementById('cardText');
cardImage === null || cardImage === void 0 ? void 0 : cardImage.style.padding = "1rem";
cardText === null || cardText === void 0 ? void 0 : cardText.style.padding = "1rem";
card === null || card === void 0 ? void 0 : card.style.boxShadow = "rgb(38, 57, 77) 0px 20px 30px -10px";
function getProductos() {
    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
        return data;
    })
        .catch((err) => console.error(err));
}
getProductos()
    .then(productos => {
    let cookie = readCookie("busqueda");
    let products = productos.map(map => map);
    products.forEach(producto => {
        let datos = {
            id: producto.id,
            title: producto.title,
            price: producto.price,
            description: producto.description,
            image: producto.image
        };
        if (datos.id == cookie) {
            let image = document.createElement('img');
            let contenedorTexto = document.createElement('div'); //agregar la clase de bootstrap
            let contenedorFooter = document.createElement('div'); //agregar la clase de bootstrap
            let tituloCard = document.createElement('h5'); //agregar la clase de bootstrap
            let descripcionCard = document.createElement('p'); //agregar la clase de bootstrap
            let precioCard = document.createElement('h6'); //agregar la clase de bootstrap
            let cantidadCard = document.createElement('h6'); //agregar la clase de bootstrap
            let totalPrice = document.createElement('h5');
            image.src = `${datos.image}`;
            tituloCard.innerHTML = `${datos.title}`;
            descripcionCard.innerHTML = `${datos.description}`;
            precioCard.innerHTML = `Precio : ${datos.price} €`;
            cantidadCard.innerHTML = `Unidades : ${cantidad}`;
            totalPrice.innerHTML = 'El total es : ' + Number.parseFloat(datos.price) * cantidad + ' €';
            image.className = 'card-img-top';
            contenedorTexto.className = 'card-body';
            contenedorFooter.className = 'card-footer';
            precioCard.className = 'text-muted text-center';
            cantidadCard.className = 'text-muted text-center';
            tituloCard.className = 'card-title';
            descripcionCard.className = 'card-text';
            totalPrice.className = 'text-muted text-center fw-bold';
            contenedorFooter.append(precioCard);
            contenedorFooter.append(cantidadCard);
            contenedorFooter.append(totalPrice);
            contenedorTexto.append(tituloCard);
            contenedorTexto.append(descripcionCard);
            cardImage === null || cardImage === void 0 ? void 0 : cardImage.append(image);
            cardText === null || cardText === void 0 ? void 0 : cardText.append(contenedorTexto);
            cardText === null || cardText === void 0 ? void 0 : cardText.append(contenedorFooter);
        }
    });
});
function readCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ')
            c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) {
            let id = Number.parseInt(decodeURIComponent(c.substring(nameEQ.length, c.length)));
            return id;
        }
    }
    return null;
}
