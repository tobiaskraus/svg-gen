import { RenderLayer } from "./renderLayer";

export interface Renderable {
    getRenderData(): RenderLayer;
}