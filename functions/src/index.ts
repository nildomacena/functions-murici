import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const onInsertSorteio = functions.database.ref('sorteios/{pushId}').onCreate(change => {
    const after = change.val()
    console.log("novo sorteio", after);
    const payload = {
        data: {
            texto: after.texto,
            estabelecimento: after.estabelecimento,
            titulo: after.titulo
        }
    }
    const message: admin.messaging.Message = {
        topic: 'sorteios',
        android:{
            priority: 'high'
        },
        notification: {
            body: payload.data.texto,
            title: payload.data.estabelecimento
        },
        data: {
            texto: payload.data.texto,
            estabelecimento: after.estabelecimentoNome,
            titulo: payload.data.titulo 
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
