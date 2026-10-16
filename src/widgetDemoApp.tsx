import React from 'react';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';

import { I18n, Loader, GenericApp, type GenericAppProps } from '@iobroker/gui-components';

import langEn from '@iobroker/gui-components/i18n/en.json';
import langDe from '@iobroker/gui-components/i18n/de.json';
import langRu from '@iobroker/gui-components/i18n/ru.json';
import langPt from '@iobroker/gui-components/i18n/pt.json';
import langNl from '@iobroker/gui-components/i18n/nl.json';
import langFr from '@iobroker/gui-components/i18n/fr.json';
import langIt from '@iobroker/gui-components/i18n/it.json';
import langEs from '@iobroker/gui-components/i18n/es.json';
import langPl from '@iobroker/gui-components/i18n/pl.json';
import langUk from '@iobroker/gui-components/i18n/uk.json';
import langZh from '@iobroker/gui-components/i18n/zh-cn.json';
import { CssBaseline } from '@mui/material';

export default class WidgetDemoApp extends GenericApp {
    constructor(props: GenericAppProps) {
        const extendedProps = { ...props };
        super(props, extendedProps);

        const translations = {
            en: langEn,
            de: langDe,
            ru: langRu,
            pt: langPt,
            nl: langNl,
            fr: langFr,
            it: langIt,
            es: langEs,
            pl: langPl,
            uk: langUk,
            'zh-cn': langZh,
        };

        // init translations
        I18n.extendTranslations(translations);
        I18n.setLanguage((navigator.language || 'en').substring(0, 2).toLowerCase() as ioBroker.Languages);
    }

    // eslint-disable-next-line class-methods-use-this
    renderWidget(): React.JSX.Element {
        return <div>Please implement renderWidget method in your class</div>;
    }

    render(): React.JSX.Element {
        if (!this.state.loaded) {
            return (
                <StyledEngineProvider injectFirst>
                    <ThemeProvider theme={this.state.theme}>
                        <CssBaseline />
                        <Loader themeType={this.state.themeType} />
                    </ThemeProvider>
                </StyledEngineProvider>
            );
        }

        const style = {
            backgroundColor: this.state.themeType === 'dark' ? '#303030' : '#f0f0f0',
            color: this.state.themeType === 'dark' ? '#f0f0f0' : '#303030',
            height: '100%',
            width: '100%',
            overflow: 'auto',
        };

        return (
            <StyledEngineProvider injectFirst>
                <ThemeProvider theme={this.state.theme}>
                    <CssBaseline />
                    <div style={style}>{this.renderWidget()}</div>
                </ThemeProvider>
            </StyledEngineProvider>
        );
    }
}
