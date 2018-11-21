import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
var serviceAccount = {
    type: "service_account",
    "project_id": "tradegames-2dff6",
    "private_key_id": "aa78a811fed4c008c80480517ce804b55c9d120f",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHnKwB9ads4fa2\nZNsoY/Yohxs7zKD8Cam3XLYJGKu6D3bGSk+YV473ncRuZHEN2igWeGrhVHZ3d3oE\nIXdIFagy02R39aEwZuDkrojXn7vtRVrr3ojg09UtIKvfRIsPRtN/4Pr7ScL1rbxh\n5xvf0a9xIBEAJUp/8zExufAkqlATDHa7cqKqeLUpPHJYIMKsss4JZ4pAufqLutuF\ncYAaR2Lbsf7ElqFkfjq8d5bDx5/K6RwAesFE3EtFddwR31YDo8U1UN4hJL2vN1Vv\nxAfWMg3HdKTwgFXaRXoDKNRScsOkVyXB2CKP5wUkskuxMeXrXv16T/RyHTH4NzbA\n/OlwK6VDAgMBAAECggEAAnsVfi695nIGfWzSdnWLlSRct8kKxScfl1pNHt7SH41a\npgs9YwDPk48/5jlUWF46OlFDzsoccM6o0w1RbLFsNjl/WahRWQcmS2FJ7Rgcn03J\n2/2XiOfJEfcCe9NfwRBZx5CVvfLEPAZtPXBAXe8+tXK3E1/jRaTRmzMa43HEbgAn\niO67KailnI5hhX06SQRvjPawKXBb94VuDrcy9vRpOeFZLnaJqPlOwZj4QPbVOhu1\nqrC1bTXRBeE/KkJBkFZx7kDDcDMFrHlRFyPEwE/l+ktJQJXHqIkVl2UJlgLLi+Y8\n/AIHsq9+6eXBvZHQxSt/IL8GeBAc5NcQuB3Tac2ftQKBgQDmHDSvu+2B7gFx2nuZ\nX9dQoCppiRMZ4/4ZSbLcOZkK1LYZtBRbMl31xXUJhFPMzIq05adW0zdsWWjPzvk6\nxDi4bFUwPfnXqcAeI+PgPe9rl9yvO0o/3jLcVlsEnL3iC8YDt/Qc24aHofF2p0wb\nW+lE5AeOnRmrTrxJqhcKAafYvQKBgQDeEglF8UZwnSNnn4L5IoOe6n/gt3zym6tK\nR+wAE8tcLcbqT0z2C3oWelFU2ee99Cx/zx4u6LBFAkgfbpydfzgMaJaSFU+2P51i\nNmPhy0mdQPRZsl9XGnveHSB6rPGGEpWR2m0mo4A0J40+OkhgLF7XJ8HO8FUZ7Yom\ntPpzRVRV/wKBgCYcKcWpFC7eojKfArVmIBzkSeHsp9Mz5VN+1zaN+4DFtdsP7gck\nklcv+rA20EIs5hQLrOk+VgGF1UwFdVV8RgCVQI6a1RQYsw7K1uS+nTZukkgbQ7LM\nNBQ14SEkbHZRiNv4zV8yJFe2RG1oS7yEPmAAfBfsgOHUSm7Q0rv/hjLpAoGABOEg\nkwjaI19Qh9ZZal/3xGYiqS1e8XW6Lcemx9mnfj8DP+K+LinSZOwLHXIsRWA4GhbS\n8vTp6ppCO26SwmMpOByUMmGFftum+aF4UF3HIE1tEQt6TM+oKRk6vXdPV0LRRoMm\nItM03fCAif192Z8f9lpJR+K/+/HcNz2Cw0WitMECgYBaT8gsnJs0D4GtsmecZLrR\nyF3wZaLUzf2XIvaKxW3sYsaYXGzLNWNpGAM+1ziEZy9SLmjwnHFoF6yEFSikjJ3+\nqKpL6xlDyH2vqdQlGMpwsXnYBsQSW5J/8vtRcy85uRjpIuiJL8TSC/dgiCcpnTVK\nE29pHzKC1Pnz/KbIRbb/AQ==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-2zdli@tradegames-2dff6.iam.gserviceaccount.com",
    "client_id": "114992252221113545178",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-2zdli%40tradegames-2dff6.iam.gserviceaccount.com"
}

