document.addEventListener('DOMContentLoaded', function() {
    const emergencyLink = document.querySelector('.menu-item[data-es="ASISTENCIA DE EMERGENCIA"]');

    emergencyLink.addEventListener('click', function(event) {
        event.preventDefault();

        const emergencyModal = document.createElement('div');
        emergencyModal.style.position = 'fixed';
        emergencyModal.style.top = '50%';
        emergencyModal.style.left = '50%';
        emergencyModal.style.transform = 'translate(-50%, -50%)';
        emergencyModal.style.width = '80%';
        emergencyModal.style.backgroundColor = '#f8f9fa';
        emergencyModal.style.border = '1px solid #ccc';
        emergencyModal.style.borderRadius = '8px';
        emergencyModal.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        emergencyModal.style.padding = '20px';
        emergencyModal.style.zIndex = '1000';
        emergencyModal.style.color = 'black';

        emergencyModal.innerHTML = `
            <h2 style="color: #333; border-bottom: 2px solid #ffc107; padding-bottom: 5px;">Asistencia en casos de Emergencia</h2>
            <div style="background-color: #b71c1c; color: white; padding: 10px; text-align: center; font-weight: bold;">
                Ciudadanos Estadounidenses en Situación de Emergencia
            </div>
            <p style="margin-top: 20px;">Por Favor Llame al: <strong>+57 (601) 275-2000</strong></p>
            <p>Llamadas Fuera de Horario Regular de Oficina: <strong>+57 (601) 275-2000</strong></p>
            <p>Llamadas desde el Exterior: <strong>+57 (601) 275-2000</strong></p>
            <ul style="margin-top: 20px;">
                <li>Contacto en Caso de Emergencia</li>
                <li>Regístrese en STEP</li>
                <li>Sustracción Internacional de Menores</li>
                <li>Arresto o Detención</li>
                <li>Fallecimiento</li>
                <li>Víctima de Crimen o Delito</li>
                <li>Asistencia Financiera de Emergencia</li>
            </ul>
            <button id="close-emergency-modal" style="margin-top: 20px; padding: 10px 20px; background-color: #b71c1c; color: white; border: none; border-radius: 4px; cursor: pointer;">Cerrar</button>
        `;

        document.body.appendChild(emergencyModal);

        const closeButton = document.getElementById('close-emergency-modal');
        closeButton.addEventListener('click', function() {
            document.body.removeChild(emergencyModal);
        });
    });
});