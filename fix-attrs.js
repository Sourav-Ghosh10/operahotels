const fs = require('fs');
const path = require('path');

const targetDirs = [
    'c:\\Projects\\operahotels\\operahotels\\app',
    'c:\\Projects\\operahotels\\operahotels\\components'
];

const attributesToFix = [
    { from: /stroke-width=/g, to: 'strokeWidth=' },
    { from: /stroke-linecap=/g, to: 'strokeLinecap=' },
    { from: /stroke-linejoin=/g, to: 'strokeLinejoin=' },
    { from: /font-family=/g, to: 'fontFamily=' },
    { from: /font-size=/g, to: 'fontSize=' },
    { from: /font-weight=/g, to: 'fontWeight=' },
    { from: /letter-spacing=/g, to: 'letterSpacing=' },
    { from: /text-anchor=/g, to: 'textAnchor=' },
    { from: /fill-rule=/g, to: 'fillRule=' },
    { from: /clip-rule=/g, to: 'clipRule=' }
];

function processDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.tsx')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;
            
            for (const { from, to } of attributesToFix) {
                if (from.test(content)) {
                    content = content.replace(from, to);
                    modified = true;
                }
            }
            
            if (modified) {
                fs.writeFileSync(fullPath, content);
                console.log(`Fixed attributes in ${fullPath}`);
            }
        }
    }
}

targetDirs.forEach(dir => processDirectory(dir));
console.log('Done fixing attributes.');
