/**
 * Implementación del Algoritmo de Huffman con seguimiento paso a paso
 * 
 * @author Valentin Barral
 * @license CC BY 4.0
 */

class HuffmanNode {
    constructor(symbol, frequency, left = null, right = null) {
        this.symbol = symbol;
        this.frequency = frequency;
        this.left = left;
        this.right = right;
        this.id = Math.random().toString(36).substr(2, 9);
    }

    isLeaf() {
        return this.left === null && this.right === null;
    }
}

class HuffmanAlgorithm {
    constructor(data) {
        this.data = data; // {symbol: frequency}
        this.steps = [];
        this.codes = {};
        this.root = null;
    }

    build() {
        this.steps = [];
        this.codes = {};

        // Paso 0: Datos iniciales
        const initialNodes = Object.entries(this.data).map(
            ([symbol, freq]) => new HuffmanNode(symbol, freq)
        );

        // Ordenar de menor a mayor
        initialNodes.sort((a, b) => a.frequency - b.frequency);

        this.steps.push({
            type: 'initial',
            description: t('stepInitial'),
            nodes: [...initialNodes],
            allTrees: initialNodes.map(node => node),
            highlight: [],
            showAsTrees: true
        });

        // Crear una cola de prioridad (min-heap)
        let queue = [...initialNodes].sort((a, b) => a.frequency - b.frequency);
        let stepNumber = 1;

        // Construir el árbol combinando nodos
        while (queue.length > 1) {
            // Guardar copia de la cola original
            const queueCopy = [...queue];
            
            // Paso 1: Marcar los dos nodos de menor peso
            const left = queue[0];
            const right = queue[1];
            
            this.steps.push({
                type: 'mark',
                description: t('stepMark', this.getShortSymbol(left), left.frequency.toFixed(3), this.getShortSymbol(right), right.frequency.toFixed(3), stepNumber),
                nodes: [...queueCopy],
                allTrees: [...queueCopy],
                highlight: [left.id, right.id],
                showAsTrees: true
            });

            // Paso 2: Fusionar los nodos in situ
            queue.shift();
            queue.shift();
            
            const combinedSymbol = `(${this.getShortSymbol(left)}+${this.getShortSymbol(right)})`;
            const combinedFreq = left.frequency + right.frequency;
            const parent = new HuffmanNode(combinedSymbol, combinedFreq, left, right);

            // Insertar temporalmente en la primera posición (donde estaban)
            const queueBeforeSort = [parent, ...queue];
            
            this.steps.push({
                type: 'combine',
                description: t('stepCombine', left.frequency.toFixed(3), right.frequency.toFixed(3), combinedFreq.toFixed(3), stepNumber),
                nodes: [...queueBeforeSort],
                allTrees: [...queueBeforeSort],
                highlight: [parent.id],
                combined: { left, right, parent },
                showAsTrees: true,
                showInPlace: true
            });

            // Paso 3: Reordenar según la nueva probabilidad
            queue.push(parent);
            queue.sort((a, b) => a.frequency - b.frequency);

            if (queue.length > 1) {
                this.steps.push({
                    type: 'insert',
                    description: t('stepInsert', combinedFreq.toFixed(3), stepNumber, false),
                    nodes: [...queue],
                    allTrees: [...queue],
                    highlight: [parent.id],
                    showAsTrees: true
                });
            } else {
                // Último nodo, no hace falta reordenar
                this.steps.push({
                    type: 'insert',
                    description: t('stepInsert', combinedFreq.toFixed(3), stepNumber, true),
                    nodes: [...queue],
                    allTrees: [...queue],
                    highlight: [parent.id],
                    showAsTrees: true
                });
            }

            stepNumber++;
        }

        // El último nodo es la raíz del árbol
        this.root = queue[0];

        // Paso final: Asignar códigos
        this.assignCodes(this.root, '');

        this.steps.push({
            type: 'final',
            description: t('stepFinal'),
            nodes: [],
            allTrees: [this.root],
            highlight: [],
            tree: this.root,
            codes: { ...this.codes },
            showAsTrees: false
        });

        return this.root;
    }

    getShortSymbol(node) {
        if (node.isLeaf()) {
            return node.symbol;
        }
        // Para nodos internos, extraer símbolos simples
        const match = node.symbol.match(/\((.+)\)/);
        if (match) {
            const symbols = match[1].split('+');
            if (symbols.length <= 3) {
                return symbols.join('+');
            }
            return symbols[0] + '+...+' + symbols[symbols.length - 1];
        }
        return node.symbol;
    }

    buildPartialTree(node) {
        // Retorna una copia del subárbol
        return node;
    }

    assignCodes(node, code) {
        if (!node) return;

        if (node.isLeaf()) {
            this.codes[node.symbol] = code || '0';
        } else {
            this.assignCodes(node.left, code + '0');
            this.assignCodes(node.right, code + '1');
        }
    }

    getCodes() {
        return this.codes;
    }

    getSteps() {
        return this.steps;
    }

    calculateStatistics() {
        const symbols = Object.keys(this.data);
        let avgLength = 0;
        let totalBits = 0;
        let originalBits = 0;

        // Calcular longitud promedio del código
        for (const symbol of symbols) {
            const freq = this.data[symbol];
            const codeLength = this.codes[symbol].length;
            avgLength += freq * codeLength;
            totalBits += freq * codeLength;
        }

        // Bits originales (asumiendo codificación fija)
        const bitsPerSymbol = Math.ceil(Math.log2(symbols.length));
        originalBits = bitsPerSymbol;

        // Entropía
        let entropy = 0;
        for (const symbol of symbols) {
            const prob = this.data[symbol];
            if (prob > 0) {
                entropy -= prob * Math.log2(prob);
            }
        }

        return {
            avgLength: avgLength.toFixed(3),
            entropy: entropy.toFixed(3),
            efficiency: ((entropy / avgLength) * 100).toFixed(2),
            compression: (((originalBits - avgLength) / originalBits) * 100).toFixed(2),
            originalBits: originalBits
        };
    }
}

// Función auxiliar para validar datos
function parseInputData(input) {
    const data = {};
    const pairs = input.split(',').map(s => s.trim());

    for (const pair of pairs) {
        const [symbol, freq] = pair.split(':').map(s => s.trim());
        if (symbol && freq) {
            const frequency = parseFloat(freq);
            if (!isNaN(frequency) && frequency > 0) {
                data[symbol] = frequency;
            }
        }
    }

    // Normalizar frecuencias para que sumen 1
    const total = Object.values(data).reduce((sum, f) => sum + f, 0);
    if (total > 0) {
        for (const symbol in data) {
            data[symbol] = data[symbol] / total;
        }
    }

    return data;
}

