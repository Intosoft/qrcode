export type WifiEncryption = 'nopass' | 'WEP' | 'WPA';

export interface GenerateWifiParam {
    ssid: string;
    password: string;
    encryption: WifiEncryption;
}

const generateWifi = (param: GenerateWifiParam) =>
    `WIFI:S:${param.ssid || ''};T:${param.encryption || 'nopass'};P:${param.password || ''};;`;

export interface GenerateEmailParam {
    email: string;
    subject?: string;
    body?: string;
}
const generateEmail = (param: GenerateEmailParam) => {
    let dataString = `mailto:${param.email}`;

    if (param.subject || param.body) {
        dataString += `?subject=${param.subject || ''}&body=${param.body || ''}`;
    }
    return dataString;
};

export type GenerateTelParam = string | number;

const generateTel = (tel: GenerateTelParam) => `tel:${tel}`;

export interface GenerateLocationParam {
    latitude: string | number;
    longitude: string | number;
}

const generateLocation = (param: GenerateLocationParam) =>
    `https://maps.google.com/local?q=${param.latitude || ''},${param.longitude}`;

type GenerateContentType = 'wifi' | 'email' | 'tel' | 'location';

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
        default:
            return '';
    }
};
