if('serviceWorker' in navigator){
    navigator.serviceWorker.register('sw.js')
    .then(()=>{
        console.log('serviceWorker is registered')
    })
    .catch(()=>{
        console.log('error in registering serviceWorker')
    })
}