admin.initializeApp({
    credential: admin.credential.cert({
        privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDHnKwB9ads4fa2\nZNsoY/Yohxs7zKD8Cam3XLYJGKu6D3bGSk+YV473ncRuZHEN2igWeGrhVHZ3d3oE\nIXdIFagy02R39aEwZuDkrojXn7vtRVrr3ojg09UtIKvfRIsPRtN/4Pr7ScL1rbxh\n5xvf0a9xIBEAJUp/8zExufAkqlATDHa7cqKqeLUpPHJYIMKsss4JZ4pAufqLutuF\ncYAaR2Lbsf7ElqFkfjq8d5bDx5/K6RwAesFE3EtFddwR31YDo8U1UN4hJL2vN1Vv\nxAfWMg3HdKTwgFXaRXoDKNRScsOkVyXB2CKP5wUkskuxMeXrXv16T/RyHTH4NzbA\n/OlwK6VDAgMBAAECggEAAnsVfi695nIGfWzSdnWLlSRct8kKxScfl1pNHt7SH41a\npgs9YwDPk48/5jlUWF46OlFDzsoccM6o0w1RbLFsNjl/WahRWQcmS2FJ7Rgcn03J\n2/2XiOfJEfcCe9NfwRBZx5CVvfLEPAZtPXBAXe8+tXK3E1/jRaTRmzMa43HEbgAn\niO67KailnI5hhX06SQRvjPawKXBb94VuDrcy9vRpOeFZLnaJqPlOwZj4QPbVOhu1\nqrC1bTXRBeE/KkJBkFZx7kDDcDMFrHlRFyPEwE/l+ktJQJXHqIkVl2UJlgLLi+Y8\n/AIHsq9+6eXBvZHQxSt/IL8GeBAc5NcQuB3Tac2ftQKBgQDmHDSvu+2B7gFx2nuZ\nX9dQoCppiRMZ4/4ZSbLcOZkK1LYZtBRbMl31xXUJhFPMzIq05adW0zdsWWjPzvk6\nxDi4bFUwPfnXqcAeI+PgPe9rl9yvO0o/3jLcVlsEnL3iC8YDt/Qc24aHofF2p0wb\nW+lE5AeOnRmrTrxJqhcKAafYvQKBgQDeEglF8UZwnSNnn4L5IoOe6n/gt3zym6tK\nR+wAE8tcLcbqT0z2C3oWelFU2ee99Cx/zx4u6LBFAkgfbpydfzgMaJaSFU+2P51i\nNmPhy0mdQPRZsl9XGnveHSB6rPGGEpWR2m0mo4A0J40+OkhgLF7XJ8HO8FUZ7Yom\ntPpzRVRV/wKBgCYcKcWpFC7eojKfArVmIBzkSeHsp9Mz5VN+1zaN+4DFtdsP7gck\nklcv+rA20EIs5hQLrOk+VgGF1UwFdVV8RgCVQI6a1RQYsw7K1uS+nTZukkgbQ7LM\nNBQ14SEkbHZRiNv4zV8yJFe2RG1oS7yEPmAAfBfsgOHUSm7Q0rv/hjLpAoGABOEg\nkwjaI19Qh9ZZal/3xGYiqS1e8XW6Lcemx9mnfj8DP+K+LinSZOwLHXIsRWA4GhbS\n8vTp6ppCO26SwmMpOByUMmGFftum+aF4UF3HIE1tEQt6TM+oKRk6vXdPV0LRRoMm\nItM03fCAif192Z8f9lpJR+K/+/HcNz2Cw0WitMECgYBaT8gsnJs0D4GtsmecZLrR\nyF3wZaLUzf2XIvaKxW3sYsaYXGzLNWNpGAM+1ziEZy9SLmjwnHFoF6yEFSikjJ3+\nqKpL6xlDyH2vqdQlGMpwsXnYBsQSW5J/8vtRcy85uRjpIuiJL8TSC/dgiCcpnTVK\nE29pHzKC1Pnz/KbIRbb/AQ==\n-----END PRIVATE KEY-----\n",
        clientEmail: "firebase-adminsdk-2zdli@tradegames-2dff6.iam.gserviceaccount.com",
        projectId: "tradegames-2dff6"
    }),
    databaseURL: "https://tradegames-2dff6.firebaseio.com",
    projectId: "tradegames-2dff6",
    storageBucket: "tradegames-2dff6.appspot.com",
});
// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const icon = 'https://firebasestorage.googleapis.com/v0/b/tradegames-2dff6.appspot.com/o/assets%2Ffavicon.ico?alt=media&token=196ccb38-552c-4474-bc61-c8ca8627a631';

export const onInsertDestaque = functions.database.ref('destaques/{pushId}').onCreate((change, context) => {
    return admin.database().ref(`estabelecimentos/${context.params.pushId}/destaque`).set(true)
        .catch(err => {
            console.error(err);
        })
})

export const onDeleteDestaque = functions.database.ref('destaques/{pushId}').onDelete((change, context) => {
    return admin.database().ref(`estabelecimentos/${context.params.pushId}/destaque`).set(false)
        .catch(err => {
            console.error(err);
        })
})

