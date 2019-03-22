export default {
  name: 'Main Script',
  sections: {
    create: {
      name: 'Welcome',
      shortDescription: 'Give a warm welcome to people who are standing in-front of the artefact right now!',
      masterIntent: 'welcome',
      blocks: {
        create: {
          name: 'Introduction',
          shortDescription: 'A set of messages that will introduce the artefact',
          intent: 'welcome_introduction',
          utterances: {
            create: [{
              input: "Introduce yourself"
            },{
              input: "Who are you?"
            }]
          },
          replies: {
            create: {
              intent: "welcome_introduction",
              payload: {
                create: [{
                  text: "This is an example reply for the welcome_introduction intent"
                },{
                  text: "In here the artefact should give a short introduction about themselves"
                }]
              }
            }
          }
        }
      }
    }
  }
}
