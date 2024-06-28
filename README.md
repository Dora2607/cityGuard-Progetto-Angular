# CityGuard Per NTT DATA
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

#### LoginComponent

La componente `LoginComponent` gestisce l'accesso degli utenti. Ecco una breve descrizione dei suoi metodi:

1. `ngOnInit()`: Inizializza il componente. Qui viene creato il form di accesso con campi per l'email e la password.
2. `login()`: Questo metodo viene chiamato quando l'utente fa clic sul pulsante di accesso. Se il form è valido, viene inviata un'azione di accesso allo store ngrx e l'utente viene reindirizzato alla pagina di gestione utenti (`features/usersManagement`).


#### SignupComponent

La componente `SignupComponent` gestisce la registrazione degli utenti. Ecco una breve descrizione dei suoi metodi:

1. `ngOnInit()`: Inizializza il componente. Qui viene creato il form di registrazione con campi per il nome, il genere, l'email e la password.
2. `signup()`: Questo metodo viene chiamato quando l'utente fa clic sul pulsante di registrazione. Se il form è valido, viene inviata un'azione di registrazione allo store ngrx.


#### AuthGuard

La classe `AuthGuard` è una guardia di routing che verifica se l'utente è autenticato. Ecco una breve descrizione del suo metodo:

1. `canActivate()`: Questo metodo viene chiamato prima di navigare verso una route protetta. Controlla se l'utente ha un token di autenticazione. Se non è autenticato, reindirizza alla pagina di accesso (`login`).

#### Gestione dello Stato dell’Autenticazione con NgRx

Le azioni di login, logout e registrazione sono definite nel file `auth.actions.ts` utilizzando la funzione `createAction` di NgRx. Quando un utente si registra o effettua l'accesso, le informazioni dell'utente vengono salvate nello stato dell'applicazione e nel `localStorage`. Queste informazioni vengono utilizzate per determinare se un utente è autenticato e per mantenere le informazioni dell'utente tra le sessioni.

La gestione dello stato dell'autenticazione è gestita utilizzando NgRx, una libreria di gestione dello stato reattiva per Angular. Il file `auth.reducer.ts` definisce come lo stato dell'applicazione cambia in risposta alle azioni di login, logout e registrazione.

Il file `auth.effects.ts` definisce gli effetti laterali delle azioni di login, logout e registrazione. Quando un utente si registra, effettua l'accesso o si disconnette, l'applicazione naviga rispettivamente alla pagina home o alla pagina di login.

#### HeaderComponent

La componente `HeaderComponent` è una parte essenziale dell’interfaccia utente dell’applicazione. Ecco una descrizione di ciascun elemento all’interno della componente:

1. `Toolbar principale`: La toolbar principale contiene un’icona dell’account che apre un menu a discesa, con tre opzioni:
- “Users List”: Naviga alla pagina di elenco degli utenti (features/usersManagement/usersList).
- “Posts Overview”: Naviga alla panoramica dei post (features/postsOverview).
- “Logout”: Esegue il logout dell’utente tramite l’azione logout().
2. `Logo`: La componente LogoComponent visualizza il logo dell’applicazione, composto dai testi “City” e “Guard”. La visibilità del logo è controllata dal servizio LogoService.
3. `Icona di ricerca`: L’icona di ricerca consente di attivare la barra di ricerca.
Quando viene cliccata, il metodo toggleSearchBar() viene chiamato per mostrare o nascondere la barra di ricerca.

#### SearchBarComponent
La componente `SearchBarComponent` gestisce la funzionalità di ricerca nell’applicazione:

Inizialmente, la barra di ricerca è nascosta (showSearchBar = false).
Quando l’utente fa clic sull’icona di ricerca, la barra di ricerca viene mostrata.
L’utente può inserire un termine di ricerca e fare clic su “Submit”.
Il servizio SearchBarService riceve il termine di ricerca e lo elabora.
Quando l’utente termina la ricerca, la barra di ricerca viene nascosta.

### I servizi 

#### ApiService

Il servizio `ApiService` fornisce metodi per interagire con l'API REST di GoRest. Questi metodi includono operazioni CRUD per gli utenti, nonché metodi per recuperare e creare post, commenti e attività (todos) per un determinato utente. Tutte le richieste API sono autenticate utilizzando un token di autorizzazione che viene passato nell'intestazione della richiesta.
Vediamo i metodi:

1. `registerUser(user: newUser)`: Questo metodo registra un nuovo utente nell’API. Accetta come parametro un oggetto newUser che contiene i dettagli dell’utente da registrare.
2. `getUsers(): Observable<Users[]>`: Questo metodo recupera un elenco di utenti dall’API. Restituisce un Observable che emette un array di oggetti Users.
3. `deleteUser(userId: number)`: Questo metodo elimina un utente specifico dall’API. Accetta come parametro l’ID dell’utente da eliminare.
4. `addUser(user: newUser)`: Questo metodo aggiunge un nuovo utente nell’API. Accetta come parametro un oggetto newUser che contiene i dettagli dell’utente da aggiungere.
5. `getTodos(userId: number): Observable<Todos[]>`: Questo metodo recupera un elenco di attività (todos) per un utente specifico dall’API. Accetta come parametro l’ID dell’utente e restituisce un Observable che emette un array di oggetti Todos.
6. `getPosts(userId: number): Observable<Posts[]>`: Questo metodo recupera un elenco di post per un utente specifico dall’API. Accetta come parametro l’ID dell’utente e restituisce un Observable che emette un array di oggetti Posts.
7. `getComments(postId: number): Observable<Comments[]>`: Questo metodo recupera un elenco di commenti per un post specifico dall’API. Accetta come parametro l’ID del post e restituisce un Observable che emette un array di oggetti Comments.
8. `addComments(postId: number, comment: newComments)`: Questo metodo aggiunge un nuovo commento a un post specifico nell’API. Accetta come parametri l’ID del post e un oggetto newComments che contiene i dettagli del commento da aggiungere.
9. `addPosts(userId: number, post: newPosts)`: Questo metodo aggiunge un nuovo post per un utente specifico nell’API. Accetta come parametri l’ID dell’utente e un oggetto newPosts che contiene i dettagli del post da aggiungere.

#### LoggedUserService

Il servizio `LoggedUserService` è un servizio Angular che gestisce le informazioni relative all’utente autenticato. Esso fornisce metodi per ottenere l’utente loggato e inizializzare il profilo personale.

Vediamo i metodi:
1. `getLoggedInUser()`: Questo metodo restituisce un’Observable contenente l’utente loggato o null se nessun utente è autenticato. Utilizza lo store ngrx per selezionare l’utente corrente e filtra eventuali valori non validi.

2. `initializePersonalProfile()`: Questo metodo inizializza il profilo personale dell’utente loggato. Utilizza il metodo getLoggedInUser() per ottenere l’utente e lo memorizza nella proprietà loggedUser. Restituisce l’oggetto utente inizializzato.

#### SearchBarService
Il servizio `SearchBarService` gestisce la comunicazione tra la componente di ricerca e altre parti dell’applicazione:

- Espone un observable show$ per notificare quando la barra di ricerca deve essere mostrata.
- Espone un observable searchTerm per fornire il termine di ricerca inserito dall’utente.
- I metodi `show()` e `search(term: string)` vengono utilizzati per attivare la visualizzazione della barra di ricerca e per inviare il termine di ricerca.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).


