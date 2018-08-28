import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const onInsertSorteio = functions.database.ref('sorteios/{pushId}').onCreate(change => {
    const after = change.val()
    const payload = {
        data: {
            texto: after.texto,
            estabelecimento: after.estabelecimento,
            titulo: after.titulo
        }
    }
    const message: admin.messaging.Message = {
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
    }
    return admin.messaging().send(message)
        .catch(err => {
            console.error('FCM error', err);
        })
})

export const sortear = functions.database.ref('sorteios/{pushId}/sortear').onCreate((change, context) => {
    const after = change.val();
    const participantes: any[] = [];
    return admin.database().ref(`sorteios/${context.params.pushId}/participantes`)
        .once('value', (snapshot) => {
            const snap = snapshot.val();
            const listaKeys = Object.keys(snapshot.val());
            listaKeys.map(key => {
                participantes.push(snap[key]);
            });
            let numeroSorteado: number = -1;
            while (numeroSorteado < 0) {
                numeroSorteado = parseInt((Math.random() * participantes.length - 1).toFixed(0));
            }
            let keyGanhador = listaKeys[numeroSorteado];
            let ganhador = participantes[numeroSorteado];
            return admin.database().ref(`sorteios/${context.params.pushId}/`).update({ ganhador: ganhador, pendente: false })
                .then(_ => {
                    let message: admin.messaging.Message = {
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
                        })
                });


        })
        .catch(err => {
            console.error(err);
        });

})

export const getCategoriasNaoVaziasAtualizaCategoria = functions.database.ref('estabelecimentos/{pushId}/categoria').onWrite((change, context) => {
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
                    const promises: Promise<any>[] = [];
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
                })
        })
        .catch(err => {
            console.error(err);
        })
})

export const AtualizaCategoriasAposCadastrarEstab = functions.database.ref('estabelecimentos/{pushId}/ativo').onUpdate((change, context) => {
    return admin.database().ref(`estabelecimentos/${context.params.pushId}`).once('value')
        .then(snapshot => {
            const estabelecimento = snapshot.val();
            if (estabelecimento.ativo)
                return admin.database().ref(`categorias/${estabelecimento.categoria}`).update({ estabelecimentos: true });
            else {
                return admin.database().ref(`estabelecimentos/`).once('value')
                    .then(snapEstabelecimentos => {
                        let achou: boolean = false; //Verifica se encontrou algum estabelecimento com categoria igual ao estabelecimento que foi desativado.
                        let estabelecimentos = snapEstabelecimentos.val();
                        Object.keys(estabelecimentos).map(key => {
                            if (estabelecimentos[key].categoria == estabelecimento.categoria && estabelecimentos[key].ativo) {
                                achou = true;
                            }
                        });
                        return admin.database().ref(`categorias/${estabelecimento.categoria}`).update({ estabelecimentos: achou });

                    })
            }
        })
        .catch(err => {
            console.error(err);
        })
})

export const getEstabelecimento = functions.https.onRequest((request, response) => {
    const promise = admin.firestore().doc('estabelecimentos/TFl30HUUPumOZ2tMnv4f').get();
    promise.then(snapshot => {
        const data = snapshot.data();
        response.send(data);
    })
        .catch(err => {
            console.error(err);
            response.send('Um erro aconteceu');
        })
});
