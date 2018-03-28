import { FrameworkConfiguration } from 'aurelia-framework';
export declare class AureliaGridsterConfig {
    margins: number[];
    draggable: boolean;
    resizable: boolean;
    max_cols: number;
    max_rows: number;
    visible_cols: number;
    visible_rows: number;
    col_width: number;
    row_height: number;
    cascade: string;
    min_width: number;
    min_height: number;
    fix_to_grid: boolean;
    auto_style: boolean;
    auto_resize: boolean;
    maintain_ratio: boolean;
    prefer_new: boolean;
    zoom_on_drag: boolean;
    limit_to_screen: boolean;
    center_to_screen: boolean;
    element_based_row_height: boolean;
    constructor();
}
export declare function configure(conf: FrameworkConfiguration, callback: any): void;
