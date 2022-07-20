/* eslint-disable */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import { Utils } from '@iobroker/adapter-react-v5';
import theme from './theme';

window.adapterName = 'vis-react-demo';
let themeName = Utils.getThemeName();

function build(WidgetDemoApp) {
    const container = document.getElementById('root');
    const root = createRoot(container);
    return root.render(
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme(themeName)}>
                <WidgetDemoApp
                    socket={{ port: 8082 }}
                    onThemeChange={_theme => {
                        themeName = _theme;
                        build();
                    }}
                />
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default build;
