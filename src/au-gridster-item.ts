

import {inject} from 'aurelia-dependency-injection';
import {bindable, customElement} from "aurelia-templating";

import {bindingMode} from "aurelia-binding";
import { AuGridster} from "./au-gridster";
import {AuGridRawPosition, AuGridItemDimensions, AuGridItemEvent, AuGridItemConfig, AuGridItemPosition, AuGridItemSize} from "../typings/au-gridster-interfaces.d";
import {inlineView} from 'aurelia-framework';

@inlineView('<template><slot></slot></template>')
@customElement('au-gridster-item')
@inject(Element)
export class AuGridsterItem {

    /** export this to resize handlers */
    protected vm:AuGridsterItem;
    /** item element */
    protected element:HTMLDivElement;
    /** gridster engine */
    protected _auGridster:AuGridster;

    /** item data */
    @bindable()
    protected itemOpts;


//	Default config
    private static CONST_DEFAULT_CONFIG: AuGridItemConfig = {
        col: 1,
        row: 1,
        sizex: 1,
        sizey: 1,
        dragHandle: null,
        resizeHandle: null,
        fixed: false,
        draggable: true,
        resizable: true,
        borderSize: 5
    };

    public isFixed: boolean = false;
    public isDraggable: boolean = true;
    public isResizable: boolean = true;
    public minWidth: number = 0;
    public minHeight: number = 0;




    //	Private variables
    private _payload: any;
    private _currentPosition: AuGridItemPosition = { col: 1, row: 1 };
    private _size: AuGridItemSize = { x: 1, y: 1 };
    private _config = AuGridsterItem.CONST_DEFAULT_CONFIG;
    private _dragHandle: string;
    private _resizeHandle: string;
    private _borderSize: number;
    private _elemWidth: number;
    private _elemHeight: number;
    private _elemLeft: number;
    private _elemTop: number;
    private _added: boolean = false;
    private _differ;//: KeyValueDiffer;
    private _cascadeMode: string;
    private _maxCols: number = 0;
    private _minCols: number = 0;
    private _maxRows: number = 0;
    private _minRows: number = 0;

    private parent;

    constructor(element) {
        this.element  = element;
        this.vm = this;
    }

    created() {

        // let mainEl = <any>this.element.closest('.grid');
        // console.log('Item this created',mainEl)
        // if (mainEl && mainEl.au['au-gridster'].viewModel) {
        //     this._auGridster = mainEl.au['au-gridster'].viewModel;
        // }
    }
    bind(bindingContext: Object, overrideContext: Object) {
      console.log('OPTS BIND', this.itemOpts)

    }

    detached() {
      if (this._added) this._auGridster.removeItem(this);

    }
    itemOptsChanged(newItemOpts,oldItemOpts) {
      console.log('OPTS CHANGED', newItemOpts, oldItemOpts)
    }
    set config(v: AuGridItemConfig) {
        const defaults = AuGridsterItem.CONST_DEFAULT_CONFIG;
        Object.assign(defaults,this.itemOpts);

        // for (let x in defaults)
        //     if (v[x] == null)
        //         v[x] = defaults[x];
        //
        // this.setConfig(v);
        //
        // if (this._differ == null && v != null) {
        //     //TODO this._differ = this._differs.find(this._config).create(null);
        // }
        //
        // if (!this._added) {
        //     this._added = true;
        //     this._auGridster.addItem(this);
        // }
        this.setConfig(defaults);
        this._recalculateDimensions();
        this._recalculatePosition();
    }

    get sizex(): number {
        return this._size.x;
    }

    get sizey(): number {
        return this._size.y;
    }

    get col(): number {
        return this._currentPosition.col;
    }

    get row(): number {
        return this._currentPosition.row;
    }

    get currentCol(): number {
        return this._currentPosition.col;
    }

    get currentRow(): number {
        return this._currentPosition.row;
    }



