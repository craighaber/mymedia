import './MediaTable.scss'
import { Media } from './models/Media'

function MediaTable({mediaList}: {mediaList: Media[]}){
    return (
        <div className='media'>
            <table className='media-table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Rating</th>
                        <th>Review</th>
                    </tr>
                 
                </thead>
                <tbody>
                    {
                        mediaList.map((entry: Media)=> {
                            return <tr>
                            <td>{entry.title}</td>
                            <td>{entry.category}</td>
                            <td>{entry.rating}</td>
                            <td>{entry.review}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MediaTable