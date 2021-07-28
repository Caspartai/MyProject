import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import { ContentPage } from "./ContentPage"
import { IndexPage } from "./IndexPage"

import { Login } from "./Login"
import Register from "./Register"
import { useSelector } from "react-redux"


const PrivateRoute = ({ component, ...rest }) => {
    const auth = useSelector(state => state.authStore);
    const { isAuthenticated } = auth;
    const Component = component;
    //console.log('rendering data')
    if (Component != null) {
        //console.log('component exist', Component)
        //console.log('auth', isAuthenticated)
        return (
            <Route
                {...rest}
                render={(props) => {
                    return isAuthenticated ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: { from: props.location },
                            }}

                        />
                    )
                }}

            />
        )
    } else {
        return null;
    }
}
//public Route, for login/ register/indexpage, only if they are not login, can go to this page
const PublicRoute = ({ component, ...rest }) => {
    const auth = useSelector(state => state.authStore);
    const { isAuthenticated } = auth;
    const Component = component;
    //console.log('rendering data')
    if (Component != null) {
        //console.log('component exist', Component)
        //console.log('auth', isAuthenticated)
        return (
            <Route
                {...rest}
                render={(props) => {
                    return (!isAuthenticated) ? (
                        <Component {...props} />
                    ) : (
                        <Redirect
                            to={{
                                pathname: '/home',
                                state: { from: props.location },
                            }}

                        />
                    )
                }}

            />
        )
    } else {
        return null;
    }
}

//TODO: set index/login/register as public route, so after login would auto redirect
const LandingPage = () => {
    return (
        <div>
            <BrowserRouter>
                <Switch>
                    <PublicRoute exact path='/' component={IndexPage} />
                    <PublicRoute path='/login' component={Login} />
                    <PublicRoute path='/register' component={Register} />
                    <PrivateRoute path='/:content' component={ContentPage} />
                </Switch>


            </BrowserRouter>
        </div>
    )
}

export default LandingPage