/**
 * Visualización del Árbol de Huffman usando Canvas
 * 
 * @author Valentin Barral
 * @license CC BY 4.0
 * 
 * CONFIGURACIÓN:
 * Todos los valores de tamaños y separaciones están centralizados en this.config
 * Los colores se leen desde las variables CSS definidas en styles.css
 * 
 * Para ajustar tamaños y separaciones, modifica los valores en this.config (líneas 31-67):
 * 
 * - nodeRadius: Tamaño de los círculos de los nodos del PRIMER nivel (por defecto: 50)
 * - levelHeight: Separación vertical base entre niveles (por defecto: 140)
 * - horizontalDivider: Mayor valor = nodos más juntos horizontalmente (por defecto: 2.2)
 * - unitWidth: Ancho base entre nodos (por defecto: 140)
 * - maxTreeWidth: Ancho máximo por árbol individual (por defecto: 280)
 * - recursiveWidthFactor: Factor de ancho para subárboles (por defecto: 0.65)
 * - levelSizeReduction: Factor de reducción de tamaño por nivel (por defecto: 0.75 = 25% más pequeño)
 * - maxReductionLevel: Nivel máximo donde se aplica reducción (después mantiene el tamaño constante)
 * 
 * NOTA: Los nodos se reducen de tamaño del nivel 0 al nivel 1, pero después mantienen
 *       tamaño constante para mejor legibilidad. Las frecuencias solo se muestran en el nivel 0.
 * 
 * Para cambiar colores, modifica las variables CSS en styles.css:
 * - --node-leaf-color: Color de nodos hoja
 * - --node-internal-color: Color de nodos internos
 * - --edge-left-color: Color de aristas izquierdas (0)
 * - --edge-right-color: Color de aristas derechas (1)
 * - etc.
 */

class TreeVisualizer {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.highlightNodes = new Set();
        
        // Guardar dimensiones lógicas antes de escalar
        this.logicalWidth = this.canvas.width;
        this.logicalHeight = this.canvas.height;
        
        // Configurar canvas para alta resolución (evitar borrosidad)
        this.setupHighDPICanvas();
        
        // ===== CONFIGURACIÓN DE TAMAÑOS Y SEPARACIONES =====
        // Todos los valores ajustables en un solo lugar
        this.config = {
            // Tamaños de nodos
            nodeRadius: 40,
            
            // Separación vertical entre niveles
            levelHeight: 140,
            levelHeightMultiplier: 1.4, // Factor para calcular posiciones
            minLevelSpacing: 140,
            maxLevelSpacing: 180,
            
            // Separación horizontal
            unitWidth: 140, // Ancho base entre nodos
            horizontalDivider: 2, // Divisor para separación entre hermanos (mayor = más juntos)
            recursiveWidthFactor: 0.72, // Factor de ancho para subárboles recursivos
            
            // Configuración de árboles múltiples
            maxTreeWidth: 280, // Ancho máximo por árbol individual
            treeWidthFactor: 0.5, // Porcentaje del espacio usado por cada árbol
            
            // Tamaños de texto (como porcentaje del nodeRadius)
            leafSymbolSize: 0.7,      // Aumentado para mejor legibilidad
            internalSymbolSize: 0.5,  // Aumentado para mejor legibilidad
            frequencySize: 0.5,       // Aumentado significativamente para números más legibles
            edgeLabelSize: 0.5,       // Aumentado para mejor legibilidad
            smallEdgeLabelSize: 0.45, // Aumentado para mejor legibilidad
            
            // Resaltado
            highlightRadiusExtra: 0.25, // Extra del radio para el círculo de resaltado
            highlightLineWidth: 0.1, // Grosor de línea como porcentaje del radio
            highlightDashLength: 0.25, // Longitud del patrón de línea punteada
            highlightDashGap: 0.125,
            
            // Reducción de tamaño por nivel
            levelSizeReduction: 0.75,  // Factor de reducción de tamaño por nivel (0.75 = 25% más pequeño)
            maxReductionLevel: 2  // Nivel máximo donde se aplica reducción; después mantiene el tamaño del nivel 1
        };
        
