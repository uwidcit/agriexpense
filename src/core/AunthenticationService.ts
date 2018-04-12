import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController, Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { Subject } from 'rxjs';

@Injectable()

export class AuthenticationService{

    private VERIFY_FIRST_ACCOUNT_CHECK: string = "first_sign_in_request";

    constructor(private afDB: AngularFireDatabase, db: AngularFirestore, public afAuth: AngularFireAuth, public toastCtrl: ToastController, private platform: Platform, private storage: Storage){
        
    }

    public signInWithGoogle(): Promise<boolean>{
        if(this.platform.is('cordova')){
            return this.signInWithGoogleOnDevice();
        }
        else {
            return this.signInWithGoogleOnBrowser();
        }
    }

    public checkFirstSignIn(): Promise<boolean>{
        return this.storage.get(this.VERIFY_FIRST_ACCOUNT_CHECK).then((result) => {
            if(result === null || result === false){
                this.setFirstSignIn();
                return false;
            }
            else return true;
        }).catch((error) => {
            return false;
        });  
    }

    private setFirstSignIn(): Promise<boolean>{
        return this.storage.set(this.VERIFY_FIRST_ACCOUNT_CHECK, true).then(() => {
            return true;
        }).catch((error) => {
            return false;
        });
    }

    public signInWithGoogleOnBrowser(): Promise<boolean>{
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then((response) => {
            console.log(response);
            return true;
        }).catch((error) => {
            return false;
        })
    }

    public checkAuthentication(): Observable<firebase.User>{
        return this.afAuth.authState.map((data) => {
            return data;
        })
    }

    public signInWithGoogleOnDevice(): Promise<boolean>{
        let provider = new firebase.auth.GoogleAuthProvider();

        return firebase.auth().signInWithRedirect(provider).then(() => {
            return firebase.auth().getRedirectResult();
        }).then((result) => {
            let token = result.credential.accessToken;

            let user = result.user;
            return true;
        }).catch((error) => {
            let toast = this.toastCtrl.create({
                message: error.message,
                duration: 5000,
                position: 'top'
            });
            toast.present();
            return false;
        })
    }

    public signOut(){
        this.afAuth.auth.signOut();
    }

    public checkForExistingData(): Observable<boolean>{
        return this.afAuth.authState.map((data) => data.toJSON()).flatMap((user: any) => {
            console.log(user);
            let ref = this.afDB.object('/');

            return ref.snapshotChanges().map((changes) => {
                if(changes.payload.hasChild(user.uid)){
                    return true;
                }
                return false;
            })
        })
    }
}