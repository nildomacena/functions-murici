"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.onInsertSorteio = functions.database.ref('sorteios').onUpdate(change => {
    const after = change.after.val();
    console.log("novo sorteio");
    const payload = {
        data: {
            nome: "after.texto",
            estabelecimento: "after.estabelecimento"
        }
    };
    const message = {
        topic: 'sorteios',
        notification: {
            body: 'payload.data.nome',
            title: 'payload.data.estabelecimento'
        }
    };
    //const message:string = "Testando "+payload.data.nome;
    return admin.messaging().send(message)
        .catch(err => {
        console.error('FCM error', err);
    });
    /*
return admin.messaging().sendToTopic('topico',payload,{priority: 'high'})
    .catch(err => {
        console.error('FCM error',err);
    })*/
});
exports.getEstabelecimento = functions.https.onRequest((request, response) => {
    const promise = admin.firestore().doc('estabelecimentos/TFl30HUUPumOZ2tMnv4f').get();
    promise.then(snapshot => {
        const data = snapshot.data();
        response.send(data);
    })
        .catch(err => {
        console.log(err);
        response.send('Um erro aconteceu');
    });
});
//# sourceMappingURL=index.js.map