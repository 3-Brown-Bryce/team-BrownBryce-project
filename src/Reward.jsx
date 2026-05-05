import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

function ClaimReward(){
    const DailyReward = ({ userId }) => {
            const [reward, setReward] = useState(null);
            const [loading, setLoading] = useState(true);
    
            useEffect(() => {
                const checkDailyReward = async () => {
                  const userRef = doc(db, 'users', userId);
                  const userSnap = await getDoc(userRef);
                  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
            
                  if (userSnap.exists()) {
                    const data = userSnap.data();
                    if (data.lastClaimed !== today) {
                      // It's a new day! Give reward.
                      const newReward = "https://googleapis.com_" + today + ".png"; 
                      await updateDoc(userRef, {
                        lastClaimed: today,
                        rewardImage: newReward, // URL to the image
                        streak: data.streak + 1
                      });
                      setReward(newReward);
                    } else {
                      // Already claimed
                      setReward(data.rewardImage);
                    }
                  }
                  setLoading(false);
                };
    
                checkDailyReward();
            }, [userId]);
          
            if (loading) return <div>Loading...</div>;  
        
        
    return(
        <button>claim reward</button>
    )
}
}

export default ClaimReward