import Store from "electron-store";

interface SettingInterface {
  name: string; // 存在硬盘的文件名 不包含后缀
  encryptionKey?: string | Buffer | DataView;
}
export class DataStore {
  constructor(setting: SettingInterface) {
    this.store = new Store(setting);
    this.data = this.store.get("data") || {};
  }
  store: any;
  data: { [key: string]: any };
  addData(data: object) {
    this.data = { ...this.data, ...data };
    this.saveData();
    return this;
  }
  saveData() {
    this.store.set("data", this.data);
    return this;
  }
  getData() {
    this.data = this.store.get("data") || {};
    return this.data || {};
  }
  getDataByKey(key: string) {
    this.data = this.store.get("data") || {};
    return this.data[key];
  }
  deleteDataByKey(key: string) {
    if (this.data[key]) {
      delete this.data[key];
      this.saveData();
    }
  }
}
