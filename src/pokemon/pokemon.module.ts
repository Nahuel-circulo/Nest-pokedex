import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { Pokemon, PokemonSchema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';


//Pokemon.name lo obtiene del documento, no es la propiedad name
@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    ConfigModule,
    MongooseModule.forFeature([{
      name:Pokemon.name,
      schema:PokemonSchema,
    }])
  ],
  exports:[
    MongooseModule
  ]
})
export class PokemonModule {}
