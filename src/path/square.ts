interface GenerateItemPathProps {
    i: number;
    j: number;
    cellSize: number;
    height?: number;
    width?: number;
}

export const generateSquarePath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    let path = '';

    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    path += `M${x},${y}`;
    path += `h${width} v${height} h-${width} v-${height} `;

    return path;
};

export const generateDiamondPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    let path = '';

    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    const midX = x + width / 2;
    const midY = y + height / 2;

    path += `M${midX},${y}`;
    path += `L${x + width},${midY} `;
    path += `L${midX},${y + height} `;
    path += `L${x},${midY} `;
    path += `L${midX},${y} `;

    return path;
};

export const generateStarPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
    points = 5,
}: GenerateItemPathProps & { points?: number }) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const cx = cellSize * j + halfWidth;
    const cy = cellSize * i + halfHeight;
    const outerRadius = Math.min(halfWidth, halfHeight);
    const innerRadius = outerRadius / 2;

    let path = '';

    for (let i = 0; i < points; i++) {
        const outerX = cx + outerRadius * Math.cos((Math.PI * 2 * i) / points - Math.PI / 2);
        const outerY = cy + outerRadius * Math.sin((Math.PI * 2 * i) / points - Math.PI / 2);
        const innerX =
            cx + innerRadius * Math.cos((Math.PI * 2 * (i + 0.5)) / points - Math.PI / 2);
        const innerY =
            cy + innerRadius * Math.sin((Math.PI * 2 * (i + 0.5)) / points - Math.PI / 2);

        if (i === 0) {
            path += `M${outerX},${outerY} `;
        } else {
            path += `L${outerX},${outerY} `;
        }
        path += `${innerX},${innerY} `;
    }

    path += 'Z';

    return path;
};

export const generateOutlineSquarePath = ({
    x,
    y,
    length,
    cellSize,
}: {
    x: number;
    y: number;
    cellSize: number;
    length: number;
}) => {
    let path = '';

    path += `M${x + length},${y + length}`;
    path += `H${x}V${y}`;
    path += `H${x + length}Z`;

    path += `M${x + cellSize},${y + length - cellSize}`;
    path += `H${x + length - cellSize}V${y + cellSize}`;
    path += `H${x + cellSize}Z`;

    return path;
};

export const generateOutlineRoundedSquarePath = ({
    x,
    y,
    length,
    cellSize,
    roundedCorners,
}: {
    x: number;
    y: number;
    cellSize: number;
    length: number;
    roundedCorners: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
}) => {
    const dynamic1 = length * 0.267;
    const dynamic2 = length - dynamic1;
    const dynamic3 = dynamic1 - cellSize;

    let path = '';

    path += `M${x},${y + length}`;

    if (roundedCorners.includes('bottom-left')) {
        path += `H${x + dynamic1}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x},${y + dynamic2}`;
    } else {
        path += `H${x}`;
    }

    if (roundedCorners.includes('top-left')) {
        path += `V${y + dynamic1}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic1},${y}`;
    } else {
        path += `V${y}`;
    }

    if (roundedCorners.includes('top-right')) {
        path += `H${x + dynamic2}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + length},${y + dynamic1}`;
    } else {
        path += `H${x + length}`;
    }

    if (roundedCorners.includes('bottom-right')) {
        path += `V${y + dynamic2}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic2},${y + length}`;
    } else {
        path += `V${y + length}`;
    }

    path += `Z`;

    let pathFixMX = x + dynamic1;
    const pathFixMY = y + cellSize;
    let hDynamic2 = dynamic2;
    let vDynamic2 = dynamic2;

    const hDynamic3 = dynamic3;
    const vDynamic3 = dynamic3;

    if (!roundedCorners.includes('top-left')) {
        pathFixMX = x + cellSize;
    }

    if (!roundedCorners.includes('bottom-left')) {
        vDynamic2 = dynamic2 + cellSize / 1.25;
    }

    if (!roundedCorners.includes('bottom-right')) {
        hDynamic2 = dynamic2 + cellSize / 1.25;
    }

    path += `M${pathFixMX},${pathFixMY}`;
    if (roundedCorners.includes('top-left')) {
        path += `a${vDynamic3},${vDynamic3},0,0,0,-${vDynamic3},${vDynamic3}`;
        path += `V${y + vDynamic2}`;
    } else {
        path += `V${y + vDynamic2}`;
    }

    if (roundedCorners.includes('bottom-left')) {
        path += `a${hDynamic3},${hDynamic3},0,0,0,${hDynamic3},${hDynamic3}`;
        path += `H${x + hDynamic2}`;
    } else {
        path += `H${x + hDynamic2}`;
    }

    if (roundedCorners.includes('bottom-right')) {
        path += `a${vDynamic3},${vDynamic3},0,0,0,${vDynamic3}-${vDynamic3}`;
        path += `V${y + dynamic1}`;
    } else {
        path += `V${y + dynamic1}`;
    }

    if (roundedCorners.includes('top-right')) {
        path += `a${hDynamic3},${hDynamic3},0,0,0,-${hDynamic3}-${hDynamic3}`;
    } else {
        path += `V${y + cellSize}`;
    }

    path += `Z`;

    return path;
};

