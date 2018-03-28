var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/************************************/
/* Created by janis@fnet.lv on 2018 */
/************************************/
import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from "aurelia-templating";
import { EventAggregator } from 'aurelia-event-aggregator';
import { AureliaGridsterConfig } from "./aurelia-gridster";
import { inlineView } from 'aurelia-framework';
let AuGridster = AuGridster_1 = class AuGridster {
    constructor(element, config, eventAggregator) {
        //	Public variables
        this.colWidth = 250;
        this.rowHeight = 250;
        this.minCols = 1;
        this.minRows = 1;
        this.marginTop = 10;
        this.marginRight = 10;
        this.marginBottom = 10;
        this.marginLeft = 10;
        this.screenMargin = 0;
        this.isDragging = false;
        this.isResizing = false;
        this.autoStyle = true;
        this.resizeEnable = true;
        this.dragEnable = true;
        this.cascade = 'up';
        this.minWidth = 100;
        this.minHeight = 100;
        //	Private variables
        this._items = [];
        this._draggingItem = null;
        this._resizingItem = null;
        this._resizeDirection = null;
        this._itemGrid = {}; //{ 1: { 1: null } };
        this._maxCols = 0;
        this._maxRows = 0;
        this._visibleCols = 0;
        this._visibleRows = 0;
        this._setWidth = 250;
        this._setHeight = 250;
        this._posOffset = null;
        this._adding = false;
        this._fixToGrid = false;
        this._autoResize = false;
        this._destroyed = false;
        this._maintainRatio = false;
        this._preferNew = false;
        this._zoomOnDrag = false;
        this._limitToScreen = false;
        this._centerToScreen = false;
        this._curMaxRow = 0;
        this._curMaxCol = 0;
        this._dragReady = false;
        this._resizeReady = false;
        this._elementBasedDynamicRowHeight = false;
        this._config = AuGridster_1.CONST_DEFAULT_CONFIG;
        /** handle gridster resize  */
        this.onResizeHandler = (rect) => {
            this.resizeEventHandler(null);
        };
        this.mouseDownEventHandler = (e) => {
            var mousePos = this._getMousePosition(e);
            var item = this._getItemFromPosition(mousePos);
            if (item != null) {
                if (this.resizeEnable && item.canResize(e)) {
                    this._resizeReady = true;
                    e.preventDefault();
                }
                else if (this.dragEnable && item.canDrag(e)) {
                    this._dragReady = true;
                    e.preventDefault();
                }
            }
        };
        this.mouseUpEventHandler = (e) => {
            if (this.isDragging) {
                this._dragStop(e);
            }
            else if (this.isResizing) {
                this._resizeStop(e);
            }
            else if (this._dragReady || this._resizeReady) {
                this._dragReady = false;
                this._resizeReady = false;
            }
        };
        this.mouseMoveEventHandler = (e) => {
            if (this._resizeReady) {
                this._resizeStart(e);
                e.preventDefault();
                return;
            }
            else if (this._dragReady) {
                this._dragStart(e);
                e.preventDefault();
                return;
            }
            if (this.isDragging) {
                this._drag(e);
            }
            else if (this.isResizing) {
                this._resize(e);
            }
            else {
                var mousePos = this._getMousePosition(e);
                var item = this._getItemFromPosition(mousePos);
                if (item) {
                    item.onMouseMove(e);
                }
            }
        };
        this.element = element;
        this.ea = eventAggregator;
        this.CONST_CONFIG = config;
    }
    bind(bindingContext, overrideContext) {
    }
    attached() {
        this.element.classList.add('grid');
        this.setConfig(this.gridOpts);
        if (this.autoStyle)
            this.element.style.position = 'relative';
        this.element.addEventListener('mousedown', this.mouseDownEventHandler, false);
        this.element.addEventListener('mousemove', this.mouseMoveEventHandler, false);
        this.element.addEventListener('mouseup', this.mouseUpEventHandler, false);
        if ('ontouchstart' in document.documentElement) {
            this.element.addEventListener('touchstart', this.mouseDownEventHandler, false);
            this.element.addEventListener('touchmove', this.mouseMoveEventHandler, false);
            this.element.addEventListener('touchend', this.mouseUpEventHandler, false);
        }
        document.addEventListener('mousemove', this.mouseMoveEventHandler, false);
        document.addEventListener('mouseup', this.mouseUpEventHandler, false);
        //'(window:resize)': 'resizeEventHandler($event)',
    }
    detached() {
        this.element.removeEventListener('mousedown', this.mouseDownEventHandler, false);
        this.element.removeEventListener('mouseup', this.mouseUpEventHandler, false);
        this.element.removeEventListener('mousemove', this.mouseMoveEventHandler, false);
        if ('ontouchstart' in document.documentElement) {
            this.element.removeEventListener('touchstart', this.mouseDownEventHandler, false);
            this.element.removeEventListener('touchend', this.mouseUpEventHandler, false);
            this.element.removeEventListener('touchmove', this.mouseMoveEventHandler, false);
        }
        document.removeEventListener('mousemove', this.mouseMoveEventHandler, false);
        document.removeEventListener('mouseup', this.mouseUpEventHandler, false);
    }
    setConfig(config) {
        //this._config = config;
        var maxColRowChanged = false;
        for (var x in config) {
            var val = config[x];
            var intVal = !val ? 0 : parseInt(val);
            switch (x) {
                case 'margins':
                    this.setMargins(val);
                    break;
                case 'col_width':
                    this.colWidth = Math.max(intVal, 1);
                    break;
                case 'row_height':
                    this.rowHeight = Math.max(intVal, 1);
                    break;
                case 'auto_style':
                    this.autoStyle = val ? true : false;
                    break;
                case 'auto_resize':
                    this._autoResize = val ? true : false;
                    break;
                case 'draggable':
                    this.dragEnable = val ? true : false;
                    break;
                case 'resizable':
                    this.resizeEnable = val ? true : false;
                    break;
                case 'max_rows':
                    maxColRowChanged = maxColRowChanged || this._maxRows != intVal;
                    this._maxRows = intVal < 0 ? 0 : intVal;
                    break;
                case 'max_cols':
                    maxColRowChanged = maxColRowChanged || this._maxCols != intVal;
                    this._maxCols = intVal < 0 ? 0 : intVal;
                    break;
                case 'visible_rows':
                    this._visibleRows = Math.max(intVal, 0);
                    break;
                case 'visible_cols':
                    this._visibleCols = Math.max(intVal, 0);
                    break;
                case 'min_rows':
                    this.minRows = Math.max(intVal, 1);
                    break;
                case 'min_cols':
                    this.minCols = Math.max(intVal, 1);
                    break;
                case 'min_height':
                    this.minHeight = Math.max(intVal, 1);
                    break;
                case 'min_width':
                    this.minWidth = Math.max(intVal, 1);
                    break;
                case 'zoom_on_drag':
                    this._zoomOnDrag = val ? true : false;
                    break;
                case 'cascade':
                    if (this.cascade != val) {
                        this.cascade = val;
                        this._cascadeGrid();
                    }
                    break;
                case 'fix_to_grid':
                    this._fixToGrid = val ? true : false;
                    break;
                case 'maintain_ratio':
                    this._maintainRatio = val ? true : false;
                    break;
                case 'prefer_new':
                    this._preferNew = val ? true : false;
                    break;
                case 'limit_to_screen':
                    this._limitToScreen = !this._autoResize && !!val;
                    break;
                case 'center_to_screen':
                    this._centerToScreen = val ? true : false;
                    break;
                case 'element_based_row_height':
                    this._elementBasedDynamicRowHeight = !!val;
                    break;
            }
        }
        if (this._limitToScreen) {
            const newMaxCols = this._getContainerColumns();
            if (this._maxCols != newMaxCols) {
                this._maxCols = newMaxCols;
                maxColRowChanged = true;
            }
        }
        if (this._limitToScreen && this._centerToScreen) {
            this.screenMargin = this._getScreenMargin();
        }
        else {
            this.screenMargin = 0;
        }
        if (this._maintainRatio) {
            if (this.colWidth && this.rowHeight) {
                this._aspectRatio = this.colWidth / this.rowHeight;
            }
            else {
                this._maintainRatio = false;
            }
        }
        if (maxColRowChanged) {
            if (this._maxCols > 0 && this._maxRows > 0) { //	Can't have both, prioritise on cascade
                switch (this.cascade) {
                    case 'left':
                    case 'right':
                        this._maxCols = 0;
                        break;
                    case 'up':
                    case 'down':
                    default:
                        this._maxRows = 0;
                        break;
                }
            }
            this.updatePositionsAfterMaxChange();
        }
        this._calculateColWidth();
        this._calculateRowHeight();
        var maxWidth = this._maxCols * this.colWidth;
        var maxHeight = this._maxRows * this.rowHeight;
        if (maxWidth > 0 && this.minWidth > maxWidth)
            this.minWidth = 0.75 * this.colWidth;
        if (maxHeight > 0 && this.minHeight > maxHeight)
            this.minHeight = 0.75 * this.rowHeight;
        if (this.minWidth > this.colWidth)
            this.minCols = Math.max(this.minCols, Math.ceil(this.minWidth / this.colWidth));
        if (this.minHeight > this.rowHeight)
            this.minRows = Math.max(this.minRows, Math.ceil(this.minHeight / this.rowHeight));
        if (this._maxCols > 0 && this.minCols > this._maxCols)
            this.minCols = 1;
        if (this._maxRows > 0 && this.minRows > this._maxRows)
            this.minRows = 1;
        this._updateRatio();
        for (let item of this._items) {
            this._removeFromGrid(item);
            item.setCascadeMode(this.cascade);
        }
        for (let item of this._items) {
            item.recalculateSelf();
            this._addToGrid(item);
        }
        this._cascadeGrid();
        this._filterGrid();
        this._updateSize();
    }
    getItemPosition(index) {
        return this._items[index].getGridPosition();
    }
    getItemSize(index) {
        return this._items[index].getSize();
    }
    setMargins(margins) {
        this.marginTop = Math.max(parseInt(margins[0]), 0);
        this.marginRight = margins.length >= 2 ? Math.max(parseInt(margins[1]), 0) : this.marginTop;
        this.marginBottom = margins.length >= 3 ? Math.max(parseInt(margins[2]), 0) : this.marginTop;
        this.marginLeft = margins.length >= 4 ? Math.max(parseInt(margins[3]), 0) : this.marginRight;
    }
    enableDrag() {
        this.dragEnable = true;
    }
    disableDrag() {
        this.dragEnable = false;
    }
    enableResize() {
        this.resizeEnable = true;
    }
    disableResize() {
        this.resizeEnable = false;
    }
    addItem(auItem) {
        auItem.setCascadeMode(this.cascade);
        if (!this._preferNew) {
            var newPos = this._fixGridPosition(auItem.getGridPosition(), auItem.getSize());
            auItem.setGridPosition(newPos);
        }
        this._items.push(auItem);
        this._addToGrid(auItem);
        this._updateSize();
        auItem.recalculateSelf();
        auItem.onCascadeEvent();
        this._emitOnItemChange();
    }
    removeItem(auItem) {
        this._removeFromGrid(auItem);
        for (let x = 0; x < this._items.length; x++) {
            if (this._items[x] == auItem) {
                this._items.splice(x, 1);
            }
        }
        if (this._destroyed)
            return;
        this._cascadeGrid();
        this._updateSize();
        this._items.forEach((item) => item.recalculateSelf());
        this._emitOnItemChange();
    }
    updateItem(auItem) {
        this._removeFromGrid(auItem);
        this._addToGrid(auItem);
        this._cascadeGrid();
        this._updateSize();
        auItem.onCascadeEvent();
    }
    triggerCascade() {
        this._cascadeGrid(null, null);
    }
    triggerResize() {
        this.resizeEventHandler(null);
    }
    resizeEventHandler(e) {
        console.log('GRID Resize handler');
        this._calculateColWidth();
        this._calculateRowHeight();
        this._updateRatio();
        if (this._limitToScreen) {
            const newMaxColumns = this._getContainerColumns();
            if (this._maxCols !== newMaxColumns) {
                this._maxCols = newMaxColumns;
                this.updatePositionsAfterMaxChange();
                this._cascadeGrid();
            }
            if (this._centerToScreen) {
                this.screenMargin = this._getScreenMargin();
                this._items.forEach((item) => {
                    item.recalculateSelf();
                });
            }
        }
        else if (this._autoResize) {
            this._items.forEach((item) => {
                item.recalculateSelf();
            });
        }
        this._filterGrid();
        this._updateSize();
    }
    //	Private methods
    updatePositionsAfterMaxChange() {
        for (let item of this._items) {
            var pos = item.getGridPosition();
            var dims = item.getSize();
            if (!this._hasGridCollision(pos, dims) && this._isWithinBounds(pos, dims) && dims.x <= this._maxCols && dims.y <= this._maxRows) {
                continue;
            }
            this._removeFromGrid(item);
            if (this._maxCols > 0 && dims.x > this._maxCols) {
                dims.x = this._maxCols;
                item.setSize(dims);
            }
            else if (this._maxRows > 0 && dims.y > this._maxRows) {
                dims.y = this._maxRows;
                item.setSize(dims);
            }
            if (this._hasGridCollision(pos, dims) || !this._isWithinBounds(pos, dims, true)) {
                var newPosition = this._fixGridPosition(pos, dims);
                item.setGridPosition(newPosition);
            }
            this._addToGrid(item);
        }
    }
    _calculateColWidth() {
        if (this._autoResize) {
            if (this._maxCols > 0 || this._visibleCols > 0) {
                var maxCols = this._maxCols > 0 ? this._maxCols : this._visibleCols;
                var maxWidth = this.element.getBoundingClientRect().width;
                var colWidth = Math.floor(maxWidth / maxCols);
                colWidth -= (this.marginLeft + this.marginRight);
                if (colWidth > 0)
                    this.colWidth = colWidth;
            }
        }
        if (this.colWidth < this.minWidth || this.minCols > this._config.min_cols) {
            this.minCols = Math.max(this._config.min_cols, Math.ceil(this.minWidth / this.colWidth));
        }
    }
    _calculateRowHeight() {
        if (this._autoResize) {
            if (this._maxRows > 0 || this._visibleRows > 0) {
                var maxRows = this._maxRows > 0 ? this._maxRows : this._visibleRows;
                let maxHeight;
                if (this._elementBasedDynamicRowHeight) {
                    maxHeight = this.element.getBoundingClientRect().height;
                }
                else {
                    maxHeight = window.innerHeight - this.marginTop - this.marginBottom;
                }
                var rowHeight = Math.max(Math.floor(maxHeight / maxRows), this.minHeight);
                rowHeight -= (this.marginTop + this.marginBottom);
                if (rowHeight > 0)
                    this.rowHeight = rowHeight;
            }
        }
        if (this.rowHeight < this.minHeight || this.minRows > this._config.min_rows) {
            this.minRows = Math.max(this._config.min_rows, Math.ceil(this.minHeight / this.rowHeight));
        }
    }
    _updateRatio() {
        if (this._autoResize && this._maintainRatio) {
            if (this._maxCols > 0 && this._visibleRows <= 0) {
                this.rowHeight = this.colWidth / this._aspectRatio;
            }
            else if (this._maxRows > 0 && this._visibleCols <= 0) {
                this.colWidth = this._aspectRatio * this.rowHeight;
            }
            else if (this._maxCols == 0 && this._maxRows == 0) {
                if (this._visibleCols > 0) {
                    this.rowHeight = this.colWidth / this._aspectRatio;
                }
                else if (this._visibleRows > 0) {
                    this.colWidth = this._aspectRatio * this.rowHeight;
                }
            }
        }
    }
    _applyChanges(changes) {
        changes.forEachAddedItem((record) => { this._config[record.key] = record.currentValue; });
        changes.forEachChangedItem((record) => { this._config[record.key] = record.currentValue; });
        changes.forEachRemovedItem((record) => { delete this._config[record.key]; });
        this.setConfig(this._config);
    }
    _resizeStart(e) {
        if (this.resizeEnable) {
            var mousePos = this._getMousePosition(e);
            var item = this._getItemFromPosition(mousePos);
            if (item) {
                item.startMoving();
                this._resizingItem = item;
                this._resizeDirection = item.canResize(e);
                this._removeFromGrid(item);
                this._createPlaceholder(item);
                this.isResizing = true;
                this._resizeReady = false;
                // TODO this.onResizeStart.emit(item);
                item.onResizeStartEvent();
            }
        }
    }
    _dragStart(e) {
        if (this.dragEnable) {
            var mousePos = this._getMousePosition(e);
            var item = this._getItemFromPosition(mousePos);
            if (item) {
                var itemPos = item.getPosition();
                var pOffset = { 'left': (mousePos.left - itemPos.left), 'top': (mousePos.top - itemPos.top) };
                item.startMoving();
                this._draggingItem = item;
                this._posOffset = pOffset;
                this._removeFromGrid(item);
                this._createPlaceholder(item);
                this.isDragging = true;
                this._dragReady = false;
                // TODO this.onDragStart.emit(item);
                item.onDragStartEvent();
                if (this._zoomOnDrag) {
                    this._zoomOut();
                }
            }
        }
    }
    _zoomOut() {
        this.element.style.transform = 'scale(0.5, 0.5)';
    }
    _resetZoom() {
        this.element.style.transform = '';
    }
    _drag(e) {
        if (this.isDragging) {
            if (window.getSelection) {
                if (window.getSelection().empty) {
                    window.getSelection().empty();
                }
                else if (window.getSelection().removeAllRanges) {
                    window.getSelection().removeAllRanges();
                }
            }
            else if (document.selection) {
                document.selection.empty();
            }
            var mousePos = this._getMousePosition(e);
            var newL = (mousePos.left - this._posOffset.left);
            var newT = (mousePos.top - this._posOffset.top);
            var itemPos = this._draggingItem.getGridPosition();
            var gridPos = this._calculateGridPosition(newL, newT);
            var dims = this._draggingItem.getSize();
            gridPos = this._fixPosToBoundsX(gridPos, dims);
            if (!this._isWithinBoundsY(gridPos, dims)) {
                gridPos = this._fixPosToBoundsY(gridPos, dims);
            }
            if (gridPos.col != itemPos.col || gridPos.row != itemPos.row) {
                this._draggingItem.setGridPosition(gridPos, this._fixToGrid);
                this._placeholderRef.setGridPosition(gridPos);
                if (['up', 'down', 'left', 'right'].indexOf(this.cascade) >= 0) {
                    this._fixGridCollisions(gridPos, dims);
                    this._cascadeGrid(gridPos, dims);
                }
            }
            if (!this._fixToGrid) {
                this._draggingItem.setPosition(newL, newT);
            }
            // TODO this.onDrag.emit(this._draggingItem);
            this._draggingItem.onDragEvent();
        }
    }
    _resize(e) {
        if (this.isResizing) {
            if (window.getSelection) {
                if (window.getSelection().empty) {
                    window.getSelection().empty();
                }
                else if (window.getSelection().removeAllRanges) {
                    window.getSelection().removeAllRanges();
                }
            }
            else if (document.selection) {
                document.selection.empty();
            }
            var mousePos = this._getMousePosition(e);
            var itemPos = this._resizingItem.getPosition();
            var itemDims = this._resizingItem.getDimensions();
            var newW = this._resizeDirection == 'height' ? itemDims.width : (mousePos.left - itemPos.left + 10);
            var newH = this._resizeDirection == 'width' ? itemDims.height : (mousePos.top - itemPos.top + 10);
            if (newW < this.minWidth)
                newW = this.minWidth;
            if (newH < this.minHeight)
                newH = this.minHeight;
            if (newW < this._resizingItem.minWidth)
                newW = this._resizingItem.minWidth;
            if (newH < this._resizingItem.minHeight)
                newH = this._resizingItem.minHeight;
            var calcSize = this._calculateGridSize(newW, newH);
            var itemSize = this._resizingItem.getSize();
            var iGridPos = this._resizingItem.getGridPosition();
            if (!this._isWithinBoundsX(iGridPos, calcSize))
                calcSize = this._fixSizeToBoundsX(iGridPos, calcSize);
            if (!this._isWithinBoundsY(iGridPos, calcSize))
                calcSize = this._fixSizeToBoundsY(iGridPos, calcSize);
            calcSize = this._resizingItem.fixResize(calcSize);
            if (calcSize.x != itemSize.x || calcSize.y != itemSize.y) {
                this._resizingItem.setSize(calcSize, this._fixToGrid);
                this._placeholderRef.setSize(calcSize);
                if (['up', 'down', 'left', 'right'].indexOf(this.cascade) >= 0) {
                    this._fixGridCollisions(iGridPos, calcSize);
                    this._cascadeGrid(iGridPos, calcSize);
                }
            }
            if (!this._fixToGrid)
                this._resizingItem.setDimensions(newW, newH);
            var bigGrid = this._maxGridSize(itemPos.left + newW + (2 * e.movementX), itemPos.top + newH + (2 * e.movementY));
            if (this._resizeDirection == 'height')
                bigGrid.x = iGridPos.col + itemSize.x;
            if (this._resizeDirection == 'width')
                bigGrid.y = iGridPos.row + itemSize.y;
            // TODO this.onResize.emit(this._resizingItem);
            this._resizingItem.onResizeEvent();
        }
    }
    _dragStop(e) {
        if (this.isDragging) {
            this.isDragging = false;
            var itemPos = this._draggingItem.getGridPosition();
            this._draggingItem.setGridPosition(itemPos);
            this._addToGrid(this._draggingItem);
            this._cascadeGrid();
            this._updateSize();
            this._filterGrid();
            this._draggingItem.stopMoving();
            this._draggingItem.onDragStopEvent();
            // TODO this.onDragStop.emit(this._draggingItem);
            this._draggingItem = null;
            this._posOffset = null;
            this._placeholderRef.hide();
            this._emitOnItemChange();
            if (this._zoomOnDrag) {
                this._resetZoom();
            }
        }
    }
    _resizeStop(e) {
        if (this.isResizing) {
            this.isResizing = false;
            var itemDims = this._resizingItem.getSize();
            this._resizingItem.setSize(itemDims);
            this._addToGrid(this._resizingItem);
            this._cascadeGrid();
            this._updateSize();
            this._filterGrid();
            this._resizingItem.stopMoving();
            this._resizingItem.onResizeStopEvent();
            // TODO this.onResizeStop.emit(this._resizingItem);
            this._resizingItem = null;
            this._resizeDirection = null;
            this._placeholderRef.hide();
            this._emitOnItemChange();
        }
    }
    _maxGridSize(w, h) {
        var sizex = Math.ceil(w / (this.colWidth + this.marginLeft + this.marginRight));
        var sizey = Math.ceil(h / (this.rowHeight + this.marginTop + this.marginBottom));
        return { 'x': sizex, 'y': sizey };
    }
    _calculateGridSize(width, height) {
        width += this.marginLeft + this.marginRight;
        height += this.marginTop + this.marginBottom;
        var sizex = Math.max(this.minCols, Math.round(width / (this.colWidth + this.marginLeft + this.marginRight)));
        var sizey = Math.max(this.minRows, Math.round(height / (this.rowHeight + this.marginTop + this.marginBottom)));
        if (!this._isWithinBoundsX({ col: 1, row: 1 }, { x: sizex, y: sizey }))
            sizex = this._maxCols;
        if (!this._isWithinBoundsY({ col: 1, row: 1 }, { x: sizex, y: sizey }))
            sizey = this._maxRows;
        return { 'x': sizex, 'y': sizey };
    }
    _calculateGridPosition(left, top) {
        var col = Math.max(1, Math.round(left / (this.colWidth + this.marginLeft + this.marginRight)) + 1);
        var row = Math.max(1, Math.round(top / (this.rowHeight + this.marginTop + this.marginBottom)) + 1);
        if (!this._isWithinBoundsX({ col: col, row: row }, { x: 1, y: 1 }))
            col = this._maxCols;
        if (!this._isWithinBoundsY({ col: col, row: row }, { x: 1, y: 1 }))
            row = this._maxRows;
        return { 'col': col, 'row': row };
    }
    _hasGridCollision(pos, dims) {
        var positions = this._getCollisions(pos, dims);
        if (positions == null || positions.length == 0)
            return false;
        return positions.some((v) => {
            return !(v === null);
        });
    }
    _getCollisions(pos, dims) {
        const returns = [];
        if (!pos.col) {
            pos.col = 1;
        }
        if (!pos.row) {
            pos.row = 1;
        }
        for (let j = 0; j < dims.y; j++) {
            if (this._itemGrid[pos.row + j] != null) {
                for (let i = 0; i < dims.x; i++) {
                    if (this._itemGrid[pos.row + j][pos.col + i] != null) {
                        const item = this._itemGrid[pos.row + j][pos.col + i];
                        if (returns.indexOf(item) < 0)
                            returns.push(item);
                        const itemPos = item.getGridPosition();
                        const itemDims = item.getSize();
                        i = itemPos.col + itemDims.x - pos.col;
                    }
                }
            }
        }
        return returns;
    }
    _fixGridCollisions(pos, dims) {
        while (this._hasGridCollision(pos, dims)) {
            const collisions = this._getCollisions(pos, dims);
            this._removeFromGrid(collisions[0]);
            const itemPos = collisions[0].getGridPosition();
            const itemDims = collisions[0].getSize();
            switch (this.cascade) {
                case 'up':
                case 'down':
                default:
                    const oldRow = itemPos.row;
                    itemPos.row = pos.row + dims.y;
                    if (!this._isWithinBoundsY(itemPos, itemDims)) {
                        itemPos.col = pos.col + dims.x;
                        itemPos.row = oldRow;
                    }
                    break;
                case 'left':
                case 'right':
                    const oldCol = itemPos.col;
                    itemPos.col = pos.col + dims.x;
                    if (!this._isWithinBoundsX(itemPos, itemDims)) {
                        itemPos.col = oldCol;
                        itemPos.row = pos.row + dims.y;
                    }
                    break;
            }
            collisions[0].setGridPosition(itemPos);
            this._fixGridCollisions(itemPos, itemDims);
            this._addToGrid(collisions[0]);
            collisions[0].onCascadeEvent();
        }
    }
    _cascadeGrid(pos, dims) {
        if (this._destroyed)
            return;
        if (pos && !dims)
            throw new Error('Cannot cascade with only position and not dimensions');
        if (this.isDragging && this._draggingItem && !pos && !dims) {
            pos = this._draggingItem.getGridPosition();
            dims = this._draggingItem.getSize();
        }
        else if (this.isResizing && this._resizingItem && !pos && !dims) {
            pos = this._resizingItem.getGridPosition();
            dims = this._resizingItem.getSize();
        }
        switch (this.cascade) {
            case 'up':
            case 'down':
                const lowestRowPerColumn = new Map();
                for (let row = 1; row <= this._curMaxRow; row++) {
                    if (this._itemGrid[row] == undefined)
                        continue;
                    for (let col = 1; col <= this._curMaxCol; col++) {
                        if (this._itemGrid[row] == undefined)
                            break;
                        if (lowestRowPerColumn.has(col) && row < lowestRowPerColumn.get(col))
                            continue;
                        if (this._itemGrid[row][col] != null) {
                            const item = this._itemGrid[row][col];
                            if (item.isFixed)
                                continue;
                            const itemDims = item.getSize();
                            const itemPos = item.getGridPosition();
                            if (itemPos.col != col || itemPos.row != row)
                                continue; //	If this is not the element's start
                            let lowestRowForItem = lowestRowPerColumn.has(col) ? lowestRowPerColumn.get(col) : 1;
                            for (let i = 1; i < itemDims.x; i++) {
                                const lowestRowForColumn = lowestRowPerColumn.has(col + i) ? lowestRowPerColumn.get(col + i) : 1;
                                lowestRowForItem = Math.max(lowestRowForColumn, lowestRowForItem);
                            }
                            if (pos && (col + itemDims.x) > pos.col && col < (pos.col + dims.x)) { //	If our element is in one of the item's columns
                                if ((row >= pos.row && row < (pos.row + dims.y)) || //	If this row is occupied by our element
                                    ((itemDims.y > (pos.row - lowestRowForItem)) && //	Or the item can't fit above our element
                                        (row >= (pos.row + dims.y) && lowestRowForItem < (pos.row + dims.y)))) { //		And this row is below our element, but we haven't caught it
                                    lowestRowForItem = Math.max(lowestRowForItem, pos.row + dims.y); //	Set the lowest row to be below it
                                }
                            }
                            const newPos = { col: col, row: lowestRowForItem };
                            if (lowestRowForItem != itemPos.row && this._isWithinBoundsY(newPos, itemDims)) { //	If the item is not already on this row move it up
                                this._removeFromGrid(item);
                                item.setGridPosition(newPos);
                                item.onCascadeEvent();
                                this._addToGrid(item);
                            }
                            for (let i = 0; i < itemDims.x; i++) {
                                lowestRowPerColumn.set(col + i, lowestRowForItem + itemDims.y); //	Update the lowest row to be below the item
                            }
                        }
                    }
                }
                break;
            case 'left':
            case 'right':
                const lowestColumnPerRow = new Map();
                for (let row = 1; row <= this._curMaxRow; row++) {
                    if (this._itemGrid[row] == undefined)
                        continue;
                    for (let col = 1; col <= this._curMaxCol; col++) {
                        if (this._itemGrid[row] == undefined)
                            break;
                        if (lowestColumnPerRow.has(row) && col < lowestColumnPerRow.get(row))
                            continue;
                        if (this._itemGrid[row][col] != null) {
                            const item = this._itemGrid[row][col];
                            const itemDims = item.getSize();
                            const itemPos = item.getGridPosition();
                            if (itemPos.col != col || itemPos.row != row)
                                continue; //	If this is not the element's start
                            let lowestColumnForItem = lowestColumnPerRow.has(row) ? lowestColumnPerRow.get(row) : 1;
                            for (let i = 1; i < itemDims.y; i++) {
                                let lowestOffsetColumn = lowestColumnPerRow.has(row + i) ? lowestColumnPerRow.get(row + i) : 1;
                                lowestColumnForItem = Math.max(lowestOffsetColumn, lowestColumnForItem);
                            }
                            if (pos && (row + itemDims.y) > pos.row && row < (pos.row + dims.y)) { //	If our element is in one of the item's rows
                                if ((col >= pos.col && col < (pos.col + dims.x)) || //	If this col is occupied by our element
                                    ((itemDims.x > (pos.col - lowestColumnForItem)) && //	Or the item can't fit above our element
                                        (col >= (pos.col + dims.x) && lowestColumnForItem < (pos.col + dims.x)))) { //		And this col is below our element, but we haven't caught it
                                    lowestColumnForItem = Math.max(lowestColumnForItem, pos.col + dims.x); //	Set the lowest col to be below it
                                }
                            }
                            const newPos = { col: lowestColumnForItem, row: row };
                            if (lowestColumnForItem != itemPos.col && this._isWithinBoundsX(newPos, itemDims)) { //	If the item is not already on this col move it up
                                this._removeFromGrid(item);
                                item.setGridPosition(newPos);
                                item.onCascadeEvent();
                                this._addToGrid(item);
                            }
                            for (let i = 0; i < itemDims.y; i++) {
                                lowestColumnPerRow.set(row + i, lowestColumnForItem + itemDims.x); //	Update the lowest col to be below the item
                            }
                        }
                    }
                }
                break;
            default:
                break;
        }
    }
    _fixGridPosition(pos, dims) {
        while (this._hasGridCollision(pos, dims) || !this._isWithinBounds(pos, dims, true)) {
            if (this._hasGridCollision(pos, dims)) {
                const collisions = this._getCollisions(pos, dims);
                switch (this.cascade) {
                    case 'up':
                    case 'down':
                    default:
                        pos.row = Math.max.apply(null, collisions.map((item) => item.row + item.sizey));
                        break;
                    case 'left':
                    case 'right':
                        pos.col = Math.max.apply(null, collisions.map((item) => item.col + item.sizex));
                        break;
                }
            }
            if (!this._isWithinBoundsY(pos, dims)) {
                pos.col++;
                pos.row = 1;
            }
            if (!this._isWithinBoundsX(pos, dims)) {
                pos.row++;
                pos.col = 1;
            }
        }
        return pos;
    }
    _isWithinBoundsX(pos, dims, allowExcessiveItems = false) {
        return this._maxCols == 0 || (allowExcessiveItems && pos.col == 1) || (pos.col + dims.x - 1) <= this._maxCols;
    }
    _fixPosToBoundsX(pos, dims) {
        if (!this._isWithinBoundsX(pos, dims)) {
            pos.col = Math.max(this._maxCols - (dims.x - 1), 1);
            pos.row++;
        }
        return pos;
    }
    _fixSizeToBoundsX(pos, dims) {
        if (!this._isWithinBoundsX(pos, dims)) {
            dims.x = Math.max(this._maxCols - (pos.col - 1), 1);
            dims.y++;
        }
        return dims;
    }
    _isWithinBoundsY(pos, dims, allowExcessiveItems = false) {
        return this._maxRows == 0 || (allowExcessiveItems && pos.row == 1) || (pos.row + dims.y - 1) <= this._maxRows;
    }
    _fixPosToBoundsY(pos, dims) {
        if (!this._isWithinBoundsY(pos, dims)) {
            pos.row = Math.max(this._maxRows - (dims.y - 1), 1);
            pos.col++;
        }
        return pos;
    }
    _fixSizeToBoundsY(pos, dims) {
        if (!this._isWithinBoundsY(pos, dims)) {
            dims.y = Math.max(this._maxRows - (pos.row - 1), 1);
            dims.x++;
        }
        return dims;
    }
    _isWithinBounds(pos, dims, allowExcessiveItems = false) {
        return this._isWithinBoundsX(pos, dims, allowExcessiveItems) && this._isWithinBoundsY(pos, dims, allowExcessiveItems);
    }
    _fixPosToBounds(pos, dims) {
        return this._fixPosToBoundsX(this._fixPosToBoundsY(pos, dims), dims);
    }
    _fixSizeToBounds(pos, dims) {
        return this._fixSizeToBoundsX(pos, this._fixSizeToBoundsY(pos, dims));
    }
    _addToGrid(item) {
        let pos = item.getGridPosition();
        const dims = item.getSize();
        if (this._hasGridCollision(pos, dims)) {
            this._fixGridCollisions(pos, dims);
            pos = item.getGridPosition();
        }
        for (let j = 0; j < dims.y; j++) {
            if (this._itemGrid[pos.row + j] == null)
                this._itemGrid[pos.row + j] = {};
            for (let i = 0; i < dims.x; i++) {
                this._itemGrid[pos.row + j][pos.col + i] = item;
            }
        }
    }
    _removeFromGrid(item) {
        for (let y in this._itemGrid)
            for (let x in this._itemGrid[y])
                if (this._itemGrid[y][x] == item)
                    delete this._itemGrid[y][x];
    }
    _filterGrid() {
        for (let y in this._itemGrid) {
            for (let x in this._itemGrid[y]) {
                const item = this._itemGrid[y][x];
                const withinRow = y < (item.row + item.sizey) && y >= item.row;
                const withinCol = x < (item.col + item.sizex) && x >= item.col;
                if (this._items.indexOf(this._itemGrid[y][x]) < 0 || !withinRow || !withinCol) {
                    delete this._itemGrid[y][x];
                }
            }
            if (Object.keys(this._itemGrid[y]).length == 0) {
                delete this._itemGrid[y];
            }
        }
    }
    _updateSize() {
        if (this._destroyed)
            return;
        let maxCol = this._getMaxCol();
        let maxRow = this._getMaxRow();
        if (maxCol != this._curMaxCol || maxRow != this._curMaxRow) {
            this._curMaxCol = maxCol;
            this._curMaxRow = maxRow;
        }
        this.element.style.width = '100%'; //(maxCol * (this.colWidth + this.marginLeft + this.marginRight))+'px');
        if (!this._elementBasedDynamicRowHeight) {
            this.element.style.height = maxRow * (this.rowHeight + this.marginTop + this.marginBottom) + 'px';
        }
    }
    _getMaxRow() {
        return Math.max.apply(null, this._items.map((item) => item.row + item.sizey - 1));
    }
    _getMaxCol() {
        return Math.max.apply(null, this._items.map((item) => item.col + item.sizex - 1));
    }
    _getMousePosition(e) {
        if ((window.TouchEvent && e instanceof TouchEvent) || (e.touches || e.changedTouches)) {
            e = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0];
        }
        const refPos = this.element.getBoundingClientRect();
        let left = e.clientX - refPos.left;
        let top = e.clientY - refPos.top;
        if (this.cascade == 'down')
            top = refPos.top + refPos.height - e.clientY;
        if (this.cascade == 'right')
            left = refPos.left + refPos.width - e.clientX;
        if (this.isDragging && this._zoomOnDrag) {
            left *= 2;
            top *= 2;
        }
        return {
            left: left,
            top: top
        };
    }
    _getAbsoluteMousePosition(e) {
        if ((window.TouchEvent && e instanceof TouchEvent) || (e.touches || e.changedTouches)) {
            e = e.touches.length > 0 ? e.touches[0] : e.changedTouches[0];
        }
        return {
            left: e.clientX,
            top: e.clientY
        };
    }
    _getContainerColumns() {
        const maxWidth = this.element.getBoundingClientRect().width;
        const itemWidth = this.colWidth + this.marginLeft + this.marginRight;
        return Math.floor(maxWidth / itemWidth);
    }
    _getScreenMargin() {
        const maxWidth = this.element.getBoundingClientRect().width;
        const itemWidth = this.colWidth + this.marginLeft + this.marginRight;
        return Math.floor((maxWidth - (this._maxCols * itemWidth)) / 2);
        ;
    }
    _getContainerRows() {
        const maxHeight = window.innerHeight - this.marginTop - this.marginBottom;
        return Math.floor(maxHeight / (this.rowHeight + this.marginTop + this.marginBottom));
    }
    _getItemFromPosition(position) {
        for (let item of this._items) {
            const size = item.getDimensions();
            const pos = item.getPosition();
            if (position.left > pos.left && position.left < (pos.left + size.width) &&
                position.top > pos.top && position.top < (pos.top + size.height)) {
                return item;
            }
        }
        return null;
    }
    _createPlaceholder(item) {
        const pos = item.getGridPosition();
        const dims = item.getSize();
        this._placeholderRef.setCascadeMode(this.cascade);
        this._placeholderRef.setGridPosition({ col: pos.col, row: pos.row });
        this._placeholderRef.setSize({ x: dims.x, y: dims.y });
        this._placeholderRef.show();
    }
    _emitOnItemChange() {
        //TODO this.onItemChange.emit(this._items.map((item: AuGridsterItem) => item.getEventOutput()));
    }
};
AuGridster.CONST_DEFAULT_CONFIG = {
    margins: [10],
    draggable: true,
    resizable: true,
    max_cols: 0,
    max_rows: 0,
    visible_cols: 0,
    visible_rows: 0,
    col_width: 250,
    row_height: 250,
    cascade: 'up',
    min_width: 100,
    min_height: 100,
    fix_to_grid: false,
    auto_style: true,
    auto_resize: false,
    maintain_ratio: false,
    prefer_new: false,
    zoom_on_drag: false,
    limit_to_screen: false,
    center_to_screen: false,
    element_based_row_height: false,
};
__decorate([
    bindable()
], AuGridster.prototype, "gridOpts", void 0);
AuGridster = AuGridster_1 = __decorate([
    inlineView('<template>' +
        '<div   resizeable resize.trigger="onResizeHandler($event.detail)">' +
        '<slot></slot>' +
        '<au-gridster-placeholder view-model.ref="_placeholderRef"></au-gridster-placeholder>' +
        '</div>' +
        '</template>'),
    customElement('au-gridster'),
    inject(Element, AureliaGridsterConfig, EventAggregator)
], AuGridster);
export { AuGridster };
;
var AuGridster_1;
