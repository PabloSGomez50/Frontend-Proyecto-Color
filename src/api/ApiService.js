import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000';

const instance = axios.create({
    withCredentials: true,
    baseURL: API_URL,
    xsrfHeaderName: 'X-CSRFToken',
    xsrfCookieName: 'csrftoken'
});

export default instance;

export class ApiService{

    async getSession() {
        try {
            const response = await instance.get('/session');
            const data = response.data;
            if (!data.isAuth) {
                return this.getCSRFToken();
            }
            return data;
        }
        catch (err) {
            console.error(err);
        }
    }

    async getCSRFToken() {
        try {
            const response = await instance.get('/csrf');
            const data = await response.headers;
            console.log(data['x-csrftoken']);
            return data['x-csrftoken'];
        }
        catch (err) {
            console.error(err);
        }
    }

    async register(data) {
        try {
            const response = await instance.post('/register', data);
            return response.data;
        }
        catch (err) {
            console.error(err.response.data.error);
        }
    }

    async login(dat, token) {
        try {
            const uData = new FormData();
            uData.append('csrfmiddlewaretoken', token);
            uData.append('data', JSON.stringify(dat));
            const response = await instance.post('/login', uData, {headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': token
            }});
            return response.data;
        }
        catch (err) {
            console.error(err);
        }
    }

    async editUser(data, image) {
        try {
            const form = new FormData();
            form.append('data', JSON.stringify(data));
            form.append('image', image);
            const response = await instance.post('/user_edit', form);
            return response.data;
        }
        catch (err) {
            console.error(err);
        }
    }

    async getProjList(url = '/project_list?page=1'){
        try {
            const response = await instance.get(url);
            return response.data;
        }
        catch (err) {
            console.error(err);
        }
    }

    async getProj(pk){
        try {
            const response = await instance.get(`/project/${pk}`);
            return response.data;
        }
        catch (err) {
            console.error(err);
        }
    }

    async modProj(pk, _data = 
        {
            title: 'Aguante la electronica',
            description: 'asdf',
            categories: [{
                id: 2,
                name: 'quimica',
                name_en: 'chemistry'
            }],
            public: false
        }
        ) {
        try{
            const url = `/project/${pk}`;
            const response = await instance({
                method: 'put',
                url: url,
                // headers: {'X-CSRFToken': csrftoken},
                // mode: 'same-origin',
                data: _data
            });
            return response.data;
        }
        catch (err) {
            console.error(err);
        }
    }

    async createProj(data, files){
        try{
            const url = `/create_project`;
            const uData = new FormData();
            uData.append('data', JSON.stringify(data));
            uData.append('files', files);

            const response = await instance({
                method: 'post',
                url: url,
                data: uData
            });
            return response.data;
        }
        catch (err) {
            console.error(err);
        }
    }

    async sendImg(data) {
        try {
            const url = `/apitest`;

            const response = await instance({
                method: 'post',
                url: url,
                data: data
            });
            return response.data;
        }
        catch (err) {
            console.error(err);
        }
    }
}