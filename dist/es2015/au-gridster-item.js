var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from "aurelia-templating";
import { inlineView } from 'aurelia-framework';
let AuGridsterItem = AuGridsterItem_1 = class AuGridsterItem {
    constructor(element) {
        this.isFixed = false;
        this.isDraggable = true;
        this.isResizable = true;
        this.minWidth = 0;
        this.minHeight = 0;
        this._currentPosition = { col: 1, row: 1 };
        this._size = { x: 1, y: 1 };
        this._config = AuGridsterItem_1.CONST_DEFAULT_CONFIG;
        this._added = false;
        this._maxCols = 0;
        this._minCols = 0;
        this._maxRows = 0;
        this._minRows = 0;
        this.element = element;
        this.vm = this;
    }
    created() {
        // let mainEl = <any>this.element.closest('.grid');
        // console.log('Item this created',mainEl)
        // if (mainEl && mainEl.au['au-gridster'].viewModel) {
        //     this._auGridster = mainEl.au['au-gridster'].viewModel;
        // }
    }
    bind(bindingContext, overrideContext) {
        console.log('OPTS BIND', this.itemOpts);
    }
    detached() {
        if (this._added)
            this._auGridster.removeItem(this);
    }
    itemOptsChanged(newItemOpts, oldItemOpts) {
        console.log('OPTS CHANGED', newItemOpts, oldItemOpts);
    }
    set config(v) {
        const defaults = AuGridsterItem_1.CONST_DEFAULT_CONFIG;
        Object.assign(defaults, this.itemOpts);
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
    get sizex() {
        return this._size.x;
    }
    get sizey() {
        return this._size.y;
    }
    get col() {
        return this._currentPosition.col;
    }
    get row() {
        return this._currentPosition.row;
    }
    get currentCol() {
        return this._currentPosition.col;
    }
    get currentRow() {
        return this._currentPosition.row;
    }
    onResizeStartEvent() {
        const event = this.getEventOutput();
        // this.onResizeStart.emit(event);
        // this.onResizeAny.emit(event);
        // this.onChangeStart.emit(event);
        // this.onChangeAny.emit(event);
    }
    onResizeEvent() {
        const event = this.getEventOutput();
        // this.onResize.emit(event);
        // this.onResizeAny.emit(event);
        // this.onChange.emit(event);
        // this.onChangeAny.emit(event);
    }
    onResizeStopEvent() {
        const event = this.getEventOutput();
        // this.onResizeStop.emit(event);
        // this.onResizeAny.emit(event);
        // this.onChangeStop.emit(event);
        // this.onChangeAny.emit(event);
        //
        // this._config.sizex = this._size.x;
        // this._config.sizey = this._size.y;
        // this.ngGridItemChange.emit(this._config);
    }
    onDragStartEvent() {
        const event = this.getEventOutput();
        // this.onDragStart.emit(event);
        // this.onDragAny.emit(event);
        // this.onChangeStart.emit(event);
        // this.onChangeAny.emit(event);
    }
    onDragEvent() {
        const event = this.getEventOutput();
        // this.onDrag.emit(event);
        // this.onDragAny.emit(event);
        // this.onChange.emit(event);
        // this.onChangeAny.emit(event);
    }
    onDragStopEvent() {
        const event = this.getEventOutput();
        // this.onDragStop.emit(event);
        // this.onDragAny.emit(event);
        // this.onChangeStop.emit(event);
        // this.onChangeAny.emit(event);
        //
        // this._config.col = this._currentPosition.col;
        // this._config.row = this._currentPosition.row;
        // this.ngGridItemChange.emit(this._config);
    }
    onCascadeEvent() {
        // this._config.sizex = this._size.x;
        // this._config.sizey = this._size.y;
        // this._config.col = this._currentPosition.col;
        // this._config.row = this._currentPosition.row;
        // this.ngGridItemChange.emit(this._config);
    }
    attached() {
        let mainEl = this.element.closest('.grid');
        if (mainEl && mainEl.au['au-gridster'].viewModel) {
            this._auGridster = mainEl.au['au-gridster'].viewModel;
        }
        const defaults = AuGridsterItem_1.CONST_DEFAULT_CONFIG;
        Object.assign(defaults, this.itemOpts);
        this.element.classList.add('grid-item');
        if (this._auGridster.autoStyle)
            this.element.style.position = 'absolute';
        this._recalculateDimensions();
        this._recalculatePosition();
        if (!this._added) {
            this._added = true;
            this._auGridster.addItem(this);
        }
        this.setConfig(defaults);
    }
    //	Public methods
    canDrag(e) {
        if (!this.isDraggable)
            return false;
        if (this._dragHandle) {
            return this.findHandle(this._dragHandle, e.target);
        }
        return true;
    }
    findHandle(handleSelector, startElement) {
        try {
            let targetElem = startElement;
            while (targetElem && targetElem != this.element) {
                if (this.elementMatches(targetElem, handleSelector))
                    return true;
                targetElem = targetElem.parentElement;
            }
        }
        catch (err) { }
        return false;
    }
    canResize(e) {
        if (!this.isResizable)
            return null;
        if (this._resizeHandle) {
            return this.findHandle(this._resizeHandle, e.target) ? 'both' : null;
        }
        this._borderSize = 5;
        if (this._borderSize <= 0)
            return null;
        const mousePos = this._getMousePosition(e);
        if (mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize
            && mousePos.top < this._elemHeight && mousePos.top > this._elemHeight - this._borderSize) {
            return 'both';
        }
        else if (mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize) {
            return 'width';
        }
        else if (mousePos.top < this._elemHeight && mousePos.top > this._elemHeight - this._borderSize) {
            return 'height';
        }
        return null;
    }
    onMouseMove(e) {
        if (this._auGridster.autoStyle) {
            if (this._auGridster.resizeEnable && !this._resizeHandle && this.isResizable) {
                const mousePos = this._getMousePosition(e);
                if (mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize
                    && mousePos.top < this._elemHeight && mousePos.top > this._elemHeight - this._borderSize) {
                    this.element.style.cursor = 'nwse-resize';
                }
                else if (mousePos.left < this._elemWidth && mousePos.left > this._elemWidth - this._borderSize) {
                    this.element.style.cursor = 'ew-resize';
                }
                else if (mousePos.top < this._elemHeight && mousePos.top > this._elemHeight - this._borderSize) {
                    this.element.style.cursor = 'ns-resize';
                }
                else if (this._auGridster.dragEnable && this.canDrag(e)) {
                    this.element.style.cursor = 'move';
                }
                else {
                    this.element.style.cursor = 'default';
                }
            }
            else if (this._auGridster.resizeEnable && this.canResize(e)) {
                this.element.style.cursor = 'nwse-resize';
            }
            else if (this._auGridster.dragEnable && this.canDrag(e)) {
                this.element.style.cursor = 'move';
            }
            else {
                this.element.style.cursor = 'default';
            }
        }
    }
    //	Getters
    getElement() {
        return this.element;
    }
    getDragHandle() {
        return this._dragHandle;
    }
    getResizeHandle() {
        return this._resizeHandle;
    }
    getDimensions() {
        return { 'width': this._elemWidth, 'height': this._elemHeight };
    }
    getSize() {
        return this._size;
    }
    getPosition() {
        return { 'left': this._elemLeft, 'top': this._elemTop };
    }
    getGridPosition() {
        return this._currentPosition;
    }
    //	Setters
    setConfig(config) {
        this._config = config;
        this._payload = config.payload;
        this._currentPosition.col = config.col ? config.col : AuGridsterItem_1.CONST_DEFAULT_CONFIG.col;
        this._currentPosition.row = config.row ? config.row : AuGridsterItem_1.CONST_DEFAULT_CONFIG.row;
        this._size.x = config.sizex ? config.sizex : AuGridsterItem_1.CONST_DEFAULT_CONFIG.sizex;
        this._size.y = config.sizey ? config.sizey : AuGridsterItem_1.CONST_DEFAULT_CONFIG.sizey;
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
        if (this._minCols > 0 && this._maxCols > 0 && this._minCols > this._maxCols)
            this._minCols = 0;
        if (this._minRows > 0 && this._maxRows > 0 && this._minRows > this._maxRows)
            this._minRows = 0;
        if (this._added) {
            this._auGridster.updateItem(this);
        }
        this._size = this.fixResize(this._size);
        this._recalculatePosition();
        this._recalculateDimensions();
    }
    ngDoCheck() {
        if (this._differ != null) {
            const changes = this._differ.diff(this._config);
            if (changes != null) {
                this._applyChanges(changes);
                return true;
            }
        }
        return false;
    }
    setSize(newSize, update = true) {
        newSize = this.fixResize(newSize);
        this._size = newSize;
        if (update)
            this._recalculateDimensions();
        this.itemOpts.col = this._currentPosition.col;
        this.itemOpts.row = this._currentPosition.row;
        this.itemOpts.sizex = this._size.x;
        this.itemOpts.sizey = this._size.y;
        //TODO this.onItemChange.emit(this.getEventOutput());
    }
    setGridPosition(gridPosition, update = true) {
        this._currentPosition = gridPosition;
        if (update)
            this._recalculatePosition();
        this.itemOpts.col = this._currentPosition.col;
        this.itemOpts.row = this._currentPosition.row;
        this.itemOpts.sizex = this._size.x;
        this.itemOpts.sizey = this._size.y;
        //TODO this.onItemChange.emit(this.getEventOutput());
    }
    getEventOutput() {
        return {
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
    setPosition(x, y) {
        switch (this._cascadeMode) {
            case 'up':
            case 'left':
            default:
                this.element.style.left = x + 'px';
                this.element.style.top = y + 'px';
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
    setCascadeMode(cascade) {
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
    setDimensions(w, h) {
        if (w < this.minWidth)
            w = this.minWidth;
        if (h < this.minHeight)
            h = this.minHeight;
        this.element.style.width = w + 'px';
        this.element.style.height = h + 'px';
        this._elemWidth = w;
        this._elemHeight = h;
    }
    startMoving() {
        this.element.classList.add('moving');
        const style = window.getComputedStyle(this.element);
        if (this._auGridster.autoStyle)
            this.element.style['z-index'] = (parseInt(style.getPropertyValue('z-index')) + 1).toString();
    }
    stopMoving() {
        this.element.classList.remove('moving');
        const style = window.getComputedStyle(this.element);
        if (this._auGridster.autoStyle)
            this.element.style['z-index'] = (parseInt(style.getPropertyValue('z-index')) - 1).toString();
    }
    recalculateSelf() {
        this._recalculatePosition();
        this._recalculateDimensions();
    }
    fixResize(newSize) {
        if (this._maxCols > 0 && newSize.x > this._maxCols)
            newSize.x = this._maxCols;
        if (this._maxRows > 0 && newSize.y > this._maxRows)
            newSize.y = this._maxRows;
        if (this._minCols > 0 && newSize.x < this._minCols)
            newSize.x = this._minCols;
        if (this._minRows > 0 && newSize.y < this._minRows)
            newSize.y = this._minRows;
        const itemWidth = (newSize.x * this._auGridster.colWidth) + ((this._auGridster.marginLeft + this._auGridster.marginRight) * (newSize.x - 1));
        if (itemWidth < this.minWidth)
            newSize.x = Math.ceil((this.minWidth + this._auGridster.marginRight + this._auGridster.marginLeft) / (this._auGridster.colWidth + this._auGridster.marginRight + this._auGridster.marginLeft));
        const itemHeight = (newSize.y * this._auGridster.rowHeight) + ((this._auGridster.marginTop + this._auGridster.marginBottom) * (newSize.y - 1));
        if (itemHeight < this.minHeight)
            newSize.y = Math.ceil((this.minHeight + this._auGridster.marginBottom + this._auGridster.marginTop) / (this._auGridster.rowHeight + this._auGridster.marginBottom + this._auGridster.marginTop));
        return newSize;
    }
    //	Private methods
    elementMatches(element, selector) {
        if (!element)
            return false;
        if (element.matches)
            return element.matches(selector);
        if (element.oMatchesSelector)
            return element.oMatchesSelector(selector);
        if (element.msMatchesSelector)
            return element.msMatchesSelector(selector);
        if (element.mozMatchesSelector)
            return element.mozMatchesSelector(selector);
        if (element.webkitMatchesSelector)
            return element.webkitMatchesSelector(selector);
        if (!element.document || !element.ownerDocument)
            return false;
        const matches = (element.document || element.ownerDocument).querySelectorAll(selector);
        let i = matches.length;
        while (--i >= 0 && matches.item(i) !== element) { }
        return i > -1;
    }
    _recalculatePosition() {
        const x = (this._auGridster.colWidth + this._auGridster.marginLeft + this._auGridster.marginRight) * (this._currentPosition.col - 1) + this._auGridster.marginLeft + this._auGridster.screenMargin;
        const y = (this._auGridster.rowHeight + this._auGridster.marginTop + this._auGridster.marginBottom) * (this._currentPosition.row - 1) + this._auGridster.marginTop;
        this.setPosition(x, y);
    }
    _recalculateDimensions() {
        if (this._size.x < this._auGridster.minCols)
            this._size.x = this._auGridster.minCols;
        if (this._size.y < this._auGridster.minRows)
            this._size.y = this._auGridster.minRows;
        const newWidth = (this._auGridster.colWidth * this._size.x) + ((this._auGridster.marginLeft + this._auGridster.marginRight) * (this._size.x - 1));
        const newHeight = (this._auGridster.rowHeight * this._size.y) + ((this._auGridster.marginTop + this._auGridster.marginBottom) * (this._size.y - 1));
        const w = Math.max(this.minWidth, this._auGridster.minWidth, newWidth);
        const h = Math.max(this.minHeight, this._auGridster.minHeight, newHeight);
        this.setDimensions(w, h);
    }
    _getMousePosition(e) {
        if (e.originalEvent && e.originalEvent.touches) {
            const oe = e.originalEvent;
            e = oe.touches.length ? oe.touches[0] : (oe.changedTouches.length ? oe.changedTouches[0] : e);
        }
        else if (e.touches) {
            e = e.touches.length ? e.touches[0] : (e.changedTouches.length ? e.changedTouches[0] : e);
        }
        const refPos = this.element.getBoundingClientRect();
        return {
            left: e.clientX - refPos.left,
            top: e.clientY - refPos.top
        };
    }
    _applyChanges(changes) {
        changes.forEachAddedItem((record) => { this._config[record.key] = record.currentValue; });
        changes.forEachChangedItem((record) => { this._config[record.key] = record.currentValue; });
        changes.forEachRemovedItem((record) => { delete this._config[record.key]; });
        this.setConfig(this._config);
    }
};
//	Default config
AuGridsterItem.CONST_DEFAULT_CONFIG = {
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
__decorate([
    bindable()
], AuGridsterItem.prototype, "itemOpts", void 0);
AuGridsterItem = AuGridsterItem_1 = __decorate([
    inlineView('<template><slot></slot></template>'),
    customElement('au-gridster-item'),
    inject(Element)
], AuGridsterItem);
export { AuGridsterItem };
;
var AuGridsterItem_1;
