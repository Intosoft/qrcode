import { Config } from '../config';

export const isGradientColor = (color: string) =>
    color.includes('linear-gradient') || color.includes('radial-gradient');

const parseLinearGradient = (input: string) => {
    const matches = Array.from(input.matchAll(/((?:rgb|rgba)?a?\([^)]+\))\s+(\d+%)/gi));

    const angleMatch = input.match(/(\d+)deg/i);
    const angle = angleMatch ? angleMatch[1] : '0';

    const stops = matches.map((match) => ({
        color: match[1],
        percentage: match[2],
    }));

    if (stops.length === 0) {
        throw new Error('no parts found');
    }

    return { angle, stops };
};

const parseRadialGradient = (input: string) => {
    const matches = Array.from(input.matchAll(/((?:rgb|rgba)?a?\([^)]+\))\s+(\d+%)/gi));

    const stops = matches.map((match) => ({
        color: match[1],
        percentage: match[2],
    }));

    if (stops.length === 0) {
        throw new Error('no parts found');
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

    if (isGradientColor(config.colors.body)) {
        svgString += generateSVGGradient(config.colors.body, 'body');
    }
    if (isGradientColor(config.colors.eyeFrame.topLeft)) {
        svgString += generateSVGGradient(config.colors.eyeFrame.topLeft, 'eyeFrame');
    }
    if (isGradientColor(config.colors.eyeball.topLeft)) {
        svgString += generateSVGGradient(config.colors.eyeball.topLeft, 'eyeball');
    }

    return svgString;
};
