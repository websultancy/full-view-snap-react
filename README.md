# full-view-snap-react

A React component library for viewport level vertical scroll snapping with integrated navigation and reusable UI components.

## Why full-view-snap-react?

Unlike many JavaScript-based scroll snap plugins that attempt to recreate or unify scrolling behavior, **full-view-snap-react** is an optimized, cross-platform tested wrapper that leverages native CSS scroll snapping. This approach allows modern browsers (especially through touch gestures) to deliver the smoothest and most performant scrolling experience possible.

This react library aims to take the burdon away from the developr and checks for browser suppport / features to help deliver the best native scroll snapping experience possible.

Many other plugins restrict users to navigating one section at a time, which can feel cumbersome and unnatural. Some try to recreate momentum scrolling but struggle to get snap points right. Native scroll snapping, as used in this package, excels at handling momentum and snap points across all browsers, letting users scroll naturally and efficiently.

## Live Demo

You can view a live demo [here](https://dgan8ja2q09by.cloudfront.net/vite).

## Example

[`examples/vite/src`](./examples/vite/src) for live code examples.
[`examples/next/src`](./examples/next/src) for live code examples.

## Installation

To install the package, run:

```
npm install full-view-snap-react
```

<!-- github_only -->
## Browsers support

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/samsung-internet/samsung-internet_48x48.png" alt="Samsung" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Samsung | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari-ios/safari-ios_48x48.png" alt="iOS Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>iOS Safari |
| --------- | --------- | --------- | --------- | --------- | --------- |
| 16 (Ventura) | Edge 123+| Android 9+ | 110+ | 110+ | 16+ |
| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome iOS" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome iOS | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox iOS" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox iOS | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome Android" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome Android | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox Android" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox Android |  |  |
| 132+ (IOS 16+) | 141+ (IOS 16+) | 128+ (Android 10+) | v140+ (Android 9+) |  |  |
<!-- /github_only -->


## Usage

### FullViewSnap

`FullViewSnap` is the primary component for vertical scroll snapping with navigation.

#### Props

- `children` (optional): React nodes to be rendered as snap sections.
- `hideScrollBars` (optional): A boolean that determines whether to hide scroll bars
  - `true`: Scroll bars will be hidden
  - `false` (default): Scroll bars will be visible
- `render`: A function that receives the current view state and returns React nodes to be rendered as snap sections.
  - `currentView`: The current view index (0-based)
  - `totalViews`: The total number of views
  - `scrollPercentage`: The current scroll percentage including overscroll spacing
  - `contentScrollPercentage`: The content scroll percentage
  - `rootScrollerContext`: Context object with scroll control methods

#### Example

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FullViewSnap, Controller, FullView } from 'full-view-snap-react';

const App = () => (
  <FullViewSnap
    hideScrollBars={true} // Optional: hide scroll bars
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

#### Hide Scroll Bars Feature

The `hideScrollBars` prop allows you to hide scroll bars while maintaining full scroll functionality. When enabled, it applies cross-browser CSS that hides scroll bars:

- **Firefox**: Uses `scrollbar-width: none`
- **IE and Edge**: Uses `-ms-overflow-style: none`
- **Chrome, Safari, Opera**: Uses `::-webkit-scrollbar { display: none }`

This works with both fixed viewport and document element scrolling modes.

### FullViewSnapContext

The `FullViewSnapContext` provides access to the current scroll state and allows you to update it programmatically.

#### Context Value

```typescript
interface FullViewSnapContextProps {
  contextState: {
    currentIndex: number;                    // Current view index (0-based)
    currentScrollPercentage: number;         // Current scroll percentage
    totalViews: number;                      // Total number of views
    currentContentScrollPercentage: number;  // Content scroll percentage
    rootScrollerContext: RootScrollerContextProps; // Access to scroll control methods
    edgeSpacerRef?: React.RefObject<HTMLDivElement | null>; // Edge spacer reference
  };
  updateContextState: (newState: contextStateProps) => void; // Function to update context state
}
```

#### Usage Example

```javascript
import { FullViewSnapContext } from 'full-view-snap-react';
import { useContext } from 'react';

function MyComponent() {
  const { contextState, updateContextState } = useContext(FullViewSnapContext);
  
  console.log('Current view:', contextState.currentIndex);
  console.log('Total views:', contextState.totalViews);
  console.log('Scroll percentage:', contextState.currentScrollPercentage);
  
  return (
    <div>
      <p>Current View: {contextState.currentIndex + 1} of {contextState.totalViews}</p>
    </div>
  );
}
```

### RootScrollerContext

The `RootScrollerContext` provides low-level access to scroll control methods and references.

#### Context Value

```typescript
interface RootScrollerContextProps {
  rootScrollerRef: MutableRefObject<HTMLDivElement | HTMLElement> | null; // Reference to the scroll container
  isFixedViewport: boolean | null; // Whether using fixed viewport mode
  scrollToView?: (index: number, speed?: number) => void; // Scroll to specific view
  slideRefs?: React.MutableRefObject<HTMLDivElement[]>[]; // Array of slide references
  setSlideRefs: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement | null>[]>>; // Set slide references
  suspendScrollSnap?: (duration?: number) => void; // Temporarily disable scroll snapping
  instateScrollSnap?: () => void; // Re-enable scroll snapping
}
```

#### Usage Example

```javascript
import { RootScrollerContext } from 'full-view-snap-react';
import { useContext } from 'react';

function NavigationComponent() {
  const { scrollToView, suspendScrollSnap, instateScrollSnap } = useContext(RootScrollerContext);
  
  const handleJumpToView = (index) => {
    // Suspend scroll snapping temporarily
    suspendScrollSnap(1000);
    
    // Scroll to specific view
    scrollToView(index, 0); // 0 = instant jump, other values = smooth scroll
    
    // Re-enable scroll snapping after 1 second
    setTimeout(() => {
      instateScrollSnap();
    }, 1000);
  };
  
  return (
    <div>
      <button onClick={() => handleJumpToView(0)}>Go to First View</button>
      <button onClick={() => handleJumpToView(2)}>Go to Third View</button>
    </div>
  );
}
```

#### Scroll Control Methods

- **`scrollToView(index, speed)`**: Scroll to a specific view
  - `index`: View index to scroll to (0-based)
  - `speed`: Scroll speed in milliseconds (0 = instant, >0 = smooth scroll)

- **`suspendScrollSnap(duration)`**: Temporarily disable scroll snapping
  - `duration`: Duration in milliseconds to suspend snapping (default: 1400ms)

- **`instateScrollSnap()`**: Re-enable scroll snapping immediately

> **Limitation:**  
> This component library is intended for use on the root viewport and requires the ReactDOM root to be document.body
>
>The FullViewSnap component should be rendered as direct child of Body

## License

This project is licensed under the MIT License.
