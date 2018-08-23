"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.onInsertSorteio = functions.database.ref('sorteios/{pushId}').onCreate(change => {
    const after = change.val();
    console.log("novo sorteio", after);
    const payload = {
        data: {
            texto: after.texto,
            estabelecimento: after.estabelecimento,
            titulo: after.titulo
        }
    };
    const message = {
        topic: 'sorteios',
        android: {
            priority: 'high'
        },
        notification: {
            body: payload.data.texto,
            title: payload.data.estabelecimento
        },
        data: {
            motivo: 'novo-sorteio',
            texto: payload.data.texto,
            estabelecimento: after.estabelecimentoNome,
            titulo: payload.data.titulo
        }
    };
    return admin.messaging().send(message)
        .catch(err => {
        console.error('FCM error', err);
    });
});
exports.sortear = functions.database.ref('sorteios/{pushId}/sortear').onCreate((change, context) => {
    let after = change.val();
    let participantes = [];
    return admin.database().ref(`sorteios/${context.params.pushId}/participantes`)
        .once('value', (snapshot) => {
        let snap = snapshot.val();
        let listaKeys = Object.keys(snapshot.val());
        console.log(listaKeys);
        listaKeys.map(key => {
            participantes.push(snap[key]);
        });
        let numeroSorteado = parseInt((Math.random() * participantes.length - 1).toFixed(0));
        if (numeroSorteado < 1)
            numeroSorteado = 0;
        let keyGanhador = listaKeys[numeroSorteado];
        let ganhador = participantes[numeroSorteado];
        console.log('Key ganhador', keyGanhador);
        console.log('ganhador', ganhador);
        console.log('participantes', participantes);
        return admin.database().ref(`sorteios/${context.params.pushId}/`).update({ ganhador: ganhador, pendente: false })
            .then(_ => {
            let message = {
                topic: keyGanhador,
                android: {
                    priority: 'high'
                },
                notification: {
                    title: 'Parabéns! Você ganhou um sorteio!',
                    body: 'Verifique o menu de sorteios no aplicativo Tudo em Murici e veja qual prêmio você ganhou!'
                },
                data: {
                    motivo: 'ganhador-sorteio',
                    idSorteio: context.params.pushId
                }
            };
            return admin.messaging().send(message)
                .catch(err => {
                console.error('FCM error', err);
            });
        });
    })
        .catch(err => {
        console.error(err);
    });
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