const fs = require('fs');
const path = require('path');

const srcDir = 'C:\\Users\\codec_fy5xwdk\\Downloads\\operahotels';
const destDir = 'c:\\Projects\\operahotels\\operahotels\\app';

const filesToMigrate = [
    { src: 'index.html', dest: 'page.tsx' },
    { src: 'about.html', dest: 'about/page.tsx' },
    { src: 'brands.html', dest: 'brands/page.tsx' },
    { src: 'contact.html', dest: 'contact/page.tsx' },
    { src: 'destinations.html', dest: 'destinations/page.tsx' },
    { src: 'dubai.html', dest: 'dubai/page.tsx' },
    { src: 'offers.html', dest: 'offers/page.tsx' }
];

function convertHtmlToJsx(html) {
    // Basic JSX conversion
    let jsx = html;
    jsx = jsx.replace(/class=/g, 'className=');
    jsx = jsx.replace(/for=/g, 'htmlFor=');
    jsx = jsx.replace(/tabindex=/g, 'tabIndex=');
    jsx = jsx.replace(/xmlns:xlink/g, 'xmlnsXlink');
    jsx = jsx.replace(/xml:space/g, 'xmlSpace');
    jsx = jsx.replace(/charset/g, 'charSet');
    jsx = jsx.replace(/autoplay/g, 'autoPlay');
    jsx = jsx.replace(/allowfullscreen/g, 'allowFullScreen');
    jsx = jsx.replace(/allowFullScreen=""/g, 'allowFullScreen={true}');
    jsx = jsx.replace(/allowFullScreen="true"/g, 'allowFullScreen={true}');
    jsx = jsx.replace(/onsubmit="return false;"/g, 'onSubmit={(e) => e.preventDefault()}');
    jsx = jsx.replace(/rows="(\d+)"/g, 'rows={$1}');
    jsx = jsx.replace(/frameborder="(\d+)"/g, 'frameBorder={$1}');
    jsx = jsx.replace(/marginheight="(\d+)"/g, 'marginHeight={$1}');
    jsx = jsx.replace(/marginwidth="(\d+)"/g, 'marginWidth={$1}');
    jsx = jsx.replace(/cellpadding="(\d+)"/g, 'cellPadding={$1}');
    jsx = jsx.replace(/cellspacing="(\d+)"/g, 'cellSpacing={$1}');
    jsx = jsx.replace(/referrerpolicy=/g, 'referrerPolicy=');

    // Make img sources absolute
    jsx = jsx.replace(/src="\.\/img\//g, 'src="/img/');
    jsx = jsx.replace(/src="img\//g, 'src="/img/');
    
    // Convert style strings to objects (basic regex, only handles simple styles)
    jsx = jsx.replace(/style="([^"]*)"/g, (match, styleString) => {
        if (!styleString.trim()) return 'style={{}}';
        const styles = styleString.split(';').filter(s => s.trim()).map(s => {
            const [key, ...valueParts] = s.split(':');
            if (!key || !valueParts.length) return '';
            const value = valueParts.join(':').trim();
            const camelKey = key.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            // handle url() with quotes properly inside jsx string
            const safeValue = value.replace(/"/g, "'").replace(/\\/g, "/");
            return `${camelKey}: "${safeValue}"`;
        }).filter(s => s).join(', ');
        return `style={{ ${styles} }}`;
    });

    // Convert HTML comments to JSX comments
    jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}');

    // Close common unclosed tags
    const voidElements = ['img', 'input', 'br', 'hr', 'link', 'meta', 'source'];
    for (const tag of voidElements) {
        const regex = new RegExp(`(<${tag}\\b[^>]*)(?<!/)>`, 'g');
        jsx = jsx.replace(regex, '$1 />');
    }

    // Fix unbalanced tags from index.html (explore section is missing closing tags)
    jsx = jsx.replace(/\{\/\*\s*Our Brands Section\s*\*\/\}/g, '</div></section>\n            {/* Our Brands Section */}');

    return jsx;
}

filesToMigrate.forEach(({ src, dest }) => {
    const srcPath = path.join(srcDir, src);
    const destPath = path.join(destDir, dest);
    
    if (fs.existsSync(srcPath)) {
        let content = fs.readFileSync(srcPath, 'utf8');
        
        // Extract content between body and footer
        const headerMatch = content.match(/<header[^>]*>[\s\S]*?<\/header>/);
        let pageContentStart = headerMatch ? content.indexOf(headerMatch[0]) : content.indexOf('<body>') + 6;
        
        // Remove navigation, booking sidebar from the extracted content as they are in layout
        let bodyContent = content.substring(pageContentStart);
        
        // Remove footer and below
        const footerIndex = bodyContent.indexOf('<footer');
        if (footerIndex !== -1) {
            bodyContent = bodyContent.substring(0, footerIndex);
        }
        
        const jsxContent = convertHtmlToJsx(bodyContent);
        
        let fileContent = `"use client";
import React from 'react';
import Header from '@/components/Header';
import Head from 'next/head';

export default function Page() {
    return (
        <main>
            ${jsxContent}
        </main>
    );
}
`;
        
        // Some pages might not have a header or have a different one, but index.html has a hero-section.
        // If we want to extract the exact header to a component, we can do it, but since Header is same structure mostly, 
        // wait, Header has slightly different carousels per page. It's better to keep the <header> inside the page.tsx 
        // and just replace the navbar part with our Header component!
        
        // Let's replace the nav inside header with <Header />
        fileContent = fileContent.replace(/<nav[^>]*>[\s\S]*?<\/nav>/, '<Header />');

        const destDirPath = path.dirname(destPath);
        if (!fs.existsSync(destDirPath)) {
            fs.mkdirSync(destDirPath, { recursive: true });
        }
        
        fs.writeFileSync(destPath, fileContent);
        console.log(`Migrated ${src} to ${dest}`);
    }
});
