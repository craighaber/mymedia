import './About.scss';
import useNavigateLoginOrSignUp from '../../../../globals/hooks/useNavigateLoginOrSignUp';


export default function About(){
    const navigateLoginOrSignUp = useNavigateLoginOrSignUp()

    return (
        <div className="about">
            <div className = "about_container">

                <div className="about-title">
                    <h3 className="about-title_text">Why MyMedia?</h3>
                </div>
                <div className="about-content">
                    <p>
                        Have you ever watched an incredible movie, read an inspiring book, or listened to an album that deeply moved you?
                        But then years later you try to recall the work in conversation, and you find yourself forgetting simple details? We've all been there—and that's exactly why MyMedia was created!
                    </p>
                    <h4>Your Personal Media Journal</h4>
                    <p>MyMedia serves as your personal journal for all kinds of media—be it TV, movies, books, video games, songs, or anything under the sun. With this platform you can easily record your impressions, ratings, and key insights about each work, ensuring that those memories stay alive for years to come.</p>
                    <h4>Why MyMedia?</h4>
                    <p>Imagine a space where you can revisit your thoughts and feelings about all the media you have ever experienced. By journaling soon after you finish a work, you can preserve the freshness of your impressions for years to come. You'll be able to dive back into your personal reflections, sparking nostalgiam inspiration, or knowledge whenever you need it.</p>
                    <h4>A Passion Project</h4>
                    <p>My name is Craig, and I started this site as a passion project to help myself and others reflect on the media that shapes our lives. This platform has plenty of room for growth, and I'm eager to hear your thoughts. Please reach out with any and all feedback or questions by contacting me at by via <a href="mailto:craighaber1@gmail.com">email</a> or  by connecting through <a href="https://www.linkedin.com/in/craighaber/">LinkedIn</a>.</p>
                </div>

                <div className="about-title">
                 <h3 className="about-title_text">FAQs</h3>
                </div>
                <div className="about-content">
                    <p className='question'>Can other people see my journal entries?</p>
                    <p>Not right now! MyMedia is designed to be a personal space for you. While sharing on social media is prevalent, we believe it can detract from the authenticity of your experiences. If there’s enough demand, we might consider a sharing option in the future.</p>
                    <p className='question'>How can I trust this website to permanently save my journal entries?</p>
                    <p>While we have no plans to shut down, you can back up your journal entries any time you want! Simply click the 'Export' button after logging in to download all your journal entries to a CSV file. </p>
                    <p className='question'>Can I use this site for just one kind of media?</p>
                    <p>Yes! Whether you're a movie buff, a book lover, or a gaming aficionado, you can track as many or as few media categories as you like.</p>
                    <p className='question'>What if I only want to log what I've seen? </p>
                    <p>No problem! You can easily list all your completed media in one organized view, with the added ability to filter on title, category, and ranking. When creating a media entry, simply leave the 'My Impressions' box blank to keep things simple.</p>
                </div>

                <div className="about-title">
                    <h3 className="about-title_text">Need an example?</h3>    
                </div>
                <div className="about-content">
                    <p>Here is an example of what a media entry might look like:</p>
                    <div className='example-section'><b>Title:</b><i> This is What it Sounds Like</i></div>
                    <div className='example-section'><b>Category:</b> Book</div>
                    <div className='example-section'><b>Rating:</b> 9/10</div>
                    <div className='example-section'><b>My Impressions: </b></div>
                    <div className="impressions-container">
                        <div className='example-section'>"This book really enhanced my appreciation for music, one of the arts I definitely know the least about. It delves deep into the different aspects of a song: authenticity, realism, novelty, melody, lyrics, rhythm, timbre (tone), and form/function. The main thesis is that music is so subjective that there is no reason to criticize anyone for loving the music they love. </div>
                        <div className='example-section'>One great example of this that it talks about is The Shaggs, a girl band that arose from a redneck family whose father wanted them to be famous. He made them drop out of school, abandon their social lives, and practice for hours every day. They were not even allowed to listen to other music so they stayed pure. Eventually they were in perfect sync with each other, in their own horribly off tune way. The music they produced is objectively awful, but it is so authentic that it has been critically analyzed and genuinely enjoyed by a lot of people.</div>
                        <div className='example-section'>Overall a great book for learning more about music. There is a playlist someone made on Spotify for all the songs discussed in the book, and there are lots of gems on there."</div>
                    </div>
                </div>

                <div className="about-title">
                    <h3 className="about-title_text">Join Us Today</h3>    
                </div>
                <div className="about-content">
                    {/* <p>Take the first step in preserving your memories with media, and start using MyMedia today!</p> */}
                    <div className="get-started">
                        <button className='get-started_button' onClick={navigateLoginOrSignUp}>GET STARTED</button>
                    </div>
                 
                </div>
              
            </div>

        
          
        </div>
    )
}