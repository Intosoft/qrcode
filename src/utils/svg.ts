export function cleanSVGPath(path: string): string {
    return path
        .replace(/\s+/g, ' ')
        .replace(/\s*,\s*/g, ',')
        .replace(/([a-zA-Z])\s*/g, '$1')
        .replace(/\s([a-zA-Z])/g, ' $1')
        .trim();
}

export function validateColor(color: string): string {
    if (color === 'none' || color === 'transparent' || color === 'currentColor') {
        return color;
    }

    if (color.startsWith('#')) {
        if (color.length === 4) {
            return `#${color[1]}${color[1]}${color[2]}${color[2]}${color[3]}${color[3]}`;
        }
        return color.toUpperCase();
    }

    if (color.startsWith('rgb')) {
        return color.replace(/\s+/g, '');
    }

    if (color.startsWith('url(')) {
        return color;
    }

    return color;
}

export function formatNumber(num: number, precision: number = 3): string {
    const rounded = Number(num.toFixed(precision));
    const str = rounded.toString();
    
    // Only remove trailing zeros after a decimal point
    // Don't remove zeros that are part of the integer (like 500, 300, etc.)
    if (str.includes('.')) {
        return str.replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
    }
    
    return str;
}

export function formatViewBox(minX: number, minY: number, width: number, height: number): string {
    return [minX, minY, width, height].map((n) => formatNumber(n)).join(' ');
}

export function escapeSVGAttribute(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export function getImageMimeType(url: string): string | null {
    if (url.startsWith('data:image/')) {
        const match = url.match(/^data:image\/([a-z+]+);/i);
        return match ? match[1] : null;
    }

    const extension = url.split('.').pop()?.toLowerCase();
    const mimeMap: Record<string, string> = {
        'png': 'png',
        'jpg': 'jpeg',
        'jpeg': 'jpeg',
        'gif': 'gif',
        'webp': 'webp',
        'svg': 'svg+xml',
        'bmp': 'bmp',
        'ico': 'x-icon',
    };

    return mimeMap[extension || ''] || null;
}

export function validateURL(url: string): string {
    if (url.startsWith('data:image/')) {
        const mimeType = getImageMimeType(url);
        const supportedTypes = ['png', 'jpeg', 'jpg', 'gif', 'webp', 'svg+xml', 'bmp'];
        
        if (mimeType && !supportedTypes.includes(mimeType)) {
            console.warn(`Unsupported image format in data URI: ${mimeType}. Supported formats: PNG, JPEG, GIF, WebP, SVG, BMP`);
        }
        
        return url;
    }

    if (url.startsWith('https://') || url.startsWith('http://')) {
        const mimeType = getImageMimeType(url);
        const supportedTypes = ['png', 'jpeg', 'gif', 'webp', 'svg+xml', 'bmp', 'x-icon'];
        
        if (mimeType && !supportedTypes.includes(mimeType)) {
            console.warn(`Image URL appears to have unsupported format: ${mimeType}. Supported formats: PNG, JPEG, GIF, WebP, SVG, BMP, ICO. The image may not render correctly.`);
        }
        
        return url;
    }

    if (!url.includes(':')) {
        return url;
    }

    const dangerousProtocols = ['javascript:', 'data:text', 'vbscript:'];
    if (dangerousProtocols.some((protocol) => url.toLowerCase().startsWith(protocol))) {
        console.warn(`Blocked potentially dangerous URL: ${url}`);
        return '';
    }

    return url;
}

export function formatSVGString(svg: string): string {
    return svg
        .replace(/>\s+</g, '>\n<')
        .replace(/\n\s*\n/g, '\n')
        .trim();
}

export function addXMLDeclaration(svg: string): string {
    if (svg.startsWith('<?xml')) {
        return svg;
    }
    return `<?xml version="1.0" encoding="UTF-8"?>\n${svg}`;
}

export function validateSVG(svg: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!svg.includes('<svg')) {
        errors.push('Missing <svg> root element');
    }

    if (!svg.includes('</svg>')) {
        errors.push('Missing closing </svg> tag');
    }

    if (!svg.includes('xmlns="http://www.w3.org/2000/svg"')) {
        errors.push('Missing xmlns attribute on <svg> element');
    }

    const openTags = (svg.match(/<[^/][^>]*>/g) || []).length;
    const closeTags = (svg.match(/<\/[^>]*>/g) || []).length;
    const selfClosing = (svg.match(/<[^>]*\/>/g) || []).length;

    if (openTags !== closeTags + selfClosing) {
        errors.push('Mismatched opening and closing tags');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
}

export function optimizePath(path: string): string {
    return path
        .replace(/M\s*([\d.]+)\s+([\d.]+)\s+M\s*\1\s+\2/g, 'M$1 $2')
        .replace(/[Ll]\s*0\s+0/g, '')
        .replace(/\s+/g, ' ')
        .replace(/([ML])\s+/g, '$1')
        .replace(/([HV])\s+/g, '$1')
        .replace(/\s([ZML])/g, '$1')
        .trim();
}
