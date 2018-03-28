# aurelia-gridster
Ported from https://github.com/BTMorton/angular2-grid

### Installing
```
npm install aurelia-gridster --save
```
### Using 
main.ts
```typescript
import { PLATFORM } from 'aurelia-pal';
import { Aurelia } from 'aurelia-framework';

export async function configure(aurelia: Aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-gridster'))

  await aurelia.start();
  await aurelia.setRoot(PLATFORM.moduleName('app'));
}
```
dashboard.html
```
<template>
    <au-gridster grid-opts.bind="gridOpts">
        <au-gridster-item  item-opts.two-way="item" repeat.for="item of standardItems">

        </au-gridster-item>
    </au-gridster>
<template>    
```
dashboard.ts
```typescript

export class Dashboard {
  standardItems:any[];
  gridOpts:any;
  constructor() {
    this.standardItems = [ 
        { sizex: 2, sizey: 1, row: 0, col: 0 , title:'Default'}
      ];
    this.gridOpts = {
      'auto_resize':true,
      'max_cols':6,
      'maintain_ratio':true
    }
  }
}
```
### TODO
```
Opts manual
Demo site
Resize on left,top edges
```