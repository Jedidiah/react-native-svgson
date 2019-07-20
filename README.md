# React Native Svgson

This package glues together the wonderful [react-native-svg](https://github.com/react-native-community/react-native-svg) and [svgson](https://github.com/elrumordelaluz/svgson). It works in React Native and Web via [React Native Web](https://github.com/necolas/react-native-web).

## Usage

```
yarn install react-native-svgson react-native-svg lodash

// If you are using this on the web you also need react-native-web
yarn install react-native-web
```

```
import { Svgson } from 'react-native-svgson';
import exampleSvgJson from './exampleSvg.json';
```

```
<Svgson src={exampleSvgJson} />
```
