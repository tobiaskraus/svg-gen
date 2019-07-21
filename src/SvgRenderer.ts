import { Point } from './model/types';
import { Renderable } from './model/renderable';
import { Renderer } from './model/renderer';

const svgNamespaceURI = 'http://www.w3.org/2000/svg';

interface SvgRendererOptions {
    /** Selector of existing svg in DOM. */
    svgElementSelector?: string;
    /** Selector of DOM Element, where svg should be appended to.
     * Default (if neither svgElementSelector nor parentElementSelector is defined): parentElementSelector = 'body' */
    parentElementSelector?: string;
    /** css value ('120px', '90vw', '20%'). Default: read from parent */
    width?: string;
    /** css value ('120px', '90vh', '20%'). Default: read from parent */
    height?: string;
    /** [xMin, yMin, xMax, yMax]. Default: no viewBox defined */
    viewBox?: [number, number, number, number];
    preserveAspectRatio?: string;   // TODO: define which values are possible: string -> 'none' | ...
}

export class SvgRenderer implements Renderer {

    svg: SVGSVGElement;

    constructor(options: SvgRendererOptions) {
        this.svg = this.getOrCreateSvg(options);
        if (options.viewBox) {
            this.svg.setAttribute('viewBox', options.viewBox.join(' '));
        }
        if (options.preserveAspectRatio) {
            this.svg.setAttribute('preserveAspectRatio', options.preserveAspectRatio);
        }
        this.setInlineStyles(options);
    }

    clear(): void {
        this.svg.innerHTML = '';
    }

    createCircle(p: Point, radius: number): SVGCircleElement {
        let circle = document.createElementNS(svgNamespaceURI, 'circle');
        circle.setAttribute('r', `${radius}`);
        circle.setAttribute('cy', `${p[1]}`);
        circle.setAttribute('cx', `${p[0]}`);
        return this.svg.appendChild(circle);
    }

    render(target: Renderable) {
        const elements = target.getRenderData();

        for (let el of elements) {
            let realEl = document.createElementNS(svgNamespaceURI, el[0]);
            for (let attr in el[1]) {
                realEl.setAttribute(attr, el[1][attr]);
            }
            this.svg.appendChild(realEl);
        }
    }

    private getOrCreateSvg(options: SvgRendererOptions): SVGSVGElement {
        let svg;

        function createNewSvg(parentSelector: string): SVGSVGElement {
            let context = <Element>document.querySelector(parentSelector);
            svg = document.createElementNS(svgNamespaceURI, 'svg');
            context.append(svg);
            return svg;
        }

        if (options.svgElementSelector) {
            svg = document.querySelector(options.svgElementSelector);
            if (svg === null) {
                console.error(`could not find <svg> with selector ${options.svgElementSelector}. Script will create new svg and append it to body...`);
                svg = createNewSvg('body');
            }
            else {
                svg = <SVGSVGElement>svg; // is there a possibility, to check if svg is by accident another Element than SVGElment?
            }
        } else {
            const parentSelector = options.parentElementSelector ? options.parentElementSelector : 'body';
            svg = createNewSvg(parentSelector);
        }
        return svg;
    }

    private setInlineStyles(options: SvgRendererOptions) {
        let styles: { [key: string]: string } = {}

        if (options.width) {
            styles.width = options.width;
        }
        if (options.height) {
            styles.height = options.height;
        }

        let inlineStyle: string = '';
        for (let key in styles) {
            inlineStyle += `${key}: ${styles[key]};`
        }
        if (inlineStyle) {
            this.svg.setAttribute('style', inlineStyle);
        }
    }
}