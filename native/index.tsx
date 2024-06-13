/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { SvgFromXml } from 'react-native-svg';
import { ViewStyle, View } from 'react-native';
import { Config } from '../src/config';
import { generateSVGString } from '../src/generateSVGString';
import { ImageRN } from './Image';

interface QRCodeProps {
    config: Config;
    style?: ViewStyle;
}

export const QRCode = ({ config, style = {} }: QRCodeProps) => {
    // @ts-ignore
    const { svgString, cellSize } = generateSVGString({ ...config, isReactNative: true });
    const imageSize = cellSize * (config.logo?.size || 1);
    return (
        <View
            style={{
                ...style,
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <SvgFromXml xml={svgString} />
            {!!config.logo?.url && (
                <ImageRN
                    source={config.logo?.url}
                    height={imageSize}
                    width={imageSize}
                    style={{
                        position: 'absolute',
                        zIndex: 9,
                    }}
                />
            )}
        </View>
    );
};
