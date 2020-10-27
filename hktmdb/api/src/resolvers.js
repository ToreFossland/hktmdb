



export const resolvers = {
    SearchHistory: {
      me: (parent, args, context, info) => {
        let hei = "test"
        if(typeof context.userid != 'undefined'){
            hei += context.userid
        }
        console.log("resolver response")
        return hei
        },
    },
  };


  
