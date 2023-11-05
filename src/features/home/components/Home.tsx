import './Home.scss';
import MediaTable from './MediaTable';

function Home(){
    return (
    <div className="home">
        <div className='title'>
            <h3 className='title_text'>Remember your favorite media</h3>
        </div>
        
        <div className='category'>
            <h3 className='category_text'>Select a category</h3>
        </div>

        <MediaTable/>
    </div>
    )
}

export default Home