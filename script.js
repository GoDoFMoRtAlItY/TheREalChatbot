let prompt=document.querySelector("#SearchBox");
let chatContainer=document.querySelector(".chatContainer");
let Api_Key="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent"
let user={data:null,}

async function genResponse(aiChatBox) {
    let text=aiChatBox.querySelector(".aiChatArea");

    let requestOption={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        headers:{'X-goog-api-key': 'NIJER API KEY USE KORO KHOKA'},
        body:JSON.stringify({
            
    "contents": [
      {
        "parts": [
          {
            "text": user.data
          }
        ]
      }
    ]
  
    })
    }
    try{
        let response=await fetch(Api_Key,requestOption)
        let data=await response.json();
        console.log(data);
        
        let apiRes=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        text.innerHTML=apiRes;
        
    }
    catch(error){
        console.log(error);
        
    }
    finally{
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"})
    }

    
    
}

function createChatBox(html,classes){
    let div=document.createElement("div");
    div.innerHTML=html;
    div.classList.add(classes);
    return div;
}


function PromptHandel(msg){
    user.data=msg;
    let html=`<div class="userChatArea">
                ${user.data}
            </div>
            <img class="profile" src="media/ram-removebg-preview.png"  alt="" id="UserImg">`
            prompt.value="";
    let userChat=createChatBox(html,"userChatBox");
    chatContainer.appendChild(userChat);

    chatContainer.scrollTo({top:chatContainer.scrollHeight,behavior:"smooth"});

    setTimeout(()=>{
        let html=`<img class="profile" src="media/bot-removebg-preview.png"  alt="" id="AiImg">
            <div class="aiChatArea">
            <img src="media/load-38.gif" alt="load" width="50px">                
            </div>`
         let aiChat=createChatBox(html,"aiChatBox");
         chatContainer.appendChild(aiChat);
         genResponse(aiChat);
    },600)
}

prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter")
    {
        PromptHandel(prompt.value);
        
    }
})