    public onResizeStartEvent(): void {
        const event: AuGridItemEvent = this.getEventOutput();
        // this.onResizeStart.emit(event);
        // this.onResizeAny.emit(event);
        // this.onChangeStart.emit(event);
        // this.onChangeAny.emit(event);
    }
    public onResizeEvent(): void {
        const event: AuGridItemEvent = this.getEventOutput();
        // this.onResize.emit(event);
        // this.onResizeAny.emit(event);
        // this.onChange.emit(event);
        // this.onChangeAny.emit(event);
    }
    public onResizeStopEvent(): void {
        const event: AuGridItemEvent = this.getEventOutput();
        // this.onResizeStop.emit(event);
        // this.onResizeAny.emit(event);
        // this.onChangeStop.emit(event);
        // this.onChangeAny.emit(event);
        //
        // this._config.sizex = this._size.x;
        // this._config.sizey = this._size.y;
        // this.ngGridItemChange.emit(this._config);
    }
    public onDragStartEvent(): void {
        const event: AuGridItemEvent = this.getEventOutput();
        // this.onDragStart.emit(event);
        // this.onDragAny.emit(event);
        // this.onChangeStart.emit(event);
        // this.onChangeAny.emit(event);
    }
    public onDragEvent(): void {
        const event: AuGridItemEvent = this.getEventOutput();
        // this.onDrag.emit(event);
        // this.onDragAny.emit(event);
        // this.onChange.emit(event);
        // this.onChangeAny.emit(event);
    }
    public onDragStopEvent(): void {
        const event: AuGridItemEvent = this.getEventOutput();
        // this.onDragStop.emit(event);
        // this.onDragAny.emit(event);
        // this.onChangeStop.emit(event);
        // this.onChangeAny.emit(event);
        //
        // this._config.col = this._currentPosition.col;
        // this._config.row = this._currentPosition.row;
        // this.ngGridItemChange.emit(this._config);
    }
    public onCascadeEvent(): void {
        // this._config.sizex = this._size.x;
        // this._config.sizey = this._size.y;
        // this._config.col = this._currentPosition.col;
        // this._config.row = this._currentPosition.row;
        // this.ngGridItemChange.emit(this._config);
    }


    public attached() {
      let mainEl = <any>this.element.closest('.grid');
      if (mainEl && mainEl.au['au-gridster'].viewModel) {
        this._auGridster = mainEl.au['au-gridster'].viewModel;
      }

      const defaults = AuGridsterItem.CONST_DEFAULT_CONFIG;
      Object.assign(defaults,this.itemOpts);

      this.element.classList.add('grid-item')
      if (this._auGridster.autoStyle) this.element.style.position =  'absolute';
      this._recalculateDimensions();
      this._recalculatePosition();

      if (!this._added) {
        this._added = true;
        this._auGridster.addItem(this);
      }

      this.setConfig(defaults);
    }
    //	Public methods
    public canDrag(e: any): boolean {
        if (!this.isDraggable) return false;

        if (this._dragHandle) {
            return this.findHandle(this._dragHandle, e.target);
        }

        return true;
    }

    public findHandle(handleSelector: string, startElement: HTMLElement): boolean {
        try {
            let targetElem: any = startElement;

            while (targetElem && targetElem != this.element) {
                if (this.elementMatches(targetElem, handleSelector)) return true;

                targetElem = targetElem.parentElement;
            }
        } catch (err) {}

        return false;
    }

    public canResize(e: any): string {
        if (!this.isResizable) return null;

        if (this._resizeHandle) {
            return this.findHandle(this._resizeHandle, e.target) ? 'both' : null;
        }
        this._borderSize = 5;
        if (this._borderSize <= 0) return null;

        const mousePos: AuGridRawPosition = this._getMousePosition(e);

        if (mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize
            && mousePos.top < this._elemHeight && mousePos.top > this._elemHeight - this._borderSize) {
            return 'both';
        } else if (mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize) {
            return 'width';
        } else if (mousePos.top < this._elemHeight && mousePos.top > this._elemHeight - this._borderSize) {
            return 'height';
        }

        return null;
    }

