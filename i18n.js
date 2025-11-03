/**
 * Internationalization (i18n) module
 * Translations for English, Spanish (Español), and Galician (Galego)
 * 
 * @author Valentin Barral
 * @license CC BY 4.0
 */

const translations = {
    en: {
        // Header
        title: "Huffman Algorithm - Step-by-Step Visualization",
        subtitle: "Understand how the optimal coding tree is built",
        
        // Input Section
        inputTitle: "Input Data",
        example1: "Example 1",
        example2: "Example 2",
        example3: "Example 3",
        customInputLabel: "Symbols and Frequencies (format: a:0.5,b:0.3,c:0.2)",
        customInputPlaceholder: "a:0.5,b:0.3,c:0.2",
        loadDataButton: "Load Data",
        
        // Frequency Table
        frequencyTableTitle: "Frequency Table",
        frequencyTableNote: "📊 Ordered from lowest to highest frequency",
        symbolHeader: "Symbol (x)",
        frequencyHeader: "Frequency p(x)",
        
        // Navigation
        firstButton: "⏮️ First",
        prevButton: "⏪ Previous",
        nextButton: "Next ⏩",
        lastButton: "⏭️ Last",
        
        // Step Description
        stepDescriptionTitle: "Step Description",
        initialDescription: "🎬 Load an example or custom data to begin.",
        
        // Codes Table
        codesTableTitle: "Huffman Codes",
        codeSymbolHeader: "Symbol",
        codeCodeHeader: "Code",
        codeLengthHeader: "Length",
        avgLengthLabel: "Avg. Length:",
        entropyLabel: "Entropy:",
        efficiencyLabel: "Efficiency:",
        compressionLabel: "Compression:",
        
        // Alerts
        invalidDataAlert: "Please enter valid data. Format: a:0.5,b:0.3,c:0.2",
        errorProcessingAlert: "Error processing data: ",
        
        // Step descriptions templates
        stepInitial: "🎬 Initial step: All symbols ordered from lowest to highest frequency.",
        stepMark: (left, leftFreq, right, rightFreq, stepNum) => 
            `Step ${stepNum}.1: Mark the two nodes with lowest weight: "${left}" (${leftFreq}) and "${right}" (${rightFreq}).`,
        stepCombine: (leftFreq, rightFreq, combinedFreq, stepNum) =>
            `Step ${stepNum}.2: Merge the two marked nodes in place. New node with frequency: ${leftFreq} + ${rightFreq} = ${combinedFreq}.`,
        stepInsert: (combinedFreq, stepNum, isLast) =>
            isLast 
                ? `Step ${stepNum}.3: The new node is the only remaining one: the complete Huffman tree.`
                : `Step ${stepNum}.3: Move the new node to its correct position according to its frequency (${combinedFreq}). List reordered from lowest to highest.`,
        stepFinal: "✅ Final step: Complete Huffman tree with code assignment. Each path from root to leaf determines the binary code.",
        
        // Units
        bitsUnit: "bits"
    },
    
    es: {
        // Header
        title: "Algoritmo de Huffman - Visualización Paso a Paso",
        subtitle: "Comprende cómo se construye el árbol de codificación óptima",
        
        // Input Section
        inputTitle: "Datos de Entrada",
        example1: "Ejemplo 1",
        example2: "Ejemplo 2",
        example3: "Ejemplo 3",
        customInputLabel: "Símbolos y Frecuencias (formato: a:0.5,b:0.3,c:0.2)",
        customInputPlaceholder: "a:0.5,b:0.3,c:0.2",
        loadDataButton: "Cargar Datos",
        
        // Frequency Table
        frequencyTableTitle: "Tabla de Frecuencias",
        frequencyTableNote: "📊 Ordenadas de menor a mayor frecuencia",
        symbolHeader: "Símbolo (x)",
        frequencyHeader: "Frecuencia p(x)",
        
        // Navigation
        firstButton: "⏮️ Inicio",
        prevButton: "⏪ Anterior",
        nextButton: "Siguiente ⏩",
        lastButton: "⏭️ Final",
        
        // Step Description
        stepDescriptionTitle: "Descripción del Paso",
        initialDescription: "🎬 Carga un ejemplo o datos personalizados para comenzar.",
        
        // Codes Table
        codesTableTitle: "Códigos Huffman",
        codeSymbolHeader: "Símbolo",
        codeCodeHeader: "Código",
        codeLengthHeader: "Long.",
        avgLengthLabel: "Long. Prom.:",
        entropyLabel: "Entropía:",
        efficiencyLabel: "Eficiencia:",
        compressionLabel: "Compresión:",
        
        // Alerts
        invalidDataAlert: "Por favor, ingresa datos válidos. Formato: a:0.5,b:0.3,c:0.2",
        errorProcessingAlert: "Error al procesar los datos: ",
        
        // Step descriptions templates
        stepInitial: "🎬 Paso inicial: Todos los símbolos ordenados de menor a mayor frecuencia.",
        stepMark: (left, leftFreq, right, rightFreq, stepNum) => 
            `Paso ${stepNum}.1: Marcar los dos nodos de menor peso: "${left}" (${leftFreq}) y "${right}" (${rightFreq}).`,
        stepCombine: (leftFreq, rightFreq, combinedFreq, stepNum) =>
            `Paso ${stepNum}.2: Fusionar los dos nodos marcados en el mismo lugar. Nuevo nodo con frecuencia: ${leftFreq} + ${rightFreq} = ${combinedFreq}.`,
        stepInsert: (combinedFreq, stepNum, isLast) =>
            isLast 
                ? `Paso ${stepNum}.3: El nuevo nodo es el único restante: el árbol de Huffman completo.`
                : `Paso ${stepNum}.3: Mover el nuevo nodo a su posición correcta según su frecuencia (${combinedFreq}). Lista reordenada de menor a mayor.`,
        stepFinal: "✅ Paso final: Árbol de Huffman completo con asignación de códigos. Cada camino de la raíz a una hoja determina el código binario.",
        
        // Units
        bitsUnit: "bits"
    },
    
    gl: {
        // Header
        title: "Algoritmo de Huffman - Visualización Paso a Paso",
        subtitle: "Comprende como se constrúe a árbore de codificación óptima",
        
        // Input Section
        inputTitle: "Datos de Entrada",
        example1: "Exemplo 1",
        example2: "Exemplo 2",
        example3: "Exemplo 3",
        customInputLabel: "Símbolos e Frecuencias (formato: a:0.5,b:0.3,c:0.2)",
        customInputPlaceholder: "a:0.5,b:0.3,c:0.2",
        loadDataButton: "Cargar Datos",
        
        // Frequency Table
        frequencyTableTitle: "Táboa de Frecuencias",
        frequencyTableNote: "📊 Ordenadas de menor a maior frecuencia",
        symbolHeader: "Símbolo (x)",
        frequencyHeader: "Frecuencia p(x)",
        
        // Navigation
        firstButton: "⏮️ Inicio",
        prevButton: "⏪ Anterior",
        nextButton: "Seguinte ⏩",
        lastButton: "⏭️ Final",
        
        // Step Description
        stepDescriptionTitle: "Descrición do Paso",
        initialDescription: "🎬 Carga un exemplo ou datos personalizados para comezar.",
        
        // Codes Table
        codesTableTitle: "Códigos Huffman",
        codeSymbolHeader: "Símbolo",
        codeCodeHeader: "Código",
        codeLengthHeader: "Long.",
        avgLengthLabel: "Long. Media:",
        entropyLabel: "Entropía:",
        efficiencyLabel: "Eficiencia:",
        compressionLabel: "Compresión:",
        
        // Alerts
        invalidDataAlert: "Por favor, introduce datos válidos. Formato: a:0.5,b:0.3,c:0.2",
        errorProcessingAlert: "Erro ao procesar os datos: ",
        
        // Step descriptions templates
        stepInitial: "🎬 Paso inicial: Todos os símbolos ordenados de menor a maior frecuencia.",
        stepMark: (left, leftFreq, right, rightFreq, stepNum) => 
            `Paso ${stepNum}.1: Marcar os dous nodos de menor peso: "${left}" (${leftFreq}) e "${right}" (${rightFreq}).`,
        stepCombine: (leftFreq, rightFreq, combinedFreq, stepNum) =>
            `Paso ${stepNum}.2: Fusionar os dous nodos marcados no mesmo lugar. Novo nodo con frecuencia: ${leftFreq} + ${rightFreq} = ${combinedFreq}.`,
        stepInsert: (combinedFreq, stepNum, isLast) =>
            isLast 
                ? `Paso ${stepNum}.3: O novo nodo é o único restante: a árbore de Huffman completa.`
                : `Paso ${stepNum}.3: Mover o novo nodo á súa posición correcta segundo a súa frecuencia (${combinedFreq}). Lista reordenada de menor a maior.`,
        stepFinal: "✅ Paso final: Árbore de Huffman completa con asignación de códigos. Cada camiño da raíz a unha folla determina o código binario.",
        
        // Units
        bitsUnit: "bits"
    }
};

