<script>
    export let referente;
    import moment from "moment/min/moment-with-locales";
    moment.locale("it");
</script>

<div class="card bm--card-equal-height has-background-grey-lighter">
    <header
        class="card-header {referente.Stato__c &&
        referente.Stato__c === 'Attivo'
            ? 'has-background-info'
            : 'has-background-danger'}"
    >
        <nav class="level">
            <!-- Left side -->
            <div class="level-left">
                <div class="level-item">
                    <p class="card-header-title is-uppercase"><a class="mx-4"
                        href="/api/vcard/{referente.Id}"
                        target="_blank"
                    >
                        <span
                            class="icon is-7  is-white"
                        >
                            <i
                                class="fas fa-user-plus  has-text-white"
                            />
                        </span>
                    </a>
                        {referente.Name} ({referente.Stato__c})
                    </p>
                </div>
            </div>
        </nav>
    </header>
    <div class="card-content">
        <p>
            <span class="has-text-weight-bold mx-2">Ente:</span><span
                >{referente.Account.Name}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Portafoglio:</span
            >{#if referente.portafoglio === "Asseveratore"}
                <span class="icon is-small is-left">
                    <i class="fas fa-user-shield" />
                </span>
            {:else}
                <span class="icon is-small is-left">
                    <i class="fas fa-user-tie" />
                </span>
            {/if}

            <span class="mx-2">{referente.portafoglio}</span>
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Nome:</span><span
                >{referente.FirstName}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Cognome:</span><span
                >{referente.LastName}</span
            >
        </p>

        <p class="my-3">
            <span class="has-text-weight-bold mx-2">Profilo:</span><span
                class={referente.Profilo__c ? "" : ""}
                >{referente.Profilo__c
                    ? referente.Profilo__c
                    : "Responsabile"}</span
            >
        </p>

        <p>
            <span class="has-text-weight-bold mx-2">Telefono:</span><span
                class={referente.MobilePhone ? "" : "has-text-grey"}
                >{referente.MobilePhone
                    ? referente.MobilePhone
                    : "Non disponibile"}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Email:</span><span
                class={referente.Email ? "" : "has-text-grey"}
                >{referente.Email ? referente.Email : "Non disponibile"}</span
            >
        </p>
        <p>
            <span class="has-text-weight-bold mx-2">Ultima attività:</span><span
                class={referente.LastActivityDate ? "" : "has-text-grey"}
                >{referente.LastActivityDate
                    ? moment(referente.LastActivityDate).format("DD/MM/YYYY")
                    : "Non disponibile"}</span
            >
            <span class="has-text-weight-bold has-text-info"
                >({referente.LastActivityDate
                    ? moment(referente.LastActivityDate)
                          .startOf("day")
                          .fromNow()
                    : ""})</span
            >
        </p>
    </div>
    <footer class="card-footer">
        {#if referente.MobilePhone}
            <p class="card-footer-item is-size-6">
                <span>
                    <a
                        target="_blank"
                        href="https://wa.me/{referente.MobilePhone}"
                        ><span class="icon">
                            <i class="fas fa-comment-dots has-text-success"></i>
                        </span><span>Whatsapp</span></a
                    >
                </span>
            </p>
            <p class="card-footer-item is-size-6">
                <span>
                    <a target="_blank" href="tel:{referente.MobilePhone}"
                        ><span class="icon">
                            <i class="fas fa-phone-volume"></i>
                        </span><span>Chiama</span></a
                    >
                </span>
            </p>
        {/if}
        {#if referente.Email}
            <p class="card-footer-item is-size-6">
                <span>
                    <a target="_blank" href="mailto:{referente.Email}"
                        ><span class="icon">
                            <i class="fas fa-envelope"></i>
                        </span><span>Scrivi</span></a
                    >
                </span>
            </p>
        {/if}
    </footer>
</div>

<style>
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }
    .bm--card-equal-height .card-footer {
        margin-top: auto;
    }
</style>
