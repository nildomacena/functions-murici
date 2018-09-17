"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
exports.icon = 'https://firebasestorage.googleapis.com/v0/b/tradegames-2dff6.appspot.com/o/assets%2Ffavicon.ico?alt=media&token=196ccb38-552c-4474-bc61-c8ca8627a631';
exports.onInsertDestaque = functions.database.ref('destaques/{pushId}').onCreate((change, context) => {
    return admin.database().ref(`estabelecimentos/${context.params.pushId}/destaque`).set(true)
        .catch(err => {
        console.error(err);
    });
});
exports.onDeleteDestaque = functions.database.ref('destaques/{pushId}').onDelete((change, context) => {
    return admin.database().ref(`estabelecimentos/${context.params.pushId}/destaque`).set(false)
        .catch(err => {
        console.error(err);
    });
});
exports.onInsertSorteio = functions.database.ref('sorteios/{pushId}').onCreate(change => {
    const after = change.val();
    console.log('after', after);
    const payload = {
        data: {
            texto: after.texto,
            estabelecimento: after.estabelecimento,
            titulo: after.titulo
        }
    };
    const message = {
        notification: {
            body: payload.data.texto,
            title: after.estabelecimentoNome,
            icon: 'https://firebasestorage.googleapis.com/v0/b/tradegames-2dff6.appspot.com/o/assets%2Ffavicon.ico?alt=media&token=196ccb38-552c-4474-bc61-c8ca8627a631'
        },
        data: {
            motivo: 'novo-sorteio',
            texto: payload.data.texto,
            estabelecimento: after.estabelecimentoNome,
            titulo: payload.data.titulo
        }
    };
    const options = {
        priority: 'high'
    };
    return admin.messaging().sendToTopic('sorteios', message, options)
        .catch(err => {
        console.error('FCM error', err);
    });
});
exports.sortear = functions.database.ref('sorteios/{pushId}/sortear').onCreate((change, context) => {
    const after = change.val();
    const participantes = [];
    return admin.database().ref(`sorteios/${context.params.pushId}/participantes`)
        .once('value', (snapshot) => {
        const snap = snapshot.val();
        const listaKeys = Object.keys(snapshot.val());
        listaKeys.map(key => {
            participantes.push(snap[key]);
        });
        let numeroSorteado = -1;
        while (numeroSorteado < 0) {
            numeroSorteado = parseInt((Math.random() * participantes.length - 1).toFixed(0));
        }
        let keyGanhador = listaKeys[numeroSorteado];
        let ganhador = participantes[numeroSorteado];
        return admin.database().ref(`sorteios/${context.params.pushId}/`).update({ ganhador: ganhador, pendente: false })
            .then(_ => {
            let message = {
                notification: {
                    title: 'Parabéns! Você ganhou um sorteio!',
                    body: 'Verifique o menu de sorteios no aplicativo Tudo em Murici e veja qual prêmio você ganhou!',
                    icon: 'https://firebasestorage.googleapis.com/v0/b/tradegames-2dff6.appspot.com/o/assets%2Ffavicon.ico?alt=media&token=196ccb38-552c-4474-bc61-c8ca8627a631'
                },
                data: {
                    motivo: 'ganhador-sorteio',
                    idSorteio: context.params.pushId
                }
            };
            const options = {
                priority: 'high'
            };
            return admin.messaging().sendToTopic(keyGanhador, message, options)
                .catch(err => {
                console.error('FCM error', err);
            });
        });
    })
        .catch(err => {
        console.error(err);
    });
});
exports.getCategoriasNaoVaziasAtualizaCategoria = functions.database.ref('estabelecimentos/{pushId}/categoria').onWrite((change, context) => {
    return admin.database().ref('estabelecimentos').once('value')
        .then(snapshot => {
        const categorias = [];
        const estabelecimentos = snapshot.val();
        Object.keys(estabelecimentos).map(keyEstabelecimento => {
            if (estabelecimentos[keyEstabelecimento].ativo) {
                if (categorias.indexOf(estabelecimentos[keyEstabelecimento].categoria) < 0)
                    categorias.push(estabelecimentos[keyEstabelecimento].categoria);
            }
        });
        return admin.database().ref('categorias').once('value')
            .then(snapCategorias => {
            const categoriasAntigas = snapCategorias.val();
            const promises = [];
            Object.keys(categoriasAntigas).map(keyCategoria => {
                if (categorias.indexOf(keyCategoria) > -1)
                    promises.push(admin.database().ref(`categorias/${keyCategoria}`).update({ estabelecimentos: true }));
                else
                    promises.push(admin.database().ref(`categorias/${keyCategoria}`).update({ estabelecimentos: false }));
            });
            return Promise.all(promises);
        })
            .catch(err => {
            console.error(err);
        });
    })
        .catch(err => {
        console.error(err);
    });
});
exports.AtualizaCategoriasAposCadastrarEstab = functions.database.ref('estabelecimentos/{pushId}/ativo').onUpdate((change, context) => {
    return admin.database().ref(`estabelecimentos/${context.params.pushId}`).once('value')
        .then(snapshot => {
        const estabelecimento = snapshot.val();
        if (estabelecimento.ativo)
            return admin.database().ref(`categorias/${estabelecimento.categoria}`).update({ estabelecimentos: true });
        else {
            return admin.database().ref(`estabelecimentos/`).once('value')
                .then(snapEstabelecimentos => {
                let achou = false; //Verifica se encontrou algum estabelecimento com categoria igual ao estabelecimento que foi desativado.
                let estabelecimentos = snapEstabelecimentos.val();
                Object.keys(estabelecimentos).map(key => {
                    if (estabelecimentos[key].categoria == estabelecimento.categoria && estabelecimentos[key].ativo) {
                        achou = true;
                    }
                });
                return admin.database().ref(`categorias/${estabelecimento.categoria}`).update({ estabelecimentos: achou });
            });
        }
    })
        .catch(err => {
        console.error(err);
    });
});
exports.onRecebeNotificacao = functions.database.ref('notificacoes/{pushId}').onCreate((snapshot, context) => {
    const notificacao = snapshot.val();
    const message = {
        data: {
            motivo: 'promocao',
            estabelecimento: notificacao.estabelecimento,
            title: notificacao.titulo,
            body: notificacao.corpo
        },
        notification: {
            body: notificacao.corpo,
            icon: 'https://firebasestorage.googleapis.com/v0/b/tradegames-2dff6.appspot.com/o/assets%2Ffavicon.ico?alt=media&token=196ccb38-552c-4474-bc61-c8ca8627a631',
            title: notificacao.titulo,
        }
    };
    const options = {
        priority: 'high'
    };
    return admin.messaging().sendToTopic('promocoes', message, options)
        .catch(err => {
        console.error('FCM error', err);
    });
});
exports.onDeleteSorteio = functions.database.ref('sorteios/{pushId}').onDelete((snapshot, context) => {
    const id = context.params.pushId;
    return admin.storage().bucket(`sorteios/${id}`).delete()
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
        console.error(err);
        response.send('Um erro aconteceu');
    });
});
//# sourceMappingURL=index.js.map