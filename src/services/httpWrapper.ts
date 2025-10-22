import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { BASE_URL } from "../common/constants.tsx";

export class HttpWrapper {
    protected http: Http;
    protected get baseApiRoot() : string {
        return BASE_URL;
    }
    
    constructor() {
        this.http = new Http();
    }
}

class Http {

    getHeaders(): AxiosRequestConfig<any> {
        const defaultHeaders = {
            'ngrok-skip-browser-warning': true
        }
        return {headers: defaultHeaders};
    }

    async POST(url: string, payload: any, requestConfig?: AxiosRequestConfig) {
        return await axios.post(url, payload, this.getHeaders());
    }

    async GET(url: string, requestConfig?: AxiosRequestConfig): Promise<AxiosResponse<any>> {
        return await axios.get(url);
    }

    async DELETE(url: string, requestConfig?: AxiosRequestConfig) {
        return await axios.delete(url, this.getHeaders());
    }

    async PUT(url: string, payload: any, requestConfig?: AxiosRequestConfig) {
        return await axios.put(url, payload, this.getHeaders());
    }

    async PATCH(url: string, payload: any, requestConfig?: AxiosRequestConfig) {
        return await axios.patch(url, payload, this.getHeaders());
    }

}