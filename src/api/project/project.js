import firebase from "firebase";

export let project = function(){
    this.init = async function(){
        this.db = firebase.firestore();
        this.collection = this.db.collection("Projects");
    }
    this.login = async function(userName){

    }
    this.add = async function(datas){

    }   
}