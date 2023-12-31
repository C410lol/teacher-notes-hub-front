import { HttpHeaders } from "@angular/common/http";

const prefix: string = "https://server.teachernoteshub.online:8443";

export const environment = {
    production: false,
    getHeaders: (token: any): HttpHeaders => {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': token
        });
    },
    userUrl: `${prefix}/teachers`,
    notebooksUrl: `${prefix}/notebooks`,
    studentUrl: `${prefix}/students`,
    lessonsUrl: `${prefix}/lessons`,
    attendanceUrl: `${prefix}/attendances`,
    worksUrl: `${prefix}/works`,
    gradesUrl: `${prefix}/grades`,
    simpleErrorMessage: 'Ops, algo deu errado, tente novamente mais tarde',
    fieldErrorMessage: 'Ops, algo deu errado, verifique os campos e tente novamente mais tarde'
};
