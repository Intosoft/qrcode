import React, { useMemo, CSSProperties } from 'react';
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
    }, [config]);

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
    }, [config]);

    return result;
};

export const useQRCodeDownload = (config: ConfigInput) => {
    const downloadQR = useMemo(() => {
        return (filename: string = 'qr-code.png') => {
            try {
                const svgString = generateSVGString(config);

                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                const img = new Image();

                img.onload = () => {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx?.drawImage(img, 0, 0);

                    const link = document.createElement('a');
                    link.download = filename;
                    link.href = canvas.toDataURL('image/png');

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                };

                img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
            } catch (error) {
                console.error('Failed to download QR code:', error);
            }
        };
    }, [config]);

    return downloadQR;
};
