<script>
    // @ts-nocheck

    import { euro, formatDate, percentuale } from "$lib";
    import AreaChart from "./c/charts/AreaChart.svelte";
    import Gauge from "./c/charts/Gauge.svelte";
    import KeyValue from "./c/ui/KeyValue.svelte";
    import Barchart from "./c/charts/Barchart.svelte";
    import Header from "$lib/c/ui/header.svelte";

    export let data;

    let showfinanziate = false;
    const toggleShowFinanziate = () => {
        showfinanziate = !showfinanziate;
    };

    let showAvvisi = false;
    const toggleShowAvvisi = () => {
        showAvvisi = !showAvvisi;
    };

    let showrinunciate = false;
    const toggleShowRinunciate = () => {
        showrinunciate = !showrinunciate;
    };

    let dettaglioFinanziate = false;
    const toggleDettaglioFinanziate = () => {
        dettaglioFinanziate = !dettaglioFinanziate;
    };

    let dettaglioRinunciate = false;
    const toggleDettaglioRinunciate = () => {
        dettaglioRinunciate = !dettaglioRinunciate;
    };

    let error_1 = false;
    const toggle_error_1 = () => {
        error_1 = !error_1;
    };

    let selectedMisura = "";

    $: filteredMisure = data.misure.filter((m) =>
        selectedMisura === "" ? true : m.Id === selectedMisura,
    );

    $: filteredAvvisi = data.avvisi.filter((a) =>
        selectedMisura === ""
            ? true
            : (a.Misura_Padre_1__c && a.Misura_Padre_1__c === selectedMisura) ||
              (a.Misura_Padre_2__c && a.Misura_Padre_2__c === selectedMisura) ||
              a.outfunds__Parent_Funding_Program__r.Id === selectedMisura,
    );

    $: valore = filteredMisure.reduce(
        (acc, c) => acc + c.outfunds__Total_Program_Amount__c,
        0,
    );

    $: filteredFinanziate = data.finanziate.filter((f) => {
        if (selectedMisura === "") {
            return true;
        } else {
            if (
                (f.misura1 && f.misura1 === selectedMisura) ||
                (f.misura2 && f.misura2 === selectedMisura) ||
                f.misura === selectedMisura
            ) {
                return true;
            } else {
                return false;
            }
        }
    });

    $: filteredDaContrattualizzare = data.dacontrattualizzare.filter((f) => {
        if (selectedMisura === "") {
            return true;
        } else {
            if (
                (f.misura1 && f.misura1 === selectedMisura) ||
                (f.misura2 && f.misura2 === selectedMisura) ||
                f.misura === selectedMisura
            ) {
                return true;
            } else {
                return false;
            }
        }
    });

    $: filteredInRealizzazione = data.inrealizzazione.filter((f) => {
        if (selectedMisura === "") {
            return true;
        } else {
            if (
                (f.misura1 && f.misura1 === selectedMisura) ||
                (f.misura2 && f.misura2 === selectedMisura) ||
                f.misura === selectedMisura
            ) {
                return true;
            } else {
                return false;
            }
        }
    });

    $: filteredInRevisione = data.inrevisione.filter((f) => {
        if (selectedMisura === "") {
            return true;
        } else {
            if (
                (f.misura1 && f.misura1 === selectedMisura) ||
                (f.misura2 && f.misura2 === selectedMisura) ||
                f.misura === selectedMisura
            ) {
                return true;
            } else {
                return false;
            }
        }
    });

    $: filteredInVerificaTecnica = data.inverificatecnica.filter((f) => {
        if (selectedMisura === "") {
            return true;
        } else {
            if (
                (f.misura1 && f.misura1 === selectedMisura) ||
                (f.misura2 && f.misura2 === selectedMisura) ||
                f.misura === selectedMisura
            ) {
                return true;
            } else {
                return false;
            }
        }
    });

    $: filteredInVerificaFormale = data.inverificaformale.filter((f) => {
        if (selectedMisura === "") {
            return true;
        } else {
            if (
                (f.misura1 && f.misura1 === selectedMisura) ||
                (f.misura2 && f.misura2 === selectedMisura) ||
                f.misura === selectedMisura
            ) {
                return true;
            } else {
                return false;
            }
        }
    });

    $: filteredInLiquidazione = data.inliquidazione.filter((f) => {
        if (selectedMisura === "") {
            return true;
        } else {
            if (
                (f.misura1 && f.misura1 === selectedMisura) ||
                (f.misura2 && f.misura2 === selectedMisura) ||
                f.misura === selectedMisura
            ) {
                return true;
            } else {
                return false;
            }
        }
    });

    $: filteredLiquidate = data.liquidate.filter((f) => {
        if (selectedMisura === "") {
            return true;
        } else {
            if (
                (f.misura1 && f.misura1 === selectedMisura) ||
                (f.misura2 && f.misura2 === selectedMisura) ||
                f.misura === selectedMisura
            ) {
                return true;
            } else {
                return false;
            }
        }
    });

    $: filteredRinunciate = data.rinunciate.filter((f) => {
        if (selectedMisura === "") {
            return true;
        } else {
            if (
                (f.misura1 && f.misura1 === selectedMisura) ||
                (f.misura2 && f.misura2 === selectedMisura) ||
                f.misura === selectedMisura
            ) {
                return true;
            } else {
                return false;
            }
        }
    });

    $: filteredRinunciatePreContratto = data.rinunciatePreContratto.filter(
        (f) => {
            if (selectedMisura === "") {
                return true;
            } else {
                if (
                    (f.misura1 && f.misura1 === selectedMisura) ||
                    (f.misura2 && f.misura2 === selectedMisura) ||
                    f.misura === selectedMisura
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        },
    );

    $: filteredRinunciatePreCompletamento =
        data.rinunciatePreCompletamento.filter((f) => {
            if (selectedMisura === "") {
                return true;
            } else {
                if (
                    (f.misura1 && f.misura1 === selectedMisura) ||
                    (f.misura2 && f.misura2 === selectedMisura) ||
                    f.misura === selectedMisura
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        });

    $: filteredRinunciatePostCompletamento =
        data.rinunciatePostCompletamento.filter((f) => {
            if (selectedMisura === "") {
                return true;
            } else {
                if (
                    (f.misura1 && f.misura1 === selectedMisura) ||
                    (f.misura2 && f.misura2 === selectedMisura) ||
                    f.misura === selectedMisura
                ) {
                    return true;
                } else {
                    return false;
                }
            }
        });

    $: filteredRevocate = data.revocate.filter((f) => {
        if (selectedMisura === "") {
            return true;
        } else {
            if (
                (f.misura1 && f.misura1 === selectedMisura) ||
                (f.misura2 && f.misura2 === selectedMisura) ||
                f.misura === selectedMisura
            ) {
                return true;
            } else {
                return false;
            }
        }
    });

    $: startDate = new Date(
        Math.min(
            ...filteredMisure.map((m) => new Date(m.outfunds__Start_Date__c)),
        ),
    );

    let endDate = new Date();
    $: dates = calcolaRange(startDate, endDate);

    function toggleSelecetedMisura(id) {
        if (selectedMisura === id) {
            selectedMisura = "";
        } else {
            selectedMisura = id;
        }
    }

    function calcolaRange(s, e) {
        const d = [];
        let current = new Date(s.getFullYear(), s.getMonth(), 1);
        current.setHours(0);
        current.setMinutes(0);
        current.setSeconds(0);
        current.setMilliseconds(0);
        while (current < e) {
            let lastDayOfMonth = new Date(
                current.getFullYear(),
                current.getMonth() + 1,
                0,
            );
            lastDayOfMonth.setHours(23);
            lastDayOfMonth.setMinutes(59);
            lastDayOfMonth.setSeconds(59);
            lastDayOfMonth.setMilliseconds(999);
            d.push(lastDayOfMonth);
            current.setDate(lastDayOfMonth.getDate() + 1);
            current.setHours(0);
            current.setMinutes(0);
            current.setSeconds(0);
            current.setMilliseconds(0);
        }
        return d;
    }

    $: calcolaTotaleFinanziate = () => {
        return filteredFinanziate.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );
    };
    $: totaleFinanziate = calcolaTotaleFinanziate();

    $: calcolaTotaleRinunciate = () => {
        return filteredRinunciate.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );
    };
    $: totaleRinunciate = calcolaTotaleRinunciate();

    $: calcolaTotaleRevocate = () => {
        return filteredRevocate.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );
    };
    $: totaleRevocate = calcolaTotaleRevocate();

    $: calcoladatiResiduo = () => {
        const res = [["Mese", "Residuo"]];
        let residuo = valore;
        dates.forEach((d) => {
            const valoreFinanziateMese = filteredFinanziate
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreRinunciatoMese = filteredRinunciate
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreRevocateMese = filteredRevocate
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            residuo =
                residuo -
                valoreFinanziateMese +
                valoreRinunciatoMese +
                valoreRevocateMese;
            res.push([d, residuo]);
        });
        return res;
    };

    $: datiResiduo = calcoladatiResiduo();

    $: calcoladatiFinanziate = () => {
        const res = [["Mese", "Finanziate"]];
        let finanziate = 0;
        dates.forEach((d) => {
            const valoreFinanziateMese = filteredFinanziate
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreRinunciatoMese = filteredRinunciate
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreRevocateMese = filteredRevocate
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            finanziate =
                finanziate +
                valoreFinanziateMese -
                valoreRinunciatoMese -
                valoreRevocateMese;
            res.push([d, finanziate]);
        });
        return res;
    };

    $: datiFinanziate = calcoladatiFinanziate();

    $: calcoladatiRinunciateRevocate = () => {
        const res = [["Mese", "Rinunciate o revocate"]];
        let rinunciaterevocate = 0;
        dates.forEach((d) => {
            const valoreRinunciatoMese = filteredRinunciate
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreRevocateMese = filteredRevocate
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            rinunciaterevocate =
                rinunciaterevocate + valoreRinunciatoMese + valoreRevocateMese;
            res.push([d, rinunciaterevocate]);
        });
        return res;
    };

    $: datiRinunciateRevocate = calcoladatiRinunciateRevocate();

    $: calcoladatiDettaglioFinanziate = () => {
        const res = [
            [
                "Mese",
                "Da contrattualizzare",
                "In realizzazione",
                "In revisione",
                "In verifica tecnica",
                "In verifica formale",
                "In liquidazione",
                "Liquidate",
            ],
        ];
        let dacontrattualizzare = 0,
            inrealizzazione = 0,
            inrevisione = 0,
            inverificatecnica = 0,
            inverificaformale = 0,
            inliquidazione = 0,
            liquidate = 0;
        dates.forEach((d) => {
            const valoredacontrattualizzare = filteredDaContrattualizzare
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreinrealizzazione = filteredInRealizzazione
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreinrevisione = filteredInRevisione
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreinverificatecnica = filteredInVerificaTecnica
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreinverificaformale = filteredInVerificaFormale
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreinliquidazione = filteredInLiquidazione
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valoreliquidate = filteredLiquidate
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            dacontrattualizzare =
                dacontrattualizzare + valoredacontrattualizzare;
            inrealizzazione = inrealizzazione + valoreinrealizzazione;
            inrevisione = inrevisione + valoreinrevisione;
            inverificatecnica = inverificatecnica + valoreinverificatecnica;
            inverificaformale = inverificaformale + valoreinverificaformale;
            inliquidazione = inliquidazione + valoreinliquidazione;
            liquidate = liquidate + valoreliquidate;
            res.push([
                d,
                dacontrattualizzare,
                inrealizzazione,
                inrevisione,
                inverificatecnica,
                inverificaformale,
                inliquidazione,
                liquidate,
            ]);
        });
        return res;
    };

    $: datiDettaglioFinanziate = calcoladatiDettaglioFinanziate();

    $: calcoladatiDettaglioRinunciate = () => {
        const res = [
            [
                "Mese",
                "Rinunciate prima della contrattualizzazione",
                "Rinunciate prima del completamento",
                "Rinunciate dopo il completamento",
                "Revocate",
            ],
        ];
        let rinunciateprecontr = 0,
            rinunciateprecompl = 0,
            rinunciatepostcompl = 0,
            revocate = 0;
        dates.forEach((d) => {
            const valorerinunciateprecontratto = filteredRinunciatePreContratto
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );
            const valorerinunciateprecompletamento =
                filteredRinunciatePreCompletamento
                    .filter(
                        (f) =>
                            d.getFullYear() === f.anno &&
                            d.getMonth() + 1 === f.mese,
                    )
                    .reduce(
                        (acc, c) =>
                            acc +
                            (selectedMisura === ""
                                ? c.valore
                                : selectedMisura === c.misura1
                                  ? c.valorem1
                                  : selectedMisura === c.misura2
                                    ? c.valorem2
                                    : selectedMisura === c.misura
                                      ? c.valore
                                      : 0),
                        0,
                    );
            const valorerinunciatepostcompletamento =
                filteredRinunciatePostCompletamento
                    .filter(
                        (f) =>
                            d.getFullYear() === f.anno &&
                            d.getMonth() + 1 === f.mese,
                    )
                    .reduce(
                        (acc, c) =>
                            acc +
                            (selectedMisura === ""
                                ? c.valore
                                : selectedMisura === c.misura1
                                  ? c.valorem1
                                  : selectedMisura === c.misura2
                                    ? c.valorem2
                                    : selectedMisura === c.misura
                                      ? c.valore
                                      : 0),
                        0,
                    );
            const valorerevocate = filteredRevocate
                .filter(
                    (f) =>
                        d.getFullYear() === f.anno &&
                        d.getMonth() + 1 === f.mese,
                )
                .reduce(
                    (acc, c) =>
                        acc +
                        (selectedMisura === ""
                            ? c.valore
                            : selectedMisura === c.misura1
                              ? c.valorem1
                              : selectedMisura === c.misura2
                                ? c.valorem2
                                : selectedMisura === c.misura
                                  ? c.valore
                                  : 0),
                    0,
                );

            rinunciateprecontr =
                rinunciateprecontr + valorerinunciateprecontratto;
            rinunciateprecompl =
                rinunciateprecompl + valorerinunciateprecompletamento;
            rinunciatepostcompl =
                rinunciatepostcompl + valorerinunciatepostcompletamento;
            revocate = revocate + valorerevocate;

            res.push([
                d,
                rinunciateprecontr,
                rinunciateprecompl,
                rinunciatepostcompl,
                revocate,
            ]);
        });
        return res;
    };

    $: datiDettaglioRinunciate = calcoladatiDettaglioRinunciate();

    $: calcoladatiTotaleDettaglioFinanziate = () => {
        const res = [
            ["Stato", "Valore", { role: "style" }, { role: "annotation" }],
        ];

        const valoredacontrattualizzare = filteredDaContrattualizzare.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );
        const valoreinrealizzazione = filteredInRealizzazione.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );
        const valoreinrevisione = filteredInRevisione.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );
        const valoreinverificatecnica = filteredInVerificaTecnica.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );
        const valoreinverificaformale = filteredInVerificaFormale.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );
        const valoreinliquidazione = filteredInLiquidazione.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );
        const valoreliquidate = filteredLiquidate.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );

        const tot =
            valoredacontrattualizzare +
            valoreinrealizzazione +
            valoreinrevisione +
            valoreinverificatecnica +
            valoreinverificaformale +
            valoreinliquidazione +
            valoreliquidate;
        const colors = [
            "#3e8ed0",
            "#296fa8",
            "#296fa8",
            "#f14668",
            "#cc0f35",
            "#48c78e",
            "#257953",
        ];
        res.push([
            "Da contrattualizzare",
            valoredacontrattualizzare,
            "color: " + colors[0],
            percentuale(valoredacontrattualizzare / tot),
        ]);
        res.push([
            "In realizzazione",
            valoreinrealizzazione,
            "color: " + colors[0],
            percentuale(valoreinrealizzazione / tot),
        ]);
        res.push([
            "In revisione",
            valoreinrevisione,
            "color: " + colors[0],
            percentuale(valoreinrevisione / tot),
        ]);
        res.push([
            "In verifica tecnica",
            valoreinverificatecnica,
            "color: " + colors[0],
            percentuale(valoreinverificatecnica / tot),
        ]);
        res.push([
            "In verifica formale",
            valoreinverificaformale,
            "color: " + colors[0],
            percentuale(valoreinverificaformale / tot),
        ]);
        res.push([
            "In liquidazione",
            valoreinliquidazione,
            "color: " + colors[0],
            percentuale(valoreinliquidazione / tot),
        ]);
        res.push([
            "Liquidate",
            valoreliquidate,
            "color: " + colors[0],
            percentuale(valoreliquidate / tot),
        ]);
        return res;
    };

    $: datiTotaleDettaglioFinanziate = calcoladatiTotaleDettaglioFinanziate();

    $: calcoladatiTotaleDettaglioRinunciateRevocate = () => {
        const res = [
            ["Stato", "Valore", { role: "style" }, { role: "annotation" }],
        ];

        const valorerinunciateprecontratto =
            filteredRinunciatePreContratto.reduce(
                (acc, c) =>
                    acc +
                    (selectedMisura === ""
                        ? c.valore
                        : selectedMisura === c.misura1
                          ? c.valorem1
                          : selectedMisura === c.misura2
                            ? c.valorem2
                            : selectedMisura === c.misura
                              ? c.valore
                              : 0),
                0,
            );
        const valorerinunciateprecompletamento =
            filteredRinunciatePreCompletamento.reduce(
                (acc, c) =>
                    acc +
                    (selectedMisura === ""
                        ? c.valore
                        : selectedMisura === c.misura1
                          ? c.valorem1
                          : selectedMisura === c.misura2
                            ? c.valorem2
                            : selectedMisura === c.misura
                              ? c.valore
                              : 0),
                0,
            );
        const valorerinunciatepostcompletamento =
            filteredRinunciatePostCompletamento.reduce(
                (acc, c) =>
                    acc +
                    (selectedMisura === ""
                        ? c.valore
                        : selectedMisura === c.misura1
                          ? c.valorem1
                          : selectedMisura === c.misura2
                            ? c.valorem2
                            : selectedMisura === c.misura
                              ? c.valore
                              : 0),
                0,
            );
        const valorerevocate = filteredRevocate.reduce(
            (acc, c) =>
                acc +
                (selectedMisura === ""
                    ? c.valore
                    : selectedMisura === c.misura1
                      ? c.valorem1
                      : selectedMisura === c.misura2
                        ? c.valorem2
                        : selectedMisura === c.misura
                          ? c.valore
                          : 0),
            0,
        );

        const tot =
            valorerinunciateprecontratto +
            valorerinunciateprecompletamento +
            valorerinunciatepostcompletamento +
            valorerevocate;
        const colors = ["#f14668", "#cc0f35", "#f14668", "#cc0f35"];
        res.push([
            "Rinunciate prima della contrattualizzazione",
            valorerinunciateprecontratto,
            "color: " + colors[0],
            percentuale(valorerinunciateprecontratto / tot),
        ]);
        res.push([
            "Rinunciate prima del completamento",
            valorerinunciateprecompletamento,
            "color: " + colors[1],
            percentuale(valorerinunciateprecompletamento / tot),
        ]);
        res.push([
            "Rinunciate dopo il completamento",
            valorerinunciatepostcompletamento,
            "color: " + colors[2],
            percentuale(valorerinunciatepostcompletamento / tot),
        ]);
        res.push([
            "Revocate",
            valorerevocate,
            "color: " + colors[3],
            percentuale(valorerevocate / tot),
        ]);

        //res.push(["Finanziate",valoredacontrattualizzare,valoreinrealizzazione,valoreinverificatecnica,valoreinverificaformale,valoreinliquidazione,valoreliquidate])

        return res;
    };

    $: datiTotaleDettaglioRinunciateRevocate =
        calcoladatiTotaleDettaglioRinunciateRevocate();
