import Journal from './JournalEntry.jsx'
import Upload from './ImageUpload.jsx';

function DailyLog(){
    return(
        <div>
            <Upload />
            <Journal />
        </div>
    )
}

export default DailyLog;
