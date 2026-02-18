//crear clase tarea
class Tarea {
    constructor({ id, descripcion, estado = "pendiente", fechaLimite, fechaCreacion }) {
        this.id = id || Date.now() + Math.random();
        this.descripcion = descripcion;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion || new Date().toLocaleDateString();
        this.fechaLimite = fechaLimite || Date.now() + 28800000;
    }

    marcarCompletada = ()=> {
        this.estado = "completada";
    }

    editarDescripcion = (nuevaDescripcion) => {
        if (this.estado !== "completada") {
            this.descripcion = nuevaDescripcion;
        }
    }
}
//crear clase GestorTareas
class GestorTareas {
    constructor() {
        this.tareas = [];
    }

    agregarTarea = (tarea) => {
        this.tareas = [...this.tareas, tarea];
        console.log(`Tarea creada con éxito: "${tarea.descripcion}"`);
    }

    eliminarTarea = (id) => {
        const tareaEliminada = this.tareas.find(t => t.id === id);
        this.tareas = this.tareas.filter(t => t.id !== id);
        if(tareaEliminada) console.log(`Tarea eliminada con éxito: "${tareaEliminada.descripcion}"`);   
    }

    editarTarea = (id, nuevoTexto) => {
        const tarea = this.tarea.find(t => t.id === id);
        if (tarea && tarea.estado !== "completada") {
            console.log(`Tarea modificada de: "${tarea.descripcion}" a "${nuevoTexto}" con éxito`);
            tarea.editarDescripcion(nuevoTexto);
        }
    }
}

const gestor = new GestorTareas();

//eventos y manipulación del DOM
const formulario = document.getElementById("form-tarea");
const inputTarea = document.getElementById("input-tarea");
const listaTareas = document.getElementById("lista-tareas");
const notificacion = document.getElementById("notificacion");
const contadorCaracteres = document.getElementById("contador-caracteres");

//keyup para contar caracteres en tiempo real
inputTarea.addEventListener("keyup", () => {
    //uso de Template Literals
    const longitud = inputTarea.value.length;
    contadorCaracteres.textContent = `Caracteres: ${longitud}/50`;
});

const renderizarTareas = () => {
    listaTareas.innerHTML = "";

    gestor.tareas.forEach(tarea => {
        const li = document.createElement("li");

        if (tarea.estado === "completada") {
            li.classList.add("completada");
            li.innerHTML = `
                <div class="info-tarea">
                    <span>${tarea.descripcion}</span>
                    <small class="badge-completada">✓ Tarea finalizada</small>
                    <small style="color: #999; font-size: 0.75rem;">Creada el: ${tarea.fechaCreacion}</small>
                </div>
                <div class="acciones">
                    <button class="btn-icono btn-eliminar" data-id="${tarea.id}">メ</button>
                </div>
            `;
        } else {
            li.innerHTML = `
                <div class="info-tarea">
                    <span>${tarea.descripcion}</span>
                    <small style="color: #7f8c8d; font-size: 0.75rem;">Creada el: ${tarea.fechaCreacion}</small>
                    <small class="tiempo-restante" id="reloj-${tarea.id}">Calculando tiempo...</small>
                </div>
                <div class="acciones">
                    <button class="btn-icono btn-estado" data-id="${tarea.id}">✓</button>
                    <button class="btn-icono btn-editar" data-id="${tarea.id}">🖊</button>
                    <button class="btn-icono btn-eliminar" data-id="${tarea.id}">メ</button>
                </div>
            `;
        }

        //mouseover y mouseout
        li.addEventListener("mouseover", () => li.style.backgroundColor = "#f4c9a3");
        li.addEventListener("mouseout", () => li.style.backgroundColor = "transparent");

        listaTareas.appendChild(li);
    });
}

listaTareas.addEventListener("click", (e) => {
    const idTarea = Number(e.target.getAttribute("data-id"));

    if (e.target.classList.contains("btn-eliminar")) {
        gestor.eliminarTarea(idTarea);
    }
    else if (e.target.classList.contains("btn-estado")) {
        const tarea = gestor.tareas.find(t => t.id === idTarea);
        tarea.marcarCompletada();
        console.log(`Tarea completada permanentemente`);
    }
    else if (e.target.classList.contains("btn-editar")) {
        const nuevoTexto = prompt("Edita tu tarea:");
        if (nuevoTexto !== null && nuevoTexto.trim() !== "") {
            gestor.editarTarea(idTarea, nuevoTexto.trim());
        }
    }

    guardarEnStorage();
    renderizarTareas();
});

//función que muestra una notificación tras 2 segundos
const mostrarNotificacion = (mensaje) => {
    setTimeout(() => {
        notificacion.textContent = mensaje;
        notificacion.style.display = "block";

        //se oculta después de 3 segundos
        setTimeout(() => { notificacion.style.display = "none"; }, 3000);
    }, 2000);
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const texto = inputTarea.value.trim();

    if (texto !== "") {
        //retardo al agregar una tarea
        setTimeout(() => {
            const nuevaTarea = new Tarea({ descripcion: texto });
            gestor.agregarTarea(nuevaTarea);

            //guardar la tarea
            guardarEnAPI(nuevaTarea);

            inputTarea.value = "";
            contadorCaracteres.textContent = `Caracteres: 0/50`;

            guardarEnStorage();
            renderizarTareas();

            //llamando a la notificación después de que la tarea se haya agregado y renderizado
            mostrarNotificacion("¡Acción realizada con éxito!");
        }, 500);
    }
});

//contador regresivo para tareas con fecha límite de 8 horas
setInterval(() => {
    const ahora = Date.now();

    gestor.tareas.forEach(tarea => {
        if (tarea.estado !== "completada") {
            const elementoReloj = document.getElementById(`reloj-${tarea.id}`);

            if (elementoReloj) {
                const tiempoRestante = tarea.fechaLimite - ahora;

                if (tiempoRestante <= 0) {
                    elementoReloj.textContent = "¡Tiempo agotado!";
                    elementoReloj.style.color = "red";
                } else {
                    const horas = Math.floor((tiempoRestante / (1000 * 60 * 60)) % 24);
                    const minutos = Math.floor((tiempoRestante / 1000 / 60) % 60);
                    const segundos = Math.floor((tiempoRestante / 1000) % 60);

                    elementoReloj.textContent = `Te quedan ${horas}h ${minutos}m ${segundos}s para completar esta tarea`;
                }
            }
        }
    });
}, 1000);
