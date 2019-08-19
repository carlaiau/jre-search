import Appbase from 'appbase-js'

export default function (searchTerm){
    const appbaseRef = Appbase({
    "url": "https://scalr.api.appbase.io",
    "app": 'audio-search',
    "credentials": 'C67jDCQOx:5869385e-d182-424e-a82f-c38087f5f806'
  })
  return new Promise(function(resolve){
    appbaseRef.search({
      type: "_doc",
      body: {
        _source: [
          'id',
          'episode', 
          'title',
          'guest',
          'thumbnails'],
        query: {
          match: {
            transcript: searchTerm
          },
        },
        highlight: {
            fields: {
              transcript: {}
            }
          }
      }
    }).then(function(response){ 
        console.log(response.hits.hits)
        resolve(response.hits.hits)
    }).catch(function(error){
      console.log(error)
      resolve([])
    })
  })
}