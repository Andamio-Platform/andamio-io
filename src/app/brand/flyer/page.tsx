import "./flyer.css";

export default function FlyerPage() {
    return (
        <div className="flyer-container">
            {/* Header */}
            <header className="flyer-header">
                <img src="/logo-with-typography-dark.png" alt="Andamio" className="flyer-logo" />
                <div className="flyer-title">
                    <h1>Brand Guidelines</h1>
                    <p>Quick Reference • Version 1.0</p>
                </div>
            </header>

            {/* Two Column Layout */}
            <div className="flyer-content">
                {/* Left Column */}
                <div className="flyer-column">
                    {/* Core Colors */}
                    <section className="flyer-section">
                        <h2>Core Brand Colors</h2>
                        <div className="color-row">
                            <div className="color-item">
                                <div className="color-swatch" style={{ background: "#FF6B35" }}>
                                    <span className="color-label">PRIMARY</span>
                                </div>
                                <div className="color-details">
                                    <strong>Scaffold Orange</strong>
                                    <span>#FF6B35 (Light)</span>
                                    <span>#FF7A52 (Dark)</span>
                                </div>
                            </div>
                            <div className="color-item">
                                <div className="color-swatch" style={{ background: "#004E89" }}>
                                    <span className="color-label light">SECONDARY</span>
                                </div>
                                <div className="color-details">
                                    <strong>Foundation Blue</strong>
                                    <span>#004E89 (Light)</span>
                                    <span>#3B82F6 (Dark)</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Quick Rules */}
                    <section className="flyer-section">
                        <h2>Quick Start Rules</h2>
                        <div className="rules-list">
                            <div className="rule">
                                <span className="rule-number">1</span>
                                <div>
                                    <strong>Orange = Action</strong>
                                    <p>Primary buttons, CTAs, highlights. Never for body text.</p>
                                </div>
                            </div>
                            <div className="rule">
                                <span className="rule-number">2</span>
                                <div>
                                    <strong>Blue = Structure</strong>
                                    <p>Headings, navigation, trust elements.</p>
                                </div>
                            </div>
                            <div className="rule">
                                <span className="rule-number">3</span>
                                <div>
                                    <strong>Test Both Modes</strong>
                                    <p>Always verify light and dark mode before shipping.</p>
                                </div>
                            </div>
                            <div className="rule">
                                <span className="rule-number">4</span>
                                <div>
                                    <strong>Check Contrast</strong>
                                    <p>Text needs 4.5:1 minimum ratio for accessibility.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="flyer-column">
                    {/* Do's and Don'ts */}
                    <section className="flyer-section">
                        <h2>Do's and Don'ts</h2>
                        <div className="do-dont-grid">
                            <div className="do-box">
                                <h3>✓ Do</h3>
                                <ul>
                                    <li>Use CSS variables for all colors</li>
                                    <li>Orange buttons with white text</li>
                                    <li>Blue for headings only</li>
                                    <li>Test in both themes</li>
                                </ul>
                            </div>
                            <div className="dont-box">
                                <h3>✗ Don't</h3>
                                <ul>
                                    <li>Hardcode hex values</li>
                                    <li>Blue for body text</li>
                                    <li>Orange for backgrounds</li>
                                    <li>Skip accessibility checks</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* Typography */}
                    <section className="flyer-section">
                        <h2>Typography</h2>
                        <div className="typography-sample">
                            <span className="type-demo">Aa Bb Cc</span>
                            <div className="type-info">
                                <strong>Inter</strong>
                                <span>Weights: 400, 500, 600, 700, 800</span>
                            </div>
                        </div>
                    </section>

                    {/* Team Checklist */}
                    <section className="flyer-section">
                        <h2>Before You Ship</h2>
                        <div className="checklist">
                            <label><input type="checkbox" /> Semantic color variables used</label>
                            <label><input type="checkbox" /> Hover/active states defined</label>
                            <label><input type="checkbox" /> Contrast ratios checked</label>
                            <label><input type="checkbox" /> Dark mode tested</label>
                            <label><input type="checkbox" /> Logo variants correct</label>
                        </div>
                    </section>
                </div>
            </div>

            {/* Footer */}
            <footer className="flyer-footer">
                <p>andamio.io • design@andamio.io</p>
                <p className="print-hint">Print this page or save as PDF for reference</p>
            </footer>
        </div>
    );
}
