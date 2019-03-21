

export function updateUnreadMessagesState(conversations){
    conversations.forEach((convObj) => {
        convObj.numOfUnreadMessages = 0;
        let messages = convObj.conv.messages;
        let lastMsgInStorage = readLastMessageFromLocalStorage(convObj.conv._id);
        if(lastMsgInStorage){
            if(messages[messages.length-1] && lastMsgInStorage !== messages[messages.length-1]._id){
                let numOfUnreadMsgs = 0;
                for(let i=messages.length-1; i>0; i--){
                    if(messages[i]._id !== lastMsgInStorage){
                        numOfUnreadMsgs++;
                    } else{
                        break;
                    }
                }
                convObj.numOfUnreadMessages = numOfUnreadMsgs;
            }
        } else{
            convObj.numOfUnreadMessages = messages.length;
        }
    });
    return conversations;
}

function readLastMessageFromLocalStorage(convID){
    let lastMsgID = '';
    let username = sessionStorage.getItem("username");
    if(!!username && convID){
        let userData = JSON.parse(localStorage.getItem(username));
        if(!!userData && userData.lastMessagesRead){
            let lastMsgObj = userData.lastMessagesRead.find((lastMsgInConv) => {
                return lastMsgInConv.convID === convID;
            });
            if(!!lastMsgObj){
                lastMsgID = lastMsgObj.lastMsgID;
            }
        }
    }
    return lastMsgID;
}

export function updateLastMessageInLocalStorage(convID, lastMsgID){
    let username = sessionStorage.getItem("username");
    if(convID && lastMsgID && username){
        let userData = JSON.parse(localStorage.getItem(username));
        if(!!userData){
            let lastMsgObj = userData.lastMessagesRead.find(item => {
                return item.convID === convID;
            });
            if(!!lastMsgObj){
                lastMsgObj.lastMsgID = lastMsgID;
            } else {
                //We need to create a new lastMsg object for this user
                lastMsgObj = {lastMsgID: lastMsgID, convID: convID};
                userData.lastMessagesRead.push(lastMsgObj);
            }
            
        } else {
            userData = {
                    lastMessagesRead : [{lastMsgID: lastMsgID, convID: convID}]
                    }
            console.log(userData);
        }
        
        localStorage.setItem(username, JSON.stringify(userData));
    }
    
}
