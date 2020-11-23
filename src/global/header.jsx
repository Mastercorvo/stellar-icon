
import './header.css';

import { useState } from 'react';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import TextField from '@material-ui/core/TextField';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

import Visa from '../img/visa.svg';
import Mastercard from '../img/mastercard.svg';

function Pay(){

    return (<div className="pay">

        <section className="data">
            <h2>Paso 1: Rellene los datos</h2>
            <div className="container">
                <div className="logo-card">
                    <div className="visa" style={{backgroundImage:'url('+ Visa + ')'}}></div>
                    <div className="visa" style={{backgroundImage:'url('+ Mastercard + ')'}}></div>
                </div>
                <TextField className="input" label="Nombre Completo"/>
                <TextField type="number" className="input" label="Número Tarjeta de Crédito"/>
                <TextField className="input" label="Código de Tarjeta"/>
                <TextField className="input" label="Fecha de Vencimiento" 
                type="date" defaultValue="2017-05-24" InputLabelProps={{
                    shrink: true,
                }}/>

                <Button>Siguiente</Button>

            </div>

        </section>

    </div>)

}

const StyledItem = styled.div`

    &.an-item-enter{

        opacity: 1;

    }
    &.an-item-enter-active {
        opacity: 0;
        transition: opacity 200ms;
    }

`;

function Item({ name, url, price, deleteItem, index }){

    const [inProp, setInProp] = useState(false);

    function clickHandler(){

        setInProp(true);

    }

    return(<CSSTransition in={inProp} timeout={200} classNames="an-item" onEntered={()=>deleteItem(index)}>
        <StyledItem className="item">

            <p className="name">{name}</p>

            <div className="img" style={{backgroundImage: 'url(' + url + ')'}}></div>

            <p className="price">{price}$</p>

            <Button onClick={clickHandler}>Cancelar</Button>

        </StyledItem>
    </CSSTransition>);

}

function Modal({ car, setCar, showHandler, show }){

    function deleteItem(INDEX){

        setCar(value=>{

            return value.filter(({index})=> {

                return index !== INDEX;
            
            });

        })

    }

    const listItems = car.map(({ name, url, price, index}, i)=>{

        return <Item {...{deleteItem, name, url, price, index}} key={index} />;

    })

    return (<div className="modal" style={{display: show?'flex':'none'}}>

        <div className="close" onClick={showHandler}><CloseIcon className="cross" /></div>

        <div className="products">

            <div className="item-list">

                {(car.length === 0)? <h2>No hay productos 🤔</h2>:listItems }

            </div>

            <p className="total"> Total a Pagar: <span>{car.reduce((a, e)=> e.price + a, 0)}$</span> </p>

            <Button>Comprar</Button>

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

        <Pay />

    </header>);

}

export default Header;