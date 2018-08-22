import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const onInsertSorteio = functions.database.ref('sorteios').onUpdate(change => {
    const after = change.after.val()
    console.log("novo sorteio")
    const payload = {
        data: {
            nome: "after.texto",
            estabelecimento: "after.estabelecimento"
        }
    }
    const message: admin.messaging.Message = {
        topic: 'sorteios',
        notification: {
            body: 'payload.data.nome',
            title: 'payload.data.estabelecimento'
        }
    }
    //const message:string = "Testando "+payload.data.nome;
    return admin.messaging().send(message) 
            .catch(err => {
                console.error('FCM error',err);
            })
            /*
    return admin.messaging().sendToTopic('topico',payload,{priority: 'high'}) 
            .catch(err => {
                console.error('FCM error',err);
            })*/
})

export const getEstabelecimento = functions.https.onRequest((request, response) => {
    const promise = admin.firestore().doc('estabelecimentos/TFl30HUUPumOZ2tMnv4f').get();
    promise.then(snapshot => {
        const data = snapshot.data();
        response.send(data);
    })
    .catch(err => {
        console.log(err);
        response.send('Um erro aconteceu');
    })
});
