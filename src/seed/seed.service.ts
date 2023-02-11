import { Injectable } from '@nestjs/common';

import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) { }

  async executeSeed() {

    await this.pokemonModel.deleteMany({});

    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=100')

    // const insertPromisesArray = []; // Promise array
    const pokemonToInsert: { name: string, nro: number }[] = [];

    data.results.forEach(({ name, url }) => {
      const segments = url.split('/')
      const nro = +segments[segments.length - 2];
      //const pokemon = await this.pokemonModel.create({nro,name})

      // insertPromisesArray.push(
      //   this.pokemonModel.create({name,nro})
      // )// Promise array
      pokemonToInsert.push({ name, nro });
      // await Promise.all(insertPromisesArray) // Promise array
    })
    
    await this.pokemonModel.insertMany(pokemonToInsert);

    return 'Seed Executed';
  }
}

