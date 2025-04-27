

// 1. Función declarativa
// ****************************************** ejr2 =>  D***************************
function cuadrado(x) {
    return x * x;
}

function mostrarCuadrado() {
    const numero = document.getElementById('numeroCuadrado').value;
    const x = document.getElementById("mensajeError");
    x.style.display = "none";
    let valid = true;
    valid = (numero.length > 0);
    
    if (!valid) {    
            x.style.display = "block";
            document.getElementById('mensajeError').innerHTML = `ingrese un numero`;
    } else {
        const resultado = cuadrado(numero);
        document.getElementById('resultadoCuadrado').innerHTML = 
        `El cuadrado de ${numero} es ${resultado}`;
    }    
}

// 2. Función expresiva
// ****************************************** ejr2 =>  D***************************
const potencia = function(base, exponente) {
    let resultado = 1;
    for (let i = 0; i < exponente; i++) {
        resultado *= base;
    }
    return resultado;
};

function mostrarPotencia() {
    
        const base = document.getElementById('base').value;
        const exponente = document.getElementById('exponente').value;
        const resultado = potencia(base, exponente);
        const x = document.getElementById("mensajeError2");
        x.style.display = "none";
        let valid = true;
        valid = (base.length > 0)&&(exponente.length > 0);
        
        if (!valid) {    
                x.style.display = "block";
                document.getElementById('mensajeError2').innerHTML = `ingrese un base y exponente`;
        } else {
            document.getElementById('resultadoPotencia').innerHTML = `${base} elevado a ${exponente} = ${resultado}`;
        } 
}

// 3. Arrow function
// ****************************************** ejr2 =>  D***************************
const dividir = (a, b) => a / b;

function mostrarDivision() {
    
        const dividendo = document.getElementById('dividendo').value;
        const divisor = document.getElementById('divisor').value;
        const resultado = dividir(dividendo, divisor);
        const x = document.getElementById("mensajeError3");
        x.style.display = "none";
        let valid = true;
        valid = (dividendo.length > 0)&&(divisor.length > 0);
        
        if (!valid) {    
                x.style.display = "block";
                document.getElementById('mensajeError3').innerHTML = `ingrese un dividendo y divisor`;
        } else {
            document.getElementById('resultadoDivision').innerHTML = `${dividendo} ÷ ${divisor} = ${resultado.toFixed(2)}`;
        } 
}

// 4. Función anidada 
function humus(factor) {
    const ingrediente = (cantidad, unidad, nombre) => {
        const mensaje = `${cantidad * factor} ${unidad} de ${nombre}<br>`;
        document.getElementById('resultadoHummus').innerHTML += mensaje;
    };
    
    document.getElementById('resultadoHummus').innerHTML = '';
    ingrediente(1, "lata", "garbanzos");
    ingrediente(0.5, "taza", "tahini");
    ingrediente(2, "cucharadas", "limón");
}

function prepararHummus() {
    humus(2);
}

// 5. Scope
function probarScope() {
    let x = "global";
    let resultado = '';

    function prueba() {
        let x = "local";
        resultado += `Dentro: ${x}<br>`;
    }

    prueba();
    resultado += `Fuera: ${x}`;
    document.getElementById('resultadoScope').innerHTML = resultado;
}

// 6. Factorial (recursividad)
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

function calcularFactorial() {
    const numero = document.getElementById('numeroFactorial').value;
    const resultado = factorial(numero);
    document.getElementById('resultadoFactorial').innerHTML = 
        `${numero}! = ${resultado}`;
}

// 7. Funcion IMC 
const imc = (a, b) => b / ((a)*(a));

