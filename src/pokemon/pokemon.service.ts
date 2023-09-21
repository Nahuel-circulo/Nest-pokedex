import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { ConfigService } from '@nestjs/config';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { BadRequestException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { PaginationDto } from 'src/common/dto/pagination.dto';


@Injectable()
export class PokemonService {

  private defaultLimit: number;

  // Model no es un provider, es decir no es inyectable
  // por lo tanto necesita del decorador @InjectModel
  constructor(
    //necesita el nombre 
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly configService: ConfigService
  ) {
    /* console.log(process.env.DEFAULT_LIMIT)
       console.log(configService.get<number>('default_limit')) */
    this.defaultLimit = configService.get<number>('default_limit');
  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLocaleLowerCase()
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto)
      return pokemon;
    } catch (error) {
      this.handleExceptions(error)
    }

  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = this.defaultLimit, offset = 0 } = paginationDto;

    //oculto la columna __v y ordeno de forma ascendente
    return await this.pokemonModel.find()
      .limit(limit)
      .skip(offset)
      .sort({
        nro: 1
      })
      .select('-__v')
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    // Nro de pokemon
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ nro: term })
    }

    // MongoId
    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findOne({ id: term })
    }

    // Nombre
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLocaleLowerCase().trim() })
    }

    if (!pokemon) throw new NotFoundException(`Pokemon with id, name or nro "${term}" not found`)
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    //pokemon no es un pokemon, es un modelo de mongo donde puedo hacer update, remove, replace,etc.
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase()
    }

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true })
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleExceptions(error)
    }

  }

  async remove(id: string) {

    // devuelve la cantidad de registros eliminados
    const { deletedCount } = await this.pokemonModel.deleteOne({ _id: id })
    // const result = await this.pokemonModel.findByIdAndDelete(id)
    if (deletedCount === 0) {
      throw new BadRequestException(`Pokemon with id "${id}" not found`)
    }
    return;

  }


  private handleExceptions(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon exists in db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error)
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)

  }
}
