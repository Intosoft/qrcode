import React, { useState, useEffect, useMemo } from 'react';
import { SvgFromXml } from 'react-native-svg';
import { ViewStyle, View, Text } from 'react-native';
import { generateSVGString, type Config, type ConfigInput } from '@intosoft/qrcode';
import { ImageRN } from './Image';

export interface QRCodeProps extends ConfigInput {
    text: string;

    style?: ViewStyle;

    svgStyle?: ViewStyle;

    logoSource?: string | number;

    logoSize?: number;

    logoStyle?: ViewStyle;

    loadingComponent?: React.ReactNode;

    errorComponent?: React.ReactNode;

    onError?: (error: Error) => void;

    onSuccess?: (svgString: string) => void;
}

export const QRCode: React.FC<QRCodeProps> = ({
    text,
    style = {},
    svgStyle = {},
    logoSource,
    logoSize = 0.15,
    logoStyle = {},
    loadingComponent,
    errorComponent,
    onError,
    onSuccess,
    ...qrOptions
}) => {
    const [svgString, setSvgString] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!text) {
            setError(new Error('Text is required'));
            setIsLoading(false);
            return;
        }

        const generateQR = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const svg = await generateSVGString(text, {
                    ...qrOptions,
                    isReactNative: true,
                });

                setSvgString(svg);
                onSuccess?.(svg);
            } catch (err) {
                const error = err instanceof Error ? err : new Error('Failed to generate QR code');
                setError(error);
                onError?.(error);
            } finally {
                setIsLoading(false);
            }
        };

        generateQR();
    }, [text, JSON.stringify(qrOptions), onError, onSuccess]);

    const logoPixelSize = useMemo(() => {
        const size = Math.min(qrOptions.width || 200, qrOptions.height || 200);
        return size * logoSize;
    }, [qrOptions.width, qrOptions.height, logoSize]);

    if (isLoading) {
        return (
            <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
                {loadingComponent || <Text>Loading QR Code...</Text>}
            </View>
        );
    }

    if (error) {
        return (
            <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
                {errorComponent || <Text style={{ color: 'red' }}>Error: {error.message}</Text>}
            </View>
        );
    }

    return (
        <View
            style={[
                {
                    position: 'relative',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                style,
            ]}
        >
            <SvgFromXml xml={svgString} style={svgStyle} />
            {logoSource && (
                <ImageRN
                    source={logoSource}
                    height={logoPixelSize}
                    width={logoPixelSize}
                    style={[
                        {
                            position: 'absolute',
                            zIndex: 9,
                        },
                        logoStyle,
                    ]}
                />
            )}
        </View>
    );
};

export function useQRCode(text: string, options: ConfigInput = {}) {
    const [svgString, setSvgString] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const generateQR = async () => {
        if (!text) {
            setError(new Error('Text is required'));
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const svg = await generateSVGString(text, {
                ...options,
                isReactNative: true,
            });

            setSvgString(svg);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to generate QR code');
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        generateQR();
    }, [text, JSON.stringify(options)]);

    return {
        svgString,
        isLoading,
        error,
        regenerate: generateQR,
    };
}

export function useQRCodeShare(text: string, options: ConfigInput = {}) {
    const [isSharing, setIsSharing] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const shareQRCode = async (shareOptions?: {
        title?: string;
        message?: string;
        subject?: string;
    }) => {
        try {
            setIsSharing(true);
            setError(null);

            const svgString = await generateSVGString(text, {
                ...options,
                isReactNative: true,
            });

            const { Share } = await import('react-native');

            await Share.share({
                title: shareOptions?.title || 'QR Code',
                message: shareOptions?.message || `QR Code: ${text}\n\nSVG:\n${svgString}`,
                subject: shareOptions?.subject || 'QR Code',
            });
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to share QR code');
            setError(error);
        } finally {
            setIsSharing(false);
        }
    };

    return {
        shareQRCode,
        isSharing,
        error,
    };
}

export async function saveQRCodeToFile(
    text: string,
    fileName: string,
    options: ConfigInput = {},
): Promise<string> {
    try {
        const svgString = await generateSVGString(text, {
            ...options,
            isReactNative: true,
        });

        throw new Error(
            'File saving requires additional setup. Please implement with react-native-fs or similar package.',
        );
    } catch (error) {
        throw new Error(
            `Failed to save QR code: ${error instanceof Error ? error.message : 'Unknown error'}`,
        );
    }
}

export async function generateQRCodeForReactNative(
    text: string,
    options: ConfigInput = {},
): Promise<string> {
    return generateSVGString(text, {
        ...options,
        isReactNative: true,
    });
}

export { generateSVGString, type Config, type ConfigInput } from '@intosoft/qrcode';
