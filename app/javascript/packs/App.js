import React from 'react'
import { Route } from 'react-router-dom'
import Navegacion from '../components/Navegacion'
import Carousel from '../components/Carousel'

class App extends React.Component{
    render(){
        return(
            <div>
                <Route path="/" component={Navegacion} />
                <Route exact={true} path="/" component={Carousel} />
            </div>
        )
    }
}

export default App