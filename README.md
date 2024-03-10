# [Intosoft CustoQR](https://custoqr.com/) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Intosoft/qrcode/blob/main/LICENSE)

Intosoft CustoQR is a fully customizable open source QR code generator tool.

-   **Versatile and Customizable:** Fully color, style, content customization
-   **Seamless Integration:** Integrate Intosoft QRcode seamlessly into your existing tech stack, whether you're working with React, React Native, NodeJS, Vue.js, Angular, or pure JavaScript.

![Sample image](https://custoqr.com/sample.png)
### [Demo / Config generator tool](https://custoqr.com)

## Installation

NPM

```
npm i @intosoft/custoqr
```

Yarn

```
yarn add @intosoft/custoqr
```

## Examples

React

```jsx
import { generateSVGString } from '@intosoft/custoqr';

const config = {}; // Paste config here
const svgString = generateSVGString(config);

export const RenderQR = () => {
    return <div dangerouslySetInnerHTML={{ __html: svgString }} />;
};
```

React Native

First Install [react-native-svg](https://github.com/software-mansion/react-native-svg)

```jsx
import { SvgFromXml } from 'react-native-svg';
import { generateSVGString } from '@intosoft/custoqr';

const config = {}; // Paste config here
const svgString = generateSVGString(config);

export const RenderQR = () => {
    return <SvgFromXml xml={svgString} />;
};
```

Vanilla JS

```html
<!DOCTYPE html>
  <html>
    <body>
      <div id="svg-container"></div>
    </body>
    <script src="https://unpkg.com/@intosoft/custoqr@0.0.4/dist/index-standalone.js"></script>
    <script>
      window.addEventListener("load", function () {
        const config = {}; //paste config here
        const svgString = window.custoqr.generateSVGString(config);
        document.getElementById("svg-container").innerHTML = svgString;
      });
    </script>
  </html>
```

VueJS
```vue
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { generateSVGString } from '@intosoft/custoqr';

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
import { generateSVGString } from '@intosoft/custoqr';

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
const custoqr  = require("@intosoft/custoqr");

const config = {}; // paste config here
const svgString = custoqr.generateSVGString(config);
  ```


[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/sakulbudhathoki)

### License [MIT licensed](./LICENSE).

_QR Code is a registered trademark of DENSO WAVE INCORPORATED._
