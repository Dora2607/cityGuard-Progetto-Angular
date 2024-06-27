# CityGuardPerNTTDATA
 CityGuard

CityGuard è un'applicazione che mira a migliorare la vita delle persone nei centri urbani. L'applicazione consente agli utenti di condividere le proprie idee e segnalazioni per contribuire a proteggere e salvaguardare il patrimonio culturale e naturale della città e supportare i legami positivi, sociali e ambientali, tra aree urbane.

## Funzionalità

Dopo aver effettuato l'autenticazione, gli utenti possono accedere alla sezione dove è possibile vedere la lista degli utenti, con la possibilità di svolgere una ricerca per nome o email. È possibile creare o eliminare un nuovo utente.

Gli utenti possono aprire la scheda di un utente, dove vengono mostrati i suoi dettagli, visualizzare i suoi post e quindi inserire dei commenti ai post.

È presente una seconda funzionalità in cui l’utente visualizza tutti i post, può effettuare delle ricerche e, una volta individuato il post di interesse, può visualizzare i commenti e inserirne di nuovi. In questa sezione l’utente può inserire dei nuovi post.

## Tecnologie utilizzate

L'applicazione è stata sviluppata utilizzando il framework Angular CLI versione 18.0.3, Angular Material per la modellazione dei componenti e la libreria NgRx per la gestione dello stato dell'applicazione.

## Configurazione e prova in locale

Per configurare e testare l'applicazione in locale, segui questi passaggi:

1. Clona il repository sul tuo computer locale.
2. Naviga nella directory del progetto e installa le dipendenze con `npm install`.
A causa delle recenti versioni di Angular e NgRx, potrebbero verificarsi conflitti di dipendenza durante l'installazione. Se incontri problemi dopo aver eseguito `npm install`, prova a eseguire il seguente comando per risolvere i conflitti di dipendenza:

```bash
npm install --legacy-peer-deps
```
3. Avvia il server di sviluppo con `ng serve`. Naviga su `http://localhost:4200/`. L'applicazione si ricaricherà automaticamente se modifichi uno dei file sorgente.

## Panoramica delle Componenti e dei Servizi

In questa sezione, esploreremo le componenti principali e i servizi utilizzati in CityGuard. Questi elementi costituiscono il cuore della nostra applicazione e ci permettono di fornire un'esperienza utente fluida e reattiva.

### Le componenti

### I servizi 

#### ApiService

Il servizio `ApiService` fornisce metodi per interagire con l'API REST di GoRest. Questi metodi includono operazioni CRUD per gli utenti, nonché metodi per recuperare e creare post, commenti e attività (todos) per un determinato utente. Tutte le richieste API sono autenticate utilizzando un token di autorizzazione che viene passato nell'intestazione della richiesta.
Vediamo i metodi:

- `registerUser(user: newUser)`: Questo metodo registra un nuovo utente nell’API. Accetta come parametro un oggetto newUser che contiene i dettagli dell’utente da registrare.
- `getUsers(): Observable<Users[]>`: Questo metodo recupera un elenco di utenti dall’API. Restituisce un Observable che emette un array di oggetti Users.
- `deleteUser(userId: number)`: Questo metodo elimina un utente specifico dall’API. Accetta come parametro l’ID dell’utente da eliminare.
- `addUser(user: newUser)`: Questo metodo aggiunge un nuovo utente nell’API. Accetta come parametro un oggetto newUser che contiene i dettagli dell’utente da aggiungere.
- `getTodos(userId: number): Observable<Todos[]>`: Questo metodo recupera un elenco di attività (todos) per un utente specifico dall’API. Accetta come parametro l’ID dell’utente e restituisce un Observable che emette un array di oggetti Todos.
-`getPosts(userId: number): Observable<Posts[]>`: Questo metodo recupera un elenco di post per un utente specifico dall’API. Accetta come parametro l’ID dell’utente e restituisce un Observable che emette un array di oggetti Posts.
- `getComments(postId: number): Observable<Comments[]>`: Questo metodo recupera un elenco di commenti per un post specifico dall’API. Accetta come parametro l’ID del post e restituisce un Observable che emette un array di oggetti Comments.
-`addComments(postId: number, comment: newComments)`: Questo metodo aggiunge un nuovo commento a un post specifico nell’API. Accetta come parametri l’ID del post e un oggetto newComments che contiene i dettagli del commento da aggiungere.
- `addPosts(userId: number, post: newPosts)`: Questo metodo aggiunge un nuovo post per un utente specifico nell’API. Accetta come parametri l’ID dell’utente e un oggetto newPosts che contiene i dettagli del post da aggiungere.



## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