export const generateOutlineCirclePath = ({
    x,
    y,
    length,
    cellSize,
}: {
    x: number;
    y: number;
    cellSize: number;
    length: number;
}) => {
    let path = '';

    const radius = length / 2;
    path += `M${x + radius},${y + length}`;
    path += `A${radius},${radius},0,1,1,${length + x},${
        radius + y
    },${radius},${radius},0,0,1,${radius + x},${length + y}`;
    path += `Z`;
    path += `m${0},${-(length - cellSize)}`;
    path += `A${radius - cellSize},${radius - cellSize},0,1,0,${
        length - cellSize + x
    },${radius + y},${radius - cellSize},${radius - cellSize},0,0,0,${radius + x},${cellSize + y}`;
    path += `Z`;

    return path;
};

export const generateRoundedCornerEyeballPath = ({
    x,
    y,
    length,
    roundedCorners,
}: {
    x: number;
    y: number;
    cellSize: number;
    length: number;
    roundedCorners: ('top-left' | 'top-right' | 'bottom-left' | 'bottom-right')[];
}) => {
    let path = '';

    const dynamic1 = length * 0.267;
    const dynamic2 = length - dynamic1;

    path += `M${x},${y + length}`;
    if (roundedCorners.includes('bottom-left')) {
        path += `H${x + dynamic1}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x},${y + dynamic2}`;
    } else {
        path += `H${x}`;
        path += `A${0},${0},0,0,1,${x},${y}`;
    }
    if (roundedCorners.includes('top-left')) {
        path += `V${y + dynamic1}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic1},${y}`;
    } else {
        path += `V${y}`;
        path += `A${0},${0},0,0,1,${x + dynamic1},${y}`;
    }

    if (roundedCorners.includes('top-right')) {
        path += `H${x + dynamic2}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + length},${y + dynamic1}`;
    } else {
        path += `H${x}`;
        path += `A${0},${0},0,0,1,${x + length},${y}`;
    }

    if (roundedCorners.includes('bottom-right')) {
        path += `V${y + length - dynamic1}`;
        path += `A${dynamic1},${dynamic1},0,0,1,${x + dynamic2},${y + length}`;
    } else {
        path += `V${y + length}`;
        path += `H${x + dynamic2}`;
    }

    path += `Z`;

    return path;
};

export const generateHexagonPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const cx = cellSize * j + halfWidth;
    const cy = cellSize * i + halfHeight;
    const radius = Math.min(halfWidth, halfHeight);

    let path = '';

    for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        if (i === 0) {
            path += `M${x},${y} `;
        } else {
            path += `L${x},${y} `;
        }
    }

    path += 'Z';

    return path;
};