</script>

<Header
    title="Overview risorse"
    quote="Non importa quante volte cadi, ma quante volte cadi e ti rialzi." author="Vince Lombardi"
/>

<section class="section py-4">
    <div class="columns is-multiline">
        {#each data.misure as m}
            {#if selectedMisura === "" || selectedMisura === m.Id}
                <div
                    class="column {m.Id === selectedMisura
                        ? 'is-full'
                        : 'is-one-quarter'}"
                >
                    <!-- svelte-ignore a11y-click-events-have-key-events -->
                    <!-- svelte-ignore a11y-no-static-element-interactions -->
                    <div
                        class="card bm--card-equal-height has-background-grey-lighter isclickable"
                        on:click={() => toggleSelecetedMisura(m.Id)}
                    >
                        <header
                            class="card-header has-background-{m.Id ===
                            selectedMisura
                                ? 'primary'
                                : 'info'}"
                        >
                            <p class="card-header-title">
                                {m.Name}
                            </p>
                        </header>
                        <div class="card-content">
                            <KeyValue
                                key="Valore"
                                value={euro(
                                    m.outfunds__Total_Program_Amount__c,
                                )}
                            />
                            <KeyValue
                                key="Avvio"
                                value={formatDate(
                                    new Date(m.outfunds__Start_Date__c),
                                )}
                            />
                            <KeyValue
                                key="Termine"
                                value={formatDate(
                                    new Date(m.outfunds__End_Date__c),
                                )}
                            />
                            <KeyValue
                                key="Stato"
                                value={m.outfunds__Status__c}
                            />
                        </div>
                    </div>
                </div>
            {/if}
        {/each}
    </div>
