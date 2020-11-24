
import './header.css';

import { useState } from 'react';

import Pay from '../pay';
import Check from '../check';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';

import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

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

function Modal({ car, setCar, showHandler, show, setShowPay, setShow }){

    function deleteItem(INDEX){

        setCar(value=>{

            return value.filter(({index})=> {

                return index !== INDEX;
            
            });

        })

    }

    function buttonHandler(){

        if(car.length === 0) return;

        setShowPay(true);
        setShow(false);

    }

    const listItems = car.map(({ name, url, price, index})=>{

        return <Item {...{deleteItem, name, url, price, index}} key={index} />;

    })

    return (<div className="modal" style={{display: show?'flex':'none'}}>

        <div className="close" onClick={showHandler}><CloseIcon className="cross" /></div>

        <div className="products">

            <div className="item-list">

                {(car.length === 0)? <h2>No hay productos 🤔</h2>:listItems }

            </div>

            <p className="total"> Total a Pagar: <span>{car.reduce((a, e)=> e.price + a, 0)}$</span> </p>

            <Button onClick={buttonHandler}>Comprar</Button>

        </div>

    </div>)

}

function Header({car, setCar}){

    const [show, setShow] = useState(false);

    function showHandler(){

        setShow(value=>!value);

    }

    const [showPay, setShowPay] = useState(false);
    const [showCheck, setShowCheck] = useState(false);

    return (<header>

        <div className="logo"></div>

        <p>+ de 200 de Los Mas Artísticos Iconos del Mercado</p>

        <Badge badgeContent={car.length} color="secondary" className="car-parent">
            <Button className="car-container" onClick={showHandler}>

                <ShoppingCartIcon className="car"/>

            </Button>
        </Badge>

        <Modal car={car} setCar={setCar} showHandler={showHandler} setShow={setShow} show={show} setShowPay={setShowPay}/>

        <Pay show={showPay} setShowPay={setShowPay} setShowCheck={setShowCheck} />

        <Check car={car} setCar={setCar} show={showCheck} setShowCheck={setShowCheck}/>

    </header>);

}

export default Header;