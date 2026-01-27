import { generateSVGString, type Config, type ConfigInput } from '@intosoft/qrcode';

export interface QRCodeElementOptions {
    element: HTMLElement;
    config: ConfigInput;
    replace?: boolean;
    className?: string;
    style?: Partial<CSSStyleDeclaration>;
}

export interface QRCodeDownloadOptions {
    config: ConfigInput;
    filename?: string;
    format?: 'svg' | 'png' | 'jpeg';
    quality?: number;
    scale?: number;
}

export function createQRCodeElement(options: QRCodeElementOptions): SVGElement {
    const { element, config, replace = true, className, style } = options;

    if (!element) {
        throw new Error('Target element is required');
    }

    try {
        const svgString = generateSVGString(config);

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

export function downloadQRCode(options: QRCodeDownloadOptions): Promise<void> {
    const { config, filename = 'qrcode', format = 'svg', quality = 0.9, scale = 1 } = options;

    return new Promise((resolve, reject) => {
        try {
            const svgString = generateSVGString(config);

            if (format === 'svg') {
                downloadFile(svgString, `${filename}.svg`, 'image/svg+xml');
                resolve();
            } else {
                svgToCanvas(svgString, scale)
                    .then((canvas) => {
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
                                    resolve();
                                } else {
                                    reject(new Error('Failed to create blob'));
                                }
                            },
                            mimeType,
                            quality,
                        );
                    })
                    .catch(reject);
            }
        } catch (error) {
            reject(new Error(
                `Failed to download QR code: ${error instanceof Error ? error.message : 'Unknown error'}`,
            ));
        }
    });
}

export function copyQRCodeToClipboard(config: ConfigInput): Promise<void> {
    if (!navigator.clipboard) {
        return Promise.reject(new Error('Clipboard API not available'));
    }

    try {
        const svgString = generateSVGString(config);
        return navigator.clipboard.writeText(svgString);
    } catch (error) {
        return Promise.reject(new Error(
            `Failed to copy QR code to clipboard: ${error instanceof Error ? error.message : 'Unknown error'}`,
        ));
    }
}

export interface CreateDataURLOptions {
    config: ConfigInput;
    format?: 'svg' | 'png' | 'jpeg';
    quality?: number;
    scale?: number;
}

export async function createQRCodeDataURL(options: CreateDataURLOptions): Promise<string> {
    const { config, format = 'png', quality = 0.9, scale = 1 } = options;

    try {
        const svgString = generateSVGString(config);

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

function svgToCanvas(svgString: string, scale: number = 1): Promise<HTMLCanvasElement> {
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
