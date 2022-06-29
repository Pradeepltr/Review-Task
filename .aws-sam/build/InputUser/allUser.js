const AWS=require('aws-sdk')
const DB=new AWS.DynamoDB.DocumentClient();
let response;
exports.Users = async (event, context) => {
   const params={
    TableName:"userdata"
   }
   await DB.scan(params).promise()
   .then((data)=>{
    response = {
        'statusCode': 200,
        'body': JSON.stringify({
            Data: data.Items
            
        })
    }

   }).catch((err)=>{
    response = {
        'statusCode': 400,
        'body': JSON.stringify({
            message: 'Data not found',
            error:err
            
        })
    }
   })

    return response
};
