import { promises as fs } from 'fs';
import { join, extname, dirname } from 'path';
import { generateSVGString, type Config, type ConfigInput } from '@intosoft/qrcode';
import sharp from 'sharp';

export interface SaveQRCodeOptions extends ConfigInput {
    filePath: string;

    format?: 'svg' | 'png' | 'jpeg' | 'webp' | 'avif';

    quality?: number;

    progressive?: boolean;

    compressionLevel?: number;

    createDirectories?: boolean;
}

export interface QRCodeBufferOptions extends ConfigInput {
    format: 'png' | 'jpeg' | 'webp' | 'avif';

    quality?: number;

    progressive?: boolean;

    compressionLevel?: number;
}

export interface QRCodeMiddlewareOptions extends ConfigInput {
    textParam?: string;

    format?: 'svg' | 'png' | 'jpeg' | 'webp' | 'avif';

    quality?: number;

    cacheControl?: string;

    filename?: string | ((text: string) => string);
}

export async function saveQRCodeToFile(text: string, options: SaveQRCodeOptions): Promise<void> {
    const {
        filePath,
        format,
        quality = 90,
        progressive = false,
        compressionLevel = 6,
        createDirectories = true,
        ...qrOptions
    } = options;

    if (!filePath) {
        throw new Error('File path is required');
    }

    try {
        if (createDirectories) {
            const dir = dirname(filePath);
            await fs.mkdir(dir, { recursive: true });
        }

        const outputFormat = format || getFormatFromExtension(filePath);

        if (outputFormat === 'svg') {
            const svgString = await generateSVGString(text, qrOptions);
            await fs.writeFile(filePath, svgString, 'utf-8');
        } else {
            const buffer = await generateQRCodeBuffer(text, {
                ...qrOptions,
                format: outputFormat,
                quality,
                progressive,
                compressionLevel,
            });
            await fs.writeFile(filePath, buffer);
        }
    } catch (error) {
        throw new Error(
            `Failed to save QR code to file: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}

export async function generateQRCodeBuffer(
    text: string,
    options: QRCodeBufferOptions,
): Promise<Buffer> {
    const {
        format,
        quality = 90,
        progressive = false,
        compressionLevel = 6,
        ...qrOptions
    } = options;

    try {
        const svgString = await generateSVGString(text, qrOptions);
        const svgBuffer = Buffer.from(svgString);

        let sharpInstance = sharp(svgBuffer);

        switch (format) {
            case 'png':
                sharpInstance = sharpInstance.png({
                    compressionLevel,
                    progressive,
                });
                break;
            case 'jpeg':
                sharpInstance = sharpInstance.jpeg({
                    quality,
                    progressive,
                });
                break;
            case 'webp':
                sharpInstance = sharpInstance.webp({
                    quality,
                });
                break;
            case 'avif':
                sharpInstance = sharpInstance.avif({
                    quality,
                });
                break;
            default:
                throw new Error(`Unsupported format: ${format}`);
        }

        return await sharpInstance.toBuffer();
    } catch (error) {
        throw new Error(
            `Failed to generate QR code buffer: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}

export function createQRCodeMiddleware(options: QRCodeMiddlewareOptions = {}) {
    const {
        textParam = 'text',
        format = 'png',
        quality = 90,
        cacheControl,
        filename,
        ...defaultQROptions
    } = options;

    return async (req: any, res: any, next: any) => {
        try {
            const text = req.query[textParam] || req.params[textParam];

            if (!text) {
                return res.status(400).json({
                    error: `Missing required parameter: ${textParam}`,
                });
            }

            const qrOptions = {
                ...defaultQROptions,
                width: parseInt(req.query.width) || defaultQROptions.width,
                height: parseInt(req.query.height) || defaultQROptions.height,
            };

            const mimeType = getMimeType(format);
            res.set('Content-Type', mimeType);

            if (cacheControl) {
                res.set('Cache-Control', cacheControl);
            }

            if (filename) {
                const resolvedFilename = typeof filename === 'function' ? filename(text) : filename;
                res.set('Content-Disposition', `attachment; filename="${resolvedFilename}"`);
            }

            if (format === 'svg') {
                const svgString = await generateSVGString(text, qrOptions);
                res.send(svgString);
            } else {
                const buffer = await generateQRCodeBuffer(text, {
                    ...qrOptions,
                    format: format as any,
                    quality,
                });
                res.send(buffer);
            }
        } catch (error) {
            console.error('QR code middleware error:', error);
            res.status(500).json({
                error: 'Failed to generate QR code',
                message: error instanceof Error ? error.message : 'Unknown error',
            });
        }
    };
}

export async function batchGenerateQRCodes(
    items: Array<{
        text: string;
        filePath: string;
        [key: string]: any;
    }>,
    baseOptions: Partial<SaveQRCodeOptions> = {},
): Promise<void> {
    const promises = items.map(({ text, filePath, ...itemOptions }) =>
        saveQRCodeToFile(text, {
            ...baseOptions,
            ...itemOptions,
            filePath,
        }),
    );

    try {
        await Promise.all(promises);
    } catch (error) {
        throw new Error(
            `Batch generation failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}

export async function streamQRCodeGeneration(
    texts: Iterable<string>,
    generateFileName: (text: string, index: number) => string,
    options: Partial<SaveQRCodeOptions> = {},
): Promise<void> {
    let index = 0;

    for (const text of texts) {
        const filePath = generateFileName(text, index);

        try {
            await saveQRCodeToFile(text, {
                ...options,
                filePath,
            });
            index++;
        } catch (error) {
            console.error(`Failed to generate QR code for "${text}":`, error);
            throw error;
        }
    }
}

function getFormatFromExtension(filePath: string): 'svg' | 'png' | 'jpeg' | 'webp' | 'avif' {
    const ext = extname(filePath).toLowerCase();

    switch (ext) {
        case '.svg':
            return 'svg';
        case '.png':
            return 'png';
        case '.jpg':
        case '.jpeg':
            return 'jpeg';
        case '.webp':
            return 'webp';
        case '.avif':
            return 'avif';
        default:
            return 'png';
    }
}

function getMimeType(format: string): string {
    switch (format) {
        case 'svg':
            return 'image/svg+xml';
        case 'png':
            return 'image/png';
        case 'jpeg':
            return 'image/jpeg';
        case 'webp':
            return 'image/webp';
        case 'avif':
            return 'image/avif';
        default:
            return 'application/octet-stream';
    }
}

export { generateSVGString, type Config, type ConfigInput } from '@intosoft/qrcode';
