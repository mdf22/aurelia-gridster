/************************************/
/* Created by janis@fnet.lv on 2018 */
/************************************/
import { PLATFORM } from "aurelia-pal";
import {FrameworkConfiguration} from 'aurelia-framework';


// export * from  "./au-gridster";
// export * from  "./au-gridster-item";
// export * from  "./au-gridster-placeholder";

//export * from "./au-gridster-interfaces.d";

export class  AureliaGridsterConfig {
  public margins: number[] = [10];
  public draggable: boolean = true;
  public resizable:  boolean = true;
  public max_cols: number = 0;
  public max_rows: number = 0;
  public visible_cols: number = 0;
  public visible_rows: number = 0;
  public col_width: number = 250;
  public row_height: number = 250;
  public cascade: string = 'up';
  public min_width: number = 100;
  public min_height: number = 100;
  public fix_to_grid: boolean = false;
  public auto_style:  boolean = true;
  public auto_resize:  boolean = false;
  public maintain_ratio:  boolean = true;
  public prefer_new:  boolean = false;
  public zoom_on_drag:  boolean = false;
  public limit_to_screen:  boolean = false;
  public center_to_screen:  boolean = false;
  public element_based_row_height:  boolean = false;

  constructor() {

  }
}

export function configure(conf:FrameworkConfiguration,callback) {
  conf.plugin(PLATFORM.moduleName('aurelia-resize'));


  // conf.globalResources(PLATFORM.moduleName('./au-gridster'));
  // conf.globalResources(PLATFORM.moduleName('./au-gridster-item'));
  // conf.globalResources(PLATFORM.moduleName('./au-gridster-placeholder'));
    conf.globalResources([
        PLATFORM.moduleName('./au-gridster'),
        PLATFORM.moduleName('./au-gridster-item'),
        PLATFORM.moduleName('./au-gridster-placeholder')
    ]);

    // conf.globalResources([
    //     './au-gridster',
    //     './au-gridster-item',
    //     './au-gridster-placeholder'
    // ]);

  let config = new AureliaGridsterConfig();
  if (typeof callback === 'function') {
    callback(config);
  }
  conf.container.registerInstance(AureliaGridsterConfig, config);
}