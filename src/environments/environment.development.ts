import { HttpHeaders } from '@angular/common/http';

const prefix: string = 'http://localhost:8080';

// http://localhost:8080
// https://server.teachernoteshub.online:8443
// https://server2.teachernoteshub.online

export const environment = {
    production: false,
    getToken: (): string => {
        const lStorage = localStorage.getItem('userAuth');
        if (lStorage == null) return '';
        return JSON.parse(lStorage).token;
    },
    userUrl: `${prefix}/users`,
    adminUrl: `${prefix}/admins`,
    teacherUrl: `${prefix}/teachers`,
    institutionUrl: `${prefix}/institutions`,
    notebooksUrl: `${prefix}/notebooks`,
    finishedNotebooksUrl: `${prefix}/finished-notebooks`,
    studentUrl: `${prefix}/students`,
    lessonsUrl: `${prefix}/lessons`,
    attendanceUrl: `${prefix}/attendances`,
    worksUrl: `${prefix}/works`,
    gradesUrl: `${prefix}/grades`,
    bnccUrl: `${prefix}/bncc_codes`,
    simpleErrorMessage: 'Ops, algo deu errado, tente novamente mais tarde',
    fieldErrorMessage: 'Ops, algo deu errado, verifique os campos e tente novamente mais tarde'
};

export const requestsUtils = {
    getHeaders: (): HttpHeaders => {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': environment.getToken()
        });
    }
}
