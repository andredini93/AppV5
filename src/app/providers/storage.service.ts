import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _storage: Storage) { }

  public get(key: string): Promise<any> {
		return this._storage.get(key);
	}

	public set(key: string, value: any): void {
		this._storage.ready()
			.then(() => {
				return this._storage.set(key, value);
			})
	}

	public remove(key: string): Promise<void> {
		return this._storage.remove(key);
	}

	public async isKeySet(key: string): Promise<boolean> {
		let keys = await this._storage.keys();
		
		let myKey = keys.find(k => {
			return k == key;
		});
		
		return myKey != undefined;
	}
}
