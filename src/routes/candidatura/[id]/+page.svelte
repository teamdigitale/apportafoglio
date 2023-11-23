<script>
    import moment from "moment/min/moment-with-locales";
    import Accordion from "../../../c/accordion.svelte";
    moment.locale("it");

    export let data;

    let isflipped = false;
    let ypossaf = 0;
    let yposchr = 0;

    let viewCompact = true;

    let backdetails = "Fornitori";

    function flip(s) {
        backdetails = s;
        if (!isflipped) {
            yposchr = document.documentElement.scrollTop;
            ypossaf = document.body.scrollTop;
            document.body.scrollTop = 0; // For Safari
            document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
        } else {
            document.body.scrollTop = ypossaf; // For Safari
            document.documentElement.scrollTop = yposchr; // For Chrome, Firefox, IE and Opera
        }
        isflipped = !isflipped;
    }

    function removeStyles(el) {
        el.removeAttribute("style");

        el.childeNodes.forEach((x) => {
            if (x.nodeType == 1) removeStyles(x);
        });
        return el;
    }

    function diffDays(a, b) {
        const date1 = new Date(a);
        const date2 = new Date(b);
        return Math.ceil(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
    }

</script>

<section class="hero is-small is-info is-12">
    <div class="hero-body">
        <p class="title my-0">Candidatura</p>
        <p class="my-1 mx-5 is-size-6">
            <i>"La verità della storia è nei dettagli"</i>&nbsp;&nbsp;[Paul
            Auster]
        </p>
    </div>
</section>

<section class="hero is-small is-12 my-3">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="container is-12">
        <div class="card-container is-12">
            <div class="row">
                <div class="col">
                    <div class="flip-container is-12">
                        <div class="flipper is-12 {isflipped ? 'flipped' : ''}">
                            <div class="front is-12">
                                <div
                                    class="card bm--card-equal-height has-background-grey-lighter is-12"
                                >
                                    <header class="has-background-info">
                                        <nav class="level">
                                            <!-- Left side -->
                                            <div class="level-left">
                                                <div class="level-item">
                                                    <p
                                                        class="card-header-title"
                                                    >
                                                        ENTE: {data.c.outfunds__Applying_Organization__r.Name} - 
                                                        Stato attuale candidatura: {data.c.outfunds__Status__c} - 
                                                        Stato attuale del progetto: {data.c.Stato_Progetto__c?data.c.Stato_Progetto__c:'n.a.'}
                                                    </p>
                                                </div>
                                            </div>
                                            <div class="level-right">
                                                <div class="level-item">
                                                    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                                    <p
                                                        class="card-header-title has-text-primary has-pointer"
                                                        on:click={() =>
                                                            flip("Files")}
                                                    >
                                                        <span
                                                            >Files della
                                                            candidatura</span
                                                        >
                                                        <span class="icon">
                                                            <i
                                                                class="fas fa-file"
                                                            />
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </nav>
                                    </header>
                                    <div class="card-content">
                                        <div class="timeline is-centered">
                                            <header class="timeline-header">
                                                <span
                                                    class="tag is-medium is-primary"
                                                    >End</span
                                                >
                                            </header>
                                            {#if !viewCompact}
                                                {#each data.ch as h}
                                                    <div
                                                        class="timeline-item is-info {h.Actor ===
                                                        'D'
                                                            ? 'right'
                                                            : 'left'}"
                                                    >
                                                        <!--
                                                    <div
                                                        class="timeline-marker is-icon"
                                                    >
                                                        <i
                                                            class="fa {h.Field ===
                                                            'COMUNICAZIONE'
                                                                ? 'fa-envelope'
                                                                : h.NewValue ===
                                                                  'LIQUIDATO'
                                                                ? 'fa-euro-sign'
                                                                : 'fa-building'}"
                                                        />
                                                    </div>
                                                    -->
                                                        {#if h.Actor === "D"}
                                                            <div
                                                                class="timeline-marker is-info is-image is-48x48"
                                                            >
                                                                <img
                                                                    src="/logo-d.svg"
                                                                    alt="logo D"
                                                                />
                                                            </div>
                                                        {:else}
                                                            <div
                                                                class="timeline-marker is-icon"
                                                            >
                                                                <i
                                                                    class="fa fa-building"
                                                                />
                                                            </div>
                                                        {/if}
                                                        <div
                                                            class="timeline-content"
                                                        >
                                                            {#if h.Field === "COMUNICAZIONE"}
                                                                <p
                                                                    class="title is-4"
                                                                >
                                                                    {moment(
                                                                        h.CreatedDate
                                                                    ).format(
                                                                        "DD/MM/YYYY"
                                                                    )}
                                                                </p>

                                                                <p
                                                                    class="title is-6 has-text-info"
                                                                >
                                                                
                                                                    {h.title}
                                                                
                                                                    <Accordion>
                                                                        <div
                                                                            slot="details"
                                                                        >
                                                                            <p>
                                                                                {@html h.subtitle}
                                                                            </p>
                                                                        </div>
                                                                    </Accordion>
                                                                </p>
                                                            {:else}
                                                                <p
                                                                    class="title is-4"
                                                                >
                                                                    {moment(
                                                                        h.CreatedDate
                                                                    ).format(
                                                                        "DD/MM/YYYY"
                                                                    )}
                                                                </p>
                                                                <p
                                                                    class="title is-6"
                                                                >

                                                                    {h.title}

                                                                </p>

                                                                <p
                                                                    class="subtitle is-6"
                                                                >
                                                                    {h.subtitle}
                                                                </p>
                                                                {#if h.Field === "FILE"}
                                                                    <h1
                                                                        class="subtitle is-3 has-text-weight-bold has-text-primary"
                                                                    >
                                                                        <a
                                                                            href="/api/file/{h.ContentDocumentId}"
                                                                            target="_blank"
                                                                        >
                                                                            <span
                                                                                class="icon"
                                                                            >
                                                                                <i
                                                                                    class="fas fa-download"
                                                                                />
                                                                            </span>
                                                                        </a>
                                                                    </h1>
                                                                {/if}
                                                                {#if h.Field === "outfunds__Status__c" && h.OldValue === "ACCETTATA" && h.NewValue === "FINANZIATA"}
                                                                    <h1
                                                                        class="subtitle is-3 has-text-weight-bold has-text-primary"
                                                                    >
                                                                        <button
                                                                            class="button is-primary"
                                                                            on:click={() =>
                                                                                flip(
                                                                                    "Servizi"
                                                                                )}
                                                                        >
                                                                            Servizi
                                                                        </button>
                                                                    </h1>
                                                                {/if}
                                                                {#if h.Field === "Stato_Progetto__c" && h.OldValue === "DA AVVIARE" && h.NewValue === "AVVIATO"}
                                                                    <h1
                                                                        class="subtitle is-3 has-text-weight-bold has-text-primary"
                                                                    >
                                                                        <!--
                                                            Fornitori:
                                                                {#each data.fornitori as f}
                                                                    <p class="is-size-6">{f}</p>
                                                                {/each}
                                                                -->
                                                                        <button
                                                                            class="button is-primary"
                                                                            on:click={() =>
                                                                                flip(
                                                                                    "Fornitori"
                                                                                )}
                                                                        >
                                                                            Fornitori
                                                                        </button>
                                                                    </h1>
                                                                {/if}
                                                                {#if h.Field === "outfunds__Status__c" && h.OldValue === "AMMESSA" && h.NewValue === "ACCETTATA"}
                                                                    <h1
                                                                        class="subtitle is-3 has-text-weight-bold has-text-primary"
                                                                    >
                                                                        CUP: {data
                                                                            .c
                                                                            .Codice_CUP__c}
                                                                    </h1>
                                                                {/if}
                                                                {#if h.Field === "Stato_Progetto__c" && h.OldValue === "IN LIQUIDAZIONE" && h.NewValue === "LIQUIDATO"}
                                                                    <h1
                                                                        class="subtitle is-3 has-text-weight-bold has-text-primary"
                                                                    >
                                                                        {Intl.NumberFormat(
                                                                            "it-IT",
                                                                            {
                                                                                style: "currency",
                                                                                currency:
                                                                                    "EUR",
                                                                            }
                                                                        ).format(
                                                                            data
                                                                                .c
                                                                                .outfunds__Awarded_Amount__c
                                                                        )}
                                                                    </h1>
                                                                {/if}
                                                            {/if}
                                                        </div>
                                                    </div>
                                                {/each}
                                            {:else}
                                                {#each Object.entries(data.chgrouped) as [key, value], index}
                                                    <div
                                                        class="timeline-item is-info {key.split(
                                                            ':'
                                                        )[1] === 'D'
                                                            ? 'right'
                                                            : 'left'}"
                                                    >
                                                        {#if key.split(":")[1] === "D"}
                                                            <div
                                                                class="timeline-marker is-info is-image is-48x48"
                                                            >
                                                                <img
                                                                    src="/logo-d.svg"
                                                                    alt="logo D"
                                                                />
                                                            </div>
                                                        {:else}
                                                            <div
                                                                class="timeline-marker is-icon"
                                                            >
                                                                <i
                                                                    class="fa fa-building"
                                                                />
                                                            </div>
                                                        {/if}
                                                        <div
                                                            class="timeline-content"
                                                        >
                                                            <p>
                                                                <span
                                                                    class="title is-4"
                                                                >
                                                                    {key.split(
                                                                        ":"
                                                                    )[0]}
                                                                </span>

                                                                <span
                                                                    class="title is-6 mx-5"
                                                                >
                                                                    ({index !=
                                                                    Object.entries(
                                                                        data.chgrouped
                                                                    ).length -
                                                                        1
                                                                        ? moment(
                                                                              key.split(
                                                                                  ":"
                                                                              )[0],
                                                                              "DD/MM/YYYY"
                                                                          )
                                                                              .startOf(
                                                                                  "day"
                                                                              )
                                                                              .fromNow()
                                                                        : moment(
                                                                              key.split(
                                                                                  ":"
                                                                              )[0],
                                                                              "DD/MM/YYYY"
                                                                          )
                                                                              .startOf(
                                                                                  "day"
                                                                              )
                                                                              .fromNow()})
                                                                   
                                                                </span>
                                                            </p>

                                                            {#each value as h}
                                                                <ul>
                                                                    <li>
                                                                        <p
                                                                            class="has-text-{h.type}"
                                                                        >
                                                                            {#if h.Actor === "D"}
                                                                                <span
                                                                                    class="icon"
                                                                                >
                                                                                    <i
                                                                                        class="fas fa-{h.icon}"
                                                                                    />
                                                                                </span>
                                                                            {/if}
                                                                            <span
                                                                                class="title is-6"
                                                                            >
                                                                            <span class="{h.title==='Il progetto ha superato la verifica'?'has-text-success':''}">
                                                                                {h.title}
                                                                            </span>
                                                                            {#if h.Actor === "E"}
                                                                                <span
                                                                                    class="icon"
                                                                                >
                                                                                    <i
                                                                                        class="fas fa-{h.icon}"
                                                                                    />
                                                                                </span>
                                                                            {/if}
                                                                        </p>
                                                                        <p
                                                                            class="subtitle is-7"
                                                                        >
                                                                            {h.subtitle}
                                                                            {#if h.Field === "FILE"}
                                                                                <span
                                                                                    class="subtitle has-text-weight-bold has-text-primary"
                                                                                >
                                                                                    <a
                                                                                        href="/api/file/{h.ContentDocumentId}"
                                                                                        target="_blank"
                                                                                    >
                                                                                        <span
                                                                                            class="icon is-7"
                                                                                        >
                                                                                            <i
                                                                                                class="fas fa-download"
                                                                                            />
                                                                                        </span>
                                                                                    </a>
                                                                                </span>
                                                                            {/if}
                                                                            {#if h.Field === "COMUNICAZIONE"}
                                                                                <Accordion
                                                                                >
                                                                                    <div
                                                                                        slot="details"
                                                                                    >
                                                                                        <p
                                                                                            class="has-text-grey is-7 is-italic is-text-weight-light"
                                                                                        >
                                                                                            {@html h.NewValue}
                                                                                        </p>
                                                                                    </div>
                                                                                </Accordion>
                                                                            {/if}
                                                                        </p>
                                                                    </li>
                                                                </ul>

                                                                {#if h.Field === "outfunds__Status__c" && h.OldValue === "ACCETTATA" && h.NewValue === "FINANZIATA"}
                                                                    <h1
                                                                        class="subtitle is-3 has-text-weight-bold has-text-primary"
                                                                    >
                                                                        <button
                                                                            class="button is-primary"
                                                                            on:click={() =>
                                                                                flip(
                                                                                    "Servizi"
                                                                                )}
                                                                        >
                                                                            Servizi
                                                                        </button>
                                                                    </h1>
                                                                {/if}
                                                                {#if h.Field === "Stato_Progetto__c" && h.OldValue === "DA AVVIARE" && h.NewValue === "AVVIATO"}
                                                                    <h1
                                                                        class="subtitle is-3 has-text-weight-bold has-text-primary"
                                                                    >
                                                                        <button
                                                                            class="button is-primary"
                                                                            on:click={() =>
                                                                                flip(
                                                                                    "Fornitori"
                                                                                )}
                                                                        >
                                                                            Fornitori
                                                                        </button>
                                                                    </h1>
                                                                {/if}
                                                                {#if h.Field === "outfunds__Status__c" && h.OldValue === "AMMESSA" && h.NewValue === "ACCETTATA"}
                                                                    <h1
                                                                        class="subtitle is-3 has-text-weight-bold has-text-primary"
                                                                    >
                                                                        CUP: {data
                                                                            .c
                                                                            .Codice_CUP__c}
                                                                    </h1>
                                                                {/if}
<!--
                                                                {#if h.Field === "Data_Contrattualizzazione__c" && !h.OldValue }
                                                                <h1
                                                                    class="subtitle is-3 has-text-weight-bold has-text-primary"
                                                                >
                                                                    CONTRATTUALIZZAZIONE: {moment(h.NewValue,'YYYY-MM-DD').format('DD/MM/YYYY')}
                                                                </h1>
                                                            {/if}
                                                            -->
                                                                {#if h.Field === "Stato_Progetto__c" && h.OldValue === "IN LIQUIDAZIONE" && h.NewValue === "LIQUIDATO"}
                                                                    <h1
                                                                        class="subtitle is-3 has-text-weight-bold has-text-primary"
                                                                    >
                                                                        {Intl.NumberFormat(
                                                                            "it-IT",
                                                                            {
                                                                                style: "currency",
                                                                                currency:
                                                                                    "EUR",
                                                                            }
                                                                        ).format(
                                                                            data
                                                                                .c
                                                                                .outfunds__Awarded_Amount__c
                                                                        )}
                                                                    </h1>
                                                                {/if}
                                                            {/each}
                                                        </div>
                                                    </div>
                                                {/each}
                                            {/if}

                                            <div class="timeline-header">
                                                <span
                                                    class="tag is-medium is-primary"
                                                    >Start</span
                                                >
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="back">
                                {#if backdetails === "Servizi"}
                                    <div
                                        class="card bm--card-equal-height has-background-grey-lighter is-12"
                                    >
                                        <header class="has-background-info">
                                            <nav class="level">
                                                <!-- Left side -->
                                                <div class="level-left">
                                                    <div class="level-item">
                                                        <p
                                                            class="card-header-title"
                                                        >
                                                            Servizi
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="level-right">
                                                    <div class="level-item">
                                                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                                        <p
                                                            class="card-header-title has-text-primary has-pointer"
                                                            on:click={flip}
                                                        >
                                                            <span
                                                                >Candidatura</span
                                                            >
                                                            <span class="icon">
                                                                <i
                                                                    class="fas fa-arrow-left"
                                                                />
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </nav>
                                        </header>
                                        <div class="card-content">
                                            <table
                                                class="table is-striped is-narrow is-hoverable is-fullwidth"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nome</th>
                                                        <th>Stato</th>
                                                        <th
                                                            >Data di
                                                            completamento</th
                                                        >
                                                        <th
                                                            >Data di attivazione
                                                            in esercizio</th
                                                        >
                                                        <th
                                                            >Esito controlli
                                                            automatici</th
                                                        >
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {#each data.sr as s, index}
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td>{s.Name}</td>
                                                            <td
                                                                >{s.Stato_Attivit__c}</td
                                                            >
                                                            <td
                                                                >{s.Data_di_completamento__c?moment(
                                                                    s.Data_di_completamento__c
                                                                ).format(
                                                                    "DD/MM/YYYY"
                                                                ):'n.d.'}</td
                                                            >
                                                            <td
                                                                >{s.Data_attivazione_servizio__c?moment(
                                                                    s.Data_attivazione_servizio__c
                                                                ).format(
                                                                    "DD/MM/YYYY"
                                                                ):'n.d.'}</td
                                                            >
                                                            <td
                                                                >{s.Esito_controlli__c?s.Esito_controlli__c:'n.d.'}</td
                                                            >
                                                        </tr>
                                                    {/each}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                {/if}
                                {#if backdetails === "Fornitori"}
                                    <div
                                        class="card bm--card-equal-height has-background-grey-lighter is-12"
                                    >
                                        <header class="has-background-info">
                                            <nav class="level">
                                                <!-- Left side -->
                                                <div class="level-left">
                                                    <div class="level-item">
                                                        <p
                                                            class="card-header-title"
                                                        >
                                                            Fornitori
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="level-right">
                                                    <div class="level-item">
                                                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                                        <p
                                                            class="card-header-title has-text-primary has-pointer"
                                                            on:click={flip}
                                                        >
                                                            <span
                                                                >Candidatura</span
                                                            >
                                                            <span class="icon">
                                                                <i
                                                                    class="fas fa-arrow-left"
                                                                />
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </nav>
                                        </header>
                                        <div class="card-content">
                                            <table
                                                class="table is-striped is-narrow is-hoverable is-fullwidth"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Servizio</th>
                                                        <th>Fornitore</th>
                                                        <th
                                                            >Data di
                                                            contrattualizzazione</th
                                                        >
                                                        <th>Contratto</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {#each data.soggettiRealizzatori as s, index}
                                                        {#if data.sr.filter((x) => s.Servizio__c === x.Id && s.Denominazione_Soggetto_Realizzatore__c)[0]}
                                                            <tr>
                                                                <td
                                                                    >{index +
                                                                        1}</td
                                                                >
                                                                <td
                                                                    >{data.sr.filter(
                                                                        (x) =>
                                                                            s.Servizio__c ===
                                                                            x.Id
                                                                    )[0]
                                                                        .Name}</td
                                                                >
                                                                <td
                                                                    >{s.Denominazione_Soggetto_Realizzatore__c?s.Denominazione_Soggetto_Realizzatore__c:'n.d.'}</td
                                                                >
                                                                <td
                                                                    >{moment(
                                                                        s.Data_Contrattualizzazione__c
                                                                    ).format(
                                                                        "DD/MM/YYYY"
                                                                    )}</td
                                                                >
                                                                <td>
                                                                    {#if s.contratti && s.contratti.length > 0}
                                                                        {#each s.contratti as fc, i}
                                                                            
                                                                            <a
                                                                                href="/api/file/{fc.ContentDocumentId}"
                                                                                target="_blank"
                                                                            >
                                                                                <span
                                                                                    class="icon"
                                                                                >
                                                                                    <i
                                                                                        class="fas fa-download"
                                                                                    />
                                                                                </span>
                                                                            </a>
                                                                        {/each}
                                                                    {/if}
                                                                </td>
                                                            </tr>
                                                        {/if}
                                                    {/each}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                {/if}
                                {#if backdetails === "Files"}
                                    <div
                                        class="card bm--card-equal-height has-background-grey-lighter is-12"
                                    >
                                        <header class="has-background-info">
                                            <nav class="level">
                                                <!-- Left side -->
                                                <div class="level-left">
                                                    <div class="level-item">
                                                        <p
                                                            class="card-header-title"
                                                        >
                                                            Files
                                                        </p>
                                                    </div>
                                                </div>
                                                <div class="level-right">
                                                    <div class="level-item">
                                                        <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
                                                        <p
                                                            class="card-header-title has-text-primary has-pointer"
                                                            on:click={flip}
                                                        >
                                                            <span
                                                                >Candidatura</span
                                                            >
                                                            <span class="icon">
                                                                <i
                                                                    class="fas fa-arrow-left"
                                                                />
                                                            </span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </nav>
                                        </header>
                                        <div class="card-content">
                                            <table
                                                class="table is-striped is-narrow is-hoverable is-fullwidth"
                                            >
                                                <thead>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Nome</th>
                                                        <th>Data</th>
                                                        <th>Tipo</th>
                                                        <th>Dimensione</th>
                                                        <th>File</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {#each data.filesCandidatura as file, index}
                                                        <tr>
                                                            <td>{index + 1}</td>
                                                            <td
                                                                >{file
                                                                    .ContentDocument
                                                                    .Title}</td
                                                            >
                                                            <td
                                                                >{moment(
                                                                    file
                                                                        .ContentDocument
                                                                        .LastModifiedDate
                                                                ).format(
                                                                    "DD/MM/YYYY - HH:mm:ss"
                                                                )}</td
                                                            >
                                                            <td
                                                                >{file
                                                                    .ContentDocument
                                                                    .FileExtension}</td
                                                            >
                                                            <td
                                                                >{file
                                                                    .ContentDocument
                                                                    .ContentSize}</td
                                                            >
                                                            <td>
                                                                <a
                                                                    href="/api/file/{file.ContentDocumentId}"
                                                                    target="_blank"
                                                                >
                                                                    <span
                                                                        class="icon"
                                                                    >
                                                                        <i
                                                                            class="fas fa-download"
                                                                        />
                                                                    </span>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    {/each}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                {/if}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    .container {
        width: 100%;
    }

    .card-container {
        width: 100%; /* Adjust the target width*/
    }

    .flip-container {
        position: relative;
        perspective: 1000px;
    }

    .flipped {
        transform: rotateY(180deg);
    }

    .flip-container,
    .front,
    .back {
        width: 100%;
        height: 180px;
    }

    /* flip speed goes here */
    .flipper {
        /*
        transition: 1s;
        */
        transform-style: preserve-3d;
        
        position: relative;
    }

    /* hide back of pane during swap */
    .front,
    .back {
        backface-visibility: hidden;
        width: 100%;
        position: absolute;
        top: 0;
        left: 0;
    }

    /* front pane, placed above back */
    .front {
        background: rgba(0, 0, 0, 0.05);
        z-index: 2;
        /* for firefox 31 */
        transform: rotateY(0deg);
    }

    /* back, initially hidden pane */
    .back {
        transform: rotateY(180deg);
    }

    .has-pointer:hover {
        cursor: pointer;
    }

    .timeline .timeline-item .timeline-marker.is-icon {
        height: 3rem;
        width: 3rem;
    }

    .timeline .timeline-item .timeline-marker.is-icon > * {
        font-size: 2rem !important;
    }



    

    .timeline-item.left .timeline-marker {
    transform: translateX(50%);
}

.timeline.is-centered .timeline-item.left {
    align-self: flex-start;
    flex-direction: row-reverse;
    margin-left: 0;
    margin-right: 2em;
}

    .timeline .timeline-item.left .timeline .timeline-item.left{
    padding: 1em 2em 0 0;
    text-align: right;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    flex-basis: 100%;
    }

    .timeline .timeline-item.right::before {
    content: "";
    background-color: #dbdbdb;
    display: block;
    width: 1px;
    height: 100%;
    position: absolute;
    right: -0.5px;
    top: 0;
}


</style>