export const generateWavePath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    let path = '';

    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;
    
    const amplitude = width * 0.15;
    const frequency = 2;

    path += `M${x},${y + amplitude}`;
    
    for (let i = 0; i <= frequency; i++) {
        const px = x + (width / frequency) * i;
        const py = y + amplitude * (1 - Math.cos((Math.PI * 2 * i) / frequency));
        const cpx = px + width / (frequency * 2);
        const cpy = py + amplitude * Math.sin((Math.PI * (2 * i + 1)) / frequency);
        
        if (i < frequency) {
            path += `Q${cpx},${cpy},${px + width / frequency},${y + amplitude * (1 - Math.cos((Math.PI * 2 * (i + 1)) / frequency))}`;
        }
    }
    
    path += `L${x + width},${y + height - amplitude}`;
    
    for (let i = frequency; i >= 0; i--) {
        const px = x + (width / frequency) * i;
        const py = y + height - amplitude * (1 - Math.cos((Math.PI * 2 * i) / frequency));
        const cpx = px - width / (frequency * 2);
        const cpy = py - amplitude * Math.sin((Math.PI * (2 * i - 1)) / frequency);
        
        if (i > 0) {
            path += `Q${cpx},${cpy},${px - width / frequency},${y + height - amplitude * (1 - Math.cos((Math.PI * 2 * (i - 1)) / frequency))}`;
        }
    }
    
    path += `L${x},${y + amplitude}Z`;

    return path;
};

// ====== NEW SHAPES (v2.0) ======

export const generateLeafPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    const cx = x + width / 2;
    const cy = y + height / 2;
    
    // Teardrop/leaf shape using bezier curves
    path += `M${cx},${y}`;
    path += `C${x + width},${y + height * 0.3},${x + width},${y + height * 0.7},${cx},${y + height}`;
    path += `C${x},${y + height * 0.7},${x},${y + height * 0.3},${cx},${y}Z`;

    return path;
};

export const generatePetalPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    const cx = x + width / 2;
    const cy = y + height / 2;
    const radius = Math.min(width, height) / 2;
    
    // Flower petal using quadratic curves
    path += `M${cx},${cy}`;
    path += `Q${x + width},${y},${cx + radius},${cy}`;
    path += `Q${x + width},${y + height},${cx},${cy}`;
    path += `Q${x},${y + height},${cx - radius},${cy}`;
    path += `Q${x},${y},${cx},${cy}Z`;

    return path;
};

export const generateOctagonPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const halfWidth = width / 2;
    const halfHeight = height / 2;
    const cx = cellSize * j + halfWidth;
    const cy = cellSize * i + halfHeight;
    const radius = Math.min(halfWidth, halfHeight);

    let path = '';

    for (let i = 0; i < 8; i++) {
        const angle = (Math.PI / 4) * i - Math.PI / 2;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);

        if (i === 0) {
            path += `M${x},${y} `;
        } else {
            path += `L${x},${y} `;
        }
    }

    path += 'Z';

    return path;
};

export const generateCrossPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    const barWidth = width * 0.3;
    const barHeight = height * 0.3;
    const cx = x + width / 2;
    const cy = y + height / 2;
    
    // Vertical bar
    path += `M${cx - barWidth / 2},${y}`;
    path += `L${cx + barWidth / 2},${y}`;
    path += `L${cx + barWidth / 2},${y + height}`;
    path += `L${cx - barWidth / 2},${y + height}Z`;
    
    // Horizontal bar
    path += `M${x},${cy - barHeight / 2}`;
    path += `L${x + width},${cy - barHeight / 2}`;
    path += `L${x + width},${cy + barHeight / 2}`;
    path += `L${x},${cy + barHeight / 2}Z`;

    return path;
};

export const generatePillPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize * 0.9;
    const width = _width || cellSize * 0.9;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    const radius = Math.min(width, height) / 2;
    
    // Rounded rectangle (pill shape)
    path += `M${x + radius},${y}`;
    path += `L${x + width - radius},${y}`;
    path += `A${radius},${radius},0,0,1,${x + width - radius},${y + height}`;
    path += `L${x + radius},${y + height}`;
    path += `A${radius},${radius},0,0,1,${x + radius},${y}Z`;

    return path;
};

export const generateCrystalPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    const cx = x + width / 2;
    const cy = y + height / 2;
    
    // Sharp crystal/gem shape
    path += `M${cx},${y}`;
    path += `L${x + width * 0.75},${y + height * 0.25}`;
    path += `L${x + width},${cy}`;
    path += `L${x + width * 0.75},${y + height * 0.75}`;
    path += `L${cx},${y + height}`;
    path += `L${x + width * 0.25},${y + height * 0.75}`;
    path += `L${x},${cy}`;
    path += `L${x + width * 0.25},${y + height * 0.25}Z`;

    return path;
};

