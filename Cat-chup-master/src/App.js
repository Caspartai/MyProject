// import { ChatEngine } from 'react-chat-engine';
import { Provider } from 'react-redux';
import LandingPage from './pages/LandingPage';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from './redux/store';
import './App.css';
import '@fontsource/roboto'




const App = () => {
    return (
        <Provider
            store={store}>
                <ReactNotification/>
            <LandingPage />
        </Provider>
        // <LandingPage/>
        // <ChatEngine
        //     height='100vh'
        //     projectID='5702389c-7f43-4bee-9a9b-e5cd34312005'
        //     userName='ray'
        //     userSecret='12345'
        // />
    )
}

export default App;