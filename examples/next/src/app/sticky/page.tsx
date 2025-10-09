import React from 'react';
import { FullViewSnap, Controller, FullView, StickyView } from 'full-view-snap-react';

const StickyViewPage: React.FC = () => {
  return (
    <FullViewSnap
      hideScrollBars={true}
      render={(currentView, totalViews, scrollPercentage, contentScrollPercentage) => (
        <>
          <Controller>
            <FullView>
              <div style={{ 
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem'
              }}>
                <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>StickyView Demo</h1>
                <p style={{ fontSize: '1.2rem', textAlign: 'center', maxWidth: '600px' }}>
                  This example demonstrates the StickyView component that makes its children sticky with CSS.
                </p>
              </div>
            </FullView>

            <FullView>
              <div style={{ 
                background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                position: 'relative'
              }}>
                <StickyView top="20px" zIndex={10}>
                  <div style={{
                    background: 'rgba(0,0,0,0.8)',
                    color: 'white',
                    padding: '1rem 2rem',
                    borderRadius: '8px',
                    fontSize: '1.1rem',
                    fontWeight: 'bold',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                    🎯 This element is sticky!
                  </div>
                </StickyView>
                
                <div style={{ marginTop: '4rem' }}>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Scroll Down</h2>
                  <p style={{ fontSize: '1.1rem', textAlign: 'center', maxWidth: '500px' }}>
                    Notice how the sticky element stays in position as you scroll through the content.
                  </p>
                </div>
              </div>
            </FullView>

            <FullView>
              <div style={{ 
                background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                position: 'relative'
              }}>
                <StickyView top="50%" left="20px" zIndex={10}>
                  <div style={{
                    background: 'rgba(255,255,255,0.9)',
                    color: '#333',
                    padding: '0.8rem 1.5rem',
                    borderRadius: '20px',
                    fontSize: '0.9rem',
                    fontWeight: '600',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    transform: 'rotate(-5deg)'
                  }}>
                    📌 Side sticky!
                  </div>
                </StickyView>

                <div style={{ marginTop: '2rem' }}>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Multiple Sticky Elements</h2>
                  <p style={{ fontSize: '1.1rem', textAlign: 'center', maxWidth: '500px' }}>
                    You can have multiple sticky elements with different positions and styles.
                  </p>
                </div>
              </div>
            </FullView>

            <FullView>
              <div style={{ 
                background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
                color: 'white',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem',
                position: 'relative'
              }}>
                <StickyView bottom="20px" right="20px" zIndex={10}>
                  <div style={{
                    background: 'rgba(0,0,0,0.7)',
                    color: 'white',
                    padding: '1rem',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                  }}>
                    ⬆️
                  </div>
                </StickyView>

                <div>
                  <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Bottom Right Sticky</h2>
                  <p style={{ fontSize: '1.1rem', textAlign: 'center', maxWidth: '500px' }}>
                    Sticky elements can be positioned at any edge - top, bottom, left, or right.
                  </p>
                </div>
              </div>
            </FullView>
          </Controller>
        </>
      )}
    />
  );
};

export default StickyViewPage;
