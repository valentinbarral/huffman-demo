# 🌳 Huffman Algorithm Demonstration

An interactive web application to visualize the Huffman encoding algorithm step-by-step.

## 📋 Features

- **Step-by-Step Visualization**: Watch how the Huffman tree is built from initial nodes to the complete tree
- **Navigation Controls**: Move forward, backward, or jump to any step of the algorithm
- **Predefined Examples**: Load ready-to-use examples
- **Custom Input**: Define your own symbols and frequencies
- **Statistics**: Calculate efficiency, entropy, and compression rate
- **Modern Interface**: Responsive design with a light theme, high readability, and optimized rendering for high-resolution displays
- **Keyboard Shortcuts**: Use arrow keys to navigate
- **Multilingual Support**: Available in English, Spanish (Español), and Galician (Galego)

## 🚀 How to Use

### Opening the Application

Simply open the `index.html` file in your web browser. No server or installation required.

```bash
# Option 1: Open directly
open index.html

# Option 2: With a local server (optional)
python -m http.server 8000
# Then visit http://localhost:8000
```

### Loading Data

#### Predefined Examples
Click any of the example buttons:
- **Example 1**: Simple set of 4 symbols
- **Example 2**: Common English letters
- **Example 3**: 10 symbols

#### Custom Data
1. Enter data in the format: `symbol:frequency,symbol:frequency,...`
2. Example: `a:0.5,b:0.3,c:0.2`
3. Click "Load Data"

**Note**: Frequencies are automatically normalized to sum to 1.0

### Navigation

#### Buttons
- **⏮️ First**: Go to the first step
- **⏪ Previous**: Go back one step
- **⏩ Next**: Move forward one step
- **⏭️ Last**: Go to the last step (complete tree)

#### Keyboard Shortcuts
- `←` (Left Arrow): Previous step
- `→` (Right Arrow): Next step
- `Home`: First step
- `End`: Last step

### Language Selection

Use the language selector in the top-right corner of the header to switch between:
- **English**
- **Español** (Spanish)
- **Galego** (Galician)

Your language preference is saved automatically.

## 📊 What the Application Shows

### Left Panel: Control and Frequencies
- Buttons to load examples
- Custom input field
- Frequency table of symbols

### Central Panel: Tree Visualization
- **Initial View**: Individual nodes (leaves) with symbol and frequency, ordered from lowest to highest
- **Construction Process**: Shows multiple partial trees that form step by step
- **Leaf Nodes**: Display letter and number at the first level, only letter at lower levels
- **Merged Nodes**: Display only the probability number at the first level, empty at lower levels
- **Dynamic Ordering**: Trees are reordered from lowest to highest frequency after each combination
- **Final Tree**: Complete Huffman tree with binary codes (0=left, 1=right)
- **Codes Table**: When completing the tree, it appears automatically in the upper-right corner with:
  - Huffman codes assigned to each symbol
  - Length of each code
  - Statistics (average length, entropy, efficiency, and compression)
- **Navigation Controls**: To move between steps
- **Description**: Explains what happens at each step

## 🎨 Color Coding and Icons

### Node Colors
- 🟣 **Purple**: Leaf nodes (original symbols)
- ⚫ **Dark Gray**: Internal nodes (combinations)
- 🟣 **Pink**: Nodes highlighted in the current step
- 🟡 **Yellow**: Border of active nodes
- 🟢 **Green**: Edge labels (0 and 1)
- 🔵 **Blue**: Left edges (code 0)
- 🔴 **Pink**: Right edges (code 1)

### Step Icons
- 🎬 **Initial Step**: Initial state with all symbols ordered
- 👉 **Mark (N.1)**: The two nodes with lowest weight are marked
- 🔗 **Merge (N.2)**: The marked nodes merge in place, creating a new node
- ⬇️ **Reorder (N.3)**: The new node moves to its correct position according to its frequency
- ✅ **Final Step**: Completed Huffman tree with assigned codes

## 🧮 The Huffman Algorithm

### Algorithm Steps

1. **Initialization**: Create a leaf node for each symbol, ordered from lowest to highest frequency
2. **While there is more than one node**, repeat these 3 substeps:
   - **Step N.1 (Mark)**: Identify the two nodes with lowest frequency
   - **Step N.2 (Merge)**: Join the two nodes in place, creating a new node
     - The frequency of the new node = sum of the children's frequencies
     - Assign 0 to the left child and 1 to the right child
   - **Step N.3 (Reorder)**: Move the new node to its correct position in the list (sorted by frequency)
3. **Result**: The remaining node is the root of the complete tree
4. **Encoding**: The path from the root to each leaf determines its binary code

### Properties

- **Optimal**: Generates the shortest possible variable-length encoding
- **Prefix-Free**: No code is a prefix of another
- **Frequency-Based**: Frequent symbols get shorter codes

## 📊 Understanding Statistics

The final step displays four key statistics:

### Average Length
- **What**: Average number of bits needed to encode each symbol with the Huffman code
- **How**: Sum of (frequency × code_length) for each symbol
- **Example**: If 'a' appears 50% with code "0" and 'b' appears 50% with code "1", avg = 1.0 bits

