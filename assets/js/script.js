// Obtener elementos e info del DOM
const inputAgregar = document.querySelector('#agregarItems');
let listaItems = document.querySelector('#listaItems');
let sumaTareasTotales = document.querySelector('#sumaTareasTotales');
let contadorTareasCompletadas = document.querySelector('#contadorTareasCompletadas');


let items = [
    { id: Date.now(), nombreItem: 'Leche', estado: false },
    { id: Date.now() + 1, nombreItem: 'Queso', estado: false },
    { id: Date.now() + 2, nombreItem: 'Cereal', estado: false },
];

let tareasCompletadas = 0;

// Sumar tareas totales
const tareasTotales = () => {
    let sumarTareas = items.length;
    sumaTareasTotales.textContent = sumarTareas;
};

//Sumar tareas completadas
const mostrarTareasCompletadas = () => {
    contadorTareasCompletadas.textContent = tareasCompletadas;
};

// Cambiar estado de item
const cambiarEstado = (id) => {
    const index = items.findIndex(item => item.id === id);
    if (index !== -1) {
        if (!items[index].estado) {
            tareasCompletadas++; 
        } else {
            tareasCompletadas--;
        }
        items[index].estado = !items[index].estado;
        updateItems();
    }
};

// Mostrar elementos en pantalla
const updateItems = () => {
    let html = '';

    for (const item of items) {
        const claseEstado = item.estado ? 'completado' : '';
        html += `<li class="${claseEstado}">
                    ${item.estado ? `<del>${item.nombreItem}</del>` : item.nombreItem}
                    <button class="btn-done" data-id="${item.id}">Done</button>
                    <button class="btn-delete" data-id="${item.id}">Delete</button>    
                </li>`;
    }
    listaItems.innerHTML = html;
    tareasTotales();
    mostrarTareasCompletadas();

    // Agregar event listeners a los botones Done y Delete
    const botonesDone = document.querySelectorAll('.btn-done');
    botonesDone.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            cambiarEstado(id);
        });
    });

    const botonesDelete = document.querySelectorAll('.btn-delete');
    botonesDelete.forEach(btn => {
        btn.addEventListener('click', () => {
            const id = parseInt(btn.getAttribute('data-id'));
            eliminarItems(id);
        });
    });
};

updateItems();

// Agregar item
const agregarItems = () => {
    let valorInput = inputAgregar.value;
    if (valorInput) {
        let nuevoItem = { id: Date.now(), nombreItem: valorInput, estado: false };
        items.push(nuevoItem);
        updateItems();
        inputAgregar.value = ''; // Limpiar el input después de agregar el item
    } else {
        alert('Por favor ingresa un nombre para el item');
    }
};

// Eliminar Item
const eliminarItems = (id) => {
    const encontrarId = items.findIndex(item => item.id === id);
    if (encontrarId !== -1) {
        items.splice(encontrarId, 1);
        updateItems();
    }
};
