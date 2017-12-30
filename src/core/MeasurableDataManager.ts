import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';
import { DataManager } from './DataManager';

export abstract class MeasurableDataManager extends DataManager {

    protected unitListKey = "UNIT_LIST";
    protected abstract unitList: Array<string>;

    constructor(private dataStorage: Storage, private dataUUID: UUID){
        super(dataStorage, dataUUID);
    }

    public initialize(): Promise<any>{
        let promises = [];
        promises.push(super.initialize());
        promises.push(this.initializeUnits);
        return Promise.all(promises).then(() => {
            console.log("Units Initialized");
            return this;
        }).catch((error) => {
            return error;
        })
    }

    private initializeUnits(): Promise<boolean>{
        return this.dataStorage.ready().then(() => {
            let unitListString = JSON.stringify(this.unitList);
            let unitListStringKey = this.unitListKey + "_" + this.DATA_ID;
            return this.dataStorage.set(unitListStringKey, unitListString).then(() => {
                return true;
            }).catch((error) => {
                return false;
            });
        })
    }

    public getUnitsList(): Promise<Array<string>>{
        return this.dataStorage.ready().then(() => {
            let unitListStringKey = this.unitListKey + "_" + this.DATA_ID;
            return this.dataStorage.get(unitListStringKey).then((resultString) => {
                let data = JSON.parse(resultString);
                return data;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }
}