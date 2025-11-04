/**
 * Aplicación principal - Controlador de la interfaz
 * 
 * @author Valentin Barral
 * @license CC BY 4.0
 */

let huffman = null;
let steps = [];
let currentStepIndex = 0;
let visualizer = null;

// Función para ajustar el tamaño del canvas
function resizeCanvas() {
    const canvas = document.getElementById('treeCanvas');
    const container = canvas.parentElement;
    
    // Obtener el ancho del contenedor (sin padding)
    const containerWidth = container.clientWidth - 40; // restamos el padding (20px * 2)
    
    // Calcular altura proporcional basada en el ancho
    // Usar un ratio más razonable para evitar canvas excesivamente grandes
    const canvasHeight = Math.max(1200, Math.min(2000, containerWidth * 1.5));
    
    // Establecer las dimensiones del canvas
    canvas.width = containerWidth;
    canvas.height = canvasHeight;
    
    // Actualizar dimensiones lógicas del visualizador si existe
    if (visualizer) {
        visualizer.logicalWidth = canvas.width;
        visualizer.logicalHeight = canvas.height;
        visualizer.setupHighDPICanvas();
        
        // Redibujar si hay datos cargados
        if (steps && steps.length > 0) {
            updateStepDisplay();
        }
    }
}

// Inicializar al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    visualizer = new TreeVisualizer('treeCanvas');
    resizeCanvas();
    loadExample3(); // Cargar el ejemplo de la imagen por defecto
});

// Redimensionar cuando cambia el tamaño de la ventana (con debounce)
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
    }, 250);
});

// Ejemplos predefinidos
function loadExample1() {
    const data = {
        'A': 0.4,
        'B': 0.3,
        'C': 0.2,
        'D': 0.1
    };
    loadData(data);
}

function loadExample2() {
    const data = {
        'E': 0.35,
        'T': 0.25,
        'A': 0.20,
        'O': 0.15,
        'N': 0.05
    };
    loadData(data);
}

function loadExample3() {
    // Ejemplo de la imagen proporcionada
    const data = {
        'a': 0.171,
        'b': 0.031,
        'c': 0.057,
        'd': 0.092,
        'e': 0.274,
        'f': 0.052,
        'g': 0.042,
        'h': 0.130,
        'i': 0.149,
        'j': 0.002
    };
    loadData(data);
}

function loadCustomInput() {
    const input = document.getElementById('customInput').value;
    try {
        const data = parseInputData(input);
        if (Object.keys(data).length === 0) {
            alert(t('invalidDataAlert'));
            return;
        }
        loadData(data);
    } catch (error) {
        alert(t('errorProcessingAlert') + error.message);
    }
}

function loadData(data) {
    // Crear instancia del algoritmo de Huffman
    huffman = new HuffmanAlgorithm(data);
    huffman.build();
    
    steps = huffman.getSteps();
    currentStepIndex = 0;

    // Actualizar interfaz
    updateFrequencyTable(data);
    updateStepDisplay();
    updateNavigationButtons();
}

function updateFrequencyTable(data) {
    const container = document.getElementById('frequencyTable');
    // Ordenar de menor a mayor frecuencia
    const sortedData = Object.entries(data).sort((a, b) => a[1] - b[1]);

    let html = `<table><thead><tr><th>${t('symbolHeader')}</th><th>${t('frequencyHeader')}</th></tr></thead><tbody>`;
    
    sortedData.forEach(([symbol, freq]) => {
        html += `<tr>
            <td class="symbol-cell">${symbol}</td>
            <td>${freq.toFixed(3)}</td>
        </tr>`;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}


function updateStepDisplay() {
    const step = steps[currentStepIndex];
    
    // Actualizar indicador de paso
    document.getElementById('currentStep').textContent = currentStepIndex + 1;
    document.getElementById('totalSteps').textContent = steps.length;
    
    // Actualizar descripción con icono según el tipo
    let icon = '📝';
    if (step.type === 'initial') icon = '🎬';
    if (step.type === 'mark') icon = '👉';
    if (step.type === 'combine') icon = '🔗';
    if (step.type === 'insert') icon = '⬇️';
    if (step.type === 'final') icon = '✅';
    
    document.getElementById('stepDescription').textContent = `${icon} ${step.description}`;
    
    // Actualizar estilo de la descripción según el tipo
    const descBox = document.querySelector('.step-description');
    descBox.className = 'step-description';
    if (step.type === 'mark') descBox.classList.add('step-mark');
    if (step.type === 'combine') descBox.classList.add('step-combine');
    if (step.type === 'insert') descBox.classList.add('step-insert');
    if (step.type === 'final') descBox.classList.add('step-final');
    
    // Actualizar visualización
    if (step.type === 'final' && step.tree) {
        // Mostrar árbol final completo con tabla de códigos
        const codes = huffman.getCodes();
        const stats = huffman.calculateStatistics();
        visualizer.drawTree(step.tree, step.highlight, codes, stats);
    } else if (step.showAsTrees && step.allTrees) {
        // Mostrar múltiples árboles parciales
        visualizer.drawMultipleTrees(step.allTrees, step.highlight);
    } else if (step.tree) {
        visualizer.drawTree(step.tree, step.highlight);
    } else if (step.nodes && step.nodes.length > 0) {
        visualizer.drawMultipleTrees(step.nodes, step.highlight);
    }
    
    // Agregar animación
    document.querySelector('.step-description').classList.remove('fade-in');
    setTimeout(() => {
        document.querySelector('.step-description').classList.add('fade-in');
    }, 10);
}

function updateNavigationButtons() {
    const firstBtn = document.getElementById('firstBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const lastBtn = document.getElementById('lastBtn');
    
    firstBtn.disabled = currentStepIndex === 0;
    prevBtn.disabled = currentStepIndex === 0;
    nextBtn.disabled = currentStepIndex === steps.length - 1;
    lastBtn.disabled = currentStepIndex === steps.length - 1;
}

function goToFirst() {
    currentStepIndex = 0;
    updateStepDisplay();
    updateNavigationButtons();
}

function previousStep() {
    if (currentStepIndex > 0) {
        currentStepIndex--;
        updateStepDisplay();
        updateNavigationButtons();
    }
}

function nextStep() {
    if (currentStepIndex < steps.length - 1) {
        currentStepIndex++;
        updateStepDisplay();
        updateNavigationButtons();
    }
}

function goToLast() {
    currentStepIndex = steps.length - 1;
    updateStepDisplay();
    updateNavigationButtons();
}

// Atajos de teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        previousStep();
    } else if (e.key === 'ArrowRight') {
        nextStep();
    } else if (e.key === 'Home') {
        goToFirst();
    } else if (e.key === 'End') {
        goToLast();
    }
});

