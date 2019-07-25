import { Renderable } from "./Renderable";

/** 
 * Implemented by all Render classes.
 * 
 * Idea: to add later CanvasRenderer next to SvgRenderer which works the same way.
 * The developer can just switch the renderer if desired (e.g. to test if performance is better with other renderer)
 */
export interface Renderer {
    render(target: Renderable): void;
}