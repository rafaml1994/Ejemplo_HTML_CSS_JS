// https://fakestoreapi.com/products API
interface Usuario{
    usuario:string;
    contraseña:string;
}

let buttonInicio:any = document.getElementById('showForm');
let show:any = document.getElementById('mostrarConsulta');
let productos:any = document.getElementById('productos');
let input:any = document.getElementById('input');


buttonInicio.addEventListener('click',()=>{
    show.style.opacity="1";
    show.className='animation';
    let select:any = document.getElementById('productos');

    const options:any = {
        method: "GET",
      };
    let url:string = "https://fakestoreapi.com/products";

    fetch(url,options)
    .then(response => response.json())
    .then(data =>{
        data.forEach(product => {
            let option:any = document.createElement('option');
            option.value = product.id;
            option.innerHTML = product.title;
            select.append(option);
        });
    })
});

function mostrarAlerta(event){
    event.preventDefault();
    
    let texto = productos.options[productos.selectedIndex].text;
    let idProducto = productos.options[productos.selectedIndex].value;
    console.log(input?.value);
    if(input?.value != "0"){
        Swal.fire({
            title: 'Inicia sesión',
            html:
            '<input id="swal-input1" class="swal2-input" placeholder="Introduce tu usuario">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Introduce tu contraseña">',
            inputAttributes: {
              autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Iniciar sesión',
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#3085d6',
            allowEnterKey: true,
            showLoaderOnConfirm: true,
            preConfirm: () => {
                let confirmUser:any = document.getElementById('swal-input1');
                let confirmPass:any = document.getElementById('swal-input2');
              return fetch(`../json/usuarios.json`)
                .then(response => response.json())
                .then(data => {
                    let confirmado:boolean = false;
                    data.forEach(usuarios =>{
                        let user:Usuario = {
                            usuario: usuarios.usuario,
                            contraseña: usuarios.contraseña
                        }
    
                        if(user.usuario == confirmUser.value && user.contraseña == confirmPass.value){
                            return confirmado = true;  
                        } 
                    })
                    if(!confirmado){
                        throw new Error();
                    }
                }).catch(error => {
                    Swal.showValidationMessage(
                      `Usuario o contraseña incorrectos`
                    )
                  })
            },
            allowOutsideClick: () => !Swal.isLoading()
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Pedido creado con éxito!',
                    html: `<p>Su pedido <strong>${texto}</strong> ha sido registrado correctamente</p>`,
                    icon:'success',
                    timer:3000,
                    showConfirmButton: false,
                    backdrop: 'swal2-backdrop-hide',
                    allowEscapeKey: false,
                    allowEnterKey:false,
                    allowOutsideClick: false
                }).then(()=>{
                    show.style.opacity="0";
                    //Pasar datos mediante cookies
                    document.cookie = `busqueda=${idProducto}; max-age=3600; path=/`;
                    //Pasar datos mediante URL
                    let cantidad = input.value;
                    window.location.href='vistas/pedidos.html?cantidad='+encodeURIComponent(cantidad) //ahi va el valor de cantidad, probarlo;
                }).catch((err: any) => console.error(err));
            }
          })
    }else{
        Swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un error',
            text: 'Selecciona una cantidad',
            confirmButtonColor: '#d33'
        })
    }

}


