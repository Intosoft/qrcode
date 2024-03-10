import { Config } from '../config';

export const isGradientColor = (color: string) =>
    color.includes('linear-gradient') || color.includes('radial-gradient');

const parseLinearGradient = (input: string) => {
    const parts = input.match(
        /(\d+)deg|rgba?\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)|RGB\(\d+,\s*\d+,\s*\d+\)/g,
    );
    if (!parts) {
        throw new Error('no parts found');
    }
    const angle = parts[0].split('deg')[0];
    const stops = parts.slice(1).map((part) => {
        let color;
        let percentage;
        if (part.includes('rgba')) {
            [color] = part.split(' ');
            [, percentage] = part.split(' ');
        } else if (part.includes('RGB')) {
            color = part;
            percentage = null;
        }
        return { color, percentage };
    });
    return { angle, stops };
};

const parseRadialGradient = (input: string) => {
    const parts = input.match(/rgba?\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\)/g);
    if (!parts) {
        throw new Error('no parts found');
    }
    const stops = parts.map((part, index) => {
        const percentageMatch = input.match(/(\d+)%/g);
        const percentage = percentageMatch && percentageMatch[index];
        return { color: part, percentage };
    });
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
