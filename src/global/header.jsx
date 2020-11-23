
import './header.css';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import Badge from '@material-ui/core/Badge';

import Button from '@material-ui/core/Button';
import { useState } from 'react';



function Modal({ car, setCar, showHandler, show }){

    function deleteItem(NAME){

        setCar(value=>{

            const INDEX_RESULT =  value.findIndex(({name})=>name === NAME);

            return value.filter((e, i)=> i !== INDEX_RESULT);

        })

    }

    return (<div className="modal" style={{display: show?'flex':'none'}}>

        <div className="close" onClick={showHandler}></div>

        <div className="products">

            {car.map(({ name, url, price })=>{

                return(<div className="item">

                    <p className="name">{name}</p>

                    <div className="img" style={{backgroundImage: 'url(' + url + ')'}}></div>

                    <p className="price">{price}$</p>

                    <Button onClick={()=> deleteItem(name)}>Cancelar</Button>

                </div>);

            })}

        </div>

    </div>)

}

function Header({ car, setCar}){

    const [show, setShow] = useState(false);

    function showHandler(){

        setShow(value=>!value);

    }

    return (<header>

        <div className="logo"></div>

        <p>+ de 200 de Los Mas Artísticos Iconos del Mercado</p>

        <Badge badgeContent={car.length} color="secondary">
            <Button className="car-container" onClick={showHandler}>

                <ShoppingCartIcon className="car"/>

            </Button>
        </Badge>

        <Modal car={car} setCar={setCar} showHandler={showHandler} show={show}/>

    </header>);

}

export default Header;