</section>

<section class="section">
    <div class="columns is-multiline is-full">
        <div class="column is-one-third">
            <div class="card bm--card-equal-height has-background-primary">
                <div class="card-content">
                    <p class="title">{euro(valore)}</p>
                    <p class="subtitle">dotazione finanziaria</p>
                </div>
            </div>
        </div>
        <div class="column is-one-third">
            <div class="card bm--card-equal-height has-background-info">
                <div class="card-content">
                    <p class="title">
                        {euro(totaleFinanziate)}
                    </p>
                    <p class="subtitle">finanziati</p>
                </div>
            </div>
        </div>
        <div class="column is-one-third">
            <div class="card bm--card-equal-height has-background-danger">
                <div class="card-content">
                    <p class="title">
                        {euro(totaleRinunciate + totaleRevocate)}
                    </p>
                    <p class="subtitle">rinunciati o revocati</p>
                </div>
            </div>
        </div>
    </div>
</section>

<article class="message is-info">
    <div class="message-header">
        <p>Risorse</p>
    </div>
    <div class="message-body">
        <section class="section">
            <div class="columns is-multiline is-centered">
                <div class="column is-full">
                    <div class="box">
                        <Gauge
                            id="consumogauge"
                            label="30"
                            values={[
                                ["Label", "Value"],
                                [
                                    "%",
                                    ((valore -
                                        datiResiduo[
                                            datiResiduo.length - 1
                                        ][1]) /
                                        valore) *
                                        100,
                                ],
                            ]}
                        ></Gauge>
                    </div>
                </div>
            </div>
            <div class="columns is-multiline">
                <div class="column is-full">
                    <div class="box">
                        <AreaChart
                            id="consumo"
                            title="Consumo delle risorse"
                            colors={["#3e8ed0"]}
                            values={datiResiduo}
                        ></AreaChart>
                    </div>
                </div>
            </div>
        </section>
    </div>
