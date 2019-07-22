type RenderElement = [string, { [attribute: string]: string; }, RenderLayer?];

/**
 * example: [
 *   ['circle', {fill: 'red'}],
 *   ['g', {transform: 'translate(10 0)'}, [
 *     ['circle', {fill: 'blue'}],
 *     ['rect', {}]
 *  ]]
 * ]
 */
export interface RenderLayer extends Array<RenderElement> { }