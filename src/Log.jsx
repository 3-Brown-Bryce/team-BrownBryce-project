import Journal from './JournalEntry.jsx'
import Upload from './ImageUpload.jsx'
import ClaimReward from './Reward.jsx';

function DailyLog(){
    return(
        <div>
            <Upload />
            <Journal />
        </div>
    )
}

export default DailyLog;
