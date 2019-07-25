/**
 * Type of render data: `[elementType, {[attribute]: string}, Array<RenderElement>?]`
 * 
 * - 1. value: elementType e.g. `circle`, `g`, `polygon`
 * - 2. value: Object of attributes (keys) and values e.g. `{fill: "red", transform: "translate(0 1)"}`
 * - 3. value: (optional) an array of children RenderElements. Required to create groups `<g>`
 * 
 * ### example
 * 
 * ```ts
 *  ['g', {transform: 'translate(10 0)'}, [
 *      ['circle', {fill: 'blue'}],
 *      ['rect', {}]
 *  ]]
 * ```
 * 
 * Because of optional children (3. array value), it can be nested infinitely
 */
type RenderElement = [string, { [attribute: string]: string; }, RenderLayer?];

/**
 * Type of render data as array. It's an array of [[RenderElement]].
 * 
 *### example
 * 
 * ```ts
 *  [
 *      ['circle', {fill: 'red'}],
 *      ['g', {transform: 'translate(10 0)'}, [
 *          ['circle', {fill: 'blue'}],
 *          ['rect', {}]
 *      ]]
 *  ]
 * ```
 */
export interface RenderLayer extends Array<RenderElement> { }