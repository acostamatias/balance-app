import {Route, Redirect} from 'react-router-dom'
import Cookies from 'universal-cookie'

const cookie = new Cookies()

const PrivateRoute = (props) => {
    if(!cookie.get('id')) return <Redirect to ="/login" />
    return(
        <Route {...props}/>
    )
}

export default PrivateRoute