</article>

<article class="message is-success">
    <div class="message-header">
        <p>Finanziate</p>
        <button
            class="button is-success"
            aria-label="info"
            on:click={toggleShowFinanziate}
            >{showfinanziate ? "Nascondi" : "Mostra"}</button
        >
    </div>
    {#if showfinanziate}
        <div class="message-body px-0">
            <section class="section has-background-white-ter">
                <div class="columns is-multiline">
                    <div class="column is-full">
                        <div class="box">
                            <AreaChart
                            stacked={true}
                                id="finanziate"
                                title="Finanziate"
                                colors={["#48c78e"]}
                                values={datiFinanziate}
                            ></AreaChart>
                        </div>
                    </div>
                </div>
                <article class="message">
                    <div class="message-header">
                        <p>Dettaglio finanziate</p>
                        <button
                            class="button is-success"
                            aria-label="info"
                            on:click={toggleDettaglioFinanziate}
                            >{dettaglioFinanziate
                                ? "Nascondi"
                                : "Mostra"}</button
                        >
                    </div>

                    {#if dettaglioFinanziate}<div class="box">
                            <div class="columns is-full">
                                <div class="column is-full">
                                    <AreaChart
                                        id="dettaglio-finanziate"
                                        title="Dettaglio finanziate"
                                        stacked={true}
                                        colors={[
                                            "#3e8ed0",
                                            "#296fa8",
                                            "#296fa8",
                                            "#cc0f35",
                                            "#48c78e",
                                            "#257953",
                                        ]}
                                        values={datiDettaglioFinanziate}
                                    ></AreaChart>
                                </div>
                            </div>
                            <div class="columns is-full">
                                <div class="column is-full">
                                    <Barchart
                                        id="dettaglio-totale-finanziate"
                                        title="Ripartizione finanziate"
                                        titleColor="#3e8ed0"
                                        values={datiTotaleDettaglioFinanziate}
                                        direction="horizontal"
                                        colors={[
                                            "#3e8ed0",
                                            "#296fa8",
                                            "#296fa8",
                                            "#f14668",
                                            "#cc0f35",
                                            "#48c78e",
                                            "#257953",
                                        ]}
                                    ></Barchart>
                                </div>
                            </div>
                        </div>
                    {/if}
                </article>
            </section>
        </div>
    {/if}
</article>

<article class="message is-danger">
    <div class="message-header">
        <p>Rinunciate o revocate</p>
        <button
            class="button is-danger"
            aria-label="info"
            on:click={toggleShowRinunciate}
            >{showrinunciate ? "Nascondi" : "Mostra"}</button
        >
    </div>
    {#if showrinunciate}
        <div class="message-body">
            <section class="section">
                <div class="columns is-multiline">
                    <div class="column is-full">
                        <div class="box">
                            <AreaChart
                                id="rinunciaterevocate"
                                title="Rinunciate o revocate"
                                colors={["#f14668"]}
                                values={datiRinunciateRevocate}
                            ></AreaChart>
                        </div>
                    </div>
                </div>
                {#if error_1}
                    <div class="columns is-multiline">
                        <div class="column is-full">
                            <article class="message is-danger is-small">
                                <div class="message-body">
                                    <button
                                        class="delete mx-4"
                                        on:click={toggle_error_1}
                                    ></button>
                                    Ci sono 144 candidature rinunciate che non hanno
                                    valorizzata la data di rinuncia.
                                    <strong
                                        >Chiedere a Mariachiara se si possono
                                        chiedere chiarimenti al fornitore</strong
                                    >
                                </div>
                            </article>
                        </div>
                    </div>
                {/if}

                <article class="message is-danger">
                    <div class="message-header">
                        <p>Dettaglio rinunciate o revocate</p>
                        <button
                            class="button is-danger"
                            aria-label="info"
                            on:click={toggleDettaglioRinunciate}
                            >{dettaglioRinunciate
                                ? "Nascondi"
                                : "Mostra"}</button
                        >
                    </div>

                    {#if dettaglioRinunciate}<div class="box">
                            <div class="columns is-full">
                                <div class="column is-full">
                                    <AreaChart
                                        id="dettaglio-rinunciate"
                                        title="Dettaglio rinunciate e revocate"
                                        stacked={true}
                                        colors={[
                                            "#f14668",
                                            "#cc0f35",
                                            "#f14668",
                                            "#cc0f35",
                                        ]}
                                        values={datiDettaglioRinunciate}
                                        titleColor="#f14668"
                                    ></AreaChart>
                                </div>
                            </div>

                            <div class="columns is-full">
                                <div class="column is-full">
                                    <Barchart
                                        id="dettaglio-totale-rinunciate"
                                        title="Ripartizione rinunciate e revocate"
                                        titleColor="#f14668"
                                        values={datiTotaleDettaglioRinunciateRevocate}
                                        direction="horizontal"
                                        colors={[
                                            "#f14668",
                                            "#cc0f35",
                                            "#f14668",
                                            "#cc0f35",
                                        ]}
                                    ></Barchart>
                                </div>
                            </div>
                        </div>
                    {/if}
                </article>
            </section>
        </div>
    {/if}
</article>

{#if selectedMisura !== ""}
    <article class="message is-info">
        <div class="message-header">
            <p>Avvisi</p>
            <button
                class="button is-info"
                aria-label="info"
                on:click={toggleShowAvvisi}
                >{showAvvisi ? "Nascondi" : "Mostra"}</button
            >
        </div>
        {#if showAvvisi}
            <section class="section py-4">
                <div class="columns">
                    <div class="column">
                        <div class="timeline is-centered">
                            <div class="timeline-header">
                                <span class="tag is-medium is-danger">End</span>
                            </div>
                            {#each filteredAvvisi as avviso}
                                <div class="timeline-item">
                                    <div class="timeline-marker is-info"></div>
                                    <div class="timeline-content">
                                        <p
                                            class="heading has-text-info has-text-weight-bold"
                                        >
                                            Beneficiari (COMUNI, SCUOLE, ASL...)
                                        </p>
                                        <p
                                            class="heading has-text-info has-text-weight-bold"
                                        >
                                            Dotazione finanziaria: {euro(
                                                avviso.Misura_Padre_1__c
                                                    ? avviso.Total_Program_Amount_Padre_1__c
                                                    : avviso.Misura_Padre_2__c
                                                      ? avviso.Total_Program_Amount_Padre_2__c
                                                      : avviso.outfunds__Total_Program_Amount__c,
                                            )}
                                        </p>
                                        <p
                                            class="heading has-text-info has-text-weight-bold"
                                        >
                                            Platea potenziale (al momento
                                            dell'apertura dell'avviso) e
                                            percentuale di copertura relativa -
                                            (per ciascun beneficiario)
                                        </p>
                                        <p
                                            class="has-text-primary has-text-weight-bold"
                                        >
                                            RANKING basato su C1..C6
                                        </p>
                                        <p
                                            class="heading has-text-success has-text-weight-bold"
                                        >
                                            C1: Finanziate
                                        </p>
                                        <p
                                            class="heading has-text-danger has-text-weight-bold"
                                        >
                                            C2: Rinunciate/Revocate
                                        </p>
                                        <p
                                            class="heading has-text-info has-text-weight-bold"
                                        >
                                            C3: Percentuale di copertura relativa -(per ciascun beneficiario)
                                        </p>
                                        <p
                                            class="heading has-text-info has-text-weight-bold"
                                        >
                                            C4: Riassorbimento rinunce (quante
                                            candidature dell'avviso sono
                                            relative a rinuce precedenti)
                                        </p>
                                        <p
                                            class="heading has-text-info has-text-weight-bold"
                                        >
                                            C5: Numero di richieste variazione
                                            contrattualizzazione / tempo medio
                                            per contrattualizzare
                                        </p>
                                        <p
                                            class="heading has-text-info has-text-weight-bold"
                                        >
                                            C6: Numero di richieste variazione
                                            completamento / tempo medio per
                                            completare
                                        </p>
                                        <p
                                            class="heading has-text-info has-text-weight-bold"
                                        ></p>
                                    </div>
                                </div>
                                <header class="timeline-header">
                                    <span
                                        class="tag {avviso.outfunds__Status__c ===
                                        'PUBBLICATO'
                                            ? 'is-success'
                                            : 'is-info'}">{avviso.Name}</span
                                    >
                                </header>
                            {/each}
                            <div class="timeline-item">
                                <div class="timeline-marker is-info"></div>
                                <div class="timeline-content">
                                    <p
                                        class="heading has-text-danger has-text-weight-bold"
                                    ></p>
                                </div>
                            </div>
                            <div class="timeline-header">
                                <span class="tag is-medium is-success"
                                    >Start</span
                                >
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        {/if}
    </article>
{/if}

<style>
    .bm--card-equal-height {
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    .isclickable {
        cursor: pointer;
    }
</style>
