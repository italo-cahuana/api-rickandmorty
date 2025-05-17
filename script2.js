window.onload = verDatos;

async function obtenerDatos (url) {
    try {
        const response = await fetch(url);
        return response.json();
    } 
   catch (error) {
        console.error("Error al obtener los datos:", error); // Si hay un error, lo mostramos en la consola
    }
}

async function verDatos () {
    const data = await obtenerDatos('https://rickandmortyapi.com/api/character/?page=3');
    const data2 = await obtenerDatos('https://rickandmortyapi.com/api/character/?page=4');

    console.log(data, data2);

    let bigData = "";

    // Concatenamos cada uno de los dos arrays que queremos(results) de los dos obejtos que nos dio el api
    bigData = data.results.concat(data2.results); 
    // Se almacenan en esa varibale y automaticamente se convierte en un gran array

    console.log(bigData);

    let html = `<div class="container"><div class="row">`;

    // Por lo que podemos recorrerlo directamente (porque ya se convirtio en un array)
    bigData.forEach(users => { // Le asignamos users a cada uno de los elementos y los mostramos en el dom con su ruta

        // Traducimos lo que queremos...
        let estado = users.status === "Alive" ? "Vivo" :
                    users.status === "Dead" ? "Muerto" : "Desconocido";

        let genero =  users.gender === "Male" ? "Hombre":
                    users.gender === "Female" ? "Mujer" : "Desconocido";

        // Mostramos la imagen que queremos...
        let imgEstado = users.status === "Alive" ? "img/life-tap-svgrepo-com.svg" :
                    users.status === "Dead" ? "img/dead-393-svgrepo-com.svg" : "img/unknown-status-svgrepo-com.svg";

                    html += `
                    <div class="col-6 col-md-4 col-lg-3 d-flex justify-content-center mb-4 px-1 hvr-buzz-out">
                        <div class="card" style="width: 100%; max-width: 18rem;">
                            <h5 class="card-title mt-3">${users.name}</h5>
                            <img src="${users.image}" alt="${users.name}" class="card-img-top" style="width: 100%; height: auto;">
                            <div class="card-body">
                                <p class="card-text">Estado: ${estado} <img src="${imgEstado}" alt="img_estado" width="32"></p>
                                <p class="card-text">Género: ${genero}</p>
                            </div>
                        </div>
                    </div>
                `;
            });

    document.getElementById('datos').innerHTML = html;

}