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

/* ===== TEMA CLARO/OSCURO ===== */

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (visualizer) {
        visualizer.loadColorsFromCSS();
        if (steps && steps.length > 0) {
            updateStepDisplay();
        }
    }
}

function initTheme() {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
        document.body.classList.add('dark');
    }
}

/* ===== MENÚ HAMBURGUESA ===== */

function toggleMenu() {
    const controls = document.getElementById('headerControls');
    if (controls) {
        controls.classList.toggle('open');
    }
}

function initHamburger() {
    document.addEventListener('click', (e) => {
        const controls = document.getElementById('headerControls');
        const hamburger = document.querySelector('.hamburger');
        if (!controls || !hamburger) return;
        if (controls.classList.contains('open') &&
            !controls.contains(e.target) &&
            !hamburger.contains(e.target)) {
            controls.classList.remove('open');
        }
    });
}

/* ===== REDIMENSIONAR CANVAS ===== */

function resizeCanvas() {
    const canvas = document.getElementById('treeCanvas');
    const container = canvas.parentElement;
    const containerWidth = container.clientWidth - 40;
    const canvasHeight = Math.max(1200, Math.min(2000, containerWidth * 1.5));
    canvas.width = containerWidth;
    canvas.height = canvasHeight;
    if (visualizer) {
        visualizer.logicalWidth = canvas.width;
        visualizer.logicalHeight = canvas.height;
        visualizer.setupHighDPICanvas();
        if (steps && steps.length > 0) {
            updateStepDisplay();
        }
    }
}

/* ===== INICIALIZACIÓN ===== */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initHamburger();
    visualizer = new TreeVisualizer('treeCanvas');
    resizeCanvas();
    loadExample3();
});

let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        resizeCanvas();
    }, 250);
});

/* ===== EJEMPLOS ===== */

function loadExample1() {
    loadData({ 'A': 0.4, 'B': 0.3, 'C': 0.2, 'D': 0.1 });
}

function loadExample2() {
    loadData({ 'E': 0.35, 'T': 0.25, 'A': 0.20, 'O': 0.15, 'N': 0.05 });
}

function loadExample3() {
    loadData({
        'a': 0.171, 'b': 0.031, 'c': 0.057, 'd': 0.092,
        'e': 0.274, 'f': 0.052, 'g': 0.042, 'h': 0.130,
        'i': 0.149, 'j': 0.002
    });
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
    huffman = new HuffmanAlgorithm(data);
    huffman.build();
    steps = huffman.getSteps();
    currentStepIndex = 0;
    updateFrequencyTable(data);
    updateStepDisplay();
    updateNavigationButtons();
}

function updateFrequencyTable(data) {
    const container = document.getElementById('frequencyTable');
    const sortedData = Object.entries(data).sort((a, b) => a[1] - b[1]);
    let html = `<table><thead><tr><th>${t('symbolHeader')}</th><th>${t('frequencyHeader')}</th></tr></thead><tbody>`;
    sortedData.forEach(([symbol, freq]) => {
        html += `<tr><td class="symbol-cell">${symbol}</td><td>${freq.toFixed(3)}</td></tr>`;
    });
    html += '</tbody></table>';
    container.innerHTML = html;
}

function updateStepDisplay() {
    const step = steps[currentStepIndex];
    document.getElementById('currentStep').textContent = currentStepIndex + 1;
    document.getElementById('totalSteps').textContent = steps.length;

    let icon = '📝';
    if (step.type === 'initial') icon = '🎬';
    if (step.type === 'mark') icon = '👉';
    if (step.type === 'combine') icon = '🔗';
    if (step.type === 'insert') icon = '⬇️';
    if (step.type === 'final') icon = '✅';

    document.getElementById('stepDescription').textContent = `${icon} ${step.description}`;

    const descBox = document.querySelector('.step-description');
    descBox.className = 'step-description';
    if (step.type === 'mark') descBox.classList.add('step-mark');
    if (step.type === 'combine') descBox.classList.add('step-combine');
    if (step.type === 'insert') descBox.classList.add('step-insert');
    if (step.type === 'final') descBox.classList.add('step-final');

    if (step.type === 'final' && step.tree) {
        const codes = huffman.getCodes();
        const stats = huffman.calculateStatistics();
        visualizer.drawTree(step.tree, step.highlight, codes, stats);
    } else if (step.showAsTrees && step.allTrees) {
        visualizer.drawMultipleTrees(step.allTrees, step.highlight);
    } else if (step.tree) {
        visualizer.drawTree(step.tree, step.highlight);
    } else if (step.nodes && step.nodes.length > 0) {
        visualizer.drawMultipleTrees(step.nodes, step.highlight);
    }

    document.querySelector('.step-description').classList.remove('fade-in');
    setTimeout(() => {
        document.querySelector('.step-description').classList.add('fade-in');
    }, 10);
}

function updateNavigationButtons() {
    document.getElementById('firstBtn').disabled = currentStepIndex === 0;
    document.getElementById('prevBtn').disabled = currentStepIndex === 0;
    document.getElementById('nextBtn').disabled = currentStepIndex === steps.length - 1;
    document.getElementById('lastBtn').disabled = currentStepIndex === steps.length - 1;
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
