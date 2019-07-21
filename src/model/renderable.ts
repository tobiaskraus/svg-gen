import { RenderLayer } from "./RenderLayer";

export interface Renderable {
    getRenderData(): RenderLayer;
}