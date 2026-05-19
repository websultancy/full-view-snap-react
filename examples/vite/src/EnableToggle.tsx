import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FullViewSnap, FullView, Controller } from "full-view-snap-react";
import "./Basic.css";
import "./EnableToggle.css";

function EnabledToggleButton({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      className="full-view-enabled-toggle"
      onClick={onToggle}
    >
      <div className="full-view-stat-title">Enabled</div>
      <div className="full-view-stat-value">{String(enabled)}</div>
    </button>
  );
}

function EnableToggle() {
  const [enabled, setEnabled] = useState(true);
  const toggleEnabled = () => setEnabled((prev) => !prev);

  useEffect(() => {
    document.body.classList.toggle("enable-toggle-snap-off", !enabled);
    return () => {
      document.body.classList.remove("enable-toggle-snap-off");
    };
  }, [enabled]);

  return (
    <FullViewSnap
      enabled={enabled}
      render={() => (
        <>
          {!enabled && (
            <div className="enable-toggle-back-bar">
              <Link to="/" className="enable-toggle-back-link">
                ← More Examples
              </Link>
            </div>
          )}
          <Controller>
            <FullView>
              <div className="full-view-wrapper">
                <div className="full-view-wrapper-content">
                  <p>
                    If your viewport height is too small to support full-view snap, you
                    can disable it at runtime with the <code>enabled</code> prop.
                  </p>
                  <EnabledToggleButton enabled={enabled} onToggle={toggleEnabled} />
                </div>
              </div>
            </FullView>
            <FullView>
              <div className="full-view-wrapper">
                <div className="full-view-wrapper-content">
                  <p>
                    This gives you a responsive fallback when content does not fit the
                    viewport—without changing your slide structure.
                  </p>
                </div>
              </div>
            </FullView>
            <FullView>
              <div className="full-view-wrapper">
                <div className="full-view-wrapper-content">
                  <p>
                    When full-view snap is disabled, outer containers wrap to the height
                    of their content instead of forcing viewport height and scroll
                    snapping.
                  </p>
                </div>
              </div>
            </FullView>
          </Controller>
        </>
      )}
    />
  );
}

export default EnableToggle;
