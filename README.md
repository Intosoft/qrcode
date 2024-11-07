 # [Intosoft QRCode](https://custoqr.com/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Intosoft/qrcode/blob/main/LICENSE)

Intosoft QRCode is a fully customizable open source QR code generator tool.

-   **Versatile and Customizable:** Fully color, style, content customization
-   **Seamless Integration:** Integrate Intosoft QRcode seamlessly into your existing tech stack, whether you're working with React, React Native, NodeJS, Vue.js, Angular, or pure JavaScript.

![Sample image](https://custoqr.com/sample.png)
### [Demo / Config generator tool](https://custoqr.com)

## Installation

NPM

```
npm i @intosoft/qrcode
```

Yarn

```
yarn add @intosoft/qrcode
```

## Examples

React

```jsx
import { generateSVGString } from '@intosoft/qrcode';

const config = {}; // Paste config here
const svgString = generateSVGString(config);

export const RenderQR = () => {
    return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};
```

React Native

First Install [react-native-svg](https://github.com/software-mansion/react-native-svg)
`npm i react-native-svg`

```jsx
import { QRCode } from "@intosoft/qrcode/native";

const config = {}; // Paste config here
// you can use locally imported image, url for the logo
// It support .svg too

export const RenderQR = () => {
    return <QRCode config={config} />;
};
```

Vanilla JS

```html
<!DOCTYPE html>
  <html>
    <body>
      <div id="svg-container"></div>
    </body>
    <script src="https://unpkg.com/@intosoft/qrcode@0.1.4/dist/iife/index.js"></script>
    <script>
      window.addEventListener("load", function () {
        const config = {}; //paste config here
        const svgString = window.qrcode.generateSVGString(config);
        document.getElementById("svg-container").innerHTML = svgString;
      });
    </script>
  </html>
```

VueJS
```vue
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { generateSVGString } from '@intosoft/qrcode';

export default defineComponent({
  setup() {
    const svgString = ref<string>('');

    onMounted(() => {
      const config = {}; // Paste config here
      svgString.value = generateSVGString(config);
    });

    return {
      svgString
    };
  }
});
</script>

<template>
<div v-html="svgString"></div>
</template>
```

Angular
```ts
import { Component,ChangeDetectorRef } from '@angular/core';
import { DomSanitizer, SafeHtml, } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { generateSVGString } from '@intosoft/qrcode';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<div [innerHTML]="svgString"></div>'
})
export class AppComponent  {
  title = 'angular';
  svgString: SafeHtml = "";
  constructor(private sanitizer: DomSanitizer,private cdr: ChangeDetectorRef) {}
  
  ngOnInit(): void {
    const config = {}; //paste config here
    const svgString = generateSVGString(config);
    this.svgString = this.sanitizer.bypassSecurityTrustHtml(svgString)
    this.cdr.detectChanges();
  }
}
  ```
  
  NodeJs
  ```js
const qrcode  = require("@intosoft/qrcode");

const config = {}; // paste config here
const svgString = qrcode.generateSVGString(config);
  ```


[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/sakulbudhathoki)

### License [MIT licensed](./LICENSE).

_QR Code is a registered trademark of DENSO WAVE INCORPORATED._
