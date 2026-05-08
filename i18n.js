/**
 * Internationalization (i18n) module
 * Translations for English, Spanish, and Galician
 * Uses data-i18n attributes for static text (per DESIGN.md)
 * Uses t() function for dynamic text (step descriptions, tables)
 * 
 * @author Valentin Barral
 * @license CC BY 4.0
 */

const translations = {
    en: {
        title: "Huffman demo",

        inputTitle: "Input Data",
        example1: "Example 1",
        example2: "Example 2",
        example3: "Example 3",
        customInputLabel: "Symbols and Frequencies (format: a:0.5,b:0.3,c:0.2)",
        customInputPlaceholder: "a:0.5,b:0.3,c:0.2",
        loadDataButton: "Load Data",

        frequencyTableTitle: "Frequency Table",
        frequencyTableNote: "📊 Ordered from lowest to highest frequency",
        symbolHeader: "Symbol (x)",
        frequencyHeader: "Frequency p(x)",

        firstButton: "⏮️ First",
        prevButton: "⏪ Previous",
        nextButton: "Next ⏩",
        lastButton: "⏭️ Last",

        stepDescriptionTitle: "Step Description",
        initialDescription: "🎬 Load an example or custom data to begin.",

        codesTableTitle: "Huffman Codes",
        codeSymbolHeader: "Symbol",
        codeCodeHeader: "Code",
        codeLengthHeader: "Length",
        avgLengthLabel: "Avg. Length:",
        entropyLabel: "Entropy:",
        efficiencyLabel: "Efficiency:",
        compressionLabel: "Compression:",

        invalidDataAlert: "Please enter valid data. Format: a:0.5,b:0.3,c:0.2",
        errorProcessingAlert: "Error processing data: ",

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

        bitsUnit: "bits",

        footerText: '© 2025 Valentin Barral | Licensed under <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>'
    },

    es: {
        title: "Huffman demo",

        inputTitle: "Datos de Entrada",
        example1: "Ejemplo 1",
        example2: "Ejemplo 2",
        example3: "Ejemplo 3",
        customInputLabel: "Símbolos y Frecuencias (formato: a:0.5,b:0.3,c:0.2)",
        customInputPlaceholder: "a:0.5,b:0.3,c:0.2",
        loadDataButton: "Cargar Datos",

        frequencyTableTitle: "Tabla de Frecuencias",
        frequencyTableNote: "📊 Ordenadas de menor a mayor frecuencia",
        symbolHeader: "Símbolo (x)",
        frequencyHeader: "Frecuencia p(x)",

        firstButton: "⏮️ Inicio",
        prevButton: "⏪ Anterior",
        nextButton: "Siguiente ⏩",
        lastButton: "⏭️ Final",

        stepDescriptionTitle: "Descripción del Paso",
        initialDescription: "🎬 Carga un ejemplo o datos personalizados para comenzar.",

        codesTableTitle: "Códigos Huffman",
        codeSymbolHeader: "Símbolo",
        codeCodeHeader: "Código",
        codeLengthHeader: "Long.",
        avgLengthLabel: "Long. Prom.:",
        entropyLabel: "Entropía:",
        efficiencyLabel: "Eficiencia:",
        compressionLabel: "Compresión:",

        invalidDataAlert: "Por favor, ingresa datos válidos. Formato: a:0.5,b:0.3,c:0.2",
        errorProcessingAlert: "Error al procesar los datos: ",

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

        bitsUnit: "bits",

        footerText: '© 2025 Valentin Barral | Licenciado bajo <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>'
    },

    gl: {
        title: "Huffman demo",

        inputTitle: "Datos de Entrada",
        example1: "Exemplo 1",
        example2: "Exemplo 2",
        example3: "Exemplo 3",
        customInputLabel: "Símbolos e Frecuencias (formato: a:0.5,b:0.3,c:0.2)",
        customInputPlaceholder: "a:0.5,b:0.3,c:0.2",
        loadDataButton: "Cargar Datos",

        frequencyTableTitle: "Táboa de Frecuencias",
        frequencyTableNote: "📊 Ordenadas de menor a maior frecuencia",
        symbolHeader: "Símbolo (x)",
        frequencyHeader: "Frecuencia p(x)",

        firstButton: "⏮️ Inicio",
        prevButton: "⏪ Anterior",
        nextButton: "Seguinte ⏩",
        lastButton: "⏭️ Final",

        stepDescriptionTitle: "Descrición do Paso",
        initialDescription: "🎬 Carga un exemplo ou datos personalizados para comezar.",

        codesTableTitle: "Códigos Huffman",
        codeSymbolHeader: "Símbolo",
        codeCodeHeader: "Código",
        codeLengthHeader: "Long.",
        avgLengthLabel: "Long. Media:",
        entropyLabel: "Entropía:",
        efficiencyLabel: "Eficiencia:",
        compressionLabel: "Compresión:",

        invalidDataAlert: "Por favor, introduce datos válidos. Formato: a:0.5,b:0.3,c:0.2",
        errorProcessingAlert: "Erro ao procesar os datos: ",

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

        bitsUnit: "bits",

        footerText: '© 2025 Valentin Barral | Licenciado baixo <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener">CC BY 4.0</a>'
    }
};

let currentLanguage = 'es';

function t(key, ...args) {
    const value = translations[currentLanguage][key];
    if (typeof value === 'function') {
        return value(...args);
    }
    return value || key;
}

function changeLang(lang) {
    if (!translations[lang]) {
        lang = 'es';
    }
    currentLanguage = lang;
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;

    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = lang;
    }

    applyDataI18n();
    updateDynamicUI();
}

function applyDataI18n() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        const value = translations[currentLanguage][key];
        if (typeof value === 'string') {
            el.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        const value = translations[currentLanguage][key];
        if (typeof value === 'string') {
            el.innerHTML = value;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        const value = translations[currentLanguage][key];
        if (typeof value === 'string') {
            el.placeholder = value;
        }
    });
}

function updateDynamicUI() {
    if (huffman) {
        updateFrequencyTable(huffman.data);
    }
    if (steps && steps.length > 0) {
        updateStepDisplay();
    } else {
        const descEl = document.getElementById('stepDescription');
        if (descEl) {
            descEl.textContent = t('initialDescription');
        }
    }
}

function initLanguage() {
    const savedLang = localStorage.getItem('lang');
    const browserLang = navigator.language.split('-')[0];
    const lang = savedLang || (translations[browserLang] ? browserLang : 'es');
    currentLanguage = lang;
    document.documentElement.lang = lang;

    const langSelect = document.getElementById('langSelect');
    if (langSelect) {
        langSelect.value = lang;
    }

    applyDataI18n();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguage);
} else {
    initLanguage();
}
