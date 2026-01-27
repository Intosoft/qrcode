import React, { useMemo, useCallback, CSSProperties } from 'react';
import { generateSVGString, ConfigInput } from '@intosoft/qrcode';

export interface QRCodeProps {
    config: ConfigInput;
    style?: CSSProperties;
    className?: string;
    alt?: string;
    title?: string;
}

export const QRCode: React.FC<QRCodeProps> = ({
    config,
    style,
    className,
    alt = 'QR Code',
    title,
}) => {
    const svgString = useMemo(() => {
        try {
            return generateSVGString(config);
        } catch (error) {
            console.error('Failed to generate QR code:', error);
            return null;
        }
    }, [JSON.stringify(config)]);

    if (!svgString) {
        return (
            <div
                style={style}
                className={className}
                role="img"
                aria-label="Failed to generate QR code"
            >
                <span>Failed to generate QR code</span>
            </div>
        );
    }

    return (
        <div
            style={style}
            className={className}
            dangerouslySetInnerHTML={{ __html: svgString }}
            role="img"
            aria-label={alt}
            title={title}
        />
    );
};

export const useQRCode = (config: ConfigInput) => {
    const result = useMemo(() => {
        try {
            const svgString = generateSVGString(config);
            return {
                svgString,
                isLoading: false,
                error: null,
            };
        } catch (error) {
            return {
                svgString: null,
                isLoading: false,
                error: error instanceof Error ? error.message : 'Unknown error',
            };
        }
    }, [JSON.stringify(config)]);

    return result;
};

export interface DownloadOptions {
    filename?: string;
    format?: 'png' | 'svg';
    scale?: number;
}

export const useQRCodeDownload = (config: ConfigInput) => {
    const downloadQR = useCallback((options: DownloadOptions = {}) => {
        const { filename = 'qr-code', format = 'png', scale = 2 } = options;
        
        try {
            const svgString = generateSVGString(config);

            if (format === 'svg') {
                const blob = new Blob([svgString], { type: 'image/svg+xml' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.download = `${filename}.svg`;
                link.href = url;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);
                return;
            }

            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();

            img.onload = () => {
                canvas.width = img.width * scale;
                canvas.height = img.height * scale;
                ctx?.scale(scale, scale);
                ctx?.drawImage(img, 0, 0);

                const link = document.createElement('a');
                link.download = `${filename}.png`;
                link.href = canvas.toDataURL('image/png');

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            };

            img.onerror = () => {
                console.error('Failed to load SVG for download');
            };

            const blob = new Blob([svgString], { type: 'image/svg+xml' });
            img.src = URL.createObjectURL(blob);
        } catch (error) {
            console.error('Failed to download QR code:', error);
        }
    }, [JSON.stringify(config)]);

    return downloadQR;
};
