import { RenderLayer } from "./RenderLayer";

/**
 * Implemented by all classes which can be rendered via `Renderer.render(instanceToRender: Renderable)` ([[Renderer]] is abstract - so use SvgRenderer or other).
 * 
 * Renderer calls getRenderData() when rendering.
 * */
export interface Renderable {
    getRenderData(): RenderLayer;
}