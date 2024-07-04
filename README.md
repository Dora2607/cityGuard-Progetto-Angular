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

### UsersManagementComponent

#### UsersViewComponent

La componente `UsersViewComponent` è un componente Angular che fornisce una vista per gli utenti. Questo componente ha tre metodi principali: `onStatusUpdate`, `onUsersUpdated` e `deleteButton`.

1. `onStatusUpdate(newStatus: string)`: Questo metodo viene chiamato quando lo stato degli utenti viene aggiornato. Prende come parametro il nuovo stato e aggiorna lo stato corrente nel servizio UsersViewService. Inoltre, aggiorna la proprietà status del componente in base al nuovo stato.
2. `onUsersUpdated(count: number)`: Questo metodo viene chiamato quando il numero di utenti da mostrare viene aggiornato. Prende come parametro il nuovo conteggio e aggiorna il conteggio degli utenti nel servizio UsersViewService. Inoltre, aggiorna la proprietà usersShowCount del componente con il nuovo conteggio.
3. `deleteButton()`: Questo metodo viene chiamato quando il pulsante di eliminazione viene premuto. Inverte il valore della proprietà isDeleteBtnClicked del componente e invia il nuovo valore al servizio `UsersViewService`.
Questo componente dipende dal servizio UsersViewService, che fornisce metodi per aggiornare lo stato e il conteggio degli utenti, e per gestire l’evento del pulsante di eliminazione.

#### UsersListComponent
La componente `UsersListComponent` è responsabile della visualizzazione dell’elenco degli utenti. Utilizza il servizio `UsersListService` per ottenere e gestire l’elenco degli utenti. La componente ha diversi metodi chiave:

1. `ngOnInit()`: Questo metodo viene chiamato all’inizializzazione della componente. Recupera l’elenco degli utenti e si sottoscrive a vari osservabili. Ecco un'analisi più dettagliata di ciò che accade in questo metodo:

- `this.loggedUser = this.loggedUserService.initializePersonalProfile();`: Questa linea inizializza il profilo dell'utente loggato utilizzando il metodo `initializePersonalProfile()` del servizio `LoggedUserService`.

- `if (this.usersListService.isFirstVisit) {...} else {...}`: Questo blocco di codice controlla se è la prima visita dell'utente. Se lo è, chiama il metodo `getAllUser()` per ottenere tutti gli utenti e imposta `isFirstVisit` su `false`. Altrimenti, ottiene gli utenti visualizzati dal servizio `UsersListService`.

- `this.usersSubscription = this.usersListService.displayedUsersChanged.subscribe(...)`: Questa linea si sottoscrive all'osservabile `displayedUsersChanged` del servizio `UsersListService`. Quando l'elenco degli utenti visualizzati cambia, aggiorna l'elenco degli utenti visualizzati nella componente.

- `this.usersViewService.deleteButtonClicked.subscribe(...)`: Questa linea si sottoscrive all'osservabile `deleteButtonClicked` del servizio `UsersViewService`. Quando il pulsante di eliminazione viene cliccato, aggiorna lo stato del pulsante di eliminazione nella componente.

- `this.isLoadingSubscription = this.usersListService.isLoading.subscribe(...)`: Questa linea si sottoscrive all'osservabile `isLoading` del servizio `UsersListService`. Quando lo stato di caricamento cambia, aggiorna lo stato di caricamento nella componente.

- `this.searchUsersSubscription = this.searchBarService.searchTerm.subscribe(...)`: Questa linea si sottoscrive all'osservabile `searchTerm` del servizio `SearchBarService`. Quando il termine di ricerca cambia, filtra l'elenco degli utenti visualizzati in base al termine di ricerca e aggiorna l'elenco degli utenti visualizzati nel servizio `UsersListService`.

2. `getAllUser()`: Questo metodo recupera tutti gli utenti dal servizio ApiService e li imposta nel servizio UsersListService.
3. `activeDeleteUser(id: number)`: Questo metodo viene chiamato quando un utente clicca sul pulsante di eliminazione. Chiede conferma all’utente e, se confermato, elimina l’utente.
4. `goToPreviousPage()`: Questo metodo viene chiamato quando un utente clicca sul pulsante Indietro. Cambia lo stato del pulsante di eliminazione.
5. `ngOnDestroy()`: Questo metodo viene chiamato quando la componente viene distrutta. Si disiscrive da tutti gli osservabili a cui la componente è sottoscritta.

#### AddUserComponent
La componente `AddUserComponent` è responsabile della creazione di un nuovo utente. Questa componente contiene un form che raccoglie le informazioni dell’utente come nome, email, genere e stato. 
Vediamo i metodi:
1. `fullName()` combina il nome e il cognome dell’utente in un unico nome completo. 
2. `randomStatus()` genera uno stato casuale per l’utente. 
3. `newUser()` crea un nuovo utente con le informazioni raccolte dal form, invia una richiesta all’API per aggiungere l’utente e naviga indietro alla lista degli utenti una volta che l’utente è stato aggiunto con successo.
4. `goBack()` naviga indietro alla lista degli utenti quando viene cliccato il pulsante.

