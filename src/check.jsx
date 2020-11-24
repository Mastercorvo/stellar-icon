
import './styles/check.css';

import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useState } from 'react';

import CloseIcon from '@material-ui/icons/Close';

function Item({data, deleteItem}){

    return (<div className="item">

        <p>{data.name}</p>

        <div className="img" style={{backgroundImage:'url(' + data.url + ')'}}></div>

        <div className="price">{data.price}$</div>

        <Button onClick={()=>deleteItem(data.index)}>Cancelar</Button>

    </div>)

}

function Modal({show, setShowModal, setShowCheck, setCar}){

    function clickModal(){

        setShowModal(false);
        setShowCheck(false);
        setCar([]);

    }

    return (<div className="modal-check" style={{display: show?'flex':'none'}} onClick={clickModal}>

        <h1>Compra Finalizada ✅</h1>

    </div>)

}

function Check({car, setCar, show, setShowCheck}){

    const [showProgress, setShowProgress] = useState(false);
    const [showModal, setShowModal] = useState(false);

    function deleteItem(INDEX){

        setCar(value=>{

            return value.filter(({index})=> {

                return index !== INDEX;
            
            });

        })

    }

    function load(){

        setShowProgress(true);

        const loadProgress = new Promise((resolve, reject)=>{

            setTimeout(()=>{
    
                resolve(setShowProgress(false));
    
            }, 2000)

        });

        loadProgress.then(()=>{

            setShowModal(true);

        })


    }

    function close(){

        setShowCheck(false);

    }

    return (<div className="check" style={{display: show?'flex':'none'}}>

        <CloseIcon  className="close" onClick={close}/>

        <Modal show={showModal} setShowModal={setShowModal} setShowCheck={setShowCheck} setCar={setCar}/>

        <CircularProgress className="progress" style={{display: showProgress?'block' : 'none'}}/>

        <h2>Paso 2/2: Confirmar Compra</h2>

        <div className="container">

            <div className="products">

                {car.map(e=> <Item data={e} key={e.index} deleteItem={deleteItem}/>)}

            </div>

            <p className="total"> Total a Pagar: <span>{car.reduce((a, e)=> e.price + a, 0)}$</span> </p>

            <Button onClick={load}>Confirmar Compra</Button>

        </div>

    </div>);

}

export default Check;