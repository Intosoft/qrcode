import { promises as fs } from 'fs';
import { extname, dirname } from 'path';
import { generateSVGString, type Config, type ConfigInput } from '@intosoft/qrcode';
import sharp from 'sharp';

export interface SaveQRCodeOptions {
    config: ConfigInput;
    filePath: string;
    format?: 'svg' | 'png' | 'jpeg' | 'webp' | 'avif';
    quality?: number;
    progressive?: boolean;
    compressionLevel?: number;
    createDirectories?: boolean;
}

export interface QRCodeBufferOptions {
    config: ConfigInput;
    format: 'png' | 'jpeg' | 'webp' | 'avif';
    quality?: number;
    progressive?: boolean;
    compressionLevel?: number;
}

export interface QRCodeMiddlewareOptions {
    defaultConfig?: Partial<ConfigInput>;
    textParam?: string;
    format?: 'svg' | 'png' | 'jpeg' | 'webp' | 'avif';
    quality?: number;
    cacheControl?: string;
    filename?: string | ((text: string) => string);
}

export async function saveQRCodeToFile(options: SaveQRCodeOptions): Promise<void> {
    const {
        config,
        filePath,
        format,
        quality = 90,
        progressive = false,
        compressionLevel = 6,
        createDirectories = true,
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
            const svgString = generateSVGString(config);
            await fs.writeFile(filePath, svgString, 'utf-8');
        } else {
            const buffer = await generateQRCodeBuffer({
                config,
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

export async function generateQRCodeBuffer(options: QRCodeBufferOptions): Promise<Buffer> {
    const {
        config,
        format,
        quality = 90,
        progressive = false,
        compressionLevel = 6,
    } = options;

    try {
        const svgString = generateSVGString(config);
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
        defaultConfig = {},
        textParam = 'text',
        format = 'png',
        quality = 90,
        cacheControl,
        filename,
    } = options;

    return async (req: any, res: any, _next: any) => {
        try {
            const text = req.query[textParam] || req.params[textParam];

            if (!text) {
                return res.status(400).json({
                    error: `Missing required parameter: ${textParam}`,
                });
            }

            const config: ConfigInput = {
                ...defaultConfig,
                value: text,
                length: parseInt(req.query.length) || defaultConfig.length,
                padding: parseInt(req.query.padding) || defaultConfig.padding,
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
                const svgString = generateSVGString(config);
                res.send(svgString);
            } else {
                const buffer = await generateQRCodeBuffer({
                    config,
                    format: format as 'png' | 'jpeg' | 'webp' | 'avif',
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

export interface BatchItem {
    config: ConfigInput;
    filePath: string;
    format?: 'svg' | 'png' | 'jpeg' | 'webp' | 'avif';
}

export async function batchGenerateQRCodes(
    items: BatchItem[],
    baseOptions: Partial<Omit<SaveQRCodeOptions, 'config' | 'filePath'>> = {},
): Promise<void> {
    const promises = items.map(({ config, filePath, format }) =>
        saveQRCodeToFile({
            ...baseOptions,
            config,
            filePath,
            format,
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

export async function* streamQRCodeGeneration(
    configs: Iterable<ConfigInput>,
    generateFileName: (config: ConfigInput, index: number) => string,
    options: Partial<Omit<SaveQRCodeOptions, 'config' | 'filePath'>> = {},
): AsyncGenerator<{ index: number; filePath: string }, void, unknown> {
    let index = 0;

    for (const config of configs) {
        const filePath = generateFileName(config, index);

        try {
            await saveQRCodeToFile({
                ...options,
                config,
                filePath,
            });
            yield { index, filePath };
            index++;
        } catch (error) {
            console.error(`Failed to generate QR code for index ${index}:`, error);
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
