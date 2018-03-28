"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/************************************/
/* Created by janis@fnet.lv on 2018 */
/************************************/
var aurelia_pal_1 = require("aurelia-pal");
// export * from  "./au-gridster";
// export * from  "./au-gridster-item";
// export * from  "./au-gridster-placeholder";
//export * from "./au-gridster-interfaces.d";
var AureliaGridsterConfig = /** @class */ (function () {
    function AureliaGridsterConfig() {
        this.margins = [10];
        this.draggable = true;
        this.resizable = true;
        this.max_cols = 0;
        this.max_rows = 0;
        this.visible_cols = 0;
        this.visible_rows = 0;
        this.col_width = 250;
        this.row_height = 250;
        this.cascade = 'up';
        this.min_width = 100;
        this.min_height = 100;
        this.fix_to_grid = false;
        this.auto_style = true;
        this.auto_resize = false;
        this.maintain_ratio = true;
        this.prefer_new = false;
        this.zoom_on_drag = false;
        this.limit_to_screen = false;
        this.center_to_screen = false;
        this.element_based_row_height = false;
    }
    return AureliaGridsterConfig;
}());
exports.AureliaGridsterConfig = AureliaGridsterConfig;
function configure(conf, callback) {
    conf.plugin(aurelia_pal_1.PLATFORM.moduleName('aurelia-resize'));
    // conf.globalResources(PLATFORM.moduleName('./au-gridster'));
    // conf.globalResources(PLATFORM.moduleName('./au-gridster-item'));
    // conf.globalResources(PLATFORM.moduleName('./au-gridster-placeholder'));
    conf.globalResources([
        aurelia_pal_1.PLATFORM.moduleName('./au-gridster'),
        aurelia_pal_1.PLATFORM.moduleName('./au-gridster-item'),
        aurelia_pal_1.PLATFORM.moduleName('./au-gridster-placeholder')
    ]);
    // conf.globalResources([
    //     './au-gridster',
    //     './au-gridster-item',
    //     './au-gridster-placeholder'
    // ]);
    var config = new AureliaGridsterConfig();
    if (typeof callback === 'function') {
        callback(config);
    }
    conf.container.registerInstance(AureliaGridsterConfig, config);
}
exports.configure = configure;
