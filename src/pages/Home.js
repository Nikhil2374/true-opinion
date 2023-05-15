import { Link } from 'react-router-dom'


function Home(){
    return <div>
        <div className="section">
            <div className="content">
                <h1>Create, Share Surveys Easily</h1>
                <div className='home-box'>
                <p>TrueOpinion allows you to create surveys in just a few clicks. Create a free account now and get started with a new adventure of opinions . Share the link among your friends , family and colleagues and capture their response . It's Simple, Secure, and safe because Your opinion matters! </p>
                <Link to="/create" className="btn">get started</Link>
                </div>
            </div>
        </div>
        <div className="section">
            <div className="content tab">
                <h1>Features</h1>
                <p>
                    <span className="li">Free to use</span>
                    <span className="li">Long secure passwords</span>
                    <span className="li">Guest submit</span>
                    <span className="li">Media support</span>
                    <span className="li">And many more...</span>
                </p>
            </div>
        </div>
    </div>
}

export default Home