    public onMouseMove(e: any): void {
        if (this._auGridster.autoStyle) {
            if (this._auGridster.resizeEnable && !this._resizeHandle && this.isResizable) {
                const mousePos: AuGridRawPosition = this._getMousePosition(e);

                if (mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize
                    && mousePos.top < this._elemHeight && mousePos.top > this._elemHeight - this._borderSize) {
                    this.element.style.cursor =  'nwse-resize';
                } else if (mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize) {
                    this.element.style.cursor =  'ew-resize';
                } else if (mousePos.top < this._elemHeight && mousePos.top > this._elemHeight - this._borderSize) {
                    this.element.style.cursor =  'ns-resize';
                } else if (this._auGridster.dragEnable && this.canDrag(e)) {
                    this.element.style.cursor = 'move';
                } else {
                    this.element.style.cursor =   'default';
                }
            } else if (this._auGridster.resizeEnable && this.canResize(e)) {
                this.element.style.cursor =   'nwse-resize';
            } else if (this._auGridster.dragEnable && this.canDrag(e)) {
                this.element.style.cursor =   'move';
            } else {
                this.element.style.cursor =   'default';
            }
        }
    }


    //	Getters
    public getElement(): HTMLDivElement {
        return this.element;
    }

    public getDragHandle(): string {
        return this._dragHandle;
    }

    public getResizeHandle(): string {
        return this._resizeHandle;
    }

    public getDimensions(): AuGridItemDimensions {
        return { 'width': this._elemWidth, 'height': this._elemHeight };
    }

    public getSize(): AuGridItemSize {
        return this._size;
    }

    public getPosition(): AuGridRawPosition {
        return { 'left': this._elemLeft, 'top': this._elemTop };
    }

    public getGridPosition(): AuGridItemPosition {
        return this._currentPosition;
    }

    //	Setters
    public setConfig(config: AuGridItemConfig): void {
        this._config = config;

        this._payload = config.payload;
        this._currentPosition.col = config.col ? config.col : AuGridsterItem.CONST_DEFAULT_CONFIG.col;
        this._currentPosition.row = config.row ? config.row : AuGridsterItem.CONST_DEFAULT_CONFIG.row;
        this._size.x = config.sizex ? config.sizex : AuGridsterItem.CONST_DEFAULT_CONFIG.sizex;
        this._size.y = config.sizey ? config.sizey : AuGridsterItem.CONST_DEFAULT_CONFIG.sizey;
        this._dragHandle = config.dragHandle;
        this._resizeHandle = config.resizeHandle;
        this._borderSize = config.borderSize;
        this.isDraggable = config.draggable ? true : false;
        this.isResizable = config.resizable ? true : false;
        this.isFixed = config.fixed ? true : false;

        this._maxCols = !isNaN(config.maxCols) && isFinite(config.maxCols) ? config.maxCols : 0;
        this._minCols = !isNaN(config.minCols) && isFinite(config.minCols) ? config.minCols : 0;
        this._maxRows = !isNaN(config.maxRows) && isFinite(config.maxRows) ? config.maxRows : 0;
        this._minRows = !isNaN(config.minRows) && isFinite(config.minRows) ? config.minRows : 0;

        this.minWidth = !isNaN(config.minWidth) && isFinite(config.minWidth) ? config.minWidth : 0;
        this.minHeight = !isNaN(config.minHeight) && isFinite(config.minHeight) ? config.minHeight : 0;

        if (this._minCols > 0 && this._maxCols > 0 && this._minCols > this._maxCols) this._minCols = 0;
        if (this._minRows > 0 && this._maxRows > 0 && this._minRows > this._maxRows) this._minRows = 0;

        if (this._added) {
            this._auGridster.updateItem(this);
        }

        this._size = this.fixResize(this._size);

        this._recalculatePosition();
        this._recalculateDimensions();
    }

    public ngDoCheck(): boolean {
        if (this._differ != null) {
            const changes: any = this._differ.diff(this._config);

            if (changes != null) {
                this._applyChanges(changes);

                return true;
            }
        }

        return false;
    }

