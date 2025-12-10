import fs from 'fs';

// 1. Read the file
const filePath = './index.html'; // Make sure this path is correct
let html = fs.readFileSync(filePath, 'utf8');

// 2. The Regex logic to find class attributes
html = html.replace(/class="([^"]*)"/g, (match, classList) => {
    // Split classes by space
    const classes = classList.split(/\s+/).filter(c => c.length > 0);
    
    // Add prefix if not already there
    const prefixed = classes.map(cls => {
        return cls.startsWith('am:') ? cls : `am:${cls}`;
    });

    // Rejoin them
    return `class="${prefixed.join(' ')}"`;
});

// 3. Save the file
fs.writeFileSync(filePath, html);
console.log('Prefix added to all classes!');