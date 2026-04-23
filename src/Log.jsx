import Journal from './JournalEntry.jsx'
import Upload from './ImageUpload.jsx'
import ClaimReward from './Reward.jsx';

function DailyLog(){
    return(
        <div>
            <Upload />
            <Journal />
            <ClaimReward />
        </div>
    )
}

export default DailyLog;
