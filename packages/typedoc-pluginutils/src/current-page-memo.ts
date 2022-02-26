import assert from 'assert';

import { PageEvent, Reflection, Renderer } from 'typedoc';

import { ABasePlugin } from './base-plugin';

export class CurrentPageMemo {
	private _currentPage?: PageEvent<Reflection>;

	public constructor(
		protected readonly plugin: ABasePlugin,
	){
		this.plugin.application.renderer.on( Renderer.EVENT_BEGIN_PAGE, ( e: PageEvent<Reflection> ) => this._currentPage = e );
		this.plugin.application.renderer.on( Renderer.EVENT_END_PAGE, ( _e: PageEvent<Reflection> ) => this._currentPage = undefined );
	}

	public get currentPage(): PageEvent<Reflection> {
		assert( this._currentPage );
		assert( this._currentPage.model instanceof Reflection );
		return this._currentPage;
	}

	public get currentReflection(): Reflection {
		return this.currentPage.model;
	}
}