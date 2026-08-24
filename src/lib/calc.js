export const REDUCCION_AUSENCIAS = 0.4;
export const AUTOMATIZACION_TIEMPO = 0.7;
export const DIAS_LABORABLES_MES = 22;

export const TIERS = {
    lite:       { nombre: 'Lite',       implementacion: 790,  mantenimiento: 79  },
    advanced:   { nombre: 'Advanced',   implementacion: 1690, mantenimiento: 199 },
    automation: { nombre: 'Automation', implementacion: 2990, mantenimiento: 249 },
};

export function fmt(n) {
    return Math.round(n).toLocaleString('es-ES');
}

export function calcularAhorroCleBot(params) {
    const { citasMes, precioCita, tasaAusenciasPct, horasDiaLlamadas, tierId } = params;
    const tier = TIERS[tierId];
    if (!tier) throw new Error(`Tier desconocido: ${tierId}`);

    const ausenciasAntes = citasMes * (tasaAusenciasPct / 100);
    const citasRecuperadas = ausenciasAntes * REDUCCION_AUSENCIAS;
    const ausenciasDespues = ausenciasAntes - citasRecuperadas;
    const ingresosAdicionalesAnuales = citasRecuperadas * precioCita * 12;

    const horasMesAntes = horasDiaLlamadas * DIAS_LABORABLES_MES;
    const horasLiberadasMes = horasMesAntes * AUTOMATIZACION_TIEMPO;
    const horasMesDespues = horasMesAntes - horasLiberadasMes;

    const pagoInicial = tier.implementacion + tier.mantenimiento;
    const costeAno1 = tier.implementacion + tier.mantenimiento * 12;
    const ahorroNeto12Meses = ingresosAdicionalesAnuales - costeAno1;
    const beneficioMensual = ingresosAdicionalesAnuales / 12;
    const beneficioMensualNeto = beneficioMensual - tier.mantenimiento;

    let mesesParaRecuperar = null;
    if (beneficioMensualNeto > 0) {
        mesesParaRecuperar = pagoInicial / beneficioMensualNeto;
    }

    return {
        horasLiberadasMes,
        citasRecuperadasMes: citasRecuperadas,
        ingresosAdicionalesAnuales,
        ahorroNeto12Meses,
        mesesParaRecuperar,
        ausencias: { antes: ausenciasAntes, despues: ausenciasDespues },
        tiempoAdministrativo: { antesHorasMes: horasMesAntes, despuesHorasMes: horasMesDespues }
    };
}
