import { Link } from 'react-router-dom'


function Home(){
    return <div>
        <div className="section">
            <div className="content">
                <h1>Create, Share Quiz Easily</h1>
                <div className='home-box'>
                <p>Welcome to TrueOpinion Quiz! TrueOpinion Quiz is your ultimate destination for fun and engaging quizzes on a wide range of topics. Whether you're a trivia enthusiast, a pop culture aficionado, or simply looking to test your knowledge, our website has something for everyone.Explore a diverse collection of quizzes that cover everything from history and science to movies, music, and current events. Challenge yourself and your friends to see who has the sharpest mind or the most in-depth knowledge on various subjects. </p>
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