export const generateBubblePath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    const mainRadius = Math.min(width, height) * 0.35;
    const cx = x + width / 2;
    const cy = y + height / 2;
    
    // Main bubble circle
    path += `M${cx + mainRadius},${cy}`;
    path += `A${mainRadius},${mainRadius},0,1,1,${cx - mainRadius},${cy}`;
    path += `A${mainRadius},${mainRadius},0,0,1,${cx + mainRadius},${cy}Z`;

    return path;
};

export const generateTribalPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    const cx = x + width / 2;
    
    // Sharp tribal-inspired triangular pattern
    path += `M${cx},${y}`;
    path += `L${x + width * 0.8},${y + height * 0.4}`;
    path += `L${x + width},${y + height * 0.6}`;
    path += `L${cx},${y + height}`;
    path += `L${x},${y + height * 0.6}`;
    path += `L${x + width * 0.2},${y + height * 0.4}Z`;

    return path;
};

export const generateZigzagPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    
    // Lightning/zigzag shape
    path += `M${x + width * 0.6},${y}`;
    path += `L${x + width * 0.3},${y + height * 0.4}`;
    path += `L${x + width * 0.7},${y + height * 0.4}`;
    path += `L${x + width * 0.4},${y + height}`;
    path += `L${x + width},${y + height * 0.5}`;
    path += `L${x + width * 0.5},${y + height * 0.5}`;
    path += `L${x + width},${y}Z`;

    return path;
};

export const generateSpiralPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    const cx = x + width / 2;
    const cy = y + height / 2;
    const maxRadius = Math.min(width, height) / 2;
    
    // Simple spiral approximation using arcs
    const turns = 2;
    const segments = 8;
    
    for (let i = 0; i <= segments; i++) {
        const angle = (Math.PI * 2 * turns * i) / segments;
        const radius = (maxRadius * i) / segments;
        const px = cx + radius * Math.cos(angle);
        const py = cy + radius * Math.sin(angle);
        
        if (i === 0) {
            path += `M${px},${py}`;
        } else {
            path += `L${px},${py}`;
        }
    }

    return path;
};

export const generateNeonPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize * 0.9;
    const width = _width || cellSize * 0.9;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    const radius = height / 4;
    
    // Rounded bar (neon tube style)
    path += `M${x + radius},${y}`;
    path += `L${x + width - radius},${y}`;
    path += `A${radius},${radius},0,0,1,${x + width - radius},${y + height}`;
    path += `L${x + radius},${y + height}`;
    path += `A${radius},${radius},0,0,1,${x + radius},${y}Z`;

    return path;
};

export const generateTechPath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
}: GenerateItemPathProps) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    let path = '';
    const notchSize = width * 0.15;
    
    // Circuit board / tech aesthetic with corner notches
    path += `M${x + notchSize},${y}`;
    path += `L${x + width - notchSize},${y}`;
    path += `L${x + width},${y + notchSize}`;
    path += `L${x + width},${y + height - notchSize}`;
    path += `L${x + width - notchSize},${y + height}`;
    path += `L${x + notchSize},${y + height}`;
    path += `L${x},${y + height - notchSize}`;
    path += `L${x},${y + notchSize}Z`;

    return path;
};

interface GenerateTrianglePath extends GenerateItemPathProps {
    direction: 'top' | 'left' | 'right' | 'bottom';
}

export const generateTrianglePath = ({
    i,
    j,
    width: _width,
    height: _height,
    cellSize,
    direction,
}: GenerateTrianglePath) => {
    const height = _height || cellSize;
    const width = _width || cellSize;
    let path = '';

    const x = cellSize * j + (cellSize - width) / 2;
    const y = cellSize * i + (cellSize - height) / 2;

    switch (direction) {
        case 'top':
            path += `M${x + width / 2},${y}`;
            path += `l${width / 2},${height} l${-width},${0} Z`;
            break;
        case 'left':
            path += `M${x},${y + height / 2}`;
            path += `l${width},${height / 2} l${0},${-height} Z`;
            break;
        case 'right':
            path += `M${x + width},${y + height / 2}`;
            path += `l${-width},${height / 2} l${0},${-height} Z`;
            break;
        case 'bottom':
            path += `M${x + width / 2},${y + height}`;
            path += `l${width / 2},${-height} l${-width},${0} Z`;
            break;
        default:
            break;
    }

    return path;
};
