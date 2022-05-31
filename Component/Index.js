import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import Payment from './Payment/Payment';
import SignIn from './SignIn/SignIn';
import Home from './Home/Home';
import { useDispatch } from 'react-redux';
import { initial } from '../Redux/informationSlices'


export default function Index({ navigation }) {
    const isLog = useSelector((state) => state.information.isLog);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initial())
    })
    return (
        <>
            {isLog ? (<Home />) : (<SignIn navigation={navigation} />)}
            {/* <Payment navigation={navigation}/> */}
        </>
    )
}