    public setSize(newSize: AuGridItemSize, update: boolean = true): void {
        newSize = this.fixResize(newSize);
        this._size = newSize;
        if (update) this._recalculateDimensions();

        this.itemOpts.col = this._currentPosition.col;
        this.itemOpts.row = this._currentPosition.row;
        this.itemOpts.sizex = this._size.x;
        this.itemOpts.sizey = this._size.y;

        //TODO this.onItemChange.emit(this.getEventOutput());
    }

    public setGridPosition(gridPosition: AuGridItemPosition, update: boolean = true): void {
        this._currentPosition = gridPosition;
        if (update) this._recalculatePosition();

        this.itemOpts.col = this._currentPosition.col;
        this.itemOpts.row = this._currentPosition.row;
        this.itemOpts.sizex = this._size.x;
        this.itemOpts.sizey = this._size.y;
        //TODO this.onItemChange.emit(this.getEventOutput());
    }

    public getEventOutput(): AuGridItemEvent {
        return <AuGridItemEvent>{
            payload: this._payload,
            col: this._currentPosition.col,
            row: this._currentPosition.row,
            sizex: this._size.x,
            sizey: this._size.y,
            width: this._elemWidth,
            height: this._elemHeight,
            left: this._elemLeft,
            top: this._elemTop
        };
    }

    public setPosition(x: number, y: number): void {
        switch (this._cascadeMode) {
            case 'up':
            case 'left':
            default:
                this.element.style.left =  x + 'px';
                this.element.style.top =  y + 'px';
                break;
            case 'right':
                this.element.style.right = x + 'px';
                this.element.style.top = y + 'px';
                break;
            case 'down':
                this.element.style.left = x + 'px';
                this.element.style.bottom = y + 'px';
                break;
        }

        this._elemLeft = x;
        this._elemTop = y;
    }

    public setCascadeMode(cascade: string): void {
        this._cascadeMode = cascade;
        switch (cascade) {
            case 'up':
            case 'left':
            default:
                this.element.style.left = this._elemLeft + 'px';
                this.element.style.top = this._elemTop + 'px';
                this.element.style.right = null;
                this.element.style.bottom = null;
                break;
            case 'right':
                this.element.style.right = this._elemLeft + 'px';
                this.element.style.top = this._elemTop + 'px';
                this.element.style.left = null;
                this.element.style.bottom = null;
                break;
            case 'down':
                this.element.style.left = this._elemLeft + 'px';
                this.element.style.bottom = this._elemTop + 'px';
                this.element.style.right = null;
                this.element.style.top = null;
                break;
        }
    }

    public setDimensions(w: number, h: number): void {
        if (w < this.minWidth) w = this.minWidth;
        if (h < this.minHeight) h = this.minHeight;

        this.element.style.width = w + 'px';
        this.element.style.height = h + 'px';

        this._elemWidth = w;
        this._elemHeight = h;
    }

    public startMoving(): void {
        this.element.classList.add('moving');
        const style: any = window.getComputedStyle(this.element);
        if (this._auGridster.autoStyle) this.element.style['z-index'] = (parseInt(style.getPropertyValue('z-index')) + 1).toString();
    }

    public stopMoving(): void {
        this.element.classList.remove('moving');
        const style: any = window.getComputedStyle(this.element);
        if (this._auGridster.autoStyle) this.element.style['z-index'] = (parseInt(style.getPropertyValue('z-index')) - 1).toString();
    }

    public recalculateSelf(): void {
        this._recalculatePosition();
        this._recalculateDimensions();
    }

