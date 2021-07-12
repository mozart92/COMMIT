import { Injectable } from '@angular/core';

import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { 

  }

  // JSON "set" example
  async setObject(key, value) {
      await Storage.set({
        key: key,
        value: JSON.stringify(value)
      });
  }

  // JSON "get" example
  async getObject(key) {
    try {
      const ret = await Storage.get({ key: key });
      return JSON.parse(ret.value);
    } catch (error) {
      return error
    }
  }

  async setItem(key, value) {
    await Storage.set({
      key: key,
      value: value
    });
  }

  async getItem(key) {
    try {
      const { value } = await Storage.get({ key: key });
      return value
    } catch (error) {
      return error
    }
  }

  async removeItem(key) {
    try {
      await Storage.remove({ key: key });
    } catch (error) {
      return error
    }
  }

  async keys() {
    const { keys } = await Storage.keys();
    return keys
  }

  async clear() {
    let pays = await this.getObject('user_country');
    console.log(pays);
    await Storage.clear();
    await this.setObject('user_country', pays);
    await this.setItem('logged', 'false');
  }

}
