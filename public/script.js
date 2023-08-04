const socket = io('/');
const videoGrid=document.getElementById('video-grid')
 const myPeer = new Peer(
    //  undefined,{
    // host:'/',
    // port:'2004'
//}
)
const peers={};
const myVideo = document.createElement('video')

myVideo.mute= true;//mute ourself , we dont hear owm micrphones sound back

//connect  our own video on our device
  navigator.mediaDevices.getUserMedia({
   video:true,
   audio:true

}).then(stream=>{
  addVideoStream(myVideo,stream);

//if someone try to call us
myPeer.on('call',call=>{
    //send them our current stream
    call.answer(stream); 
  const video=document.createElement('video');

call.on('stream',userVideoStream=>{
    addEventListener(video,userVideoStream)

})
})
//allow ourself to connected to by others users
socket.on('user-connected',userId => {
    
 console.log("User connected:",userId);
  connectToNewUSer(userId,stream);
})
})


socket.on('user-disconnected',userId => {
    // console.log('User disconnected:' + userId);
    if(peers[userId])
         peers[userId].close();
})

//mypeer uses al the rtc details and genrates id by peeer to connect with other peers on te network

//1ST ;when web open
myPeer.on('open' , id=>{
    socket.emit('join-room',ROOM_ID,id);
})



//Join new user in Call
function connectToNewUSer(userId,stream){
    //unique user id id generete through mypeer.on('open',id) and that pass here 

    //myPeer.call use user id and video stream to join video call in room

    //call newUser with userId and stream(our audio and video)
     const call =myPeer.call(userId,stream);
     const video = document.createElement('video');
     call.on('stream',userVideoStream=>{
         addVideoStream(video,userVideoStream)
     })

 call.on('close',()=>{
     video.remove()
 })

 console.log(call);

peers[userId]=call;
}

//Adding Video on Screen
function addVideoStream(video , stream){
    video.srcObject = stream;
    video.addEventListener('loadedmetadata',()=>{
        video.play();
    })
    videoGrid.append(video)
}