// Current language (default: Spanish)
let currentLanguage = 'es';

// Get translation by key
function t(key, ...args) {
    const value = translations[currentLanguage][key];
    if (typeof value === 'function') {
        return value(...args);
    }
    return value || key;
}

// Set language
function setLanguage(lang) {
    if (!translations[lang]) {
        console.warn(`Language ${lang} not found, defaulting to 'es'`);
        lang = 'es';
    }
    currentLanguage = lang;
    localStorage.setItem('huffman-language', lang);
    updateUILanguage();
    
    // Update language selector active state
    document.querySelectorAll('.language-selector button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = lang;
}

// Update all UI text elements
function updateUILanguage() {
    // Header
    document.querySelector('header h1').textContent = `🌳 ${t('title')}`;
    document.querySelector('.subtitle').textContent = t('subtitle');
    
    // Input Section
    document.querySelector('.input-section h3').textContent = t('inputTitle');
    document.querySelector('.custom-input label').textContent = t('customInputLabel');
    document.getElementById('customInput').placeholder = t('customInputPlaceholder');
    document.querySelector('.custom-input .btn-primary').textContent = t('loadDataButton');
    
    // Example buttons
    const exampleButtons = document.querySelectorAll('.examples .btn-secondary');
    exampleButtons[0].textContent = t('example1');
    exampleButtons[1].textContent = t('example2');
    exampleButtons[2].textContent = t('example3');
    
    // Frequency Table
    document.querySelector('.frequency-table-container h3').textContent = t('frequencyTableTitle');
    document.querySelector('.order-note').textContent = t('frequencyTableNote');
    
    // Navigation buttons
    document.getElementById('firstBtn').innerHTML = t('firstButton');
    document.getElementById('prevBtn').innerHTML = t('prevButton');
    document.getElementById('nextBtn').innerHTML = t('nextButton');
    document.getElementById('lastBtn').innerHTML = t('lastButton');
    
    // Step Description
    document.querySelector('.step-description h3').textContent = t('stepDescriptionTitle');
    
    // Update frequency table if it exists
    if (huffman) {
        const data = huffman.data;
        updateFrequencyTable(data);
    }
    
    // Reload current step to update description
    if (steps && steps.length > 0) {
        updateStepDisplay();
    } else {
        document.getElementById('stepDescription').textContent = t('initialDescription');
    }
}

// Initialize language from localStorage or browser
function initLanguage() {
    const savedLang = localStorage.getItem('huffman-language');
    const browserLang = navigator.language.split('-')[0];
    
    // Priority: saved > browser > default (es)
    const lang = savedLang || (translations[browserLang] ? browserLang : 'es');
    setLanguage(lang);
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}

