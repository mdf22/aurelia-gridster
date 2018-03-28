import {inject} from 'aurelia-dependency-injection';
import {customElement, inlineView} from "aurelia-templating";
import {AuGridItemPosition, AuGridItemSize} from "../typings/au-gridster-interfaces.d";
import {AuGridster} from "./au-gridster";

@inlineView('<template><div></div></template>')
@customElement('au-gridster-placeholder')
@inject(Element)
export class AuGridsterPlaceholder  {
	private _element:HTMLDivElement;
	private _size: AuGridItemSize;
	private _position: AuGridItemPosition;
	private _auGridster: AuGridster;
	private _cascadeMode: string;

	constructor(element) {
		this._element = element;
	}
	created() {
			let mainEl = <any>this._element.closest('au-gridster');
			if (mainEl && mainEl.au['au-gridster'].viewModel) {
					this._auGridster = mainEl.au['au-gridster'].viewModel;
			}
	}

	attached() {
	  this._element.classList.add('grid-placeholder');
		if (this._auGridster.autoStyle) this._element.style.position = 'absolute';
    this._element.style.display = 'none';
	}


	public setSize(newSize: AuGridItemSize): void {
		this._size = newSize;
		this._recalculateDimensions();
	}

	public setGridPosition(newPosition: AuGridItemPosition): void {
		this._position = newPosition;
		this._recalculatePosition();
	}

	public setCascadeMode(cascade: string): void {
		this._cascadeMode = cascade;
		let styleObj = {
            left:'',
            top:'',
			right:'',
			bottom:''
		};
		switch (cascade) {
			case 'up':
			case 'left':
			default:
                styleObj.left   = '0px';
                styleObj.top    = '0px';
                styleObj.right  = null;
                styleObj.bottom = null;
				break;
			case 'right':
                styleObj.right  = '0px';
                styleObj.top    = '0px';
                styleObj.left   = null;
                styleObj.bottom = null;
				break;
			case 'down':
				styleObj.left   = '0px';
                styleObj.bottom = '0px';
                styleObj.right  = null;
                styleObj.top    = null;
				break;
		}
		Object.assign(this._element.style,styleObj);
	}

	public show() {
    this._element.style.display = 'block';
  }
  public hide() {
	  this._element.style.display = 'none';
  }
	//	Private methods
	private _setDimensions(w: number, h: number): void {
        this._element.style.width  =  w + 'px';
        this._element.style.height =  h + 'px';
	}

	private _setPosition(x: number, y: number): void {
		switch (this._cascadeMode) {
			case 'up':
			case 'left':
			default:
                this._element.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
				break;
			case 'right':
                this._element.style.transform = 'translate(' + -x + 'px, ' + y + 'px)';
				break;
			case 'down':
                this._element.style.transform = 'translate(' + x + 'px, ' + -y + 'px)';
				break;
		}
	}

	private _recalculatePosition(): void {
		const x: number = (this._auGridster.colWidth + this._auGridster.marginLeft + this._auGridster.marginRight) * (this._position.col - 1) + this._auGridster.marginLeft + this._auGridster.screenMargin;
		const y: number = (this._auGridster.rowHeight + this._auGridster.marginTop + this._auGridster.marginBottom) * (this._position.row - 1) + this._auGridster.marginTop;
		this._setPosition(x, y);
	}

	private _recalculateDimensions(): void {
		const w: number = (this._auGridster.colWidth * this._size.x) + ((this._auGridster.marginLeft + this._auGridster.marginRight) * (this._size.x - 1));
		const h: number = (this._auGridster.rowHeight * this._size.y) + ((this._auGridster.marginTop + this._auGridster.marginBottom) * (this._size.y - 1));
		this._setDimensions(w, h);
	}
}
