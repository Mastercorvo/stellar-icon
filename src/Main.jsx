import { useState } from 'react';

import Switch from '@material-ui/core/Switch';

import Button from '@material-ui/core/Button';

import { v4 as uuidv4 } from 'uuid';

import Triangulo from './img/triangulo.svg';
import Box from './img/caja.svg';
import Equis from './img/equis.svg';
import Fusion from './img/fucion.svg';
import Movimiento from './img/movimiento.svg';
import Elevacion from './img/elevacion.svg';
import Angulo from './img/angulo.svg';
import Viajero from './img/viajero.svg';

import './styles/main.css';

const products = [

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

]

const colorCategories = {

    triangulo: 'blue',
    perfecto: 'gold',
    opaco: 'grey',
    oscuro: 'black',
    cuadrado: 'red',
    equis: 'deepskyblue',
    único: 'silver',
    movimiento: 'orange',
    arte: 'purple',
    colorido: 'pink',
    claro: 'greenyellow',
    circulo: '#fa163f'

}

function Item({price, description, categories, name, rate, url, car, setCar, index}){

    const data = {price, description, categories, name, rate, url}

    function add(){

        setCar(value=>{

            return [...value, {...data, index: uuidv4()}]

        })

    }

    return (<div className="item" key={index}>

        <div className="categories">{categories.map((e, i)=>{
            
            const STYLE = {backgroundColor: colorCategories[e], color: (e === 'oscuro')? 'white':''}

            return <div style={STYLE} key={i}> <div className="dot"></div> {e}</div>

        })}</div>

        <div className='img' style={{backgroundImage: 'url(' + url + ')'}}></div>

        <p className="name">{name}</p>

        <p className="description">{description}</p>

        <div className="container"><p className="rate">⭐ {rate}/10</p> <p className="price">{price}$</p></div>

        <Button onClick={add}>Añadir Producto</Button>

    </div>)

}

function Main({car, setCar}){

    const [search, setSearch] = useState('');

    const searchHandler = ({target})=> setSearch(target.value);

    return (<div className="main">

        <div className="search">

            <input type="text" value={search} onChange={searchHandler}/>

            <div className="container"><p>Precio</p><Switch /></div>
            <div className="container"><p>Mas nuevo</p><Switch /></div>
            <div className="container"><p>Populares</p><Switch /></div>
            <div className="container"><p>Mas valorados</p><Switch /></div>

        </div>

        <div className="shop">

            {products.map(e=> <Item {...e} car={car} setCar={setCar} key={e.name} />)}

        </div>

    </div>)

}

export default Main;