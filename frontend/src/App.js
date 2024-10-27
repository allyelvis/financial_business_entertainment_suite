import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';

function App() {
    return (
        <div>
            <Header />
            <main>
                <h2>Welcome to the Financial & Business Suite</h2>
                <Chatbot />
            </main>
            <Footer />
        </div>
    );
}

export default App;
