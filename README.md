# CityGuard Per NTT DATA
CityGuard è un'applicazione che mira a migliorare la vita delle persone nei centri urbani. L'applicazione consente agli utenti di condividere le proprie idee e segnalazioni per contribuire a proteggere e salvaguardare il patrimonio culturale e naturale della città e supportare i legami positivi, sociali e ambientali, tra aree urbane.

## Funzionalità
Dopo aver effettuato l'autenticazione, gli utenti possono accedere alla sezione dove è possibile vedere la lista degli utenti, con la possibilità di svolgere una ricerca per nome o email. È possibile creare o eliminare un nuovo utente.

Gli utenti possono aprire la scheda di un utente, dove vengono mostrati i suoi dettagli, visualizzare i suoi post e quindi inserire dei commenti ai post.

È presente una seconda funzionalità in cui l’utente visualizza tutti i post, può effettuare delle ricerche e, una volta individuato il post di interesse, può visualizzare i commenti e inserirne di nuovi. In questa sezione l’utente può inserire dei nuovi post.

## Tecnologie utilizzate

L’applicazione è stata sviluppata utilizzando diverse tecnologie e librerie:

- `Angular CLI versione 18.0.3`: Il framework Angular CLI è stato utilizzato per creare l’applicazione e gestire i componenti, i servizi e le altre parti dell’applicazione.
- `Angular Material`: Questa libreria è stata utilizzata per la modellazione dei componenti dell’interfaccia utente. Tutte le API di Angular Material sono raggruppate nella cartella shared/material.
- `NgRx`: Questa libreria è stata utilizzata per la gestione dello stato dell’applicazione. NgRx implementa il pattern Redux in Angular, fornendo un modo prevedibile per gestire lo stato dell’applicazione. Per ulteriori dettagli sulla gestione dello stato dell'autenticazione con NgRx, fare riferimento alla sezione Gestione dello Stato dell’Autenticazione con NgRx.
- `ESLint e Prettier`: Questi strumenti sono stati utilizzati per formattare il codice e mantenere uno stile di codice coerente. Lanciare da terminale il comando `ng lint`.

## Configurazione e prova in locale

### Pre-requisiti
- Node: versione 22.2.0
- NPM: versione 10.8.1
- Angular: versione 18.0.3

