import { Module } from '@nestjs/common';
import { AxiosAdapter } from './adapters/axios.adapter';


// defino el privider y lo exporto
// para usarlo en el modulo Seed
@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter]
})
export class CommonModule { }
