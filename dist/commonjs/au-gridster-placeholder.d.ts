import { AuGridItemPosition, AuGridItemSize } from "./au-gridster-interfaces.d";
export declare class AuGridsterPlaceholder {
    private _element;
    private _size;
    private _position;
    private _auGridster;
    private _cascadeMode;
    constructor(element: any);
    created(): void;
    attached(): void;
    setSize(newSize: AuGridItemSize): void;
    setGridPosition(newPosition: AuGridItemPosition): void;
    setCascadeMode(cascade: string): void;
    show(): void;
    hide(): void;
    private _setDimensions(w, h);
    private _setPosition(x, y);
    private _recalculatePosition();
    private _recalculateDimensions();
}
