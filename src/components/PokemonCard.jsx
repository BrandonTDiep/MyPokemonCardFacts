import { useState } from 'react'

// components
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { getColor } from "@/utils/color"


const PokemonCard = ({ pokemon }) => {
    const [showStats, setShowStats] = useState(false)
    
    return (
        <Card className="hover:shadow-lg my-8 bg-gray-100 hover:border-black transition-colors duration-500">
            <div className='flex flex-col md:flex-row'>
                {/* Card Image */}
                <div className="w-full md:w-1/2 lg:w-1/4 h-auto overflow-hidden rounded-l-lg">
                    <img
                        src={`${pokemon.images.small}`}
                        className="w-full h-auto" 
                        alt={`${pokemon.name}'s picture`}
                    />
                </div>

                <div className="w-full md:w-2/3 flex flex-col flex justify-center md:pl-5 mt-4 md:mt-0"> 
                    <CardContent className="text-left p-0 pl-4">
                        {/* Card Title */}
                        <CardTitle className="text-lg font-semibold text-lg flex items-center justify-between flex-wrap">
                            <div>
                                <span className={getColor(pokemon.types[0])}>{pokemon.name}</span>
                                {pokemon.level && <span className='pl-2 text-xs'>LV.{pokemon.level}</span>}
                                <span className='px-2 text-xs'>HP.{pokemon.hp}</span>
                            </div>
                            
                            <Button variant="link" className='p-0 font-normal mr-4' onClick={() => setShowStats(!showStats)}>{showStats ? "Hide Prices" : "Show Prices"}
                            </Button>
                        </CardTitle>
                        
                        <span className='text-xs'>Type: </span>
                        {pokemon.types.map((element, index) => (
                            <span key={index} className={`text-xs ${getColor(element)}`}>
                                {element}
                                {index < pokemon.types.length - 1 && ', '}
                            </span>
                        ))}

                        {/* Card Description */}
                        {showStats ? 
                        (<CardDescription className='mt-3'>
                            <p className="text-sm font-normal mb-1">
                                <span className="font-medium mr-1">Average Sell Price:</span> 
                                ${pokemon.cardmarket.prices.averageSellPrice}
                            </p>
                            <p className="text-sm font-normal mb-1">
                                <span className="font-medium mr-1">Trend Price:</span> 
                                ${pokemon.cardmarket.prices.trendPrice}
                            </p>
                            <p className="text-sm font-normal mb-1">
                                <span className="font-medium mr-1">Low Price:</span> 
                                ${pokemon.cardmarket.prices.lowPrice}
                            </p>
                        </CardDescription>
                        )
                        : 
                        (<CardDescription className='mt-3'>
                            {pokemon.abilities && pokemon.abilities.map((ability, index) => (
                                <div key={index} className='mb-3'>
                                    <h3 className='text-xs lg:text-sm'>
                                        <span className="font-medium mr-1">Ability: </span>
                                        {ability.name}
                                    </h3>
                                    <p className='text-xs lg:text-sm'>{ability.text}</p>
                                </div>
                            ))}

                            {pokemon.attacks && pokemon.attacks.map((attack, index) => (
                                <div key={index} className='mb-3'>
                                    <h3 className='text-xs lg:text-sm'>
                                        <span className="font-medium">Attack: </span>
                                        <span className='ml-1'>{attack.name}</span>
                                        <span className='ml-1'>{attack.damage}</span>
                                    </h3>

                                    <p className='text-xs lg:text-sm'>
                                        <span className="font-medium mr-1">Cost: </span> 
                                        {attack.cost.map((element, index) => (
                                            <span key={index} className={getColor(element)}>
                                                {element}
                                                {index < attack.cost.length - 1 && ', '}
                                            </span>
                                        ))}
                                    </p>

                                    {attack.text && 
                                    <p className='text-xs lg:text-sm'>
                                        <span className="font-medium mr-1">Effect: </span> {attack.text}
                                    </p>}
                                </div>
                            ))}
                        </CardDescription>
                        )}
                    </CardContent>
                </div>
            </div>   
        </Card>
    )
}

export default PokemonCard