        // Leer colores del CSS
        this.loadColorsFromCSS();
    }
    
    // Calcular el radio de un nodo según su nivel (con límite de reducción)
    getNodeRadius(level) {
        // Limitar la reducción: después del maxReductionLevel, usar el tamaño de ese nivel
        const effectiveLevel = Math.min(level, this.config.maxReductionLevel);
        return this.config.nodeRadius * Math.pow(this.config.levelSizeReduction, effectiveLevel);
    }
    
    setupHighDPICanvas() {
        // Obtener el ratio de píxeles del dispositivo
        const dpr = window.devicePixelRatio || 1;
        
        // Obtener el tamaño actual del canvas
        const rect = this.canvas.getBoundingClientRect();
        
        // Guardar el tamaño lógico
        const width = this.canvas.width;
        const height = this.canvas.height;
        
        // Escalar el canvas para alta resolución
        this.canvas.width = width * dpr;
        this.canvas.height = height * dpr;
        
        // Establecer el tamaño de visualización
        this.canvas.style.width = width + 'px';
        this.canvas.style.height = height + 'px';
        
        // Escalar el contexto
        this.ctx.scale(dpr, dpr);
        
        // Habilitar suavizado para mejor renderizado
        this.ctx.imageSmoothingEnabled = true;
        this.ctx.imageSmoothingQuality = 'high';
        
        // Configuración para mejor renderizado de texto
        this.ctx.textRendering = 'optimizeLegibility';
        this.ctx.fontKerning = 'normal';
    }
    
    loadColorsFromCSS() {
        const styles = getComputedStyle(document.documentElement);
        this.colors = {
            leafNode: styles.getPropertyValue('--node-leaf-color').trim() || '#8b5cf6',
            internalNode: styles.getPropertyValue('--node-internal-color').trim() || '#334155',
            highlightNode: styles.getPropertyValue('--node-highlight-color').trim() || '#8b5cf6',
            highlightBorder: styles.getPropertyValue('--node-highlight-border').trim() || '#fbbf24',
            highlightShadow: styles.getPropertyValue('--node-highlight-shadow').trim() || '#fbbf24',
            nodeBorder: styles.getPropertyValue('--node-border-color').trim() || '#64748b',
            textPrimary: styles.getPropertyValue('--text-color').trim() || '#f1f5f9',
            textSecondary: styles.getPropertyValue('--text-secondary').trim() || '#94a3b8',
            edgeLeft: styles.getPropertyValue('--edge-left-color').trim() || '#6366f1',
            edgeRight: styles.getPropertyValue('--edge-right-color').trim() || '#ec4899',
            edgeLabel: styles.getPropertyValue('--edge-label-color').trim() || '#10b981',
            edgeLabelBg: styles.getPropertyValue('--card-bg').trim() || '#1e293b',
            background: styles.getPropertyValue('--bg-color').trim() || '#0f172a',
            arrowColor: styles.getPropertyValue('--primary-color').trim() || '#6366f1',
            canvasLabelBg: styles.getPropertyValue('--canvas-label-bg').trim() || 'rgba(255,255,255,0.95)',
            canvasTableBg: styles.getPropertyValue('--canvas-table-bg').trim() || 'rgba(255,255,255,0.98)',
            canvasBg: styles.getPropertyValue('--canvas-bg').trim() || '#f8fafc',
            fontBody: styles.getPropertyValue('--font-body').trim() || 'system-ui, sans-serif',
            fontMono: styles.getPropertyValue('--font-mono').trim() || 'Courier New, monospace'
        };
    }

    clear() {
        // Limpiar usando el tamaño lógico
        this.ctx.clearRect(0, 0, this.logicalWidth, this.logicalHeight);
    }

    drawTree(root, highlightIds = [], codes = null, stats = null) {
        this.clear();
        this.highlightNodes = new Set(highlightIds);

        if (!root) {
            this.drawEmptyState();
            return;
        }

        // Calcular posiciones de los nodos
        const positions = this.calculatePositions(root);

        // Dibujar conexiones primero
        this.drawConnections(root, positions);

        // Dibujar nodos encima
        this.drawNodes(root, positions);
        
        // Si se proporcionan códigos, dibujar la tabla en la esquina superior derecha
        if (codes && Object.keys(codes).length > 0) {
            this.drawCodesTable(codes, stats);
        }
    }

    drawEmptyState() {
        this.ctx.fillStyle = this.colors.textSecondary;
        this.ctx.font = `18px ${this.colors.fontBody}`;
        this.ctx.textAlign = 'center';
        this.ctx.fillText(
            'El árbol se mostrará aquí',
            this.logicalWidth / 2,
            this.logicalHeight / 2
        );
    }

    calculatePositions(root) {
        const positions = new Map();
        const width = this.logicalWidth;
        const startY = 60;

        const calculateWidths = (node) => {
            if (!node) return 0;
            if (node.isLeaf()) return 1;
            const leftWidth = calculateWidths(node.left);
            const rightWidth = calculateWidths(node.right);
            return leftWidth + rightWidth;
        };

        const totalWidth = calculateWidths(root);
        const unitWidth = Math.min(this.config.unitWidth, (width - 100) / totalWidth);

        const assignPositions = (node, x, y, width, level = 0) => {
            if (!node) return;

            positions.set(node.id, { x, y, level });  // Guardar también el nivel

            if (!node.isLeaf()) {
                const leftWidth = calculateWidths(node.left);
                const rightWidth = calculateWidths(node.right);

                const leftX = x - (width / this.config.horizontalDivider) + (leftWidth * unitWidth / 2);
                const rightX = x + (width / this.config.horizontalDivider) - (rightWidth * unitWidth / 2);

                assignPositions(node.left, leftX, y + this.config.levelHeight * this.config.levelHeightMultiplier, leftWidth * unitWidth, level + 1);
                assignPositions(node.right, rightX, y + this.config.levelHeight * this.config.levelHeightMultiplier, rightWidth * unitWidth, level + 1);
            }
        };

        assignPositions(root, width / 2, startY, totalWidth * unitWidth, 0);
        return positions;
    }

    drawConnections(node, positions) {
        if (!node || node.isLeaf()) return;

        const pos = positions.get(node.id);
        const leftPos = positions.get(node.left.id);
        const rightPos = positions.get(node.right.id);
        
        // Calcular radios según el nivel
        const nodeRadius = this.getNodeRadius(pos.level || 0);
        const leftRadius = this.getNodeRadius(leftPos.level || 0);
        const rightRadius = this.getNodeRadius(rightPos.level || 0);

        // Línea izquierda
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y + nodeRadius);
        this.ctx.lineTo(leftPos.x, leftPos.y - leftRadius);
        this.ctx.strokeStyle = this.colors.edgeLeft;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Etiqueta "0"
        const midLeftX = (pos.x + leftPos.x) / 2 - 10;
        const midLeftY = (pos.y + leftPos.y) / 2;
        this.drawEdgeLabel('0', midLeftX, midLeftY);

        // Línea derecha
        this.ctx.beginPath();
        this.ctx.moveTo(pos.x, pos.y + nodeRadius);
        this.ctx.lineTo(rightPos.x, rightPos.y - rightRadius);
        this.ctx.strokeStyle = this.colors.edgeRight;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Etiqueta "1"
        const midRightX = (pos.x + rightPos.x) / 2 + 10;
        const midRightY = (pos.y + rightPos.y) / 2;
        this.drawEdgeLabel('1', midRightX, midRightY);

        // Recursivamente dibujar conexiones de hijos
        this.drawConnections(node.left, positions);
        this.drawConnections(node.right, positions);
    }

    drawEdgeLabel(text, x, y) {
        const labelSize = Math.max(20, Math.floor(this.config.nodeRadius * this.config.edgeLabelSize));
        const boxSize = labelSize + 12;
        
        this.ctx.font = `bold ${labelSize}px ${this.colors.fontMono}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        this.ctx.fillStyle = this.colors.canvasLabelBg;
        this.ctx.fillRect(x - boxSize/2, y - boxSize/2, boxSize, boxSize);
        
        this.ctx.strokeStyle = this.colors.edgeLabel;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x - boxSize/2, y - boxSize/2, boxSize, boxSize);
        
        this.ctx.fillStyle = this.colors.edgeLabel;
        this.ctx.fillText(text, x, y);
    }

    drawNodes(node, positions) {
        if (!node) return;

        const pos = positions.get(node.id);
        const isHighlight = this.highlightNodes.has(node.id);
        const level = pos.level || 0;
        
        // Calcular radio según el nivel
        const nodeRadius = this.getNodeRadius(level);

        // Dibujar círculo del nodo
        this.ctx.beginPath();
        this.ctx.arc(pos.x, pos.y, nodeRadius, 0, 2 * Math.PI);

        if (isHighlight) {
            this.ctx.fillStyle = this.colors.highlightNode;
            this.ctx.shadowColor = this.colors.highlightShadow;
            this.ctx.shadowBlur = 20;
        } else if (node.isLeaf()) {
            this.ctx.fillStyle = this.colors.leafNode;
        } else {
            this.ctx.fillStyle = this.colors.internalNode;
        }

        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        this.ctx.strokeStyle = isHighlight ? this.colors.highlightBorder : this.colors.nodeBorder;
        this.ctx.lineWidth = isHighlight ? 3 : 2;
        this.ctx.stroke();

        // Dibujar contenido del nodo según su tipo y nivel
        this.ctx.fillStyle = '#ffffff';  // Texto blanco para nodos oscuros
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        if (node.isLeaf()) {
            // Nodo hoja: mostrar símbolo siempre
            const fontSize = Math.floor(nodeRadius * this.config.leafSymbolSize);
            this.ctx.font = `bold ${fontSize}px ${this.colors.fontBody}`;
            const symbolY = level === 0 ? pos.y - Math.floor(nodeRadius * 0.1) : pos.y;
            this.ctx.fillText(node.symbol, pos.x, symbolY);
            
            // Mostrar frecuencia solo en nivel 0
            if (level === 0) {
                const freqFontSize = Math.floor(nodeRadius * this.config.frequencySize);
                this.ctx.font = `bold ${freqFontSize}px ${this.colors.fontBody}`;
                this.ctx.fillText(node.frequency.toFixed(3), pos.x, pos.y + Math.floor(nodeRadius * this.config.frequencySize));
            }
        } else {
            // Nodo interno (fusionado): solo mostrar frecuencia en nivel 0, nada en otros niveles
            if (level === 0) {
                const freqFontSize = Math.floor(nodeRadius * this.config.frequencySize);
                this.ctx.font = `bold ${freqFontSize}px ${this.colors.fontBody}`;
                this.ctx.fillText(node.frequency.toFixed(3), pos.x, pos.y);
            }
            // En nivel > 0 no se muestra nada
        }

        // Recursivamente dibujar nodos hijos
        if (!node.isLeaf()) {
            this.drawNodes(node.left, positions);
            this.drawNodes(node.right, positions);
        }
    }

    drawMultipleTrees(trees, highlightIds = []) {
        this.clear();
        this.highlightNodes = new Set(highlightIds);

        const width = this.logicalWidth;
        const height = this.logicalHeight;

        if (!trees || trees.length === 0) {
            this.drawEmptyState();
            return;
        }

        // Calcular el espacio disponible para cada árbol
        const numTrees = trees.length;
        const treeWidth = Math.min(this.config.maxTreeWidth, (width - 80) / numTrees);
        const startX = (width - (numTrees * treeWidth)) / 2 + treeWidth / 2;

        // Dibujar cada árbol
        trees.forEach((tree, index) => {
            const centerX = startX + index * treeWidth;
            const startY = 80;
            
            // Calcular altura del árbol
            const treeHeight = this.getTreeHeight(tree);
            const levelSpacing = Math.max(
                this.config.minLevelSpacing, 
                Math.min(this.config.maxLevelSpacing, (height - 160) / Math.max(1, treeHeight - 1))
            );
            
            // Dibujar el árbol individual (empezando en nivel 0)
            this.drawSubTree(tree, centerX, startY, treeWidth * this.config.treeWidthFactor, levelSpacing, 0);
        });

        // Dibujar indicador de orden (frecuencias crecientes)
        this.ctx.fillStyle = this.colors.textSecondary;
        this.ctx.font = `italic 14px ${this.colors.fontBody}`;
        this.ctx.textAlign = 'left';
        this.ctx.fillText('← Menor frecuencia', 20, height - 20);
        this.ctx.textAlign = 'right';
        this.ctx.fillText('Mayor frecuencia →', width - 20, height - 20);
        
        // Dibujar flecha indicadora
        this.ctx.strokeStyle = this.colors.arrowColor;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.moveTo(40, height - 50);
        this.ctx.lineTo(width - 40, height - 50);
        this.ctx.stroke();
        
        // Punta de flecha derecha
        this.ctx.beginPath();
        this.ctx.moveTo(width - 40, height - 50);
        this.ctx.lineTo(width - 50, height - 55);
        this.ctx.lineTo(width - 50, height - 45);
        this.ctx.closePath();
        this.ctx.fillStyle = this.colors.arrowColor;
        this.ctx.fill();
    }

    getTreeHeight(node) {
        if (!node) return 0;
        if (node.isLeaf()) return 1;
        return 1 + Math.max(this.getTreeHeight(node.left), this.getTreeHeight(node.right));
    }

    drawSubTree(node, x, y, width, levelSpacing, level = 0) {
        if (!node) return;

        const isHighlight = this.highlightNodes.has(node.id);
        
        // Calcular radio según el nivel
        const nodeRadius = this.getNodeRadius(level);

        // Dibujar conexiones a hijos primero
        if (!node.isLeaf()) {
            const leftX = x - width * this.config.recursiveWidthFactor;
            const rightX = x + width * this.config.recursiveWidthFactor;
            const childY = y + levelSpacing;
            
            // Calcular radio del hijo para las conexiones
            const childRadius = this.getNodeRadius(level + 1);

            // Línea izquierda
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + nodeRadius);
            this.ctx.lineTo(leftX, childY - childRadius);
            this.ctx.strokeStyle = this.colors.edgeLeft;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Etiqueta "0"
            const midLeftX = (x + leftX) / 2 - 8;
            const midLeftY = (y + childY) / 2;
            this.drawSmallEdgeLabel('0', midLeftX, midLeftY);

            // Línea derecha
            this.ctx.beginPath();
            this.ctx.moveTo(x, y + nodeRadius);
            this.ctx.lineTo(rightX, childY - childRadius);
            this.ctx.strokeStyle = this.colors.edgeRight;
            this.ctx.lineWidth = 2;
            this.ctx.stroke();

            // Etiqueta "1"
            const midRightX = (x + rightX) / 2 + 8;
            const midRightY = (y + childY) / 2;
            this.drawSmallEdgeLabel('1', midRightX, midRightY);

            // Recursivamente dibujar hijos con nivel incrementado
            this.drawSubTree(node.left, leftX, childY, width * this.config.recursiveWidthFactor, levelSpacing, level + 1);
            this.drawSubTree(node.right, rightX, childY, width * this.config.recursiveWidthFactor, levelSpacing, level + 1);
        }

        // Dibujar indicador de selección si está resaltado
        if (isHighlight) {
            this.ctx.beginPath();
            const highlightRadius = nodeRadius + Math.floor(nodeRadius * this.config.highlightRadiusExtra);
            this.ctx.arc(x, y, highlightRadius, 0, 2 * Math.PI);
            this.ctx.strokeStyle = this.colors.highlightBorder;
            this.ctx.lineWidth = Math.max(4, Math.floor(nodeRadius * this.config.highlightLineWidth));
            this.ctx.setLineDash([
                Math.floor(nodeRadius * this.config.highlightDashLength), 
                Math.floor(nodeRadius * this.config.highlightDashGap)
            ]);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }

        // Dibujar el nodo
        this.ctx.beginPath();
        this.ctx.arc(x, y, nodeRadius, 0, 2 * Math.PI);

        if (isHighlight) {
            this.ctx.fillStyle = this.colors.highlightNode;
            this.ctx.shadowColor = this.colors.highlightShadow;
            this.ctx.shadowBlur = 20;
        } else if (node.isLeaf()) {
            this.ctx.fillStyle = this.colors.leafNode;
        } else {
            this.ctx.fillStyle = this.colors.internalNode;
        }

        this.ctx.fill();
        this.ctx.shadowBlur = 0;

        this.ctx.strokeStyle = isHighlight ? this.colors.highlightBorder : this.colors.nodeBorder;
        this.ctx.lineWidth = isHighlight ? 3 : 2;
        this.ctx.stroke();

        // Dibujar contenido del nodo según su tipo y nivel
        this.ctx.fillStyle = '#ffffff';  // Texto blanco para nodos oscuros
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        if (node.isLeaf()) {
            // Nodo hoja: mostrar símbolo siempre
            const fontSize = Math.floor(nodeRadius * this.config.leafSymbolSize);
            this.ctx.font = `bold ${fontSize}px ${this.colors.fontBody}`;
            const symbolY = level === 0 ? y - Math.floor(nodeRadius * 0.1) : y;
            this.ctx.fillText(node.symbol, x, symbolY);
            
            // Mostrar frecuencia solo en nivel 0
            if (level === 0) {
                const freqFontSize = Math.floor(nodeRadius * this.config.frequencySize);
                this.ctx.font = `bold ${freqFontSize}px ${this.colors.fontBody}`;
                this.ctx.fillText(node.frequency.toFixed(3), x, y + Math.floor(nodeRadius * this.config.frequencySize));
            }
        } else {
            // Nodo interno (fusionado): solo mostrar frecuencia en nivel 0, nada en otros niveles
            if (level === 0) {
                const freqFontSize = Math.floor(nodeRadius * this.config.frequencySize);
                this.ctx.font = `bold ${freqFontSize}px ${this.colors.fontBody}`;
                this.ctx.fillText(node.frequency.toFixed(3), x, y);
            }
            // En nivel > 0 no se muestra nada
        }
    }

    drawSmallEdgeLabel(text, x, y) {
        const labelSize = Math.max(18, Math.floor(this.config.nodeRadius * this.config.smallEdgeLabelSize));
        const boxSize = labelSize + 10;
        
        this.ctx.font = `bold ${labelSize}px ${this.colors.fontMono}`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        
        this.ctx.fillStyle = this.colors.canvasLabelBg;
        this.ctx.fillRect(x - boxSize/2, y - boxSize/2, boxSize, boxSize);
        
        this.ctx.strokeStyle = this.colors.edgeLabel;
        this.ctx.lineWidth = 2;
        this.ctx.strokeRect(x - boxSize/2, y - boxSize/2, boxSize, boxSize);
        
        this.ctx.fillStyle = this.colors.edgeLabel;
        this.ctx.fillText(text, x, y);
    }

    drawPartialConstruction(nodes, highlightIds = []) {
        // Esta función ahora redirige a drawMultipleTrees
        this.drawMultipleTrees(nodes, highlightIds);
    }
    
    drawCodesTable(codes, stats) {
        const padding = 20;
        const rowHeight = 28;
        const headerHeight = 35;
        const statsHeight = stats ? 130 : 0;  // Aumentado para incluir todas las estadísticas
        
        // Ordenar códigos por longitud
        const sortedCodes = Object.entries(codes).sort((a, b) => a[1].length - b[1].length);
        
        const tableWidth = 320;  // Aumentado para evitar desbordamiento
        const tableHeight = headerHeight + (sortedCodes.length * rowHeight) + statsHeight + 25;
        
        const x = this.logicalWidth - tableWidth - padding;
        const y = padding;
        
        this.ctx.fillStyle = this.colors.canvasTableBg;
        this.ctx.strokeStyle = this.colors.nodeBorder;
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        this.ctx.roundRect(x, y, tableWidth, tableHeight, 10);
        this.ctx.fill();
        this.ctx.stroke();
        
        // Título
        this.ctx.fillStyle = this.colors.textPrimary;
        this.ctx.font = `bold 18px ${this.colors.fontBody}`;
        this.ctx.textAlign = 'left';
        this.ctx.fillText('📊 ' + t('codesTableTitle'), x + 15, y + 25);
        
        // Encabezados de la tabla
        let currentY = y + headerHeight + 15;
        this.ctx.fillStyle = this.colors.textSecondary;
        this.ctx.font = `bold 14px ${this.colors.fontBody}`;
        this.ctx.fillText(t('codeSymbolHeader'), x + 20, currentY);
        this.ctx.fillText(t('codeCodeHeader'), x + 95, currentY);
        this.ctx.fillText(t('codeLengthHeader'), x + 260, currentY);
        
        // Línea separadora
        currentY += 8;
        this.ctx.strokeStyle = this.colors.nodeBorder;
        this.ctx.lineWidth = 1;
        this.ctx.beginPath();
        this.ctx.moveTo(x + 15, currentY);
        this.ctx.lineTo(x + tableWidth - 15, currentY);
        this.ctx.stroke();
        
        // Filas de códigos
        currentY += 10;
        this.ctx.font = `14px ${this.colors.fontMono}`;
        sortedCodes.forEach(([symbol, code]) => {
            currentY += rowHeight;
            
            // Símbolo
            this.ctx.fillStyle = this.colors.textPrimary;
            this.ctx.font = `bold 16px ${this.colors.fontBody}`;
            this.ctx.textAlign = 'left';
            this.ctx.fillText(symbol, x + 30, currentY);
            
            // Código - recortar si es muy largo
            this.ctx.fillStyle = this.colors.edgeLabel;
            this.ctx.font = `bold 13px ${this.colors.fontMono}`;
            this.ctx.textAlign = 'left';
            const maxCodeWidth = 150;  // Ancho máximo para el código
            let displayCode = code;
            let codeWidth = this.ctx.measureText(code).width;
            if (codeWidth > maxCodeWidth) {
                // Recortar el código si es muy largo
                while (codeWidth > maxCodeWidth - 15 && displayCode.length > 3) {
                    displayCode = displayCode.substring(0, displayCode.length - 1);
                    codeWidth = this.ctx.measureText(displayCode + '...').width;
                }
                displayCode += '...';
            }
            this.ctx.fillText(displayCode, x + 95, currentY);
            
            // Longitud
            this.ctx.fillStyle = this.colors.textSecondary;
            this.ctx.font = `14px ${this.colors.fontBody}`;
            this.ctx.textAlign = 'left';
            this.ctx.fillText(code.length.toString(), x + 270, currentY);
        });
        
        // Estadísticas si están disponibles
        if (stats) {
            currentY += 20;
            
            // Línea separadora
            this.ctx.strokeStyle = this.colors.nodeBorder;
            this.ctx.lineWidth = 1;
            this.ctx.beginPath();
            this.ctx.moveTo(x + 15, currentY);
            this.ctx.lineTo(x + tableWidth - 15, currentY);
            this.ctx.stroke();
            
            currentY += 20;
            this.ctx.font = `13px ${this.colors.fontBody}`;
            this.ctx.textAlign = 'left';
            
            // Long. promedio
            this.ctx.fillStyle = this.colors.textSecondary;
            this.ctx.fillText(t('avgLengthLabel'), x + 20, currentY);
            this.ctx.fillStyle = this.colors.textPrimary;
            this.ctx.font = `bold 13px ${this.colors.fontBody}`;
            this.ctx.fillText(`${stats.avgLength} ${t('bitsUnit')}`, x + 165, currentY);
            
            currentY += 22;
            this.ctx.font = `13px ${this.colors.fontBody}`;
            
            // Entropía
            this.ctx.fillStyle = this.colors.textSecondary;
            this.ctx.fillText(t('entropyLabel'), x + 20, currentY);
            this.ctx.fillStyle = this.colors.textPrimary;
            this.ctx.font = `bold 13px ${this.colors.fontBody}`;
            this.ctx.fillText(`${stats.entropy} ${t('bitsUnit')}`, x + 165, currentY);
            
            currentY += 22;
            this.ctx.font = `13px ${this.colors.fontBody}`;
            
            // Eficiencia
            this.ctx.fillStyle = this.colors.textSecondary;
            this.ctx.fillText(t('efficiencyLabel'), x + 20, currentY);
            this.ctx.fillStyle = this.colors.textPrimary;
            this.ctx.font = `bold 13px ${this.colors.fontBody}`;
            this.ctx.fillText(`${stats.efficiency}%`, x + 165, currentY);
            
            currentY += 22;
            this.ctx.font = `13px ${this.colors.fontBody}`;
            
            // Compresión
            this.ctx.fillStyle = this.colors.textSecondary;
            this.ctx.fillText(t('compressionLabel'), x + 20, currentY);
            this.ctx.fillStyle = this.colors.textPrimary;
            this.ctx.font = `bold 13px ${this.colors.fontBody}`;
            this.ctx.fillText(`${stats.compression}%`, x + 165, currentY);
        }
    }
}

