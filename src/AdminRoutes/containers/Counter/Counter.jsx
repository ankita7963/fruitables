import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, incremet } from '../../../redux/Slice/counter.slice';


function Counter(props) {
    const dispatch = useDispatch();

    const hendelDec = () => {
        dispatch(decrement());
    }

    const hendelInc = () => {
        dispatch(incremet());
    }

    const counter = useSelector(state => state.count);
    console.log(counter);

    return (
        <div>
            <Button onClick={() => hendelDec()}> - </Button>
            <span> {counter.count} </span>
            <Button onClick={() => hendelInc()}> + </Button>
        </div>
    );
}

export default Counter;




