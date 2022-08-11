const menu = document.querySelector('#menu');
const sidebar = document.querySelector('.sidebar');

menu.addEventListener('click', function () {
sidebar.classList.toggle('show-sidebar')
});


let api_key ="AIzaSyAbpG7J8ETzygeFOFT5un32uNLO72gfuvk"
let videos_http=`https://www.googleapis.com/youtube/v3/videos?`
let channel_list=`https://www.googleapis.com/youtube/v3/channels?`
let search_api=`https://www.googleapis.com/youtube/v3/search?`


const videoCardContainer = document.querySelector('.videos__container');
let getAllvideosList=async()=>{
    try{
        let responceData=await fetch(`${videos_http}key=${api_key}&part=snippet&chart=mostPopular&maxResults=50`)
       videoCardContainer.innerHTML=''
        let videoslist=await responceData.json()
        videoCardContainer.innerHTML=''
        videoslist.items.forEach(videos=>{
            displayVideos(videos)
            console.log(videos)


        })
    }
    catch{
        console.log("eroor")
    }
}
getAllvideosList()




let getChannelDetails=async(videos)=>{
    try{
        let responceDataChanel=await fetch(`${channel_list}key=${api_key}&part=snippet&id=${videos.snippet.channelId}`)
       
        let chanel=await responceDataChanel.json()
       
            displayVideos(videos)
            console.log(videos)

    }
    catch{
        console.log("eroor")
    }
}

let displayVideos=async(videos)=>{
    videoCardContainer.innerHTML += `
    <div class="video">

    <div class="video__thumbnail">
     <a href="https://www.youtube.com/watch?v=${videos.id}"> <img src="${videos.snippet.thumbnails.default.url}" alt="" />
     </a>
    </div>
    <div class="video__details">
      <div class="author">
        <img src="${videos.snippet.thumbnails.default.url}" alt="" />
      </div>
      <div class="title">
        <h3>
        ${videos.snippet.title} </h3>
        <a href="https://www.youtube.com/channel/${videos.snippet.channelId}">${videos.snippet.channelTitle}</a>
      </div>
    </div>
  </div>
    `;
}


let searchVideos=async()=>{
    try{
        let keywordval=document.querySelector('#searchval')
        videoCardContainer.innerHTML=''
        let responceData=await fetch(`${search_api}key=${api_key}&part=snippet&chart=mostPopular&maxResults=50&q=${keywordval}`)
       
        let videoslist=await responceData.json()
        videoslist.items.forEach(videos=>{
            videos.id=videos.id.videoId
            displayVideos(videos)
            console.log(videos)


        })
    }
    catch{
        console.log("eroor")
    }
}