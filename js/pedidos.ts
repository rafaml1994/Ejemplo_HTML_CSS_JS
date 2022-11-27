const valores = window.location.search;

const urlParams:any = new URLSearchParams(valores);

let cantidad:any = urlParams.get('cantidad');


interface Products{
    id:number;
    title:string;
    price:string;
    description:string;
    image:string;
}

const options:any = {
    method: "GET",
  };
let url:string = "https://fakestoreapi.com/products";

let card:HTMLElement | null = document.getElementById('card');
let cardImage:HTMLElement | null = document.getElementById('cardImage');
let cardText:HTMLElement | null = document.getElementById('cardText');

cardImage?.style.padding = "1rem";
cardText?.style.padding = "1rem";
card?.style.boxShadow = "rgb(38, 57, 77) 0px 20px 30px -10px";


function getProductos(){
    return fetch(url,options)
    .then(response => response.json())
    .then(data =>{
        return data as Products[];
    })
.catch((err:any) => console.error(err));
}
getProductos()
.then(productos => {
    let cookie:number | null = readCookie("busqueda");
    let products:any = productos.map(map => map);

    products.forEach(producto => {
        let datos:Products = {
            id:producto.id,
            title:producto.title,
            price:producto.price,
            description:producto.description,
            image:producto.image
        }
        if(datos.id == cookie){
            let image:any = document.createElement('img');
            let contenedorTexto:any = document.createElement('div') //agregar la clase de bootstrap
            let contenedorFooter:any = document.createElement('div') //agregar la clase de bootstrap
            let tituloCard:any = document.createElement('h5') //agregar la clase de bootstrap
            let descripcionCard:any = document.createElement('p') //agregar la clase de bootstrap
            let precioCard:any = document.createElement('h6') //agregar la clase de bootstrap
            let cantidadCard:any = document.createElement('h6') //agregar la clase de bootstrap
            let totalPrice:any = document.createElement('h5');

            image.src = `${datos.image}`;
            tituloCard.innerHTML = `${datos.title}`;
            descripcionCard.innerHTML = `${datos.description}`;
            precioCard.innerHTML = `Precio : ${datos.price} €`;
            cantidadCard.innerHTML = `Unidades : ${cantidad}`;
            totalPrice.innerHTML= 'El total es : '+Number.parseFloat(datos.price)*cantidad+' €';

            image.className = 'card-img-top';
            contenedorTexto.className = 'card-body';
            contenedorFooter.className = 'card-footer';
            precioCard.className = 'text-muted text-center';
            cantidadCard.className = 'text-muted text-center';
            tituloCard.className ='card-title';
            descripcionCard.className = 'card-text';
            totalPrice.className='text-muted text-center fw-bold';

            
            contenedorFooter.append(precioCard);
            contenedorFooter.append(cantidadCard);
            contenedorFooter.append(totalPrice);
            contenedorTexto.append(tituloCard);
            contenedorTexto.append(descripcionCard);
            cardImage?.append(image);
            cardText?.append(contenedorTexto);
            cardText?.append(contenedorFooter)
        }
    });
})


function readCookie(name) {
    let nameEQ = name + "="; 
    let ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
      var c = ca[i];
      while (c.charAt(0)==' ') c = c.substring(1,c.length);
      if (c.indexOf(nameEQ) == 0) {
        let id = Number.parseInt(decodeURIComponent( c.substring(nameEQ.length,c.length)));
        return id;
      }
    }
    return null;
}