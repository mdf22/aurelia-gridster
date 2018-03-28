import { AuGridster } from "./au-gridster";
import { AuGridRawPosition, AuGridItemDimensions, AuGridItemEvent, AuGridItemConfig, AuGridItemPosition, AuGridItemSize } from "./au-gridster-interfaces.d";
export declare class AuGridsterItem {
    /** export this to resize handlers */
    protected vm: AuGridsterItem;
    /** item element */
    protected element: HTMLDivElement;
    /** gridster engine */
    protected _auGridster: AuGridster;
    /** item data */
    protected itemOpts: any;
    private static CONST_DEFAULT_CONFIG;
    isFixed: boolean;
    isDraggable: boolean;
    isResizable: boolean;
    minWidth: number;
    minHeight: number;
    private _payload;
    private _currentPosition;
    private _size;
    private _config;
    private _dragHandle;
    private _resizeHandle;
    private _borderSize;
    private _elemWidth;
    private _elemHeight;
    private _elemLeft;
    private _elemTop;
    private _added;
    private _differ;
    private _cascadeMode;
    private _maxCols;
    private _minCols;
    private _maxRows;
    private _minRows;
    private parent;
    constructor(element: any);
    created(): void;
    bind(bindingContext: Object, overrideContext: Object): void;
    detached(): void;
    itemOptsChanged(newItemOpts: any, oldItemOpts: any): void;
    config: AuGridItemConfig;
    readonly sizex: number;
    readonly sizey: number;
    readonly col: number;
    readonly row: number;
    readonly currentCol: number;
    readonly currentRow: number;
    onResizeStartEvent(): void;
    onResizeEvent(): void;
    onResizeStopEvent(): void;
    onDragStartEvent(): void;
    onDragEvent(): void;
    onDragStopEvent(): void;
    onCascadeEvent(): void;
    attached(): void;
    canDrag(e: any): boolean;
    findHandle(handleSelector: string, startElement: HTMLElement): boolean;
    canResize(e: any): string;
    onMouseMove(e: any): void;
    getElement(): HTMLDivElement;
    getDragHandle(): string;
    getResizeHandle(): string;
    getDimensions(): AuGridItemDimensions;
    getSize(): AuGridItemSize;
    getPosition(): AuGridRawPosition;
    getGridPosition(): AuGridItemPosition;
    setConfig(config: AuGridItemConfig): void;
    ngDoCheck(): boolean;
    setSize(newSize: AuGridItemSize, update?: boolean): void;
    setGridPosition(gridPosition: AuGridItemPosition, update?: boolean): void;
    getEventOutput(): AuGridItemEvent;
    setPosition(x: number, y: number): void;
    setCascadeMode(cascade: string): void;
    setDimensions(w: number, h: number): void;
    startMoving(): void;
    stopMoving(): void;
    recalculateSelf(): void;
    fixResize(newSize: AuGridItemSize): AuGridItemSize;
    private elementMatches(element, selector);
    private _recalculatePosition();
    private _recalculateDimensions();
    private _getMousePosition(e);
    private _applyChanges(changes);
}