# Documentación - TaskFlow: Gestor de Tareas

## Descripción General
TaskFlow es una aplicación web de gestión de tareas que permite crear, editar, eliminar y completar tareas con límites de tiempo. Integra almacenamiento local (localStorage) y sincronización con API externa.
## Autor
**Creadora**: Karina Castillo Ch.

## Componentes Principales

### Clase `Tarea`
- **Propósito**: Modelo de datos para representar una tarea individual
- **Propiedades**:
    - `id`: Identificador único generado automáticamente
    - `descripcion`: Texto de la tarea (máx. 50 caracteres)
    - `estado`: "pendiente" o "completada"
    - `fechaCreacion`: Fecha en que se creó (formato local)
    - `fechaLimite`: Límite de 8 horas por defecto
- **Métodos**:
    - `marcarCompletada()`: Cambia estado a completada
    - `editarDescripcion()`: Modifica descripción si la tarea no está completada

### Clase `GestorTareas`
- **Propósito**: Controlador central de todas las tareas
- **Métodos**:
    - `agregarTarea()`: Añade nueva tarea al array
    - `eliminarTarea()`: Elimina tarea por ID
    - `editarTarea()`: Edita descripción de tarea pendiente

## Funcionalidades Clave

### Interfaz de Usuario
- Formulario con contador de caracteres en tiempo real
- Lista renderizada dinámicamente con opciones de edición
- Efectos visuales (hover con cambio de color de fondo)
- Notificaciones con retardo temporal

### Gestión de Tiempo
- Contador regresivo que actualiza cada segundo
- Muestra tiempo restante: horas, minutos, segundos
- Alerta visual cuando se agota el tiempo (texto rojo)

### Persistencia de Datos
- **localStorage**: Guarda tareas localmente en el navegador
- **API externa**: Sincronización con JSONPlaceholder (GET/POST)
- Carga automática al iniciar la aplicación

### Eventos Implementados
- `submit`: Agregar nueva tarea con retardo de 500ms
- `keyup`: Contar caracteres en tiempo real
- `click`: Eliminar, completar o editar tareas
- `mouseover/mouseout`: Efectos visuales en hover
- `setInterval`: Actualización continua de contadores

## Flujo de Datos
1. Usuario ingresa tarea en el formulario
2. Se crea instancia de `Tarea` y se agrega al `GestorTareas`
3. Se guarda en localStorage y se envía a API
4. Se renderiza lista actualizada en el DOM
5. Se muestra notificación de confirmación

## Características Adicionales
- Manejo de errores con try/catch en operaciones asíncronas
- Uso de template literals para interpolación de strings
- Métodos con arrow functions para mantener contexto `this`
- Spread operator para inmutabilidad de arrays