Per installare Node: scaricare la versione lts da: [https://nodejs.org/en/download/package-manager], verrà installato anche npm. 
Per installare Angular da terminale: 
```bash
npm install -g @angular/cli
```
### Installazione
Per configurare e testare l'applicazione in locale, segui questi passaggi:

1. Clona il repository sul tuo computer locale.
2. Naviga nella directory del progetto e installa le dipendenze con `npm install`.
A causa delle recenti versioni di Angular e NgRx, potrebbero verificarsi conflitti di dipendenza durante l'installazione. Se incontri problemi dopo aver eseguito `npm install`, prova a eseguire il seguente comando per risolvere i conflitti di dipendenza:

```bash
npm install --legacy-peer-deps
```
3. Avvia il server di sviluppo con `ng serve`. Naviga su `http://localhost:4200/`. L'applicazione si ricaricherà automaticamente se modifichi uno dei file sorgente.

## Gestione del Token
L’applicazione utilizza un token speciale per il controllo della sessione e per invocare le REST API via HTTP Bearer Token. Questo token deve essere generato accedendo con il browser a questa pagina: https://gorest.co.in/consumer/login.

Nota: Questo token è personale e dovrebbe essere sostituito con il proprio token nel file che si trova nella directory app con il nome di token.ts. Per semplicità di esecuzione dell’app, il token è rimasto esposto, ma ciò non dovrebbe accadere in un ambiente di produzione per motivi di sicurezza

## Utilizzo di Angular Material e personalizzazione dei temi
L’applicazione utilizza `Angular Material` per la realizzazione dei template HTML. Tutte le API di Angular Material sono raggruppate nella cartella `shared/material`.

Durante l’installazione di Angular Material tramite npm, è stata decisa una personalizzazione delle componenti di Material. La maggior parte della personalizzazione si trova nel file style.scss.

In style.scss, vengono definite le palette di colori primaria e secondaria, oltre a vari stili globali. Le palette di colori sono state personalizzate per adattarsi al tema dell’applicazione. Inoltre, sono stati definiti vari breakpoint e dimensioni del testo per garantire una buona responsività e leggibilità su vari dispositivi e dimensioni di schermo.

Il tema personalizzato viene poi applicato a tutte le componenti di Angular Material attraverso l’uso della funzione `mixin mat.all-component-themes`.

## Routing 
L'applicazione è composta da diversi moduli, caricati in `lazy loading` al fine di migliorare le prestazioni dell’applicazione. Vediamo i diversi moduli:

1. `AppRoutingModule`
Nel modulo AppRoutingModule, le rotte a livello di applicazione vengono definite. Se l’URL è vuoto, l’applicazione reindirizza all’URL ‘/login’. Sono state definite anche le rotte per ‘login’, ‘signup’ e ‘features’. La rotta ‘features’ è protetta da AuthGuard, il che significa che solo gli utenti autenticati possono accedervi.

2. `FeaturesRoutingModule`
Nel modulo FeaturesRoutingModule, sono definite le rotte per ‘usersManagement’ e ‘postsOverview’, entrambe protette da AuthGuard.

3. `UsersManagementRoutingModule`
Nel modulo UsersManagementRoutingModule, è definita una rotta figlia per ‘usersList’, ‘addUser’ e ‘usersList/:id’. Quest’ultima rotta utilizza un modulo figlio per visualizzare i dettagli dell’utente.

4. `UserDetailsRoutingModule`
Nel modulo UserDetailsRoutingModule, è definita una rotta per visualizzare i dettagli dell’utente.

5. `PostsOverviewRoutingModule`
Nel modulo PostsOverviewRoutingModule, è definita una rotta per visualizzare una panoramica dei post.

6. `AuthRoutingModule`
Infine, nel modulo AuthRoutingModule, sono definite le rotte per le viste di login e registrazione.

`SelectivePreloadingStrategyService`
La classe SelectivePreloadingStrategyService implementa l’interfaccia PreloadingStrategy. Questo servizio consente di pre-caricare selettivamente i moduli in base alla configurazione delle rotte. Se una rotta ha il campo data.preload impostato su true, il modulo corrispondente viene pre-caricato. Questo può migliorare le prestazioni dell’applicazione caricando anticipatamente i moduli che saranno necessari in futuro come `FeaturesRoutingModule`.


## Panoramica delle Componenti e dei Servizi
In questa sezione, esploreremo le componenti principali e i servizi utilizzati in CityGuard. Questi elementi costituiscono il cuore della nostra applicazione e ci permettono di fornire un'esperienza utente fluida e reattiva.

### Authentication

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

### Shared components

#### HeaderComponent
La componente `HeaderComponent` è una parte essenziale dell’interfaccia utente dell’applicazione. Ecco una descrizione di ciascun elemento all’interno della componente:

1. `Toolbar principale`: La toolbar principale contiene un’icona dell’account che apre un menu a discesa, con tre opzioni:
    - “Users List”: Naviga alla pagina di elenco degli utenti (features/usersManagement/usersList).
    - “Posts Overview”: Naviga alla panoramica dei post (features/postsOverview).
    - “Logout”: Esegue il logout dell’utente tramite l’azione `logout()`. Quando un utente decide di uscire dall’applicazione, viene invocata l’azione di logout definita nel file auth.actions.ts. Questa azione viene poi gestita da un effetto NgRx, definito nel file auth.effects.ts. L’effetto ascolta l’azione di logout, rimuove il token dal localStorage, reindirizza l’utente alla pagina di login e infine invoca l’azione di successo del logout.
    NB: Se si intende utilizzare un `nuovo utente` diverso da quello attualmente loggato dopo aver eseguito il logout, è consigliabile riavviare l’applicazione con `ng serve`. Questo assicurerà che lo stato dell’applicazione sia completamente resettato e pronto per un nuovo utente. Se invece si desidera eseguire nuovamente il login con lo stesso utente, non è necessario riavviare l’applicazione. Si può semplicemente eseguire il login di nuovo con le stesse credenziali utente.

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

#### UserPostsComponent
`UserPostsComponent` è un componente Angular che gestisce la visualizzazione dei post dei singoli utenti. Ecco come funziona:

1. `ngOnInit()`: Questo metodo viene chiamato quando Angular inizializza il componente. In questo metodo, il componente recupera l’utente corrente, l’ID dell’utente dalla rotta, si sottoscrive all’utente corrente dal servizio `UserProfileService`, aggiorna i post e inizializza il form dei commenti.

2. `updatedPosts(id: number)`: Questo metodo prende un ID utente come input e aggiorna i post per quell’utente. Se l’ID dell’utente non corrisponde all’utente corrente, recupera i post dall’API. Altrimenti, si sottoscrive ai post personali dal servizio `PostsService`.

3. `lengthPosts(posts: Posts[])`: Questo metodo prende un array di post come input e controlla se l’array è vuoto. Se l’array è vuoto, imposta isEmptyPostsArr a true. Inoltre, emette il numero di post tramite il servizio `UserProfileService`.

4. `initializeCommentForm()`: Questo metodo inizializza il form dei commenti con un campo commentText che è richiesto.

5. `toggleComments(id: number) e toggleAddComments(id: number)`: Questi metodi prendono un ID post come input e attivano la visibilità dei commenti e del box di aggiunta commenti per quel post.

6. `addComment(id: number)`: Questo metodo prende un ID post come input, crea un nuovo commento con i dettagli dell’utente corrente e il testo del commento dal form, e poi chiama l’API per aggiungere il commento.

7. `goBack(id: number)`: Questo metodo prende un ID post come input e attiva la visibilità del box di aggiunta commenti per quel post.

8. `ngOnDestroy()`: Questo metodo viene chiamato quando Angular distrugge la componente.
Il template del componente visualizza una lista di post con la possibilità di visualizzare i commenti per ogni post e di aggiungere nuovi commenti. Se non ci sono post per l’utente, viene visualizzato un messaggio “Non ci sono post da questo utente”.

#### CommentsComponent

Il componente `CommentsComponent` è responsabile della visualizzazione dei commenti per un post specifico. I metodi principali del componente sono:

1. `ngOnInit()`: Questo metodo viene chiamato all'inizializzazione del componente. Recupera i commenti per il post specificato dal servizio `CommentsService`. Se non ci sono commenti, richiede i commenti dall'API. Sottoscrive i cambiamenti dei commenti e lo stato di caricamento dei commenti.

2. `ngOnDestroy()`: Questo metodo annulla le sottoscrizioni ai cambiamenti dei commenti e allo stato di caricamento dei commenti quando il componente viene distrutto.

Il template del componente visualizza un elenco di commenti con la possibilità di visualizzare un messaggio quando non ci sono commenti o un indicatore di caricamento quando i commenti sono in fase di caricamento.

### PostsOverviewComponent
La componente `posts-overview` è composta da diversi sotto-componenti e funzionalità che lavorano insieme per fornire una panoramica completa dei post.

#### PostsListComponent

La componente `PostsListComponent` gestisce la visualizzazione dei post e le interazioni correlate, come l’aggiunta di commenti. Ecco una panoramica di come funziona e dei suoi metodi principali:

1. `ngOnInit()`: Questo metodo viene chiamato all’inizializzazione del componente. Si occupa di inizializzare l’utente loggato, gli utenti visualizzati, gli ID degli utenti e i post. Inoltre, si sottoscrive ai cambiamenti dei post visualizzati e allo stato di caricamento.

2. `getAllPosts(usersId: number[])`: Questo metodo recupera tutti i post degli utenti specificati. Imposta i post recuperati come tutti i post e i post visualizzati. Inoltre, inizializza i profili utente.

3. `initializeUsersProfiles(posts: Posts[]): Record<number, string>`: Questo metodo inizializza i profili utente per i post specificati. Restituisce un oggetto che mappa gli ID degli utenti ai loro nomi.

4. `initializeCommentForm()`: Questo metodo inizializza il form per l’aggiunta di commenti.

5. `toggleComments(id: number)`: Questo metodo alterna la visibilità dei commenti per un post specifico.

6. `toggleAddComments(id: number)`: Questo metodo alterna la visibilità del box per l’aggiunta di commenti per un post specifico.

7. `addComment(id: number)`: Questo metodo aggiunge un commento a un post specifico. Recupera i dati del form, li invia al server e aggiorna i commenti per il post specifico.

8. `goBack(id: number)`: Questo metodo alterna la visibilità del box per l’aggiunta di commenti per un post specifico.

9. `ngOnDestroy()`: Questo metodo viene chiamato alla distruzione del componente. Si occupa di annullare le sottoscrizioni ai cambiamenti dei post visualizzati e allo stato di caricamento.

#### AddPostComponent
La componente AddPostComponent è responsabile della creazione di nuovi post nella applicazione. Questa componente fornisce un’interfaccia utente per l’inserimento del titolo e del contenuto del post, e gestisce la logica per l’invio del nuovo post al server. Ecco una panoramica dei suoi metodi principali:

1. `ngOnInit()`: Questo metodo viene chiamato all’inizializzazione del componente. Si occupa di inizializzare l’utente loggato e il form per l’aggiunta di post.

2. `initializePostForm()`: Questo metodo inizializza il form per l’aggiunta di post. Il form contiene due campi: postTitle e postText, entrambi richiesti.

3. `addPost(id: number)`: Questo metodo aggiunge un nuovo post. Recupera i dati del form, li invia al server e aggiorna i post personali. Dopo l’aggiunta del post, il form viene resettato.

4. `showAddPostBox()`: Questo metodo alterna la visibilità del box per l’aggiunta di post. Inoltre, alterna l’icona del pulsante di apertura/chiusura del box.

5. `closeBox()`: Questo metodo chiude il box per l’aggiunta di post e reimposta l’icona del pulsante di apertura/chiusura del box.

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

#### UserProfileService
`UserProfileService` è un servizio Angular che fornisce metodi per gestire le informazioni degli utenti.
Fornisce i seguenti metodi:

1. `getUsers()`: Questo metodo restituisce un Observable di un array di utenti. Utilizza il metodo `getDisplayedUsers()` del servizio `UsersListService` per ottenere gli utenti.

2. `getUser(id: number | string)`: Questo metodo prende un ID utente come input e restituisce un Observable dell’utente corrispondente. Utilizza il metodo `getUsers()` per ottenere tutti gli utenti e quindi trova l’utente con l’ID corrispondente.

3. `getIds(users:Users[])`: Questo metodo prende un array di utenti come input e restituisce un array di ID utente. Mappa semplicemente ogni utente al suo ID.

4. `getUserDescription()`: Questo metodo restituisce una descrizione casuale dell’utente da un array predefinito di descrizioni.

5. `emitUpdateUser(user: Users)`: Questo metodo prende un utente come input e emette questo utente come il nuovo utente corrente. Utilizza un BehaviorSubject per memorizzare l’utente corrente, che può essere sottoscritto da altre parti dell’applicazione per reagire alle modifiche dell’utente corrente.

6. `emitUpdateNumPost(num:number)`: Questo metodo prende un numero come input e emette questo numero come il nuovo numero di post. Utilizza un BehaviorSubject per memorizzare il numero di post, che può essere sottoscritto da altre parti dell’applicazione per reagire alle modifiche del numero di post.

#### PostsService
`PostsService` è un servizio Angular che fornisce metodi per gestire i post degli utenti. I metodi sono:

1. `setAllPosts(posts: Posts[])`: Questo metodo prende un array di post come input e li imposta come tutti i post. Successivamente, emette i post come un nuovo valore per `allPostsChanged`.

2. `setDisplayedPosts(displayedPosts: Posts[])`: Questo metodo prende un array di post come input e li imposta come i post visualizzati. Successivamente, emette i post come un nuovo valore per `displayedPostsChanged`.

3. `getDispayedPosts()`: Questo metodo restituisce una copia di tutti i post.

4. `getAllPosts(userIds: number[])`: Questo metodo prende un array di ID utente come input e restituisce un Observable di un array di post per quegli utenti. Utilizza il metodo `getPosts(id)` del servizio `ApiService` per ottenere i post per ogni ID utente.

5. `addPost(id: number)`: Questo metodo prende un ID utente come input e restituisce l’ID. Questo metodo viene utilizzato per aggiungere un nuovo post per l’utente specificato.

6. `addPersonalPost(post: Posts)`: Questo metodo prende un post come input e lo aggiunge all’inizio di tutti i post e alla fine dei post personali. Successivamente, emette i post come un nuovo valore per `allPostsChanged` e `personalPostChanged`.

7. `removePosts(id: number)`: Questo metodo prende un ID utente come input e rimuove tutti i post di quell’utente da tutti i post e dai post visualizzati. Successivamente, emette i post come un nuovo valore per `allPostsChanged` e `displayedPostsChanged`.

#### CommentsService
Il servizio `CommentsService` è responsabile della gestione dei commenti per un post specifico. I metodi principali del servizio sono:

1. `fetchComments(postId: number)`: Questo metodo recupera i commenti per un post specifico dall’API e li imposta nel servizio. Durante il recupero dei commenti, imposta isCommentsBoxLoading a true e lo reimposta a false una volta che i commenti sono stati recuperati.

2. `setComments(postId: number, comments: Comments[])`: Questo metodo imposta i commenti per un post specifico e emette un evento per segnalare che i commenti sono cambiati.

3. `getComments(postId: number)`: Questo metodo restituisce i commenti per un post specifico.

## Running unit tests

Digita `ng test` per eseguire gli unit tests via [Karma](https://karma-runner.github.io).
Per generare un report sulla coverage del codice, puoi utilizzare il comando `ng test --code-coverage`. Questo genererà una directory `coverage` nel tuo progetto con un report HTML sulla coverage del tuo codice.


