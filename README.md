# full-view-snap-react

A React component library for viewport level vertical scroll snapping with integrated navigation and reusable UI components.

## Live Demo

You can view a live demo [here](https://dgan8ja2q09by.cloudfront.net/vite).

## Why full-view-snap-react?

Unlike many JavaScript-based scroll snap plugins that attempt to recreate or unify scrolling behavior, **full-view-snap-react** is an optimized, cross-platform tested wrapper that leverages native CSS scroll snapping. This approach allows modern browsers (especially through touch gestures) to deliver the smoothest and most performant scrolling experience possible.

Many other plugins restrict users to navigating one section at a time, which can feel cumbersome and unnatural. Some try to recreate momentum scrolling but struggle to get snap points right. Native scroll snapping, as used in this package, excels at handling momentum and snap points across all browsers, letting users scroll naturally and efficiently.

## Installation

To install the package, run:

```
npm install full-view-snap-react
```

<!-- github_only -->
## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- | --------- |
| 2025| Edge 123+| 2025| 2025| 2025| 2025
<!-- /github_only -->


## Usage

### FullViewSnap

`FullViewSnap` is the primary component for vertical scroll snapping with navigation.

#### Props

- `children`: React nodes to be rendered as snap sections.
- Additional props as documented in the source.

#### Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FullViewSnap, Controller, FullView } from 'full-view-snap-react';

const App = () => (
  <FullViewSnap
    render={(
      currentView,
      totalViews,
      scrollPercentage,
      contentScrollPercentage
    ) => (
      <>
        <Controller>
          <FullView>
            <h1>view 1</h1>
          </FullView>
          <FullView>
            <h1>view 2</h1>
          </FullView>
          <FullView>
            <h1>view 3</h1>
          </FullView>
        </Controller>
      </>
    )}
  />
);

const root = ReactDOM.createRoot(document.body);
root.render(<App />);
```

> **Note:**  
> To see more features and uses, please refer to our [live demo](https://dgan8ja2q09by.cloudfront.net/vite).
>
> You can also review the code in [`examples/vite/src`](./examples/vite/src) for more implementation details.

## License

This project is licensed under the MIT License.
