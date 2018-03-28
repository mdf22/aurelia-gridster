var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "aurelia-dependency-injection", "aurelia-templating", "aurelia-framework"], function (require, exports, aurelia_dependency_injection_1, aurelia_templating_1, aurelia_framework_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var AuGridsterItem = /** @class */ (function () {
        function AuGridsterItem(element) {
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
        AuGridsterItem_1 = AuGridsterItem;
        AuGridsterItem.prototype.created = function () {
            // let mainEl = <any>this.element.closest('.grid');
            // console.log('Item this created',mainEl)
            // if (mainEl && mainEl.au['au-gridster'].viewModel) {
            //     this._auGridster = mainEl.au['au-gridster'].viewModel;
            // }
        };
        AuGridsterItem.prototype.bind = function (bindingContext, overrideContext) {
            console.log('OPTS BIND', this.itemOpts);
        };
        AuGridsterItem.prototype.detached = function () {
            if (this._added)
                this._auGridster.removeItem(this);
        };
        AuGridsterItem.prototype.itemOptsChanged = function (newItemOpts, oldItemOpts) {
            console.log('OPTS CHANGED', newItemOpts, oldItemOpts);
        };
        Object.defineProperty(AuGridsterItem.prototype, "config", {
            set: function (v) {
                var defaults = AuGridsterItem_1.CONST_DEFAULT_CONFIG;
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
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuGridsterItem.prototype, "sizex", {
            get: function () {
                return this._size.x;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuGridsterItem.prototype, "sizey", {
            get: function () {
                return this._size.y;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuGridsterItem.prototype, "col", {
            get: function () {
                return this._currentPosition.col;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuGridsterItem.prototype, "row", {
            get: function () {
                return this._currentPosition.row;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuGridsterItem.prototype, "currentCol", {
            get: function () {
                return this._currentPosition.col;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AuGridsterItem.prototype, "currentRow", {
            get: function () {
                return this._currentPosition.row;
            },
            enumerable: true,
            configurable: true
        });
        AuGridsterItem.prototype.onResizeStartEvent = function () {
            var event = this.getEventOutput();
            // this.onResizeStart.emit(event);
            // this.onResizeAny.emit(event);
            // this.onChangeStart.emit(event);
            // this.onChangeAny.emit(event);
        };
        AuGridsterItem.prototype.onResizeEvent = function () {
            var event = this.getEventOutput();
            // this.onResize.emit(event);
            // this.onResizeAny.emit(event);
            // this.onChange.emit(event);
            // this.onChangeAny.emit(event);
        };
        AuGridsterItem.prototype.onResizeStopEvent = function () {
            var event = this.getEventOutput();
            // this.onResizeStop.emit(event);
            // this.onResizeAny.emit(event);
            // this.onChangeStop.emit(event);
            // this.onChangeAny.emit(event);
            //
            // this._config.sizex = this._size.x;
            // this._config.sizey = this._size.y;
            // this.ngGridItemChange.emit(this._config);
        };
        AuGridsterItem.prototype.onDragStartEvent = function () {
            var event = this.getEventOutput();
            // this.onDragStart.emit(event);
            // this.onDragAny.emit(event);
            // this.onChangeStart.emit(event);
            // this.onChangeAny.emit(event);
        };
        AuGridsterItem.prototype.onDragEvent = function () {
            var event = this.getEventOutput();
            // this.onDrag.emit(event);
            // this.onDragAny.emit(event);
            // this.onChange.emit(event);
            // this.onChangeAny.emit(event);
        };
        AuGridsterItem.prototype.onDragStopEvent = function () {
            var event = this.getEventOutput();
            // this.onDragStop.emit(event);
            // this.onDragAny.emit(event);
            // this.onChangeStop.emit(event);
            // this.onChangeAny.emit(event);
            //
            // this._config.col = this._currentPosition.col;
            // this._config.row = this._currentPosition.row;
            // this.ngGridItemChange.emit(this._config);
        };
        AuGridsterItem.prototype.onCascadeEvent = function () {
            // this._config.sizex = this._size.x;
            // this._config.sizey = this._size.y;
            // this._config.col = this._currentPosition.col;
            // this._config.row = this._currentPosition.row;
            // this.ngGridItemChange.emit(this._config);
        };
        AuGridsterItem.prototype.attached = function () {
            var mainEl = this.element.closest('.grid');
            if (mainEl && mainEl.au['au-gridster'].viewModel) {
                this._auGridster = mainEl.au['au-gridster'].viewModel;
            }
            var defaults = AuGridsterItem_1.CONST_DEFAULT_CONFIG;
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
        };
        //	Public methods
        AuGridsterItem.prototype.canDrag = function (e) {
            if (!this.isDraggable)
                return false;
            if (this._dragHandle) {
                return this.findHandle(this._dragHandle, e.target);
            }
            return true;
        };
        AuGridsterItem.prototype.findHandle = function (handleSelector, startElement) {
            try {
                var targetElem = startElement;
                while (targetElem && targetElem != this.element) {
                    if (this.elementMatches(targetElem, handleSelector))
                        return true;
                    targetElem = targetElem.parentElement;
                }
            }
            catch (err) { }
            return false;
        };
        AuGridsterItem.prototype.canResize = function (e) {
            if (!this.isResizable)
                return null;
            if (this._resizeHandle) {
                return this.findHandle(this._resizeHandle, e.target) ? 'both' : null;
            }
            this._borderSize = 5;
            if (this._borderSize <= 0)
                return null;
            var mousePos = this._getMousePosition(e);
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
        };
        AuGridsterItem.prototype.onMouseMove = function (e) {
            if (this._auGridster.autoStyle) {
                if (this._auGridster.resizeEnable && !this._resizeHandle && this.isResizable) {
                    var mousePos = this._getMousePosition(e);
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
        };
        //	Getters
        AuGridsterItem.prototype.getElement = function () {
            return this.element;
        };
        AuGridsterItem.prototype.getDragHandle = function () {
            return this._dragHandle;
        };
        AuGridsterItem.prototype.getResizeHandle = function () {
            return this._resizeHandle;
        };
        AuGridsterItem.prototype.getDimensions = function () {
            return { 'width': this._elemWidth, 'height': this._elemHeight };
        };
        AuGridsterItem.prototype.getSize = function () {
            return this._size;
        };
        AuGridsterItem.prototype.getPosition = function () {
            return { 'left': this._elemLeft, 'top': this._elemTop };
        };
        AuGridsterItem.prototype.getGridPosition = function () {
            return this._currentPosition;
        };
        //	Setters
        AuGridsterItem.prototype.setConfig = function (config) {
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
        };
        AuGridsterItem.prototype.ngDoCheck = function () {
            if (this._differ != null) {
                var changes = this._differ.diff(this._config);
                if (changes != null) {
                    this._applyChanges(changes);
                    return true;
                }
            }
            return false;
        };
        AuGridsterItem.prototype.setSize = function (newSize, update) {
            if (update === void 0) { update = true; }
            newSize = this.fixResize(newSize);
            this._size = newSize;
            if (update)
                this._recalculateDimensions();
            this.itemOpts.col = this._currentPosition.col;
            this.itemOpts.row = this._currentPosition.row;
            this.itemOpts.sizex = this._size.x;
            this.itemOpts.sizey = this._size.y;
            //TODO this.onItemChange.emit(this.getEventOutput());
        };
        AuGridsterItem.prototype.setGridPosition = function (gridPosition, update) {
            if (update === void 0) { update = true; }
            this._currentPosition = gridPosition;
            if (update)
                this._recalculatePosition();
            this.itemOpts.col = this._currentPosition.col;
            this.itemOpts.row = this._currentPosition.row;
            this.itemOpts.sizex = this._size.x;
            this.itemOpts.sizey = this._size.y;
            //TODO this.onItemChange.emit(this.getEventOutput());
        };
        AuGridsterItem.prototype.getEventOutput = function () {
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
        };
        AuGridsterItem.prototype.setPosition = function (x, y) {
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
        };
        AuGridsterItem.prototype.setCascadeMode = function (cascade) {
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
        };
        AuGridsterItem.prototype.setDimensions = function (w, h) {
            if (w < this.minWidth)
                w = this.minWidth;
            if (h < this.minHeight)
                h = this.minHeight;
            this.element.style.width = w + 'px';
            this.element.style.height = h + 'px';
            this._elemWidth = w;
            this._elemHeight = h;
        };
        AuGridsterItem.prototype.startMoving = function () {
            this.element.classList.add('moving');
            var style = window.getComputedStyle(this.element);
            if (this._auGridster.autoStyle)
                this.element.style['z-index'] = (parseInt(style.getPropertyValue('z-index')) + 1).toString();
        };
        AuGridsterItem.prototype.stopMoving = function () {
            this.element.classList.remove('moving');
            var style = window.getComputedStyle(this.element);
            if (this._auGridster.autoStyle)
                this.element.style['z-index'] = (parseInt(style.getPropertyValue('z-index')) - 1).toString();
        };
        AuGridsterItem.prototype.recalculateSelf = function () {
            this._recalculatePosition();
            this._recalculateDimensions();
        };
        AuGridsterItem.prototype.fixResize = function (newSize) {
            if (this._maxCols > 0 && newSize.x > this._maxCols)
                newSize.x = this._maxCols;
            if (this._maxRows > 0 && newSize.y > this._maxRows)
                newSize.y = this._maxRows;
            if (this._minCols > 0 && newSize.x < this._minCols)
                newSize.x = this._minCols;
            if (this._minRows > 0 && newSize.y < this._minRows)
                newSize.y = this._minRows;
            var itemWidth = (newSize.x * this._auGridster.colWidth) + ((this._auGridster.marginLeft + this._auGridster.marginRight) * (newSize.x - 1));
            if (itemWidth < this.minWidth)
                newSize.x = Math.ceil((this.minWidth + this._auGridster.marginRight + this._auGridster.marginLeft) / (this._auGridster.colWidth + this._auGridster.marginRight + this._auGridster.marginLeft));
            var itemHeight = (newSize.y * this._auGridster.rowHeight) + ((this._auGridster.marginTop + this._auGridster.marginBottom) * (newSize.y - 1));
            if (itemHeight < this.minHeight)
                newSize.y = Math.ceil((this.minHeight + this._auGridster.marginBottom + this._auGridster.marginTop) / (this._auGridster.rowHeight + this._auGridster.marginBottom + this._auGridster.marginTop));
            return newSize;
        };
        //	Private methods
        AuGridsterItem.prototype.elementMatches = function (element, selector) {
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
            var matches = (element.document || element.ownerDocument).querySelectorAll(selector);
            var i = matches.length;
            while (--i >= 0 && matches.item(i) !== element) { }
            return i > -1;
        };
        AuGridsterItem.prototype._recalculatePosition = function () {
            var x = (this._auGridster.colWidth + this._auGridster.marginLeft + this._auGridster.marginRight) * (this._currentPosition.col - 1) + this._auGridster.marginLeft + this._auGridster.screenMargin;
            var y = (this._auGridster.rowHeight + this._auGridster.marginTop + this._auGridster.marginBottom) * (this._currentPosition.row - 1) + this._auGridster.marginTop;
            this.setPosition(x, y);
        };
        AuGridsterItem.prototype._recalculateDimensions = function () {
            if (this._size.x < this._auGridster.minCols)
                this._size.x = this._auGridster.minCols;
            if (this._size.y < this._auGridster.minRows)
                this._size.y = this._auGridster.minRows;
            var newWidth = (this._auGridster.colWidth * this._size.x) + ((this._auGridster.marginLeft + this._auGridster.marginRight) * (this._size.x - 1));
            var newHeight = (this._auGridster.rowHeight * this._size.y) + ((this._auGridster.marginTop + this._auGridster.marginBottom) * (this._size.y - 1));
            var w = Math.max(this.minWidth, this._auGridster.minWidth, newWidth);
            var h = Math.max(this.minHeight, this._auGridster.minHeight, newHeight);
            this.setDimensions(w, h);
        };
        AuGridsterItem.prototype._getMousePosition = function (e) {
            if (e.originalEvent && e.originalEvent.touches) {
                var oe = e.originalEvent;
                e = oe.touches.length ? oe.touches[0] : (oe.changedTouches.length ? oe.changedTouches[0] : e);
            }
            else if (e.touches) {
                e = e.touches.length ? e.touches[0] : (e.changedTouches.length ? e.changedTouches[0] : e);
            }
            var refPos = this.element.getBoundingClientRect();
            return {
                left: e.clientX - refPos.left,
                top: e.clientY - refPos.top
            };
        };
        AuGridsterItem.prototype._applyChanges = function (changes) {
            var _this = this;
            changes.forEachAddedItem(function (record) { _this._config[record.key] = record.currentValue; });
            changes.forEachChangedItem(function (record) { _this._config[record.key] = record.currentValue; });
            changes.forEachRemovedItem(function (record) { delete _this._config[record.key]; });
            this.setConfig(this._config);
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
            aurelia_templating_1.bindable()
        ], AuGridsterItem.prototype, "itemOpts", void 0);
        AuGridsterItem = AuGridsterItem_1 = __decorate([
            aurelia_framework_1.inlineView('<template><slot></slot></template>'),
            aurelia_templating_1.customElement('au-gridster-item'),
            aurelia_dependency_injection_1.inject(Element)
        ], AuGridsterItem);
        return AuGridsterItem;
        var AuGridsterItem_1;
    }());
    exports.AuGridsterItem = AuGridsterItem;
    ;
});
