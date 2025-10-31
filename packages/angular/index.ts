import {
    Component,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    Injectable,
    ElementRef,
    ViewChild,
    ChangeDetectorRef,
    NgModule,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { generateSVGString, ConfigInput } from '@intosoft/qrcode';

@Injectable({
    providedIn: 'root',
})
export class QRCodeService {
    generateQRCode(config: ConfigInput): Observable<string> {
        try {
            const svgString = generateSVGString(config);
            return of(svgString);
        } catch (error) {
            return of('').pipe(
                map(() => {
                    throw error;
                }),
            );
        }
    }

    downloadQRCode(config: ConfigInput, filename: string = 'qr-code.png'): void {
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
    }
}

@Component({
    selector: 'qr-code',
    template: `
        <div
            #qrContainer
            [innerHTML]="svgString"
            [attr.class]="className"
            [attr.style]="style"
            role="img"
            [attr.aria-label]="alt"
            [attr.title]="title"
            *ngIf="svgString && !error"
        ></div>
        <div
            [attr.class]="className"
            [attr.style]="style"
            role="img"
            aria-label="Failed to generate QR code"
            *ngIf="error"
        >
            <span>Failed to generate QR code: {{ error }}</span>
        </div>
    `,
    standalone: true,
    imports: [CommonModule],
})
export class QRCodeComponent implements OnChanges, OnDestroy {
    @Input() config!: ConfigInput;
    @Input() alt: string = 'QR Code';
    @Input() title?: string;
    @Input() className?: string;
    @Input() style?: string;

    @ViewChild('qrContainer', { static: false }) qrContainer!: ElementRef;

    svgString: string | null = null;
    error: string | null = null;

    private configSubject = new BehaviorSubject<ConfigInput | null>(null);

    constructor(
        private qrCodeService: QRCodeService,
        private cdr: ChangeDetectorRef,
    ) {
        this.configSubject.subscribe((config) => {
            if (config) {
                this.generateQRCode(config);
            }
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config'] && this.config) {
            this.configSubject.next(this.config);
        }
    }

    ngOnDestroy(): void {
        this.configSubject.complete();
    }

    private generateQRCode(config: ConfigInput): void {
        this.qrCodeService.generateQRCode(config).subscribe({
            next: (svg) => {
                this.svgString = svg;
                this.error = null;
                this.cdr.detectChanges();
            },
            error: (err) => {
                this.svgString = null;
                this.error = err instanceof Error ? err.message : 'Unknown error';
                this.cdr.detectChanges();
            },
        });
    }
}

@NgModule({
    imports: [CommonModule, QRCodeComponent],
    providers: [QRCodeService],
    exports: [QRCodeComponent],
})
export class QRCodeModule {}

export { ConfigInput } from '@intosoft/qrcode';
