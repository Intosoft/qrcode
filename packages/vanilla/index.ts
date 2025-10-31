import { generateSVGString, type Config, type ConfigInput } from '@intosoft/qrcode';

export interface QRCodeElementOptions extends ConfigInput {
    element: HTMLElement;

    replace?: boolean;

    className?: string;

    style?: Partial<CSSStyleDeclaration>;
}

export interface QRCodeDownloadOptions extends ConfigInput {
    filename?: string;

    format?: 'svg' | 'png' | 'jpeg';

    quality?: number;

    scale?: number;
}

export async function createQRCodeElement(
    text: string,
    options: QRCodeElementOptions,
): Promise<SVGElement> {
    const { element, replace = true, className, style, ...qrOptions } = options;

    if (!element) {
        throw new Error('Target element is required');
    }

    try {
        const svgString = await generateSVGString(text, qrOptions);

        const parser = new DOMParser();
        const doc = parser.parseFromString(svgString, 'image/svg+xml');
        const svgElement = doc.documentElement as unknown as SVGElement;

        if (className) {
            svgElement.classList.add(className);
        }

        if (style) {
            Object.assign(svgElement.style, style);
        }

        if (replace) {
            element.innerHTML = '';
        }

        element.appendChild(svgElement);

        return svgElement;
    } catch (error) {
        throw new Error(
            `Failed to create QR code element: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}

export async function downloadQRCode(
    text: string,
    options: QRCodeDownloadOptions = {},
): Promise<void> {
    const { filename = 'qrcode', format = 'svg', quality = 0.9, scale = 1, ...qrOptions } = options;

    try {
        const svgString = await generateSVGString(text, qrOptions);

        if (format === 'svg') {
            downloadFile(svgString, `${filename}.svg`, 'image/svg+xml');
        } else {
            const canvas = await svgToCanvas(svgString, scale);
            const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';

            canvas.toBlob(
                (blob) => {
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${filename}.${format}`;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        URL.revokeObjectURL(url);
                    }
                },
                mimeType,
                quality,
            );
        }
    } catch (error) {
        throw new Error(
            `Failed to download QR code: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}

export async function copyQRCodeToClipboard(
    text: string,
    options: ConfigInput = {},
): Promise<void> {
    if (!navigator.clipboard) {
        throw new Error('Clipboard API not available');
    }

    try {
        const svgString = await generateSVGString(text, options);
        await navigator.clipboard.writeText(svgString);
    } catch (error) {
        throw new Error(
            `Failed to copy QR code to clipboard: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}

export async function createQRCodeDataURL(
    text: string,
    options: QRCodeDownloadOptions = {},
): Promise<string> {
    const { format = 'png', quality = 0.9, scale = 1, ...qrOptions } = options;

    try {
        const svgString = await generateSVGString(text, qrOptions);

        if (format === 'svg') {
            const encodedSvg = encodeURIComponent(svgString);
            return `data:image/svg+xml,${encodedSvg}`;
        } else {
            const canvas = await svgToCanvas(svgString, scale);
            const mimeType = format === 'png' ? 'image/png' : 'image/jpeg';
            return canvas.toDataURL(mimeType, quality);
        }
    } catch (error) {
        throw new Error(
            `Failed to create QR code data URL: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}

async function svgToCanvas(svgString: string, scale: number = 1): Promise<HTMLCanvasElement> {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Could not get canvas context'));
            return;
        }

        img.onload = () => {
            canvas.width = img.width * scale;
            canvas.height = img.height * scale;
            ctx.scale(scale, scale);
            ctx.drawImage(img, 0, 0);
            resolve(canvas);
        };

        img.onerror = () => reject(new Error('Failed to load SVG image'));

        const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
        img.src = URL.createObjectURL(svgBlob);
    });
}

function downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

export { generateSVGString, type Config, type ConfigInput } from '@intosoft/qrcode';
