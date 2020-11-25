import { useState } from 'react';

import Switch from '@material-ui/core/Switch';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { v4 as uuidv4 } from 'uuid';

import Triangulo from './img/triangulo.svg';
import Box from './img/caja.svg';
import Equis from './img/equis.svg';
import Fusion from './img/fucion.svg';
import Movimiento from './img/movimiento.svg';
import Elevacion from './img/elevacion.svg';
import Angulo from './img/angulo.svg';
import Viajero from './img/viajero.svg';
import Fobia from './img/phobia.svg';
import Impacto from './img/impacto.svg';
import Perdido from './img/perdido.svg';
import Engranaje from './img/engranaje.svg'

import './styles/main.css';

const PRODUCTS = [

    {price: 8, description:'Un triangulo perfecto', categories: ['triangulo', 'perfecto', 'opaco'], name: 'N17', rate: '10', url: Triangulo},
    {price: 2, description:'Caja sin contexto', categories: ['cuadrado', 'arte', 'colorido'], name: 'MasL', rate: '7', url: Box},
    {price: 5, description:'La equis marca el lugar', categories: ['equis', 'opaco'], name: 'K200', rate: '8',
    url: Equis},
    {price: 12, description:'Una función', categories: ['circulo', 'arte', 'oscuro'], name: 'HHH', rate: '10',
    url: Fusion},
    {price: 3, description:'Movimiento uniforme', categories: ['movimiento', 'perfecto', 'oscuro'], name: 'AB', rate: '4', url: Movimiento},
    {price: 20, description:'Elevación forzosa', categories: ['único', 'arte', 'colorido'], name: 'JN17', rate: '10', url: Elevacion},
    {price: 14, description:'Doble angulo recto', categories: ['único', 'perfecto', 'claro'], name: 'ZD1FF', rate: '9', url: Angulo},
    {price: 6, description:'Circulo viajero', categories: ['circulo', 'perfecto', 'colorido'], name: 'CAS7B', rate: '8', url: Viajero},
    {price: 7, description:'Fobia', categories: ['arte', 'único', 'colorido'], name: 'QUINNN', rate: '9', url: Fobia},
    {price: 19, description:'¡Estoy perdido!', categories: ['arte', 'único', 'colorido'], name: 'ShaYY', rate: '9', url: Perdido},
    {price: 1, description:'Circulo viajero', categories: ['circulo', 'arte', 'colorido'], name: 'Vissp', rate: '2', url: Impacto},
    {price: 18, description:'Circulo viajero', categories: ['arte', 'perfecto', 'colorido'], name: 'NAVAS4', rate: '10', url: Engranaje},

]


function Item({price, description, categories, name, rate, url, car, setCar, index}){

    const data = {price, description, categories, name, rate, url}

    function add(){

        setCar(value=>{

            return [...value, {...data, index: uuidv4()}]

        })

    }

    return (<div className="item" key={index}>


        <div className='img' style={{backgroundImage: 'url(' + url + ')'}}></div>
        <p className="name">{name}</p>

        {/* <div className="categories">{[...categories].sort().map((e, i)=>{
            
            return <p key={i} className={'category-'+i}>{e} </p>
            

        })}</div> */}


        {/* <p className="description">📖 {description}</p> */}

        <div className="container"><p className="rate"> {rate}/10</p> <p className="price">{price}$</p></div>

        <Button onClick={add}>+ Añadir Producto</Button>

    </div>)

}

function Main({car, setCar}){

    const [products, setProducts] = useState(PRODUCTS)

    const searchHandler = ({target})=>{

        if(target.value){

            setProducts(value=>{

                return [...value].map(e=>{

                    return [e.name.match(target.value,'i'), e];

                })
                .filter(e=>e[0])
                .sort((a, b)=>{

                    return b[0][0].length - a[0][0].length;

                })
                .sort((a, b)=>{

                    return a[0].index - b[0].index;

                })
                .map(e=>e[1]);

            });

        }else setProducts(PRODUCTS)

    }

    const [prices, setPrices] = useState(true);
    function pricesHandler(){

        setPrices(v=>!v);

        if(prices){

            setProducts(value=>{

                return [...value].sort((a,b)=>{

                    return a.price -b.price

                });

            })

        }else setProducts(PRODUCTS)

    }

    const [rate, setRate] = useState(true);

    function rateHandler(){

        setRate(v=>!v);

        if(rate){

            setProducts(value=>{

                return [...value].sort((a,b)=>{

                    return b.rate - a.rate ;

                });

            })

        }else setProducts(PRODUCTS)

    }

    const [perfect, setPerfect] = useState(true); 

    function perfectHandler(){

        setPerfect(v=>!v)

        if(perfect){

            setProducts(value=>{
    
                return [...value].sort((a,b)=>{
    
                    const A = +!!a.categories.find(e=>e === 'perfecto');
    
                    const B = +!!b.categories.find(e=>e === 'perfecto');
    
                    return B - A;
    
                })
    
            })

        }else setProducts(PRODUCTS)

    }
    const [dark, setDark] = useState(true); 

    function darkHandler(){

        setDark(v=>!v)

        if(dark){

            setProducts(value=>{
    
                return [...value].sort((a,b)=>{
    
                    const A = +!!a.categories.find(e=>e === 'oscuro');
    
                    const B = +!!b.categories.find(e=>e === 'oscuro');
    
                    return B - A;
    
                })
    
            })

        }else setProducts(PRODUCTS)

    }
    const [unique, setUnique] = useState(true); 

    function uniqueHandler(){

        setUnique(v=>!v)

        if(unique){

            setProducts(value=>{
    
                return [...value].sort((a,b)=>{
    
                    const A = +!!a.categories.find(e=>e === 'único');
    
                    const B = +!!b.categories.find(e=>e === 'único');
    
                    return B - A;
    
                })
    
            })

        }else setProducts(PRODUCTS)

    }
    const [art, setArt] = useState(true); 

    function ArtHandler(){

        setArt(v=>!v)

        if(art){

            setProducts(value=>{
    
                return [...value].sort((a,b)=>{
    
                    const A = +!!a.categories.find(e=>e === 'arte');
    
                    const B = +!!b.categories.find(e=>e === 'arte');
    
                    return B - A
    
                })
    
            })

        }else setProducts(PRODUCTS)

    }

    return (<div className="main">

        <div className="search">

            <TextField onChange={searchHandler} label='Buscar...' variant="filled" className="input-search"/>

            <div className="container"><p>Menor Precio</p><Switch value={prices} onChange={pricesHandler} /></div>
            <div className="container"><p>Mas Valorados</p><Switch value={rate} onChange={rateHandler} /></div>
            <h5>Por categoría:</h5>
                <div className="categories">
                <div className="container"><p>Perfecto</p><Switch value={perfect} onChange={perfectHandler} /></div>
                <div className="container"><p>Oscuro</p><Switch value={dark} onChange={darkHandler} /></div>
                <div className="container"><p>Único</p><Switch value={unique} onChange={uniqueHandler} /></div>
                <div className="container"><p>Arte</p><Switch value={art} onChange={ArtHandler} /></div>
            </div>

        </div>

        <div className="shop">

            {products.map(e=> <Item {...e} car={car} setCar={setCar} key={e.name} />)}

        </div>

    </div>)

}

export default Main;