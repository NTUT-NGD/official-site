import firebase from "firebase";
let projectObject = null;
export async function setProject() {
  projectObject = new project();
  projectObject.init();
  return projectObject;
}
export function getProject() {
  if (projectObject != null) return projectObject;
  else console.log("please setProject() first");
}
let project = function() {
  this.new = async function(Manager, datas) {
    if (this.collection == null) console.log("please init project");
    else if (datas.Name == null || datas.Intro == null)
      console.log("at least filled the name and intro");
    else if (!(await this.isExists("Users", Manager)))
      console.log("CAN'T find user");
    else {
      let projectCol = this.collection;

      await projectCol
        .where("Name", "==", datas.Name)
        .get()
        .then(function(docRef) {
          if (docRef.size <= 0) {
            datas.Manager = Manager;
            projectCol
              .add(datas)
              .then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
              })
              .catch(function(error) {
                console.error("Error adding document: ", error);
              });
          } else {
            console.log("same project with:", docRef.docs[0].id);
          }
        })
        .catch(function(error) {
          console.error("Error searching document: ", error);
        });
    }
  };
  this.getPermission = async function(Manager, PID) {
    let bool = false;
    await this.collection
      .doc(PID)
      .get()
      .then(function(docRef) {
        if (docRef.exists) {
          bool = docRef.data().Manager == Manager;
        }
      });
    return bool;
  };
  this.addMember = async function(Manager, PID, UID, job) {
    let projectCol = this.collection;
    let userCol = this.db.collection("Users");
    if (!(await this.getPermission(Manager)))
      console.log("dont have permission");
    else if (
      (await this.isExists("Projects", PID)) &&
      (await this.isExists("Users", UID))
    ) {
      await projectCol
        .doc(PID)
        .get()
        .then(function(docRef) {
          let party = { UID: UID, job: job };
          let parties = new Array();
          if (docRef.data().Members != null) {
            parties = docRef.data().Members;
          }
          if (
            !parties.find(function(value, index) {
              if (value.UID == UID) {
                parties[index].job = job;
                return true;
              }
            })
          ) {
            parties.push(party);
          }
          projectCol.doc(PID).update({
            Members: parties
          });
        });
      await userCol
        .doc(UID)
        .get()
        .then(function(docRef) {
          let parties = new Array();
          if (docRef.data().parties != null) {
            parties = docRef.data().parties;
          }
          if (!parties.find(value => value == PID)) {
            parties.push(PID);
          }
          userCol.doc(UID).update({
            parties: parties
          });
        });
    } else {
      console.log("not found");
    }
  };
  this.removeMember = async function(Manager, PID, UID) {
    let projectCol = this.collection;
    let userCol = this.db.collection("Users");
    if (!(await this.getPermission(Manager)))
      console.log("dont have permission");
    else if (
      (await this.isExists("Projects", PID)) &&
      (await this.isExists("Users", UID))
    ) {
      await projectCol
        .doc(PID)
        .get()
        .then(function(docRef) {
          let parties = new Array();
          if (docRef.data().Members != null) {
            parties = docRef.data().Members;
          }
          parties.find(function(value, index) {
            if (value.UID == UID) {
              parties.splice(index, 1);
            }
          });

          projectCol.doc(PID).update({
            Members: parties
          });
        });
      await userCol
        .doc(UID)
        .get()
        .then(function(docRef) {
          let parties = new Array();
          if (docRef.data().parties != null) {
            parties = docRef.data().parties;
          }
          parties.find(function(value, index) {
            if (value == PID) {
              parties.splice(index, 1);
            }
          });
          userCol.doc(UID).update({
            parties: parties
          });
        });
    } else {
      console.log("not found");
    }
  };
  this.update = async function(Manager, PID, datas) {
    if (!(await this.getPermission(Manager)))
      console.log("dont have permission");
    else {
      this.collection.doc(PID).update(datas);
    }
  };
  this.search = async function(PID) {
    let data = null;
    await this.collection
      .doc(PID)
      .get()
      .then(function(docRef) {
        if (docRef.exists) {
          data = docRef.data();
        }
      });
    return data;
  };
  this.remove = async function(Manager, PID) {
    if (!(await this.getPermission(Manager)))
      console.log("dont have permission");
    else if (await this.isExists("Projects", PID)) {
      await this.collection.doc(PID).update({ IsDeleted: true });
    }
  };
  this.Finish = async function(Manager, PID) {
    if (!(await this.getPermission(Manager)))
      console.log("dont have permission");
    else if (await this.isExists("Projects", PID)) {
      await this.collection.doc(PID).update({ IsFinished: true });
    }
  };
  this.disRecruiting = async function(Manager, PID) {
    if (!(await this.getPermission(Manager)))
      console.log("dont have permission");
    else if (await this.isExists("Projects", PID)) {
      await this.collection.doc(PID).update({ IsRecruiting: false });
    }
  };
  this.isExists = async function(collection, id) {
    let Col = this.db.collection(collection);
    let bool = false;
    await Col.doc(id)
      .get()
      .then(function(docRef) {
        bool = docRef.exists;
        //console.log(bool);
      });

    //console.log(bool);
    return bool;
  };
  this.init = async function() {
    this.db = firebase.firestore();
    this.collection = this.db.collection("Projects");
    console.log("project init ");
  };
};