function mostrarImc() { // ****************************************** ejr2 => C  y D***************************
    
        const altura = document.getElementById('altura').value;
        const peso = document.getElementById('peso').value;
        const resultado = imc(altura, peso);
        const x = document.getElementById("mensajeError7");
        x.style.display = "none";
        let valid = true;
        valid = (altura.length > 0)&&(peso.length > 0);
        
        if (!valid) {    
                x.style.display = "block";
                document.getElementById('mensajeError7').innerHTML = `ingrese altura mts y peso kg`;
        } else {
            if (resultado < 18.5) {
                clasificacion = 'estás muy delgado';
              } else if (resultado < 25) {
                clasificacion = 'estás saludable';
              } else {
                clasificacion = 'tienes sobrepeso';
              }
            document.getElementById('resultadoImc').innerHTML = 
               ` El IMC es  = ${resultado.toFixed(2)} ${clasificacion}`;
        } 
       }

// Función para cambiar secciones
function cambiarSeccion(seccionId) {
    document.querySelectorAll('.seccion').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.boton-menu').forEach(btn => btn.classList.remove('active'));
    
    document.getElementById(seccionId).classList.add('active');
    event.target.classList.add('active');
}

// Ejemplo 1: Obtener Pokémon básico (Promesas)
function obtenerPokemon() {
    const id = document.getElementById('pokemonId').value;
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => {
            if (!response.ok) throw new Error('Pokémon no encontrado');
            return response.json();
        })
        .then(data => {
            const html = `
                <h3>${data.name.toUpperCase()}</h3>
                <img src="${data.sprites.front_default}" class="img-pokemon">
                <p>Altura: ${data.height / 10}m | Peso: ${data.weight / 10}kg</p>
                <p>Tipos: ${data.types.map(t => t.type.name).join(', ')}</p>
            `;
            document.getElementById('pokemonResult').innerHTML = html;
        })
        .catch(error => {
            document.getElementById('pokemonResult').innerHTML = `Error: ${error.message}`;
        });
}

// Ejemplo 2: Cadena de evoluciones (Async/Await)
async function obtenerEvoluciones() {
    try {
        const response = await fetch('https://pokeapi.co/api/v2/evolution-chain/1');
        const data = await response.json();
        
        let html = '<h3>Cadena de Evolución de Bulbasaur:</h3>';
        let chain = data.chain;
        
        while(chain) {
            html += `<p>${chain.species.name} → `;
            chain = chain.evolves_to[0];
        }
        
        html = html.replace(/→ $/, ''); // Eliminar última flecha
        document.getElementById('evolucionesResult').innerHTML = html;
        
    } catch (error) {
        document.getElementById('evolucionesResult').innerHTML = `Error: ${error.message}`;
    }
}

// Ejemplo 3: Pokémon aleatorio (Fetch + Then)
function pokemonAleatorio() {
    const randomId = Math.floor(Math.random() * 898) + 1;
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
        .then(response => response.json())
        .then(pokemon => {
            const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
            document.getElementById('randomPokemon').innerHTML = `
                <h3>${pokemon.name} (#${pokemon.id})</h3>
                <img src="${pokemon.sprites.front_default}" class="img-pokemon">
                <p>Habilidades: ${abilities}</p>
            `;
        });
}

// Ejemplo 4: Pokémon por nombre (Fetch + Async/Await)
async function pokemonPorNombre() {
    const nombre = document.getElementById('pokemonNombre').value.toLowerCase();
    console.log(nombre);
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}`);
        if (!response.ok) throw new Error('Pokémon no encontrado');
        
        const pokemon = await response.json();
        const abilities = pokemon.abilities.map(a => a.ability.name).join(', ');
        document.getElementById('pokemonNameResult').innerHTML = `
            <h3>${pokemon.name} (#${pokemon.id})</h3>
            <img src="${pokemon.sprites.front_default}" class="img-pokemon">
            <p>Habilidades: ${abilities}</p>
        `;
    } catch (error) {
        document.getElementById('nombrePokemonResult').innerHTML = `Error: ${error.message}`;
    }
}

// mostrar perrito random 
// ****************************************** ejr2 => E***************************
function perroAleatorio() {
        
    fetch(`https://dog.ceo/api/breeds/image/random`)
        .then(response => response.json())
        .then(pokemon => {
            document.getElementById('randomPerro').innerHTML = `
                
                <img src="${pokemon.message}" class="img-pokemon">
                
            `;
        });

}
