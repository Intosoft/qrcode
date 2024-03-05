<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import { generateSVGString } from  '@intosoft/qrcode';


const config = {
    "length": 200,
    "value": "https://intosoft.com",
    "logo": {
        "url": "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjIuMSAxOTQuNyI+PGRlZnM+PHN0eWxlPi5jbHMtMXtmaWxsOiM0MmM5ODU7fS5jbHMtMntmaWxsOiM2NmJmODM7fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJMYXllcl8yIiBkYXRhLW5hbWU9IkxheWVyIDIiPjxnIGlkPSJMYXllcl8xLTIiIGRhdGEtbmFtZT0iTGF5ZXIgMSI+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNOTQuMzYsNzUuNTljMTguMzksMTkuNzUsMTguNzYsNDkuMjguODIsNjZsLTUuMjQsNC44Ny03LjQ5LDctMy4xNSwzLjEyTDQwLjQ3LDE5Mi44N2E2Ljc3LDYuNzcsMCwwLDEtOS41Ny0uMzFMMCwxNTkuNTVsMTguNi0xNy40MWEyMi43OCwyMi43OCwwLDAsMSwxLjU5LTEuNjhsLjE1LS4xNCw4LjE3LTcuNjIsOS4wOS04LjQ3LjkyLS44NywxMS4yNy0xMC41MWExOSwxOSwwLDAsMCwxMi40NSwzLjYzLDE5LjE2LDE5LjE2LDAsMSwwLTE3LjQ0LTlMMzEuMTQsMTIwLjI1QTEuODEsMS44MSwwLDAsMSwyOC42LDEyMGwtLjg2LS45MkM5LjM1LDk5LjM3LDksNjkuODQsMjYuOTIsNTMuMTZMMzkuNjUsNDEuMzFsMzgtMzUuNzZMNzIsMTAuODhsOS42NC05LjA2YTYuNzMsNi43MywwLDAsMSw5LjUyLjMxbDMwLjkyLDMzTDEwMy41LDUyLjU3YTIwLjg1LDIwLjg1LDAsMCwxLTEuNTksMS42OGwtLjE1LjE0TDkzLjYsNjIsODcuMDcsNjguMWw2LjE1LDYuMzJaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNOTQuMzYsNzUuNTlsLTEuMTQtMS4xN2EyLjI2LDIuMjYsMCwwLDEsLjI5LjI1WiIvPjwvZz48L2c+PC9zdmc+",
        "height": 70,
        "width": 105
    },
    "shapes": {
        "eyeFrame": "circle",
        "body": "rounded-vertical",
        "eyeball": "body-square"
    },
    "colors": {
        "background": "white",
        "body": "linear-gradient(90deg, rgba(255,31,234,1) 4%, RGBA(225,147,129,1) 35%, rgba(0,212,255,1) 100%)",
        "eyeFrame": {
            "topLeft": "body",
            "topRight": "body",
            "bottomLeft": "body"
        },
        "eyeball": {
            "topLeft": "body",
            "topRight": "body",
            "bottomLeft": "body"
        }
    }
}

const svgString = generateSVGString(config);


</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" :src="svgString" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
