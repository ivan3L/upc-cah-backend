
const prefix = "fn";

export const getQueryRetriveSql = (nameTable: string) => {
    return `select ${prefix}_retrieve_${nameTable}($1) as query`;
}

export const getQueryRetriveAllSql = (nameTable: string) => {
    return `select ${prefix}_retrieve_${nameTable}($1) as query`;
}

export const getQueryCreateSql = (nameTable: string, nparams: number = 1, createdUser: boolean = false) => {
    if (createdUser) nparams++;
    let sqlTemporal = "";
    for (let index = 0; index < nparams; index++) {
        if (index === nparams - 1) {
            sqlTemporal += `$` + (index + 1);
        } else {
            sqlTemporal += `$` + (index + 1) + `,`;
        }
    }
    return `select ${prefix}_create_${nameTable}(${sqlTemporal}) as query`;
}

export const getQueryUpdateSql = (nameTable: string, nparams: number = 1, updatedUser: boolean = false) => {
    if (updatedUser) nparams++;
    let sqlTemporal = "";
    for (let index = 0; index < nparams; index++) {
        if (index === nparams - 1) {
            sqlTemporal += `$` + (index + 1);
        } else {
            sqlTemporal += `$` + (index + 1) + `,`;
        }
    }
    return `select ${prefix}_update_${nameTable}(${sqlTemporal})  as query`;
}

export const getQueryDeleteSql = (nameTable: string, deletedUser: boolean = false) => {
    if (deletedUser) return `select ${prefix}_delete_${nameTable}($1,$2) as query`;
    return `select ${prefix}_delete_${nameTable}($1) as query`;
}

