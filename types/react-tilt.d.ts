declare module 'react-tilt' {
    import { Component, HTMLProps } from 'react';

    interface TiltProps extends HTMLProps<HTMLDivElement> {
        options?: {
            max?: number;
            perspective?: number;
            scale?: number;
            speed?: number;
            transition?: boolean;
            axis?: string | null;
            reset?: boolean;
            easing?: string;
        };
    }

    export default class Tilt extends Component<TiltProps> {}
}
