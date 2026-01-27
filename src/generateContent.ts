export type WifiEncryption = 'nopass' | 'WEP' | 'WPA' | 'WPA2';

export interface GenerateWifiParam {
    ssid: string;
    password?: string;
    encryption?: WifiEncryption;
    hidden?: boolean;
}

const escapeWifiString = (str: string): string => {
    return str.replace(/[\\;,:"]/g, '\\$&');
};

const generateWifi = (param: GenerateWifiParam): string => {
    const ssid = escapeWifiString(param.ssid);
    const password = param.password ? escapeWifiString(param.password) : '';
    const encryption = param.encryption || (password ? 'WPA' : 'nopass');
    const hidden = param.hidden ? 'H:true;' : '';
    return `WIFI:T:${encryption};S:${ssid};P:${password};${hidden};`;
};

export interface GenerateEmailParam {
    email: string;
    subject?: string;
    body?: string;
    cc?: string;
    bcc?: string;
}

const generateEmail = (param: GenerateEmailParam): string => {
    const params: string[] = [];
    if (param.subject) params.push(`subject=${encodeURIComponent(param.subject)}`);
    if (param.body) params.push(`body=${encodeURIComponent(param.body)}`);
    if (param.cc) params.push(`cc=${encodeURIComponent(param.cc)}`);
    if (param.bcc) params.push(`bcc=${encodeURIComponent(param.bcc)}`);
    
    const queryString = params.length > 0 ? `?${params.join('&')}` : '';
    return `mailto:${encodeURIComponent(param.email)}${queryString}`;
};

export type GenerateTelParam = string | number;

const generateTel = (tel: GenerateTelParam): string => `tel:${String(tel).replace(/\s/g, '')}`;

export interface GenerateLocationParam {
    latitude: number;
    longitude: number;
    label?: string;
    zoom?: number;
}

const generateLocation = (param: GenerateLocationParam): string => {
    const { latitude, longitude, label, zoom } = param;
    const coords = `${latitude},${longitude}`;
    const query = label ? encodeURIComponent(label) : coords;
    const zoomParam = zoom ? `&z=${zoom}` : '';
    return `geo:${coords}?q=${query}${zoomParam}`;
};

export interface GenerateSmsParam {
    phone: string | number;
    message?: string;
}

const generateSms = (param: GenerateSmsParam): string => {
    const phone = String(param.phone).replace(/\s/g, '');
    const body = param.message ? `?body=${encodeURIComponent(param.message)}` : '';
    return `sms:${phone}${body}`;
};

export interface GenerateVCardParam {
    firstName: string;
    lastName?: string;
    organization?: string;
    title?: string;
    email?: string;
    phone?: string;
    mobile?: string;
    fax?: string;
    address?: {
        street?: string;
        city?: string;
        state?: string;
        zip?: string;
        country?: string;
    };
    website?: string;
    note?: string;
}

const generateVCard = (param: GenerateVCardParam): string => {
    const lines: string[] = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${param.lastName || ''};${param.firstName};;;`,
        `FN:${param.firstName}${param.lastName ? ` ${param.lastName}` : ''}`,
    ];

    if (param.organization) lines.push(`ORG:${param.organization}`);
    if (param.title) lines.push(`TITLE:${param.title}`);
    if (param.email) lines.push(`EMAIL:${param.email}`);
    if (param.phone) lines.push(`TEL;TYPE=WORK,VOICE:${param.phone}`);
    if (param.mobile) lines.push(`TEL;TYPE=CELL:${param.mobile}`);
    if (param.fax) lines.push(`TEL;TYPE=FAX:${param.fax}`);
    if (param.website) lines.push(`URL:${param.website}`);
    if (param.note) lines.push(`NOTE:${param.note}`);
    
    if (param.address) {
        const { street = '', city = '', state = '', zip = '', country = '' } = param.address;
        lines.push(`ADR;TYPE=WORK:;;${street};${city};${state};${zip};${country}`);
    }

    lines.push('END:VCARD');
    return lines.join('\n');
};

export interface GenerateEventParam {
    title: string;
    start: Date;
    end?: Date;
    location?: string;
    description?: string;
    allDay?: boolean;
}

const formatDateForVEvent = (date: Date, allDay?: boolean): string => {
    if (allDay) {
        return date.toISOString().slice(0, 10).replace(/-/g, '');
    }
    return date.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
};

const generateEvent = (param: GenerateEventParam): string => {
    const lines: string[] = [
        'BEGIN:VEVENT',
        `SUMMARY:${param.title}`,
        `DTSTART${param.allDay ? ';VALUE=DATE' : ''}:${formatDateForVEvent(param.start, param.allDay)}`,
    ];

    if (param.end) {
        lines.push(`DTEND${param.allDay ? ';VALUE=DATE' : ''}:${formatDateForVEvent(param.end, param.allDay)}`);
    }
    if (param.location) lines.push(`LOCATION:${param.location}`);
    if (param.description) lines.push(`DESCRIPTION:${param.description}`);

    lines.push('END:VEVENT');
    return `BEGIN:VCALENDAR\nVERSION:2.0\n${lines.join('\n')}\nEND:VCALENDAR`;
};

type GenerateContentType = 'wifi' | 'email' | 'tel' | 'location' | 'sms' | 'vcard' | 'event';

export const generateContentString = <
    T extends GenerateContentType,
    Param extends T extends 'wifi'
        ? GenerateWifiParam
        : T extends 'email'
          ? GenerateEmailParam
          : T extends 'tel'
            ? GenerateTelParam
            : T extends 'location'
              ? GenerateLocationParam
              : T extends 'sms'
                ? GenerateSmsParam
                : T extends 'vcard'
                  ? GenerateVCardParam
                  : T extends 'event'
                    ? GenerateEventParam
                    : never,
>(
    type: T,
    param: Param,
): string => {
    switch (type) {
        case 'wifi':
            return generateWifi(param as GenerateWifiParam);
        case 'email':
            return generateEmail(param as GenerateEmailParam);
        case 'tel':
            return generateTel(param as GenerateTelParam);
        case 'location':
            return generateLocation(param as GenerateLocationParam);
        case 'sms':
            return generateSms(param as GenerateSmsParam);
        case 'vcard':
            return generateVCard(param as GenerateVCardParam);
        case 'event':
            return generateEvent(param as GenerateEventParam);
        default:
            return '';
    }
};
