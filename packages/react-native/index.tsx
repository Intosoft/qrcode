import React, { useState, useEffect, useMemo } from 'react';
import { SvgFromXml } from 'react-native-svg';
import { ViewStyle, View, Text } from 'react-native';
import { generateSVGString, type Config, type ConfigInput, type ReactNativeQRResult } from '@intosoft/qrcode';
import { ImageRN } from './Image';

export interface QRCodeProps {
    config: ConfigInput;
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
    config,
    style = {},
    svgStyle = {},
    logoSource,
    logoSize = 0.15,
    logoStyle = {},
    loadingComponent,
    errorComponent,
    onError,
    onSuccess,
}) => {
    const [result, setResult] = useState<ReactNativeQRResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (!config.value) {
            setError(new Error('Config value is required'));
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const qrResult = generateSVGString(config, { forReactNative: true }) as ReactNativeQRResult;
            setResult(qrResult);
            onSuccess?.(qrResult.svgString);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to generate QR code');
            setError(error);
            onError?.(error);
        } finally {
            setIsLoading(false);
        }
    }, [JSON.stringify(config), onError, onSuccess]);

    const logoPixelSize = useMemo(() => {
        const size = config.length || 300;
        return size * logoSize;
    }, [config.length, logoSize]);

    if (isLoading) {
        return (
            <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
                {loadingComponent || <Text>Loading QR Code...</Text>}
            </View>
        );
    }

    if (error || !result) {
        return (
            <View style={[{ alignItems: 'center', justifyContent: 'center' }, style]}>
                {errorComponent || <Text style={{ color: 'red' }}>Error: {error?.message || 'Unknown error'}</Text>}
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
            <SvgFromXml xml={result.svgString} style={svgStyle} />
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

export function useQRCode(config: ConfigInput) {
    const [result, setResult] = useState<ReactNativeQRResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const generateQR = () => {
        if (!config.value) {
            setError(new Error('Config value is required'));
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);

            const qrResult = generateSVGString(config, { forReactNative: true }) as ReactNativeQRResult;
            setResult(qrResult);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Failed to generate QR code');
            setError(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        generateQR();
    }, [JSON.stringify(config)]);

    return {
        svgString: result?.svgString ?? null,
        cellSize: result?.cellSize ?? 0,
        isLoading,
        error,
        regenerate: generateQR,
    };
}

export function useQRCodeShare(config: ConfigInput) {
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

            const qrResult = generateSVGString(config, { forReactNative: true }) as ReactNativeQRResult;

            const { Share } = await import('react-native');

            await Share.share({
                title: shareOptions?.title || 'QR Code',
                message: shareOptions?.message || `QR Code: ${config.value}\n\nSVG:\n${qrResult.svgString}`,
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

export async function generateQRCodeForReactNative(config: ConfigInput): Promise<ReactNativeQRResult> {
    return generateSVGString(config, { forReactNative: true }) as ReactNativeQRResult;
}

export { generateSVGString, type Config, type ConfigInput, type ReactNativeQRResult } from '@intosoft/qrcode';