### UserDetailsComponent

La componente `UserDetailsComponent` è responsabile della visualizzazione dei dettagli di un utente specifico. Questa componente include due sottocomponenti: `app-user-profile` e `app-user-posts`, che mostrano rispettivamente il profilo dell’utente e i post pubblicati dall’utente. Inoltre, UserDetailsComponent fornisce un pulsante “Back” che, quando cliccato, naviga indietro alla gestione degli utenti.


#### UserProfileComponent
La componente `UserProfileComponent` è la componente che gestisce la visualizzazione del profilo utente. Questo componente recupera l’ID dell’utente dalla rotta attiva e utilizza questo ID per recuperare i dettagli dell’utente e i suoi “todo” tramite i servizi `UserProfileService` e `ApiService`. I dettagli dell’utente e i “todo” vengono quindi visualizzati nella vista del componente.
Inoltre, gestisce le sottoscrizioni agli Observable e si assicura che queste sottoscrizioni vengano annullate quando il componente viene distrutto. I metodi nel dettaglio sono:
1. `ngOnInit()`: Questo è il metodo di inizializzazione del ciclo di vita del componente Angular che viene chiamato automaticamente quando Angular inizializza il componente. In questo metodo, l’ID dell’utente viene recuperato dal parametro della rotta e vengono chiamati i metodi `getUserById()` e `updatedTodos()` per recuperare i dettagli dell’utente e i suoi “todo”. Viene anche impostata una sottoscrizione all’Observable `currentPostNumber` del servizio UserProfileService.
2. `getUserById(id: number)`: Questo metodo chiama il metodo `getUser(id)` del servizio UserProfileService per recuperare i dettagli dell’utente con l’ID specificato. I dettagli dell’utente vengono quindi salvati nella proprietà userProfile del componente e viene emesso un evento per aggiornare il profilo utente nel servizio UserProfileService. Viene anche generata una descrizione casuale per l’utente.
3. `updatedTodos(id: number)`: Questo metodo chiama il metodo getTodos(id) del servizio ApiService per recuperare i “todo” dell’utente con l’ID specificato. I “todo” vengono quindi salvati nella proprietà todos del componente.
4. `ngOnDestroy()`: Questo è il metodo del ciclo di vita del componente Angular che viene chiamato automaticamente quando Angular distrugge il componente. In questo metodo, la sottoscrizione all’Observable currentUser del servizio UserProfileService viene annullata per prevenire perdite di memoria.

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

#### UsersViewService

Il servizio `UsersViewService` è un servizio Angular che fornisce metodi per gestire lo stato e gli eventi relativi alla visualizzazione degli utenti. Questo servizio ha tre metodi principali:

1. `updateStatus(newStatus: string)`: Questo metodo viene chiamato quando lo stato degli utenti viene aggiornato. Prende come parametro il nuovo stato e aggiorna lo stato corrente nel servizio UsersListService. Inoltre, filtra gli utenti in base al nuovo stato.
2. `updateUsersCount(count: number)`: Questo metodo viene chiamato quando il numero di utenti da mostrare viene aggiornato. Prende come parametro il nuovo conteggio e aggiorna il conteggio degli utenti nel servizio UsersListService. Inoltre, riduce il numero di utenti visualizzati in base al nuovo conteggio.
3. `deleteButtonClicked`: Questo è un Subject di RxJS che emette un evento ogni volta che il pulsante di eliminazione viene premuto.
Questo servizio dipende dal servizio `UsersListService`, che fornisce metodi per ottenere e impostare gli utenti visualizzati.

#### UsersListService

Il servizio `UsersListService` gestisce l’elenco degli utenti per l’applicazione. Mantiene due liste di utenti: allUsers e displayedUsers. Ha diversi metodi chiave:

1. `setAllUsers(users: Users[])`: Questo metodo imposta l’elenco di tutti gli utenti.
2. `setDisplayedUsers(displayedUsers: Users[])`: Questo metodo imposta l’elenco degli utenti visualizzati.
3. `getDisplayedUsers()`: Questo metodo restituisce una copia dell’elenco degli utenti visualizzati.
4. `addUser(user: Users)`: Questo metodo aggiunge un utente all’elenco di tutti gli utenti e aggiorna l’elenco degli utenti visualizzati.
5. `deleteUser(id: number)`: Questo metodo rimuove un utente dall’elenco di tutti gli utenti e aggiorna l’elenco degli utenti visualizzati.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
Per generare un report sulla coverage del codice, puoi utilizzare il comando `ng test --code-coverage`. Questo genererà una directory `coverage` nel tuo progetto con un report HTML sulla coverage del tuo codice.


