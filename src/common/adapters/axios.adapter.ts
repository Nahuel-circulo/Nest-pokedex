import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { HttpAdapter } from '../interfaces/http-adapter.interface';



// los providers estan a nivel de modulo
// si necesito usarlo en otro modulo hay que exportarlo

@Injectable()
export class AxiosAdapter implements HttpAdapter {

    private axios: AxiosInstance = axios;

    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url)
            return data;
        } catch (error) {
            throw new Error(`This is an error - Check logs`)
        }
    }
}