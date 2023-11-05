import './MediaTable.scss'

const data = [
    {'title': 'Adventure Time', 'category': 'TV Show', 'ranking': 9.5, 'summary': 'Incredibly creative world and characters with literally the perfect art style. Hilarious, meaningful, and makes you appreaciate the wonders of life.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery editon', 'category': 'Book', 'ranking': 8, 'summary': 'Great tips on becoming a better programmer, some really good sections on DRY principle and inheritance.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery editon', 'category': 'Book', 'ranking': 8, 'summary': 'Great tips on becoming a better programmer, some really good sections on DRY principle and inheritance.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery editon', 'category': 'Book', 'ranking': 8, 'summary': 'Great tips on becoming a better programmer, some really good sections on DRY principle and inheritance.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery editon', 'category': 'Book', 'ranking': 8, 'summary': 'Great tips on becoming a better programmer, some really good sections on DRY principle and inheritance.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery editon', 'category': 'Book', 'ranking': 8, 'summary': 'Great tips on becoming a better programmer, some really good sections on DRY principle and inheritance.'},
    {'title': 'The Pragmatic Programmer, 20th anniversery editon', 'category': 'Book', 'ranking': 8, 'summary': 'Great tips on becoming a better programmer, some really good sections on DRY principle and inheritance.'},
]

function MediaTable(){
    return (
        <div className='media'>
            <table className='media-table'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Ranking</th>
                        <th>Summary</th>
                    </tr>
                 
                </thead>
                <tbody>
                    {
                        data.map((entry)=> {
                            return <tr>
                            <td>{entry.title}</td>
                            <td>{entry.category}</td>
                            <td>{entry.ranking}</td>
                            <td>{entry.summary}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default MediaTable