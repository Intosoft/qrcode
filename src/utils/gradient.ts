import { Config, ColorValue, GradientConfig } from '../config';

// Check if a color value is a gradient
export const isGradientColor = (color: ColorValue): boolean => {
    if (typeof color === 'string') {
        return (
            color.includes('linear-gradient') ||
            color.includes('radial-gradient') ||
            color.includes('conic-gradient')
        );
    }
    // Check if it's a GradientConfig object
    return typeof color === 'object' && color !== null && 'type' in color && 'stops' in color;
};

// Convert GradientConfig to CSS gradient string
const gradientConfigToString = (gradient: GradientConfig): string => {
    const { type, angle, stops } = gradient;
    const sortedStops = [...stops].sort((a, b) => a.offset - b.offset);
    const colorString = sortedStops.map((stop) => `${stop.color} ${stop.offset}%`).join(', ');

    if (type === 'linear') {
        return `linear-gradient(${angle || 90}deg, ${colorString})`;
    } else {
        return `radial-gradient(circle, ${colorString})`;
    }
};

// Normalize color value to string
export const normalizeColorValue = (color: ColorValue): string => {
    if (typeof color === 'string') {
        return color;
    }
    return gradientConfigToString(color);
};

const parseLinearGradient = (input: string) => {
    const matches = Array.from(
        input.matchAll(/((?:rgb|rgba|hsl|hsla|#[0-9a-f]{3,8}|[a-z]+)?(?:\([^)]+\))?)\s+(\d+%)/gi),
    );

    const angleMatch = input.match(/(\d+)deg/i);
    const angle = angleMatch ? angleMatch[1] : '0';

    const stops = matches.map((match) => ({
        color: match[1].trim(),
        percentage: match[2],
    }));

    if (stops.length === 0) {
        const colorMatches = input.match(
            /(#[0-9a-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|[a-z]+)/gi,
        );
        if (colorMatches && colorMatches.length >= 2) {
            return {
                angle,
                stops: colorMatches.map((color, index) => ({
                    color: color.trim(),
                    percentage: `${(index * 100) / (colorMatches.length - 1)}%`,
                })),
            };
        }
        throw new Error('no stops found');
    }

    return { angle, stops };
};

const parseRadialGradient = (input: string) => {
    const matches = Array.from(
        input.matchAll(/((?:rgb|rgba|hsl|hsla|#[0-9a-f]{3,8}|[a-z]+)?(?:\([^)]+\))?)\s+(\d+%)/gi),
    );

    const stops = matches.map((match) => ({
        color: match[1].trim(),
        percentage: match[2],
    }));

    if (stops.length === 0) {
        const colorMatches = input.match(
            /(#[0-9a-f]{3,8}|rgb\([^)]+\)|rgba\([^)]+\)|hsl\([^)]+\)|hsla\([^)]+\)|[a-z]+)/gi,
        );
        if (colorMatches && colorMatches.length >= 2) {
            return colorMatches.map((color, index) => ({
                color: color.trim(),
                percentage: `${(index * 100) / (colorMatches.length - 1)}%`,
            }));
        }
        throw new Error('no stops found');
    }

    return stops;
};

const generateSvgRadialGradient = (input: string, id: string) => {
    try {
        const stops = parseRadialGradient(input);
        if (!stops) {
            return '';
        }
        let svgCode = `<radialGradient id="${id}" cx="50%" cy="50%" r="50%">\n`;
        stops.forEach((stop) => {
            const offsetValue = stop.percentage ? stop.percentage : '';
            svgCode += `  <stop offset="${offsetValue}" style="stop-color:${stop.color};stop-opacity:1" />\n`;
        });
        svgCode += `</radialGradient>`;
        return svgCode;
    } catch (err) {
        console.error(err);
    }
    return '';
};

const generateSvgLinearGradient = (input: string, id: string) => {
    try {
        const { angle, stops } = parseLinearGradient(input);
        if (!stops) {
            return '';
        }
        let svgCode = `<linearGradient id="${id}" x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform="rotate(${angle})">\n`;
        let offset = 0;
        stops.forEach((stop) => {
            const offsetValue = stop?.percentage ? stop.percentage : `${offset}%`;
            svgCode += `  <stop offset="${offsetValue}" style="stop-color:${stop?.color};stop-opacity:1" />\n`;
            if (!stop?.percentage) {
                offset += 100 / (stops.length - 1);
            }
        });
        svgCode += `</linearGradient>`;

        return svgCode;
    } catch (err) {
        console.error(err);
    }
    return '';
};

const generateSVGGradient = (color: string, id: string) => {
    if (color.includes('linear-gradient')) {
        return generateSvgLinearGradient(color, id);
    }

    return generateSvgRadialGradient(color, id);
};

export const generateGradientByConfig = (config: Config) => {
    let svgString = '';

    if (isGradientColor(config.colors.background)) {
        const backgroundColor = normalizeColorValue(config.colors.background);
        svgString += generateSVGGradient(backgroundColor, 'background');
    }

    if (isGradientColor(config.colors.body)) {
        const bodyColor = normalizeColorValue(config.colors.body);
        svgString += generateSVGGradient(bodyColor, 'body');
    }
    if (isGradientColor(config.colors.eyeFrame.topLeft)) {
        const eyeFrameColor = normalizeColorValue(config.colors.eyeFrame.topLeft);
        svgString += generateSVGGradient(eyeFrameColor, 'eyeFrame');
    }
    if (isGradientColor(config.colors.eyeball.topLeft)) {
        const eyeballColor = normalizeColorValue(config.colors.eyeball.topLeft);
        svgString += generateSVGGradient(eyeballColor, 'eyeball');
    }

    return svgString;
};