    public fixResize(newSize: AuGridItemSize): AuGridItemSize {
        if (this._maxCols > 0 && newSize.x > this._maxCols) newSize.x = this._maxCols;
        if (this._maxRows > 0 && newSize.y > this._maxRows) newSize.y = this._maxRows;

        if (this._minCols > 0 && newSize.x < this._minCols) newSize.x = this._minCols;
        if (this._minRows > 0 && newSize.y < this._minRows) newSize.y = this._minRows;

        const itemWidth = (newSize.x * this._auGridster.colWidth) + ((this._auGridster.marginLeft + this._auGridster.marginRight) * (newSize.x - 1));
        if (itemWidth < this.minWidth) newSize.x = Math.ceil((this.minWidth + this._auGridster.marginRight + this._auGridster.marginLeft) / (this._auGridster.colWidth + this._auGridster.marginRight + this._auGridster.marginLeft));

        const itemHeight = (newSize.y * this._auGridster.rowHeight) + ((this._auGridster.marginTop + this._auGridster.marginBottom) * (newSize.y - 1));
        if (itemHeight < this.minHeight) newSize.y = Math.ceil((this.minHeight + this._auGridster.marginBottom + this._auGridster.marginTop) / (this._auGridster.rowHeight + this._auGridster.marginBottom + this._auGridster.marginTop));

        return newSize;
    }

    //	Private methods
    private elementMatches(element: any, selector: string): boolean {
        if (!element) return false;
        if (element.matches) return element.matches(selector);
        if (element.oMatchesSelector) return element.oMatchesSelector(selector);
        if (element.msMatchesSelector) return element.msMatchesSelector(selector);
        if (element.mozMatchesSelector) return element.mozMatchesSelector(selector);
        if (element.webkitMatchesSelector) return element.webkitMatchesSelector(selector);

        if (!element.document || !element.ownerDocument) return false;

        const matches: any = (element.document || element.ownerDocument).querySelectorAll(selector);
        let i: number = matches.length;
        while (--i >= 0 && matches.item(i) !== element) { }
        return i > -1;
    }

    private _recalculatePosition(): void {
        const x: number = (this._auGridster.colWidth + this._auGridster.marginLeft + this._auGridster.marginRight) * (this._currentPosition.col - 1) + this._auGridster.marginLeft + this._auGridster.screenMargin;
        const y: number = (this._auGridster.rowHeight + this._auGridster.marginTop + this._auGridster.marginBottom) * (this._currentPosition.row - 1) + this._auGridster.marginTop;

        this.setPosition(x, y);
    }

    private _recalculateDimensions(): void {
        if (this._size.x < this._auGridster.minCols) this._size.x = this._auGridster.minCols;
        if (this._size.y < this._auGridster.minRows) this._size.y = this._auGridster.minRows;

        const newWidth: number = (this._auGridster.colWidth * this._size.x) + ((this._auGridster.marginLeft + this._auGridster.marginRight) * (this._size.x - 1));
        const newHeight: number = (this._auGridster.rowHeight * this._size.y) + ((this._auGridster.marginTop + this._auGridster.marginBottom) * (this._size.y - 1));

        const w: number = Math.max(this.minWidth, this._auGridster.minWidth, newWidth);
        const h: number = Math.max(this.minHeight, this._auGridster.minHeight, newHeight);

        this.setDimensions(w, h);
    }

    private _getMousePosition(e: any): AuGridRawPosition {
        if (e.originalEvent && e.originalEvent.touches) {
            const oe: any = e.originalEvent;
            e = oe.touches.length ? oe.touches[0] : (oe.changedTouches.length ? oe.changedTouches[0] : e);
        } else if (e.touches) {
            e = e.touches.length ? e.touches[0] : (e.changedTouches.length ? e.changedTouches[0] : e);
        }


        const refPos: AuGridRawPosition = this.element.getBoundingClientRect();

        return {
            left: e.clientX - refPos.left,
            top: e.clientY - refPos.top
        };
    }

    private _applyChanges(changes: any): void {
        changes.forEachAddedItem((record: any) => { this._config[record.key] = record.currentValue; });
        changes.forEachChangedItem((record: any) => { this._config[record.key] = record.currentValue; });
        changes.forEachRemovedItem((record: any) => { delete this._config[record.key]; });

        this.setConfig(this._config);
    }
};
