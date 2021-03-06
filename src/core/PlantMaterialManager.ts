import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { DataManager } from './DataManager';
import { MeasurableDataManager } from './MeasurableDataManager';
import { UUID } from 'angular2-uuid';
import { Jsonp } from '@angular/http/src/http';

@Injectable()
export class PlantMaterialManager extends MeasurableDataManager{

    protected unitList: Array<string>;
    protected dataList: Array<Object>;
    public DATA_ID: string;

    constructor(private plantStorage: Storage, private plantMaterialUUID: UUID){
        super(plantStorage, plantMaterialUUID);
        this.DATA_ID = "Plant Material";
        this.unitList = ['Seed', 'Heads', 'Seedling', 'Slips', 'Stick', 'Tubes'];
        this.dataList = [
            {
                "name": "Anise Seed",
                "imagePath": "assets/img/anise_seed.jpg"
            },
            {
                "name": "Banana",
                "imagePath": "assets/img/banana.jpg"
            },
            {
                "name": "Basil",
                "imagePath": "assets/img/basil.jpg"
            },
            {
                "name": "Bay Leaf",
                "imagePath": "assets/img/bay_leaf.jpg"
            },
            {
                "name": "Beet",
                "imagePath": "assets/img/beet.jpg"
            },
            {
                "name": "Bhagi",
                "imagePath": "assets/img/bhagi.jpg"
            },
            {
                "name": "Bora (Bodi) Bean",
                "imagePath": "assets/img/bodi_bean.jpg"
            },
            {
                "name": "BreadFruit",
                "imagePath": "assets/img/breadfruit.jpg"
            },
            {
                "name":"BREADNUT (CHATAIGNE)",
                "imagePath": "assets/img/cropImages/chataigne.jpg"
            },
            {
                "name":"BROCCOLI",
                "imagePath": "assets/img/cropImages/broccoli.jpg"
            },
            {
                "name":"CABBAGE",
                "imagePath": "assets/img/cropImages/cabbage.jpg"
            },
            {
                "name":"CARAILLI",
                "imagePath": "assets/img/cropImages/caraillie.jpg"
            },
            {
                "name":"CARAMBOLA",
                "imagePath": "assets/img/cropImages/carambola.jpg"
            },
            {
                "name":"CARROTS",
                "imagePath": "assets/img/cropImages/carrot.jpg"
            },
            {
                "name":"CASSAVA",
                "imagePath": "assets/img/cropImages/cassava.jpg"
           },
           {
                "name":"CAULIFLOWER",
                "imagePath": "assets/img/cropImages/cauliflower.jpg"
           },
           {
                "name":"CELERY",
                "imagePath": "assets/img/cropImages/celery.jpg"
           },
           {
                "name":"CHERRY",
                "imagePath": "assets/img/cropImages/bajan_cherry.jpg"
           },
           {
                "name":"CHIVE",
                "imagePath": "assets/img/cropImages/chive.jpg"
           },
           {
                "name":"CHRISTOPHENE",
                "imagePath": "assets/img/cropImages/christophene.jpg"
           },
           {
                "name":"COCOA",
                "imagePath": "assets/img/cropImages/cocoa.jpg"
           },
           {
                "name":"COCONUT",
                "imagePath": "assets/img/cropImages/coconut.jpg"
           },
           {
                "name":"CORN",
                "imagePath": "assets/img/cropImages/corn.jpg"
           },
           {
                "name":"CUCUMBER",
                "imagePath": "assets/img/cropImages/cucumber.jpg"
           },
           {
                "name":"CULANTRO (SHADON BENI / BANDANIA)",
                "imagePath": "assets/img/cropImages/shadon_beni.jpg"
           },
           {
                "name":"DASHEEN",
                "imagePath": "assets/img/cropImages/dasheen.jpg"
           },
           {
                "name":"DASHEEN BUSH",
                "imagePath": "assets/img/cropImages/dasheen_bush.jpg"
           },
           {
                "name":"EDDOES",
                "imagePath": "assets/img/cropImages/eddoe.jpg"
           },
           {
                "name":"EGGPLANT",
                "imagePath": "assets/img/cropImages/eggplant.jpg"
           },
           {
                "name":"ESCALLION",
                "imagePath": "assets/img/cropImages/escallion.jpg"
           },
           {
                "name":"GINGER",
                "imagePath": "assets/img/cropImages/ginger.jpg"
           },
           {
                "name":"GRAPEFRUIT",
                "imagePath": "assets/img/cropImages/grapefruit.jpg"
           },
           {
                "name":"GREEN FIG",
                "imagePath": "assets/img/banana.jpg"
           },
           {
                "name":"HOT PEPPER",
                "imagePath": "assets/img/cropImages/hot_pepper.jpg"
           },
           {
                "name":"LETTUCE",
                "imagePath": "assets/img/cropImages/lettuce.jpg"
           },
           {
                "name":"LIME",
                "imagePath": "assets/img/cropImages/lime.jpg"
           },
           {
                "name":"MAIZE (CORN)",
                "imagePath": "assets/img/cropImages/corn.jpg"
           },
           {
                "name":"MANGO",
                "imagePath": "assets/img/cropImages/mango.jpg"
           },
           {
                "name":"MINT",
                "imagePath": "assets/img/cropImages/mint.jpg"
           },
           {
                "name":"NUTMEG",
                "imagePath": "assets/img/cropImages/nutmeg.jpg"
           },
           {
                "name":"OCHRO",
                "imagePath": "assets/img/cropImages/ochro.jpg"
           },
           {
                "name":"ORANGES",
                "imagePath": "assets/img/cropImages/orange.jpg"
           },
           {
                "name":"PAW PAW",
                "imagePath": "assets/img/cropImages/paw_paw.jpg"
           },
           {
                "name":"PEANUTS",
                "imagePath": "assets/img/cropImages/peanuts.jpg"
           },
           {
                "name":"PIGEON PEAS",
                "imagePath": "assets/img/cropImages/pigeon_pea.jpg"
           },
           {
                "name":"PIMENTO PEPPER",
                "imagePath": "assets/img/cropImages/pimento.jpg"
           },
           {
                "name":"PINEAPPLE",
                "imagePath": "assets/img/cropImages/pineapple.jpg"
           },
           {
                "name":"PLANTAIN",
                "imagePath": "assets/img/cropImages/plantain.jpg"
           },
           {
                "name":"PORTUGAL",
                "imagePath": "assets/img/cropImages/portugal.jpg"
           },
           {
                "name":"PUMPKIN",
                "imagePath": "assets/img/cropImages/pumpkin.jpg"
           },
           {
                "name":"RICE",
                "imagePath": "assets/img/cropImages/rice.jpg"
           },
           {
                "name":"SEIM",
                "imagePath": "assets/img/cropImages/seim_bean.jpg"
           },
           {
                "name":"SORREL",
                "imagePath": "assets/img/cropImages/sorrel.jpg"
           },
           {
                "name":"SOYABEAN",
                "imagePath": "assets/img/cropImages/soybean.jpg"
           },
           {
                "name":"SQUASH",
                "imagePath": "assets/img/cropImages/squash.jpg"
           },
           {
                "name":"SWEET PEPPER",
                "imagePath": "assets/img/cropImages/sweet_pepper.jpg"
           },
           {
                "name":"SWEET POTATO",
                "imagePath": "assets/img/cropImages/sweet_potato.jpg"
           },
           {
                "name":"THYME - FINE",
                "imagePath": "assets/img/cropImages/thyme.jpg"
           },
           {
                "name":"THYME - FRENCH",
                "imagePath": "assets/img/cropImages/thyme.jpg"
           },
           {
                "name":"THYME - SPANISH",
                "imagePath": "assets/img/cropImages/thyme.jpg"
           },
           {
                "name":"TOMATO",
                "imagePath": "assets/img/cropImages/tomato.jpg"
           },
           {
                "name":"TUMERIC (SAFFRON)",
                "imagePath": "assets/img/cropImages/turmeric.jpg"
           },
           {
                "name":"VINE SPINACH (POI BHAGI)",
                "imagePath": "assets/img/cropImages/spinach.jpg"
           },
           {
                "name":"WATERCRESS",
                "imagePath": "assets/img/cropImages/watercress.jpg"
           },
           {
                "name":"WATERMELON",
                "imagePath": "assets/img/cropImages/watermelon.jpg"
           },
           {
                "name":"YAM",
                "imagePath": "assets/img/cropImages/yam.jpg"
           }
        ];
    }

    //The getData function returns a promise that contains an object that contains data on a plant material given the id of the plant material. 
    public getData(key: string): Promise<Object>{
        return this.plantStorage.ready().then(() => {
            return this.plantStorage.get(key).then((materialString) => {
                let materialObject = JSON.parse(materialString);
                return materialObject;
            }).catch((error) => {
                return error;
            });
        }).catch((error) => {
            return error;
        });
    }
    
}