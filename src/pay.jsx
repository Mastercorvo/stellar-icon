import Visa from './img/visa.svg';
import Mastercard from './img/mastercard.svg';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import CircularProgress from '@material-ui/core/CircularProgress';

import './styles/pay.css';
import { useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';

function Pay({show, setShowPay, setShowCheck}){

    const [userName, setUserName] = useState('');
    function userNameHandler({ target }) {

        setUserName(target.value);
        setPress(false);
        setErrorDate(false);

    }

    const [card, setCard] = useState('');
    function cardHandler({target}){

        setCard(target.value);
        setPress(false);
        setErrorDate(false);

    }

    const [code, setCode] = useState('');
    function codeHandler({target}){

        setCode(target.value);
        setPress(false);
        setErrorDate(false);

    }

    const [press, setPress] = useState(false);
    function nextHandler(){

        if(!userName || !card || !code) setPress(true);
        if(cardIsExpiration(date)) setErrorDate(true);

        if(!userName || !card || !code) return;
        if(cardIsExpiration(date)) return;

        setShowProgress(true);

        setTimeout(()=>{

            setShowProgress(false);
            setShowPay(false);
            setShowCheck(true);

        }, 2000);

    }

    const [errorDate, setErrorDate] = useState(false);
    const [date, setDate] = useState('2019-12-01');
    function cardIsExpiration(value){

        return new Date(value).getTime() <= new Date().getTime();

    }

    const [showProgress, setShowProgress] = useState(false);

    function dateHandler({target}){

        setDate(target.value);

        if(cardIsExpiration(target.value)) return setErrorDate(true);
            else {
                setErrorDate(false);
                setPress(false);
            }

    }

    function close(){

        setShowPay(false)

    }

    const MessageError = 'Falta Rellenar Este Campo';
    const MessageErrorDate = 'Su Tarjeta Ya Ha Vencido';

    return (<div className="pay" style={{display: show?'flex':'none'}}>

        <CloseIcon className="close" onClick={close}/>

        <CircularProgress className="progress" style={{display: showProgress?'block':'none'}}/>

        <section className="data">
            <h2>Paso 1/2: Rellene los datos</h2>
            <div className="container">
                <div className="logo-card">
                    <div className="visa" style={{backgroundImage:'url('+ Visa + ')'}}></div>
                    <div className="visa" style={{backgroundImage:'url('+ Mastercard + ')'}}></div>
                </div>
                <TextField 
                    className="input" 
                    label="Nombre Completo" 
                    value={userName} 
                    onChange={userNameHandler}
                    error={userName === '' && press}
                    helperText={(userName === '' && press) && MessageError}
                />
                <TextField 
                    type="number" 
                    className="input" 
                    label="Número Tarjeta de Crédito"
                    value={card}
                    onChange={cardHandler}
                    error={card === '' && press}
                    helperText={(card === '' && press) && MessageError}
                />
                <div className="container-2">
                    <TextField 
                        type="number" 
                        className="input" 
                        label="Código de Tarjeta"
                        value={code}
                        onChange={codeHandler}
                        error={code === '' && press}
                        helperText={(code === '' && press) && MessageError}
                    />
                    <TextField 
                        className="input" 
                        label="Fecha de Vencimiento" 
                        type="date"
                        value={date}
                        error={errorDate}
                        helperText={errorDate && MessageErrorDate}
                        onChange={dateHandler}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>

                <Button onClick={nextHandler}>Siguiente</Button>

            </div>

        </section>

    </div>)

}

export default Pay;