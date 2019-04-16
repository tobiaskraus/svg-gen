export class SvgRenderer {

    svg: SVGElement;

    constructor (contexElementSelector: string) {
        let context = <Element>document.querySelector(contexElementSelector);
        this.svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        context.append(this.svg);
    }

    createDot (p: any, radius: any) {
        let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('r', `${radius}`);
        circle.setAttribute('cy', `${p[1]}`);
        circle.setAttribute('cx', `${p[0]}`);
        this.svg.appendChild(circle);
    }
}