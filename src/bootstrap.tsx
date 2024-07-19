import React from 'react';
import { createRoot } from 'react-dom/client';

declare global {
    interface Window {
        adapterName: string;
    }
}

window.adapterName = 'vis-react-demo';

function build(WidgetDemoApp: React.FC<{ socket: { port: number }}>): void {
    const container = document.getElementById('root');
    if (container) {
        const root = createRoot(container);
        root.render(<WidgetDemoApp socket={{ port: 8082 }} />);
    }
}

export default build;
