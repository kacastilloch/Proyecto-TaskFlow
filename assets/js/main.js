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