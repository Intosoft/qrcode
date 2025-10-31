import { defineComponent, computed, ref, watch, PropType } from 'vue';
import { generateSVGString, ConfigInput } from '@intosoft/qrcode';

export const QRCode = defineComponent({
    name: 'QRCode',
    props: {
        config: {
            type: Object as PropType<ConfigInput>,
            required: true,
        },
        alt: {
            type: String,
            default: 'QR Code',
        },
        title: {
            type: String,
            default: undefined,
        },
        class: {
            type: String,
            default: undefined,
        },
    },
    setup(props) {
        const svgString = computed(() => {
            try {
                return generateSVGString(props.config);
            } catch (error) {
                console.error('Failed to generate QR code:', error);
                return null;
            }
        });

        return {
            svgString,
        };
    },
    template: `
        <div 
            v-if="svgString"
            v-html="svgString"
            :class="$props.class"
            role="img"
            :aria-label="alt"
            :title="title"
        />
        <div 
            v-else
            :class="$props.class"
            role="img"
            aria-label="Failed to generate QR code"
        >
            <span>Failed to generate QR code</span>
        </div>
    `,
});

export const useQRCode = (config: ConfigInput | Ref<ConfigInput>) => {
    const svgString = ref<string | null>(null);
    const error = ref<string | null>(null);

    const generateQR = () => {
        try {
            const configValue =
                typeof config === 'object' && 'value' in config ? config.value : config;
            svgString.value = generateSVGString(configValue);
            error.value = null;
        } catch (err) {
            svgString.value = null;
            error.value = err instanceof Error ? err.message : 'Unknown error';
        }
    };

    generateQR();

    if (typeof config === 'object' && 'value' in config) {
        watch(config, generateQR, { deep: true });
    }

    return {
        svgString: readonly(svgString),
        error: readonly(error),
        regenerate: generateQR,
    };
};

export const useQRCodeDownload = (config: ConfigInput | Ref<ConfigInput>) => {
    const downloadQR = (filename: string = 'qr-code.png') => {
        try {
            const configValue =
                typeof config === 'object' && 'value' in config ? config.value : config;
            const svgString = generateSVGString(configValue);

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

    return downloadQR;
};

import { Ref, readonly } from 'vue';