export const onInsertSorteio = functions.database.ref('sorteios/{pushId}').onCreate(change => {
    const after = change.val();
    console.log('after', after);
    const payload = {
        data: {
            texto: after.texto,
            estabelecimento: after.estabelecimento,
            titulo: after.titulo
        }
    }
    const message: admin.messaging.MessagingPayload = {
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
    }
    const options: admin.messaging.MessagingOptions = {
        priority: 'high'
    }
    return admin.messaging().sendToTopic('sorteios', message, options)
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

                    let message: admin.messaging.MessagingPayload = {
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
                    const options: admin.messaging.MessagingOptions = {
                        priority: 'high'
                    }
                    return admin.messaging().sendToTopic(keyGanhador, message, options)
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

export const onRecebeNotificacao = functions.database.ref('notificacoes/{pushId}').onCreate((snapshot, context) => {
    const notificacao = snapshot.val();
    const message: admin.messaging.MessagingPayload = {
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
    const options: admin.messaging.MessagingOptions = {
        priority: 'high'
    }
    return admin.messaging().sendToTopic('promocoes', message, options)
        .catch(err => {
            console.error('FCM error', err);
        })
})

export const onDeleteSorteio = functions.database.ref('sorteios/{pushId}').onDelete((snapshot, context) => {
    const id = context.params.pushId;
    return admin.storage().bucket(`sorteios/${id}`).delete()
        .catch(err => {
            console.error(err);
        })
});

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

export const atualizaImagensCriadas = functions.storage.object().onFinalize((object, context) => {
    const bucket = admin.storage().bucket("tradegames-2dff6.appspot.com");
    return bucket.file(object.name).getSignedUrl({ action: 'read', expires: '03-09-2491' })
        .then(url => {
            console.log('url: ', url[0]);
            console.log('object.name', object.name);
            console.log('context', context);
            console.log(object.name.substring(0, object.name.indexOf(".jpg")));

            /**Verifica se foi atualizado algum estabelecimento */
            /**Depois verifica o que foi atualizado*/

            if (object.name.indexOf('estabelecimentos') >= 0) {
                if (object.name.indexOf('avatar') >= 0) {
                    return admin.database().ref(object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])
                        .catch(error => {
                            console.error(error);
                        })
                }
                else if (object.name.indexOf('imagemAdicional_2.jpg') >= 0) {
                    return admin.database().ref(object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])
                        .catch(error => {
                            console.error(error);
                        })
                }
                else if (object.name.indexOf('imagemAdicional.jpg') >= 0) {
                    return admin.database().ref(object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])
                        .catch(error => {
                            console.error(error);
                        })
                }
            }
            else if (object.name.indexOf('sorteios') >= 0) {
                if (object.name.indexOf('imagem.jpg') >= 0) {
                    return admin.database().ref(object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])
                        .catch(error => {
                            console.error(error);
                        })
                }
            }
            else if (object.name.indexOf('ofertas') >= 0) {
                return admin.database().ref(object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])
                    .catch(error => {
                        console.error(error);
                    })
            }
            return Promise.resolve(true)
                /*
                return admin.database().ref('estabelecimentos/' + object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])*/
                .catch(error => {
                    console.error(error);
                })
        })
        .catch(err => {
            console.error(err);
        })

});

export const atualizaImagensAtualizadas = functions.storage.object().onMetadataUpdate((object, context) => {
    const bucket = admin.storage().bucket("tradegames-2dff6.appspot.com");
    return bucket.file(object.name).getSignedUrl({ action: 'read', expires: '03-09-2491' })
        .then(url => {
            console.log('url: ', url[0]);
            console.log(object);
            console.log(context);
            console.log('estabelecimentos/' + object.name.substring(0, object.name.indexOf(".jpg")));

            /**Verifica se foi atualizado algum estabelecimento */
            /**Depois verifica o que foi atualizado*/

            if (object.name.indexOf('estabelecimentos')) {
                if (object.name.indexOf('avatar') >= 0) {
                    return admin.database().ref(object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])
                        .catch(error => {
                            console.error(error);
                        })
                }
                else if (object.name.indexOf('imagemAdicional_2.jpg') >= 0) {
                    return admin.database().ref(object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])
                        .catch(error => {
                            console.error(error);
                        })
                }
                else if (object.name.indexOf('imagemAdicional.jpg') >= 0) {
                    return admin.database().ref(object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])
                        .catch(error => {
                            console.error(error);
                        })
                }
            }
            else if (object.name.indexOf('sorteios')) {
                if (object.name.indexOf('imagem.jpg') >= 0) {
                    return admin.database().ref(object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])
                        .catch(error => {
                            console.error(error);
                        })
                }
            }
            return Promise.resolve(true)
                /*
                return admin.database().ref('estabelecimentos/' + object.name.substring(0, object.name.indexOf(".jpg"))).set(url[0])*/
                .catch(error => {
                    console.error(error);
                })
        })
        .catch(err => {
            console.error(err);
        })

});