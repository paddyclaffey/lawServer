var userRepository = function (){  
   var self = this;
   self.addUser = function (){
	   console.log('here')
   };
   self.get = function (){
	   console.log('here1')
   }
};
module.exports = userRepository;