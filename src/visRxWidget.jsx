import React from 'react';

import {
    Card,
    CardContent,
} from '@mui/material';

import { I18n } from '@iobroker/adapter-react-v5';

const POSSIBLE_MUI_STYLES = [
    'background-color',
    'border',
    'background',
    'background-image',
    'background-position',
    'background-repeat',
    'background-size',
    'background-clip',
    'background-origin',
    'color',
    'box-sizing',
    'border-width',
    'border-style',
    'border-color',
    'border-radius',
    'box-shadow',
    'text-align',
    'text-shadow',
    'font-family',
    'font-size',
    'font-weight',
    'line-height',
    'font-style',
    'font-variant',
    'letter-spacing',
    'word-spacing',
];

class visRxWidget extends React.Component {
    static POSSIBLE_MUI_STYLES = POSSIBLE_MUI_STYLES;

    constructor(props) {
        super(props);
        this.onStateChanged = this.onStateChanged.bind(this);
        this.state = {
            ...props,
            values: {},
            data: JSON.parse(JSON.stringify(props.data || {})),
            style: JSON.parse(JSON.stringify(props.style || {})),
            rxData: JSON.parse(JSON.stringify(props.data || {})),
            rxStyle: JSON.parse(JSON.stringify(props.style || {})),
        };
        this.linkContext = {
            IDs: [],
        };
    }

    static getI18nPrefix() {
        return '';
    }

    static getText(text) {
        if (text && typeof text === 'object') {
            return text[I18n.getLanguage()] || text.en;
        }
        return text;
    }

    static t(key, ...args) {
        return I18n.t(`${this.getI18nPrefix()}${key}`, ...args);
    }

    static getLanguage() {
        return I18n.getLanguage();
    }

    // eslint-disable-next-line class-methods-use-this
    renderWidgetBody(props) {
        return null;
    }

    // eslint-disable-next-line class-methods-use-this
    // @ts-ignore
    onStateUpdated(id, state) {

    }

    formatValue(value, round) {
        if (typeof value === 'number') {
            if (round === 0) {
                value = Math.round(value);
            } else {
                value = Math.round(value * 100) / 100;
            }
            if (this.props.context.systemConfig?.common) {
                if (this.props.context.systemConfig.common.isFloatComma) {
                    value = value.toString().replace('.', ',');
                }
            }
        }

        return value === undefined || value === null ? '' : value.toString();
    }

    wrapContent(content, addToHeader, cardContentStyle, headerStyle, onCardClick, components) {
        const MyCard = components?.Card || Card;
        const MyCardContent = components?.CardContent || CardContent;

        const style = {
            width: 'calc(100% - 8px)',
            height: 'calc(100% - 8px)',
            margin: 4,
            ...this.props.customSettings?.viewStyle?.visCard,
        };
        // apply style from the element
        Object.keys(this.state.rxStyle).forEach(attr => {
            const value = this.state.rxStyle[attr];
            if (value !== null &&
                value !== undefined &&
                POSSIBLE_MUI_STYLES.includes(attr)
            ) {
                attr = attr.replace(
                    /(-\w)/g,
                    text => text[1].toUpperCase(),
                );
                style[attr] = value;
            }
        });

        this.wrappedContent = true;

        return <MyCard
            className="vis_rx_widget_card"
            style={style}
            onClick={onCardClick}
        >
            <MyCardContent
                className="vis_rx_widget_card_content"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    height: 'calc(100% - 32px)',
                    paddingBottom: 16,
                    position: 'relative',
                    ...cardContentStyle,
                }}
            >
                {this.state.rxData.widgetTitle ? <div
                    className="vis_rx_widget_card_name"
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '100%',
                        alignItems: 'center',
                    }}
                >
                    <div
                        className="vis_rx_widget_card_name_div"
                        style={{
                            fontSize: 24,
                            paddingTop: 0,
                            paddingBottom: 4,
                            ...headerStyle,
                        }}
                    >
                        {this.state.rxData.widgetTitle}
                    </div>
                    {addToHeader || null}
                </div> : (addToHeader || null)}
                {content}
            </MyCardContent>
        </MyCard>;
    }

    getIdSubscribeState = (id, cb) => {
        return this.props.context.socket.getState(id)
            .then(result => {
                cb(id, result);
                return this.props.context.socket.subscribeState(id, (resultId, result) => cb(id, result));
            });
    };

    onStateChanged(id, state) {
        if (!state) {
            return;
        }
        const values = JSON.parse(JSON.stringify(this.state.values));
        Object.keys(state).forEach(key =>
            values[`${id}.${key}`] = state[key]);

        this.onStateUpdated(id, state);

        this.setState({ values });
    }

    async componentDidMount() {
        this.getWidgetInfo()?.visAttrs?.forEach(group =>
            group?.fields?.forEach(field => {
                if (field?.type === 'id') {
                    Object.keys(this.state.data).forEach(dataKey => {
                        // do not use here \d instead of [0-9] as it will be wrong compiled
                        if (dataKey.match(new RegExp(`^${field.name}[0-9]*$`))) {
                            const oid = this.state.data[dataKey];
                            if (!this.linkContext.IDs.includes(oid)) {
                                this.linkContext.IDs.push(oid);
                            }
                        }
                    });
                }
            }));

        for (let i = 0; i < this.linkContext.IDs.length; i++) {
            await this.getIdSubscribeState(this.linkContext.IDs[i], this.onStateChanged);
        }
    }

    componentWillUnmount() {
        this.linkContext.IDs.forEach(oid =>
            this.props.context.socket.unsubscribeState(oid, this.onStateChanged));
    }

    getWidgetView(view, props) {
        return <div style={{ width: '100%', height: '100%' }}>
            DEMO VIEW
        </div>;
    }

    getWidgetInWidget(view, wid, options) {
        return null;
    }

    render() {
        return <div style={{ width: this.state.style?.width, height: this.state.style?.height }}>
            {this.renderWidgetBody({
                widget: {

                },
            })}
        </div>;
    }
}

export default visRxWidget;
