document.addEventListener('DOMContentLoaded', cargarEnemigos);

async function cargarEnemigos(){
    try{
        const response = await fetch('/api/enemigo');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const enemigos = await response.json();
        console.log('Datos recibidos:', enemigos);
        mostrarEnemigos(enemigos);

    }catch(error){
        console.error("Error al cargar enemigos:", error);
    }
}

async function mostrarEnemigos(enemigos){
    const tbody = document.getElementById('enemigosBody');
    const table = document.getElementById('enemigosTable');

    tbody.innerHTML = '';

    if(enemigos.length === 0){
        console.log("no hay enemigos");
        return;
    }

    enemigos.forEach(enemigo => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${enemigo.id}</td>
            <td>${enemigo.nombre}</td>
            <td>${enemigo.pais}</td>
            <td>${enemigo.afiliacion}</td>
        `;
        tbody.appendChild(tr);
    });
}

// Manejar el envío del formulario de CREAR
document.getElementById('enemigoForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const enemigo = {
        nombre: document.getElementById('nombre').value,
        pais: document.getElementById('pais').value,
        afiliacion: document.getElementById('afiliacion').value
    };

    try {
        const response = await fetch('/api/enemigo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enemigo)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        await response.json();
        mostrarMensaje('Enemigo creado con éxito', 'exito');
        limpiarFormulario();
        cargarEnemigos();

    } catch (error) {
        console.error("Error al crear enemigo:", error);
        mostrarMensaje('Error al crear enemigo', 'error');
    }
});

// Manejar el envío del formulario de EDITAR
document.getElementById('editarForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const id = document.getElementById('editarId').value;
    const enemigo = {
        nombre: document.getElementById('editarNombre').value,
        pais: document.getElementById('editarPais').value,
        afiliacion: document.getElementById('editarAfiliacion').value
    };

    try {
        const response = await fetch(`/api/enemigo/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(enemigo)
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        await response.json();
        mostrarMensajeEditar('Enemigo actualizado con éxito', 'exito');
        limpiarFormularioEditar();
        cargarEnemigos();

    } catch (error) {
        console.error("Error al actualizar enemigo:", error);
        mostrarMensajeEditar('Error al actualizar enemigo', 'error');
    }
});

// Manejar el envío del formulario de ELIMINAR
document.getElementById('eliminarForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const id = document.getElementById('eliminarId').value;

    if (!id) {
        mostrarMensajeEliminar('Por favor, ingresa un ID', 'error');
        return;
    }

    await eliminarEnemigo(id);
    document.getElementById('eliminarForm').reset();
});

function limpiarFormulario() {
    document.getElementById('enemigoForm').reset();
}

function limpiarFormularioEditar() {
    document.getElementById('editarForm').reset();
}

function mostrarMensaje(mensaje, tipo) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = 'mensaje ' + tipo;
    mensajeDiv.style.display = 'block';

    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
}

function mostrarMensajeEditar(mensaje, tipo) {
    const mensajeDiv = document.getElementById('mensajeEditar');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = 'mensaje ' + tipo;
    mensajeDiv.style.display = 'block';

    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
}

function mostrarMensajeEliminar(mensaje, tipo) {
    const mensajeDiv = document.getElementById('mensajeEliminar');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = 'mensaje ' + tipo;
    mensajeDiv.style.display = 'block';

    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 3000);
}

async function eliminarEnemigo(id) {
    if (!confirm('¿Estás seguro de que quieres eliminar este enemigo?')) {
        return;
    }

    try {
        const response = await fetch(`/api/enemigo/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        mostrarMensajeEliminar('Enemigo eliminado con éxito', 'exito');
        cargarEnemigos();

    } catch (error) {
        console.error("Error al eliminar enemigo:", error);
        mostrarMensajeEliminar('Error al eliminar enemigo', 'error');
    }
}