const appointment = require("../models/appointment");

async function makeOld() {
  const appointments = await appointment.find();
  var datetime = new Date();
  
  for(i = 0; i < appointments.length; i++){
      if(appointments[i].date < datetime){
        const updateApponment = await appointment.updateOne(
            { _id: appointments[i]._id },
            {
              $set: {
                status: 'old',
              },
            }
          );
      }
  }

}

module.exports = { makeOld };