### Entropy
- **What**: Theoretical minimum number of bits needed to encode the information (Shannon's limit)
- **How**: H = -Σ(p(x) × log₂(p(x))) where p(x) is the probability of each symbol
- **Meaning**: Represents the amount of "uncertainty" or "information" in the data

### Efficiency
- **What**: How close the Huffman code is to the theoretical optimum
- **How**: (Entropy / Average_Length) × 100%
- **Interpretation**:
  - **100%**: Perfect optimal code (reaches Shannon's limit)
  - **95-99%**: Very good, nearly optimal
  - **< 90%**: Room for improvement (rare with Huffman)

### Compression
- **What**: Space saved compared to fixed-length encoding
- **How**: ((Fixed_Bits - Average_Length) / Fixed_Bits) × 100%
  - Fixed_Bits = ⌈log₂(number_of_symbols)⌉
- **Interpretation**:
  - **30%**: Saves 30% space vs. fixed encoding
  - **0%**: No gain (uncommon)
  - **Negative**: Huffman uses more space (very rare, only with uniform distributions)

## 📁 Project Structure

```
huffman-demo/
├── index.html           # HTML structure
├── styles.css          # Styles and design
├── i18n.js             # Internationalization (translations)
├── huffman.js          # Algorithm implementation
├── visualization.js    # Tree visualization (Canvas)
├── app.js             # Main controller
└── README.md          # This documentation
```

## 🛠️ Technologies

- **HTML5**: Semantic structure
- **CSS3**: Modern design with gradients and animations
- **JavaScript (ES6+)**: Algorithm logic and visualization
- **Canvas API**: Tree rendering with high-resolution screen support (HiDPI/Retina)

## ⚙️ Customization

### Adjusting Sizes and Spacing

All configuration values are centralized in `visualization.js` in the `this.config` object (lines 31-62):

```javascript
this.config = {
    nodeRadius: 50,              // Size of FIRST level nodes
    levelHeight: 140,            // Vertical separation between levels
    horizontalDivider: 2.2,      // Higher value = closer together (2.0-3.0 recommended)
    unitWidth: 140,              // Base width between nodes
    maxTreeWidth: 280,           // Maximum width per tree
    recursiveWidthFactor: 0.65,  // Factor for subtrees (0.5-0.8)
    levelSizeReduction: 0.75,    // Size reduction per level (0.75 = 25% smaller)
    maxReductionLevel: 1,        // Level until reduction; after maintains constant size
    // ... more options
};
```

**Special features**:
- **Controlled size reduction**: Nodes reduce from level 0 to level 1, but after level 1 maintain the same size for better readability
- **Leaf nodes (not merged)**: Show symbol and frequency at level 0, only symbol at other levels
- **Internal nodes (merged)**: Show only frequency at level 0, nothing at other levels
- **Clear visualization**: This differentiation helps distinguish between original nodes and merges
- **Expandable canvas**: 2000px height with vertical scroll for large trees

**Example**: To bring nodes closer horizontally, increase `horizontalDivider` from 2.2 to 2.5.  
**Example**: To change size reduction, modify `levelSizeReduction` (0.8 = 20% smaller, 0.7 = 30% smaller).  
**Example**: To reduce size at more levels, increase `maxReductionLevel` (e.g., 2 to reduce up to level 2).

### Changing Colors

Colors are defined using CSS variables in `styles.css` (lines 20-34):

```css
:root {
    --node-leaf-color: #8b5cf6;      /* Leaf nodes */
    --node-internal-color: #334155;  /* Internal nodes */
    --edge-left-color: #6366f1;      /* Edges 0 */
    --edge-right-color: #ec4899;     /* Edges 1 */
    --edge-label-color: #10b981;     /* Labels 0/1 */
    /* ... more colors */
}
```

**Advantage**: Colors defined in CSS apply automatically without needing to reload JavaScript.

## 📚 Huffman Algorithm Applications

- File compression (ZIP, GZIP)
- Image formats (JPEG, PNG)
- Communication protocols
- Video streaming
- Data compression algorithms

## 🎓 Educational Use

This tool is ideal for:
- Data structures courses
- Information theory
- Greedy algorithms
- Data compression
- Self-learning

## 🤝 Contributing

Feel free to modify and improve the code according to your needs.

## 📝 License

This work is licensed under a [Creative Commons Attribution 4.0 International License (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/).

### You are free to:
- **Share** — copy and redistribute the material in any medium or format
- **Adapt** — remix, transform, and build upon the material for any purpose, even commercially

### Under the following terms:
- **Attribution** — You must give appropriate credit, provide a link to the license, and indicate if changes were made. You may do so in any reasonable manner, but not in any way that suggests the licensor endorses you or your use.

### Attribution
If you use this project, please provide attribution by including:
- A link to this repository or the original source
- The author's name: **Valentin Barral**
- A note that the work is licensed under CC BY 4.0

**Example attribution:**
```
Huffman Algorithm Visualization by Valentin Barral
Licensed under CC BY 4.0
Source: https://github.com/valentinbarral/huffman-demo
```

---

**Created by Valentin Barral for educational purposes to help students understand the Huffman algorithm.**

[![CC BY 4.0](https://i.creativecommons.org/l/by/4.0/88x31.png)](https://creativecommons.org/licenses/by/4.0/)
